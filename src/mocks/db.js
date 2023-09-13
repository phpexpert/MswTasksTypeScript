import { random, datatype } from 'faker'
import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
  // A "task" model that describes what properties
  // each task has.
  task: {
    id: primaryKey(datatype.uuid),
    title: random.words,
    isDone: Boolean
  }
})

// The default tasks created each time you refresh the page.
db.task.create({ title: 'Visit the demo', isDone: true })
db.task.create({ title: 'Explore the sandbox' })
db.task.create({ title: 'Learn about Data' })
db.task.create({ title: 'Install and try it out yourself' })
