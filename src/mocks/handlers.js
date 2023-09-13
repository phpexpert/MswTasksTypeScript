import { db } from './db'

export const handlers = [
  // Create REST API request handlers based on
  // the "task" database model.
  ...db.task.toHandlers('rest')
]
