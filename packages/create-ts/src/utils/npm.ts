import { ExecFileException, execFile } from 'node:child_process'
import { ResolveCallback, RejectCallback } from 'src/shared/promiseTypes.js'

type InstallOptions = {
  dev?: boolean
  cwd?: string
}

export const npx = (
  pkg: string,
  args: string[] = [],
  cwd?: string,
): Promise<string> =>
  new Promise<string>(
    (resolve: ResolveCallback<string>, reject: RejectCallback): void => {
      execFile(
        'npx',
        [pkg, ...args],
        { cwd },
        (error: ExecFileException, stdout: string): void => {
          if (error) {
            return reject(error)
          }
          resolve(stdout)
        },
      )
    },
  )

export const npmInit = (cwd?: string): Promise<string> =>
  new Promise<string>(
    (resolve: ResolveCallback<string>, reject: RejectCallback): void => {
      execFile(
        'npm',
        ['init', '-y'],
        { cwd },
        (error: ExecFileException, stdout: string): void => {
          if (error) {
            return reject(error)
          }
          resolve(stdout)
        },
      )
    },
  )

export const npmInstall = (
  pkg: string,
  { dev = false, cwd }: InstallOptions,
): Promise<string> =>
  new Promise<string>(
    (resolve: ResolveCallback<string>, reject: RejectCallback) => {
      execFile(
        'npm',
        ['install', dev ? '--save-dev' : '--save', pkg],
        {
          cwd,
        },
        (error: ExecFileException, stdout: string) => {
          if (error) {
            return reject(error)
          }
          resolve(stdout)
        },
      )
    },
  )
