import ora, { Ora } from 'ora'

export const log: Ora = ora()

export const logError = (message: string, code: number = 1): void => {
  log.fail(message)
  process.exit(code)
}
