import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

export type FileList = string[]

const filesToCheck: FileList = [
  'package.json',
  'package-lock.json',
  '.gitignore',
  '.eslintrc.json',
  'node_modules',
  'jest.config.js',
  'tsconfig.json',
  '.vscode',
]

export const getExitsingConfigFiles = (path: string): FileList =>
  filesToCheck
    .map((file: string) => resolve(path, file))
    .filter((file: string) => existsSync(resolve(file)))

export const cleanup = (filesToCleanup: FileList) =>
  filesToCleanup.forEach((file: string) => {
    execFileSync('rm', ['-rf', file])
  })
