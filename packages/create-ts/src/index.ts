#!/usr/bin/env node
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { log, logError } from './shared/logger.js'
import { askUser, Answers } from './utils/ask.js'
import { getExitsingConfigFiles, FileList, cleanup } from './utils/cleanup.js'
import { ESLintDefaultConfig, ESLintRC } from './utils/eslint.js'
import { GitIgnoreFileData } from './utils/gitignore.js'
import { npmInit, npmInstall } from './utils/npm.js'
import { PackageJson } from './utils/package.js'
import { TsConfigJson, TsDefaultConfig } from './utils/tsconfig.js'

const init = async (): Promise<void> => {
  try {
    const argv: string[] = process.argv.splice(2)

    if (argv.length > 1) {
      logError('Too many arguments')
    }

    const [path = '.']: string[] = argv
    const cwd: string = resolve(path)

    if (existsSync(cwd) && !statSync(cwd).isDirectory()) {
      logError(`${path} must be a directory`)
    }

    const existingConfigFiles: FileList = getExitsingConfigFiles(cwd)
    const { continueInstall }: Answers = await askUser(existingConfigFiles)

    if (!continueInstall) {
      process.exit(0)
    }

    if (!existsSync(cwd)) {
      log.start(`creating ${cwd}`)
      mkdirSync(cwd)
      log.succeed()
    }

    if (existingConfigFiles.length) {
      log.start('Cleaning up files')
      cleanup(existingConfigFiles)
      log.succeed()
    }

    log.start('Initializing package and installing dependencies')
    npmInit(cwd)
    npmInstall('eslint', { dev: true, cwd })
    npmInstall('eslint-config-prettier', { dev: true, cwd })
    npmInstall('@typescript-eslint/eslint-plugin', { dev: true, cwd })
    npmInstall('@typescript-eslint/parser', { dev: true, cwd })
    npmInstall('prettier', { dev: true, cwd })
    npmInstall('typescript', { dev: true, cwd })
    npmInstall('@types/node', { dev: true, cwd })
    log.succeed()

    log.start('Configuring package for ESM and Jest')
    const packageJson: PackageJson = PackageJson.create(
      resolve(cwd, './package.json'),
    )
    packageJson.load()
    packageJson.set({
      type: 'module',
      scripts: {
        lint: 'eslint --ext .ts',
        build: 'tsc',
        start: 'tsc && node dist/index.js',
        format:
          'prettier --ignore-path .gitignore --write "**/*.+(js|ts|json)"',
      },
    })
    packageJson.save()
    log.succeed()

    log.start('Configuring ESLint')
    const eslintConfig = ESLintRC.create(resolve(cwd, './.eslintrc.json'))
    eslintConfig.set(ESLintDefaultConfig)
    eslintConfig.save()
    log.succeed()

    log.start('Configuring TSConfig')
    const tsConfig = TsConfigJson.create(resolve(cwd, './tsconfig.json'))
    tsConfig.set(TsDefaultConfig)
    tsConfig.save()
    log.succeed()

    log.start('Configuring .gitignore')
    writeFileSync(resolve(cwd, './.gitignore'), GitIgnoreFileData)
    log.succeed()
  } catch (error) {
    logError(error.toString())
  }
}

init()
