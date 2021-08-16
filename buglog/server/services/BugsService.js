import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

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
    const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body)
    if (!bug) {
      throw new BadRequest('Invalid Bug ID')
    }
    return bug
  }

  // findOneAndUpdate
  // findByIdAndUpdate
  // AssertionError: The bug was closed through a PUT request, this should only be possible through a DELETE request: expected true to deeply equal false
  async delete(body) {
    const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!bug) {
      throw new BadRequest('Invalid Bug ID')
    }
    return bug
  }
}

export const bugsService = new BugsService()
