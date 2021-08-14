import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      //    .get('', this.getAll)
      .get('/:id', this.getNoteById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  // POST: 'api/notes': Adds a new note to the bug.
  // DELETE: 'api/notes/:id': Deletes note.

  async getNoteById(req, res, next) {
    try {
      const note = await notesService.getById({ creatorId: req.userInfo.id })
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      // req.body.bugId = req.bugId
      const note = await notesService.create(req.body)
      res.send(note)
      // res.send(req.body)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const user = req.userInfo
      await notesService.destroy(req.params.id, user)
      res.send({ message: 'That Note has been Deleted!' })
    } catch (error) {
      next(error)
    }
  }
}
