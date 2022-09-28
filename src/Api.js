import feathers from '@feathersjs/feathers'
import LocalService from './LocalService'
export default class Api {
  constructor () {
    this._feathersApp = feathers()
    this._feathersApp.store = {}
    const mockedServices = [
      'jobs', 'clients', 'notes'
    ]
    this.createMockServices(mockedServices)
    this.createMockData()
  }

  createMockServices (pathList) {
    for (const path of pathList) {
      this._feathersApp.use('/' + path, new LocalService(path, this._feathersApp))
    }
  }

  async createMockData () {
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
      name: 'Fix steve`s plumbing.',
      status: 'scheduled'
    })
    await this.service('notes').create({
      jobId: stevesPlumbingJob._id,
      description: 'This guys plumbing is really a mess, I cannot understand how this could be done in only one visit.'
    })
    await this.service('jobs').create({
      clientId: steve._id,
      name: 'Water the garden.',
      status: 'active'
    })
    await this.service('jobs').create({
      clientId: maria._id,
      name: 'Water the garden.',
      status: 'active'
    })
  }

  service (name) {
    return this._feathersApp.service(name)
  }
}
