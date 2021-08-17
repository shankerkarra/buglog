import { BadRequest, Forbidden } from '../utils/Errors'
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
  async getNotesByBugId(bugid) {
    const note = await dbContext.Notes.find({ bugId: bugid }).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Bug ID')
    }
    return note
  }

  // to create a Note
  async create(body) {
    // debugger
    // validate if user / closed or not ( Mick suggestion)
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note.id).populate('creator', 'name picture')
  }

  async updateNote(body) {
    // validate if user / closed or not ( Mick suggestion)

    // const note = await dbContext.Notes.getById(body.id)
    // if (note.creatorId === note.creatorId.toString()) {
    //   const unote = await dbContext.Notes.findByIdAndUpdate(body.id, body)
    //   if (!unote) {
    //     throw new BadRequest('Invalid Note ID')
    //   }
    //   return note
    // }
    const note = await this.getById(body.id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    if (note.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your Bug')
    }
    return await dbContext.Notes.findByIdAndUpdate(body.id, body)
  }

  // To delete a Note
  async destroy(id, user) {
    const note = await this.getById(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    if (note.creatorId.toString() !== user.id) {
      throw new Forbidden('This is not your Bug')
    }
    return await dbContext.Notes.findByIdAndDelete(id)
  }
  // const note = await this.getById(id)
  // if (user.id === note.creatorId.toString()) {
  //   // await this.getById(id)
  //   return await dbContext.Notes.findByIdAndDelete(id)
  // }
}

export const notesService = new NotesService()
