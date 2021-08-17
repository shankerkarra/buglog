import { dbContext } from '../db/DbContext'
import { AccountSchema } from '../models/Account'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator', 'name picture')
  }

  // To find Single  Notes
  async getById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid ID')
    }
    return bug
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator', 'name picture')
  }

  async updateBug(body) {
    // validate if user / closed or not ( Mick suggestion)
    const note = await this.getById(body.id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }

    if (note.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your Bug')
    }
    if (note.closed === true) {
      throw new BadRequest('Invalid Bug ID')
    }
    const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body)
    return bug
  }

  // findOneAndUpdate
  // findByIdAndUpdate
  // AssertionError: The bug was closed through a PUT request, this should only be possible through a DELETE request: expected true to deeply equal false
  async delete(body) {
    // validate if user / closed or not ( Mick suggestion)
    const note = await this.getById(body.id)
    if (!note) { throw new BadRequest('Invalid Id') }

    if (note.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your Bug')
    }
    if (note.closed === true) { throw new BadRequest('Invalid Bug ID') }
    const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    return bug
  }
}

export const bugsService = new BugsService()
