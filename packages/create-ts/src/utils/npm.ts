import { execFileSync } from 'node:child_process'

export const npmInit = (cwd?: string): Buffer =>
  execFileSync('npm', ['init', '-y'], { cwd })

type InstallOptions = {
  dev?: boolean
  cwd?: string
}

export const npmInstall = (
  dependency: string,
  { dev = false, cwd }: InstallOptions,
): Buffer =>
  execFileSync('npm', ['install', dev ? '--save-dev' : '--save', dependency], {
    cwd,
  })
