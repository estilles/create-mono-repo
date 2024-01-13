import { JSONFile, JSONValue } from './json.js'

export type ESLintECMAVersion =
  | 3
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 'latest'

export type ESLintSeverity = 0 | 1 | 2 | 'off' | 'warn' | 'error'

export type ESLintOverride = {
  excludedFiles?: string | string[]
  files: string | string[]
}

export type ESLintGlobalPermission =
  | 'readonly'
  | 'writable'
  | 'off'
  | 'readable'
  | boolean

export type ESLintSourceType = 'script' | 'module'

export type ESLintEnvironment = {
  browser?: boolean
  node?: boolean
  commonjs?: boolean
  es6?: boolean
  es2017?: boolean
  es2020?: boolean
  es2021?: boolean
  worker?: boolean
  amd?: boolean
  mocha?: boolean
  jasmine?: boolean
  jest?: boolean
  phantomjs?: boolean
  protractor?: boolean
  qunit?: boolean
  jquery?: boolean
  prototypejs?: boolean
  shelljs?: boolean
  meteor?: boolean
  mongo?: boolean
  applescript?: boolean
  nashorn?: boolean
  serviceworker?: boolean
  atomtest?: boolean
  embertest?: boolean
  webextensions?: boolean
  greasemonkey?: boolean
  [other: string]: boolean | undefined
}

export type ESLintParserOptions = {
  ecmaVersion?: ESLintECMAVersion
  sourceType?: ESLintSourceType
  ecmaFeatures?: {
    globalReturn?: boolean
    impliedStrict?: boolean
    jsx?: boolean
    experimentalObjectRestSpread?: boolean
  }
}

export type ESLintRule =
  | ESLintSeverity
  | [value: ESLintSeverity, ...options: JSONValue[]]

export type ESLintRules = {
  [name: string]: ESLintRule
}

export type ESLintConfig = {
  $schema?: string
  env?: ESLintEnvironment
  extends?: string | string[]
  globals?: {
    [name: string]: ESLintGlobalPermission
  }
  noInlineConfig?: boolean
  ignorePatterns?: string[]
  overrides?: ESLintOverride[]
  parser?:
    | 'esprima'
    | '@babel/eslint-parser'
    | '@typescript-eslint/parser'
    | string
  parserOptions?: ESLintParserOptions
  plugins?: string[]
  processor?: string
  reportUnusedDisableDirectives?: boolean
  rules?: ESLintRules
  settings?: {
    [setting: string]: JSONValue
  }
}

export const ESLintDefaultConfig: ESLintConfig = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-console': 'off',
    indent: ['error', 2],
    'import/extensions': ['error', 'ignorePackages'],
    'comma-dangle': ['error', 'always-multiline'],
  },
}

export class ESLintRC extends JSONFile<ESLintConfig> {
  static create(path: string): ESLintRC {
    return new ESLintRC(path)
  }
}
