import { JSONFile } from './json.js'

export type JSX =
  | 'preserve'
  | 'react'
  | 'react-jsx'
  | 'react-jsxdev'
  | 'react-native'

export type Module =
  | 'CommonJS'
  | 'AMD'
  | 'System'
  | 'UMD'
  | 'ES6'
  | 'ES2015'
  | 'ES2020'
  | 'ES2022'
  | 'ESNext'
  | 'Node16'
  | 'NodeNext'
  | 'None'
  | 'commonjs'
  | 'amd'
  | 'system'
  | 'umd'
  | 'es6'
  | 'es2015'
  | 'es2020'
  | 'es2022'
  | 'esnext'
  | 'node16'
  | 'nodenext'
  | 'none'

export type NewLine = 'CRLF' | 'LF' | 'crlf' | 'lf'

export type Target =
  | 'ES3'
  | 'ES5'
  | 'ES6'
  | 'ES2015'
  | 'ES2016'
  | 'ES2017'
  | 'ES2018'
  | 'ES2019'
  | 'ES2020'
  | 'ES2021'
  | 'ES2022'
  | 'ESNext'
  | 'es3'
  | 'es5'
  | 'es6'
  | 'es2015'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'es2021'
  | 'es2022'
  | 'esnext'

export type Lib =
  | 'ES5'
  | 'ES6'
  | 'ES7'
  | 'ES2015'
  | 'ES2015.Collection'
  | 'ES2015.Core'
  | 'ES2015.Generator'
  | 'ES2015.Iterable'
  | 'ES2015.Promise'
  | 'ES2015.Proxy'
  | 'ES2015.Reflect'
  | 'ES2015.Symbol.WellKnown'
  | 'ES2015.Symbol'
  | 'ES2016'
  | 'ES2016.Array.Include'
  | 'ES2017'
  | 'ES2017.Intl'
  | 'ES2017.Object'
  | 'ES2017.SharedMemory'
  | 'ES2017.String'
  | 'ES2017.TypedArrays'
  | 'ES2018'
  | 'ES2018.AsyncGenerator'
  | 'ES2018.AsyncIterable'
  | 'ES2018.Intl'
  | 'ES2018.Promise'
  | 'ES2018.Regexp'
  | 'ES2019'
  | 'ES2019.Array'
  | 'ES2019.Object'
  | 'ES2019.String'
  | 'ES2019.Symbol'
  | 'ES2020'
  | 'ES2020.BigInt'
  | 'ES2020.Promise'
  | 'ES2020.String'
  | 'ES2020.Symbol.WellKnown'
  | 'ES2020.SharedMemory'
  | 'ES2020.Intl'
  | 'ES2021'
  | 'ES2021.Promise'
  | 'ES2021.String'
  | 'ES2021.WeakRef'
  | 'ESNext'
  | 'ESNext.Array'
  | 'ESNext.AsyncIterable'
  | 'ESNext.BigInt'
  | 'ESNext.Intl'
  | 'ESNext.Promise'
  | 'ESNext.String'
  | 'ESNext.Symbol'
  | 'ESNext.WeakRef'
  | 'DOM'
  | 'DOM.Iterable'
  | 'ScriptHost'
  | 'WebWorker'
  | 'WebWorker.ImportScripts'
  | 'WebWorker.Iterable'
  | 'es5'
  | 'es6'
  | 'es7'
  | 'es2015'
  | 'es2015.collection'
  | 'es2015.core'
  | 'es2015.generator'
  | 'es2015.iterable'
  | 'es2015.promise'
  | 'es2015.proxy'
  | 'es2015.reflect'
  | 'es2015.symbol.wellknown'
  | 'es2015.symbol'
  | 'es2016'
  | 'es2016.array.include'
  | 'es2017'
  | 'es2017.intl'
  | 'es2017.object'
  | 'es2017.sharedmemory'
  | 'es2017.string'
  | 'es2017.typedarrays'
  | 'es2018'
  | 'es2018.asyncgenerator'
  | 'es2018.asynciterable'
  | 'es2018.intl'
  | 'es2018.promise'
  | 'es2018.regexp'
  | 'es2019'
  | 'es2019.array'
  | 'es2019.object'
  | 'es2019.string'
  | 'es2019.symbol'
  | 'es2020'
  | 'es2020.bigint'
  | 'es2020.promise'
  | 'es2020.string'
  | 'es2020.symbol.wellknown'
  | 'es2020.sharedmemory'
  | 'es2020.intl'
  | 'es2021'
  | 'es2021.promise'
  | 'es2021.string'
  | 'es2021.weakref'
  | 'esnext'
  | 'esnext.array'
  | 'esnext.asynciterable'
  | 'esnext.bigint'
  | 'esnext.intl'
  | 'esnext.promise'
  | 'esnext.string'
  | 'esnext.symbol'
  | 'esnext.weakref'
  | 'dom'
  | 'dom.iterable'
  | 'scripthost'
  | 'webworker'
  | 'webworker.importscripts'
  | 'webworker.iterable'

