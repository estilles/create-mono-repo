import { readFile, writeFile } from 'node:fs'
import { ResolveCallback, RejectCallback } from 'src/shared/promiseTypes.js'

export type JSONPrimitive = string | number | boolean | null

export type JSONObject = {
  [key in string]: JSONValue
}

export type JSONArray = Array<JSONValue>

export type JSONValue = JSONPrimitive | JSONObject | JSONArray

export class JSONFile<T> {
  #path: string
  #config: Partial<T> = {}

  constructor(path: string) {
    this.#path = path
  }

  async load(path?: string): Promise<void> {
    if (typeof path !== 'undefined') {
      this.#path = path
    }

    return new Promise<void>(
      (resolve: ResolveCallback<void>, reject: RejectCallback) => {
        readFile(this.#path, (error: NodeJS.ErrnoException, data: Buffer) => {
          if (error) {
            return reject(new Error(`Unable to load ${this.#path}`))
          }
          this.#config = JSON.parse(data.toString())
          resolve()
        })
      },
    )
  }

  async save(): Promise<void> {
    return new Promise<void>(
      (resolve: ResolveCallback<void>, reject: RejectCallback) => {
        writeFile(
          this.#path,
          JSON.stringify(this.#config, null, 2),
          (error: NodeJS.ErrnoException) => {
            if (error) {
              return reject(new Error(`Unable to load ${this.#path}`))
            }
            resolve()
          },
        )
      },
    )
  }

  set(data: Partial<T>) {
    this.#config = {
      ...this.#config,
      ...data,
    }

    return this
  }
}
