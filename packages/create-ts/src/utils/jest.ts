import { JSONFile } from './json.js'

export type JestConfig = {
  roots: string[]
  testMatch: string[]
  transform: object
  moduleNameMapper: object
  extensionsToTreatAsEsm: string[]
}

export const JestDefaultConfig: JestConfig = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '(.+)\\.js': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
}

export class JestConfigJson extends JSONFile<JestConfig> {
  static create(path: string): JestConfigJson {
    return new JestConfigJson(path)
  }
}
