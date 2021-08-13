import { dbContext } from '../db/DbContext'

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query).populate('creator', 'name picture')
  }

  // To find Single  Notes
  async getById(id) {
    const bug = await dbContext.Bugs.findById(id)
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
    const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!bug) {
      throw new BadRequest('Invalid Project ID')
    }
    return bug
  }
}

export const bugsService = new BugsService()
