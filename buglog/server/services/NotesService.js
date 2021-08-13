import { BadRequest } from '../utils/Errors'
import { dbContext } from '../db/DbContext'

class NotesService {
  // To find Single  Notes
  async getById(id) {
    const note = await dbContext.Notes.findById(id)
    if (!note) {
      throw new BadRequest('Invalid ID')
    }
    return note
  }

  // To find all notes by BugID
  async getByBugId(bugid) {
    const note = await dbContext.Notes.findById(bugid)
    if (!note) {
      throw new BadRequest('Invalid Bug ID')
    }
    return note
  }

  // to create a Note
  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note._id).populate('creator', 'name picture')
  }

  // To delete a Note
  async destroy(id, user) {
    const note = await this.getById(id)
    if (user.id === note.creatorId.toString()) {
      await this.getById(id)
      return await dbContext.Notes.findByIdAndDelete(id)
    }
  }
}

export const notesService = new NotesService()
