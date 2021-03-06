import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Pop from '../utils/Notifier'
class BugService {
  async getAll() {
    const res = await api.get('api/bugs')
    //   logger.log('All the bugs : ', res.data)
    AppState.bugs = res.data
  }

  async getById(id) {
    const res = await api.get('api/bugs/' + id)
    //  logger.log('A single bug : ', res.data)
    AppState.activebug = res.data
  }

  async getNotesByBugId(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    //   logger.log('fetched Notes by Bug Id', res.data)
    AppState.notes = res.data
  }

  async create(body) {
    // debugger
    const res = await api.post('api/bugs/', body)
    //  logger.log('Added A Bug : ', res.data)
    AppState.bugs.push(res.data)
    return res.data.id
  }

  async update(id, body) {
    // const bug = await this.getById(id)
    // if (user.id === bug.creatorId.toString()) {
    // debugger
    if (AppState.account.id === AppState.activebug.creatorId) {
      const res = await api.put('api/bugs/' + id, body)
      //    logger.log('Updated Bug', res.data)
      //    AppState.bugs = res.data
      // }
    }
  }

  async destroy(id) {
    // debugger
    if (AppState.account.id === AppState.activebug.creatorId) {
      await api.delete('api/bugs/' + id)
      AppState.bugs = AppState.bugs.filter(n => n.id !== id)
      await bugService.getById(id)
    // logger.log('Deleted Successfully')
    }
  }
}
export const bugService = new BugService()
