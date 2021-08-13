import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Note = new Schema(
  {
    body: { type: String, required: true },
    bugId: { type: Object },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Note.virtual('bug', {
  localField: 'bugId',
  ref: 'bug',
  foreignField: '_id',
  justOne: true
})

export default Note
