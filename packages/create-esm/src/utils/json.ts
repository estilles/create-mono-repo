import { readFileSync, writeFileSync } from 'node:fs'

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

  load(path?: string) {
    if (typeof path !== 'undefined') {
      this.#path = path
    }

    try {
      const buffer = readFileSync(this.#path)
      this.#config = JSON.parse(buffer.toString())
    } catch {
      throw new Error(`Unable to load ${this.#path}`)
    }

    return this
  }

  save() {
    try {
      writeFileSync(this.#path, JSON.stringify(this.#config, null, 2))
    } catch {
      throw new Error(`Unable to save ${this.#path}`)
    }

    return this
  }

  set(data: Partial<T>) {
    this.#config = {
      ...this.#config,
      ...data,
    }

    return this
  }
}
