import { JSONFile } from './json.js'

export type VsCodeConfig = typeof VsCodeDefaultConfig

export const VsCodeDefaultConfig = {
  '[javascript]': {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[json]': {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'vscode.json-language-features',
  },
  '[jsonc]': {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[typescript]': {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[graphql]': {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  'editor.formatOnPaste': true,
  'editor.formatOnSave': true,
  'editor.tabSize': 2,
  'editor.defaultFormatter': 'dbaeumer.vscode-eslint',
  'eslint.validate': ['json', 'jsonc', 'javascript'],
  'eslint.format.enable': true,
  'eslint.lintTask.enable': true,
  'prettier.printWidth': 240,
  'prettier.semi': false,
  'prettier.singleQuote': true,
  'prettier.trailingComma': 'all',
  'editor.codeActionsOnSave': {
    'source.organizeImports': 'always',
  },
  'typescript.preferences.importModuleSpecifierEnding': 'js',
  'npm-intellisense.importLinebreak': '',
}

export class VsCodeConfigJson extends JSONFile<VsCodeConfig> {
  static create(path: string): VsCodeConfigJson {
    return new VsCodeConfigJson(path)
  }
}
