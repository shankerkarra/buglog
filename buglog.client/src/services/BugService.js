import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getAll() {
    debugger
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
    debugger
    const res = await api.post('api/bugs', body)
    // logger.log('Added A project : ', res.data)
    AppState.bugs.push(res.data)
    return res.data.id
  }
}
export const bugService = new BugService()
