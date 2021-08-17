import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { AppState } from '../AppState.js'
import Pop from '../utils/Notifier'
import { accountService } from './AccountService'

class NoteService {
  async getById(id) {
    const res = await api.get('api/notes/' + id)
    //   logger.log('fetched single Note', res.data)
    AppState.notes = res.data
  }

  async getNotesByBugId(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    //   logger.log('fetched Notes by BugID', res.data)
    AppState.notes = res.data
  }

  async create(body) {
    //    logger.log(body)
    const res = await api.post('api/notes', body)
    //   logger.log('Created Note', res.data)
    AppState.notes.push(res.data)
  }

  async update(id, body) {
    const note = await noteService.getById(id)
    if (AppState.account.id === note.creatorId) {
    // if (user.id === note.creatorId.toString()) {
      if (await Pop.confirm()) {
        const res = await api.put('api/notes/' + id, body)
        //       logger.log('Udated Notes', res.data)
        AppState.notes = res.data
      }
    }
  }

  async destroy(id) {
    if (await Pop.confirm()) {
      // debugger
      // const note = await noteService.getById(id)
      // if (AppState.user.id === note.creatorId.toString()) {

      // if (AppState.account.id === note.creatorId) {
      await api.delete('api/notes/' + id)
      AppState.notes = AppState.notes.filter(n => n.id !== id)
      //       logger.log('Deleted Successfully')
      // }
    }
  }
}

export const noteService = new NoteService()
