import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getAll() {
    const res = await api.get('api/bugs')
    logger.log('All the bugs : ', res.data)
    AppState.bugs = res.data
  }

  async getById(id) {
    const res = await api.get('api/bugs/' + id)
    // logger.log('A single bug : ', res.data)
    AppState.activebug = res.data
  }

  async create(body) {
    // debugger
    const res = await api.post('api/bugs/', body)
    // logger.log('Added A project : ', res.data)
    AppState.bugs.push(res.data)
    return res.data.id
  }

  async update(id, body) {
    const res = await api.put('api/bugs/' + id, body)
    logger.log('Udated Bug', res.data)
    AppState.bugs = res.data
  }

  async destroy(id) {
    await api.delete('api/bugs/' + id)
    AppState.bugs = AppState.bugs.filter(n => n.id !== id)
    logger.log('Deleted Successfully')
  }
}
export const bugService = new BugService()
