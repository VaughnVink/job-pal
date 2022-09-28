import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

export default class LocalService {
  constructor (path, app) {
    app.store[path] = []
    this.store = app.store[path]
  }

  /**
   * Returns many, see FeathersJS docs for service implementation
   * @param {*} params query, other params.
   * @returns {Array}
   */
  async find (params) {
    // Filtering on service
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
    // Clone deeps are required to keep objects from referencing each other in vue app / API / store.
    return _.cloneDeep(this.store)
  }

  /**
   * Returns one by id, see FeathersJS docs for service implementation
   */
  async get (id, params) {
    const found = this.store.find((entity) => entity._id === id)
    if (!found) {
      throw new Error('Not found')
    }
    return _.cloneDeep(found)
  }

  /**
   * Creates one from data
   * @param {object} data Entity data
   * @param {object} params query, other params.
   * @returns {object}
   */
  async create (data, params) {
    // Add some default properties to every entity.
    const base = {
      _id: uuidv4(),
      createdAt: new Date().toISOString(),
      _v: 0
    }
    const entity = _.cloneDeep({ ...data, ...base })
    this.store.push(entity)
    return _.cloneDeep(entity)
  }

  /**
   * Updates / PUT one from data by id
   * @param {string} id Entity id
   * @param {object} data Entity data
   * @param {object} params query, other params.
   * @returns {object}
   */
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

  /**
   * Remove and entity by id
   * @param {*} id id to remove
   * @param {*} params query, other params.
   * @returns {object}
   */
  async remove (id, params) {
    const indexToRemove = this.store.findIndex((entity) => entity._id === id)
    if (indexToRemove === -1) {
      throw new Error('Not found')
    }
    return this.store.splice(indexToRemove, 1)[0]
  }
}
