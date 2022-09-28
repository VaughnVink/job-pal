import feathers from '@feathersjs/feathers'
import LocalService from './LocalService'

/**
 * API models a mocked FeathersJS REST API, with a couple of lines of code this could be turned into a client for a FeathersJS NodeJS server.
 * Right now it acts as both Server + Client, but Client-only mode is possbile too.
 */
export default class Api {
  constructor () {
    this._feathersApp = feathers()
    this._feathersApp.store = {}
    const mockedServices = [
      'jobs', 'clients', 'notes'
    ]
    this.createMockServices(mockedServices)
  }

  createMockServices (pathList) {
    for (const path of pathList) {
      this._feathersApp.use('/' + path, new LocalService(path, this._feathersApp))
    }
  }

  /**
   * Generates some clients, jobs and notes for the in-memory data store.
   */
  async generateMockData () {
    const steve = await this.service('clients').create({
      name: 'Steve McSteve',
      address: '5/24 Main St, Auckland 1010, New Zealand',
      phoneNumber: '+64123456789',
      email: 'steve@gmail.com'
    })
    const maria = await this.service('clients').create({
      name: 'Maria Windsor',
      address: '5/24 Royal Rd, Auckland 1010, New Zealand',
      phoneNumber: '+64123450988',
      email: 'maria@gmail.com'
    })
    const stevesPlumbingJob = await this.service('jobs').create({
      clientId: steve._id,
      identifier: 1,
      name: 'Fix steve`s plumbing.',
      status: 'scheduled'
    })
    await this.service('notes').create({
      jobId: stevesPlumbingJob._id,
      description: 'This guys plumbing is really a mess, I cannot understand how this could be done in only one visit.'
    })
    await this.service('jobs').create({
      clientId: steve._id,
      identifier: 2,
      name: 'Water the garden.',
      status: 'active'
    })
    await this.service('jobs').create({
      clientId: maria._id,
      identifier: 3,
      name: 'Water the garden.',
      status: 'active'
    })
  }

  service (name) {
    return this._feathersApp.service(name)
  }
}