export type Plugin = {
  name: string
}

export type ImportsNotUsedAsValues = 'remove' | 'preserve' | 'error'

export type FallbackPolling =
  | 'fixedPollingInterval'
  | 'priorityPollingInterval'
  | 'dynamicPriorityPolling'
  | 'fixedInterval'
  | 'priorityInterval'
  | 'dynamicPriority'
  | 'fixedChunkSize'

export type WatchDirectory =
  | 'useFsEvents'
  | 'fixedPollingInterval'
  | 'dynamicPriorityPolling'
  | 'fixedChunkSizePolling'

export type WatchFile =
  | 'fixedPollingInterval'
  | 'priorityPollingInterval'
  | 'dynamicPriorityPolling'
  | 'useFsEvents'
  | 'useFsEventsOnParentDirectory'
  | 'fixedChunkSizePolling'

export type ModuleResolution =
  | 'classic'
  | 'node'
  | 'node10'
  | 'node16'
  | 'nodenext'
  | 'bundler'
  | 'Classic'
  | 'Node'
  | 'Node10'
  | 'Node16'
  | 'NodeNext'
  | 'Bundler'

export type ModuleDetection = 'auto' | 'legacy' | 'force'

export type IgnoreDeprecations = '5.0'

export type CompilerOptions = {
  charset?: string
  composite?: boolean
  declaration?: boolean
  declarationDir?: string
  diagnostics?: boolean
  disableReferencedProjectLoad?: boolean
  noPropertyAccessFromIndexSignature?: boolean
  emitBOM?: boolean
  emitDeclarationOnly?: boolean
  exactOptionalPropertyTypes?: boolean
  incremental?: boolean
  tsBuildInfoFile?: string
  inlineSourceMap?: boolean
  inlineSources?: boolean
  jsx?: JSX
  reactNamespace?: string
  jsxFactory?: string
  jsxFragmentFactory?: string
  jsxImportSource?: string
  listFiles?: boolean
  mapRoot?: string
  module?: Module
  moduleResolution?: ModuleResolution
  newLine?: NewLine
  noEmit?: boolean
  noEmitHelpers?: boolean
  noEmitOnError?: boolean
  noImplicitAny?: boolean
  noImplicitThis?: boolean
  noUnusedLocals?: boolean
  noUnusedParameters?: boolean
  noLib?: boolean
  noResolve?: boolean
  noStrictGenericChecks?: boolean
  skipDefaultLibCheck?: boolean
  skipLibCheck?: boolean
  outFile?: string
  outDir?: string
  preserveConstEnums?: boolean
  preserveSymlinks?: boolean
  preserveWatchOutput?: boolean
  pretty?: boolean
  removeComments?: boolean
  rootDir?: string
  isolatedModules?: boolean
  sourceMap?: boolean
  sourceRoot?: string
  suppressExcessPropertyErrors?: boolean
  suppressImplicitAnyIndexErrors?: boolean
  stripInternal?: boolean
  target?: Target
  useUnknownInCatchVariables?: boolean
  watch?: boolean
  fallbackPolling?: FallbackPolling
  watchDirectory?: WatchDirectory
  watchFile?: WatchFile
  experimentalDecorators?: boolean
  emitDecoratorMetadata?: boolean
  allowUnusedLabels?: boolean
  noImplicitReturns?: boolean
  noUncheckedIndexedAccess?: boolean
  noFallthroughCasesInSwitch?: boolean
  noImplicitOverride?: boolean
  allowUnreachableCode?: boolean
  forceConsistentCasingInFileNames?: boolean
  generateCpuProfile?: string
  baseUrl?: string
  paths?: Record<string, string[]>
  plugins?: Plugin[]
  rootDirs?: string[]
  typeRoots?: string[]
  types?: string[]
  traceResolution?: boolean
  allowJs?: boolean
  noErrorTruncation?: boolean
  allowSyntheticDefaultImports?: boolean
  noImplicitUseStrict?: boolean
  listEmittedFiles?: boolean
  disableSizeLimit?: boolean
  lib?: Lib[]
  strictNullChecks?: boolean
  maxNodeModuleJsDepth?: number
  importHelpers?: boolean
  importsNotUsedAsValues?: ImportsNotUsedAsValues
  alwaysStrict?: boolean
  strict?: boolean
  strictBindCallApply?: boolean
  downlevelIteration?: boolean
  checkJs?: boolean
  strictFunctionTypes?: boolean
  strictPropertyInitialization?: boolean
  esModuleInterop?: boolean
  allowUmdGlobalAccess?: boolean
  keyofStringsOnly?: boolean
  useDefineForClassFields?: boolean
  declarationMap?: boolean
  resolveJsonModule?: boolean
  assumeChangesOnlyAffectDirectDependencies?: boolean
  extendedDiagnostics?: boolean
  listFilesOnly?: boolean
  disableSourceOfProjectReferenceRedirect?: boolean
  disableSolutionSearching?: boolean
  explainFiles?: boolean
  preserveValueImports?: boolean
  moduleSuffixes?: string[]
  moduleDetection?: ModuleDetection
  allowImportingTsExtensions?: boolean
  resolvePackageJsonExports?: boolean
  resolvePackageJsonImports?: boolean
  allowArbitraryExtensions?: boolean
  customConditions?: string[]
  verbatimModuleSyntax?: boolean
  ignoreDeprecations?: IgnoreDeprecations
}

