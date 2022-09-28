import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export default class LocalService {
  constructor (path, app) {
    app.store[path] = []
    this.store = app.store[path]
  }

  async find (params) {
    if (params.query) {
      const filtered = this.store.filter((entity) => {
        for (const [key, value] of Object.entries(params.query)) {
          if (entity[key] !== value) {
            return false
          }
        }
        return true
      })
      return _.cloneDeep(filtered)
    }
    return _.cloneDeep(this.store)
  }

  async get (id, params) {
    const found = this.store.find((entity) => entity._id === id)
    if (!found) {
      throw new Error('Not found')
    }
    return _.cloneDeep(found)
  }

  async create (data, params) {
    const base = {
      _id: uuidv4(),
      createdAt: new Date().toISOString(),
      _v: 0
    }
    const entity = _.cloneDeep({ ...data, ...base })
    this.store.push(entity)
    return _.cloneDeep(entity)
  }

  async update (id, data, params) {
    const indexToEdit = this.store.findIndex((entity) => entity._id === id)
    if (indexToEdit === -1) {
      throw new Error('Not found')
    }
    this.store[indexToEdit] = _.cloneDeep(data)
    return _.cloneDeep(this.store[indexToEdit])
  }

  // Skipped as not required for subsequent services.
  async patch (id, data, params) {
    throw new Error('Not implemented')
  }

  async remove (id, params) {
    const indexToRemove = this.store.findIndex((entity) => entity._id === id)
    if (indexToRemove === -1) {
      throw new Error('Not found')
    }
    return this.store.splice(indexToRemove, 1)[0]
  }
}
