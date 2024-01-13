import { JSONFile } from './json.js'

export type PackageDependencyTypes =
  | 'dependencies'
  | 'devDependencies'
  | 'peerDependencies'
  | 'optionalDependencies'

export type PackageAddress = {
  email?: string
  url?: string
}

export type PackagePerson = PackageAddress & {
  name: string
}

export type Package = {
  name: string
  version: string
  type?: 'commonjs' | 'module'
  description?: string
  keywords?: string
  homepage?: string
  bugs?: PackageAddress
  license?: string
  author?: string | PackagePerson
  contributors?: string[] | PackagePerson[]
  files?: string[]
  main?: string
  browser?: string
  bin?: Record<string, string>
  man?: string
  directories?: {
    lib?: string
    bin?: string
    man?: string
    doc?: string
    example?: string
    test?: string
  }
  repository?: {
    type?: 'git'
    url?: string
    directory?: string
  }
  scripts?: Record<string, string>
  config?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  bundledDependencies?: string[]
  engines?: Record<string, string>
  os?: string[]
  cpu?: string[]
}

export class PackageJson extends JSONFile<Package> {
  static create(path: string): PackageJson {
    return new PackageJson(path)
  }
}
