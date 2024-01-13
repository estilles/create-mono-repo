#!/usr/bin/env node
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { log } from './shared/logger.js'
import { askUser } from './utils/ask.js'
import { getExitsingConfigFiles, FileList, cleanup } from './utils/cleanup.js'
import { ESLintDefaultConfig, ESLintRC } from './utils/eslint.js'
import { GitIgnoreFileData } from './utils/gitignore.js'
import { npmInit, npmInstall } from './utils/npm.js'
import { PackageJson } from './utils/package.js'

const init = async () => {
  try {
    const [path = '.'] = process.argv.splice(2)
    const cwd = resolve(path)

    if (existsSync(cwd) && !statSync(cwd).isDirectory()) {
      throw new Error(`${path} must be a directory`)
    }

    const existingConfigFiles: FileList = getExitsingConfigFiles(cwd)
    const { continueInstall } = await askUser(existingConfigFiles)

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
    npmInstall('eslint-config-airbnb-base', { dev: true, cwd })
    npmInstall('eslint-plugin-import', { dev: true, cwd })
    npmInstall('jest', { dev: true, cwd })
    npmInstall('@jest/globals', { dev: true, cwd })
    log.succeed()

    log.start('Configuring package for ESM and Jest')
    const packageJson: PackageJson = PackageJson.create(
      resolve(cwd, './package.json'),
    )
    packageJson.load()
    packageJson.set({
      type: 'module',
      scripts: {
        test: 'node --experimental-vm-modules node_modules/jest/bin/jest.js',
        lint: 'eslint .',
      },
    })
    packageJson.save()
    log.succeed()

    log.start('Configuring ESLint')
    const eslintConfig = ESLintRC.create(resolve(cwd, './.eslintrc.json'))
    eslintConfig.set(ESLintDefaultConfig)
    eslintConfig.save()
    log.succeed()

    log.start('Configuring .gitignore')
    writeFileSync(resolve(cwd, './.gitignore'), GitIgnoreFileData)
    log.succeed()
  } catch (error) {
    log.fail(error.toString())
  }
}

init()