export type WatchFileKind =
  | 'FixedPollingInterval'
  | 'PriorityPollingInterval'
  | 'DynamicPriorityPolling'
  | 'FixedChunkSizePolling'
  | 'UseFsEvents'
  | 'UseFsEventsOnParentDirectory'

export type WatchDirectoryKind =
  | 'UseFsEvents'
  | 'FixedPollingInterval'
  | 'DynamicPriorityPolling'
  | 'FixedChunkSizePolling'

export type PollingWatchKind =
  | 'FixedInterval'
  | 'PriorityInterval'
  | 'DynamicPriority'
  | 'FixedChunkSize'

export type WatchOptions = {
  watchFile?: WatchFileKind | Lowercase<WatchFileKind>
  watchDirectory?: WatchDirectoryKind | Lowercase<WatchDirectoryKind>
  fallbackPolling?: PollingWatchKind | Lowercase<PollingWatchKind>
  synchronousWatchDirectory?: boolean
  excludeDirectories?: string[]
  excludeFiles?: string[]
}

export type TypeAcquisition = {
  enable?: boolean
  include?: string[]
  exclude?: string[]
}

export type References = {
  path: string
  originalPath?: string
  prepend?: boolean
  circular?: boolean
}

export type TsConfig = {
  compilerOptions?: CompilerOptions
  watchOptions?: WatchOptions
  typeAcquisition?: TypeAcquisition
  compileOnSave?: boolean
  extends?: string | string[]
  files?: string[]
  exclude?: string[]
  include?: string[]
  references?: References[]
}

export const TsDefaultConfig: TsConfig = {
  compilerOptions: {
    module: 'NodeNext',
    moduleResolution: 'NodeNext',
    target: 'ESNext',
    esModuleInterop: true,
    noImplicitAny: false,
    sourceMap: false,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    outDir: 'dist',
    baseUrl: '.',
    types: ['node'],
  },
  exclude: ['node_modules', 'dist', 'build'],
  include: ['src/**/*.ts'],
  compileOnSave: false,
}

export class TsConfigJson extends JSONFile<TsConfig> {
  static create(path: string): TsConfigJson {
    return new TsConfigJson(path)
  }
}
