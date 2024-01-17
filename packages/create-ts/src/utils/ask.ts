import Enquirer from 'enquirer'

import { FileList } from './cleanup.js'
import { basename } from 'path'

export type Answers = {
  continueInstall?: boolean
}

export type AnswerPromise = Promise<Answers>

const enquirer = new Enquirer()

export const askUser = (existingConfigFiles: FileList): AnswerPromise =>
  enquirer.prompt({
    type: 'toggle',
    name: 'continueInstall',
    message:
      existingConfigFiles.length === 0
        ? 'Initializing ESM package. Do you wish to continue?'
        : `The following files will be removed: ${existingConfigFiles
            .map((file: string) => basename(file))
            .join(', ')}. Do you wish to continue?`,
    enabled: 'Yes',
    disabled: 'No',
    initial: 1,
  })
