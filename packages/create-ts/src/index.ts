#!/usr/bin/env node
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { log, logError } from './shared/logger.js'
import { Answers, askUser } from './utils/ask.js'
import { FileList, cleanup, getExitsingConfigFiles } from './utils/cleanup.js'
import { ESLintDefaultConfig, ESLintRC } from './utils/eslint.js'
import { GitIgnoreFileData } from './utils/gitignore.js'
import { JestConfigJson, JestDefaultConfig } from './utils/jest.js'
import { npmInit, npmInstall } from './utils/npm.js'
import { PackageJson } from './utils/package.js'
import { TsConfigJson, TsDefaultConfig } from './utils/tsconfig.js'
import {
  ExtensionConfigJson,
  ExtensionDefaultConfig,
  VsCodeConfigJson,
  VsCodeDefaultConfig,
} from './utils/vscode.js'

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
    await npmInit(cwd)
    await npmInstall('eslint', { dev: true, cwd })
    await npmInstall('eslint-config-prettier', { dev: true, cwd })
    await npmInstall('@typescript-eslint/eslint-plugin', { dev: true, cwd })
    await npmInstall('@typescript-eslint/parser', { dev: true, cwd })
    await npmInstall('prettier', { dev: true, cwd })
    await npmInstall('prettier-eslint', { dev: true, cwd })
    await npmInstall('typescript', { dev: true, cwd })
    await npmInstall('@types/node', { dev: true, cwd })
    await npmInstall('jest', { dev: true, cwd })
    await npmInstall('ts-jest', { dev: true, cwd })
    await npmInstall('ts-node', { dev: true, cwd })
    await npmInstall('@types/jest', { dev: true, cwd })
    log.succeed()

    log.start('Configuring Jest')
    const jestConfig = JestConfigJson.create(resolve(cwd, './jest.config.json'))
    jestConfig.set(JestDefaultConfig)
    await jestConfig.save()
    log.succeed()

    log.start('Configuring package for ESM and Jest')
    const packageJson: PackageJson = PackageJson.create(
      resolve(cwd, './package.json'),
    )
    await packageJson.load()
    packageJson.set({
      main: './dist/index.js',
      type: 'module',
      scripts: {
        test: 'jest',
        lint: 'eslint --ext .ts',
        build: 'tsc',
        start: 'tsc && node dist/index.js',
        format:
          'prettier --ignore-path .gitignore --write "**/*.+(js|ts|json)"',
      },
    })
    await packageJson.save()
    log.succeed()

    log.start('Configuring ESLint')
    const eslintConfig = ESLintRC.create(resolve(cwd, './.eslintrc.json'))
    eslintConfig.set(ESLintDefaultConfig)
    await eslintConfig.save()
    log.succeed()

    log.start('Configuring TSConfig')
    const tsConfig = TsConfigJson.create(resolve(cwd, './tsconfig.json'))
    tsConfig.set(TsDefaultConfig)
    await tsConfig.save()
    log.succeed()

    log.start('Configuring .gitignore')
    writeFileSync(resolve(cwd, './.gitignore'), GitIgnoreFileData)
    log.succeed()

    const vscodeDir: string = resolve(cwd, './.vscode')
    log.start('Configuring VSCode')
    if (!existsSync(vscodeDir)) {
      mkdirSync(vscodeDir)
    }
    const vscodeConfig = VsCodeConfigJson.create(
      resolve(cwd, './.vscode/settings.json'),
    )
    vscodeConfig.set(VsCodeDefaultConfig)
    await vscodeConfig.save()
    log.succeed()

    const extensionsConfig = ExtensionConfigJson.create(
      resolve(cwd, './.vscode/extensions.json'),
    )
    extensionsConfig.set(ExtensionDefaultConfig)
    await extensionsConfig.save()
    log.succeed()

    const srcDir: string = resolve(cwd, './src')
    if (!existsSync(srcDir)) {
      log.start('Creating ./src directory')
      mkdirSync(srcDir)
      log.succeed()
    }

    const srcIndex: string = resolve(cwd, './src/index.ts')
    if (!existsSync(srcIndex)) {
      log.start('Creating ./src/index.ts')
      writeFileSync(srcIndex, '')
      log.succeed()
    }
  } catch (error) {
    logError(error.toString())
  }
}

init()
