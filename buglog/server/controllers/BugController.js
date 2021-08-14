import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getBugById)
      .get('/:id/Notes', this.getNotesByBugId)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  // GET: 'api/bugs': returns a list of all the bugs - Done
  // GET: 'api/bugs/:id': returns a single bug with all it's data - Done
  // POST: 'api/bugs': Creates a new bug - Done
  // GET: 'api/bugs/:id/notes': returns all notes for a given bug id - Done
  // PUT: 'api/bugs/:id': Edits bug(Restricted when the bug is closed) - Done
  // DELETE: api / bugs /: id: Changes status of bug from open to close(Do not allow a bug to be deleted, only change the status of the bug to closed) - Done

  async getAll(req, res, next) {
    try {
      const allbugs = await bugsService.getAll()
      res.send(allbugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugsService.getById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const bug = await notesService.getByBugId(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // debugger
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
      // res.send(req.body)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.updateBug(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      // await bugsService.updateBug(req.body)
      // const bug = await bugsService.updateBug(req.body)
      // res.send(bug)
      await bugsService.delete(req.body)
      res.send({ message: 'That Bug has been closed!' })
    } catch (error) {
      next(error)
    }
  }
}
