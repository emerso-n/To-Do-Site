import { CreateTask } from './create'
import './css/style.css'
import './css/normalize.css'
import './css/base.css'

function guidGenerator () {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
  )
}

const tasksObject = {}

const priorityLevel = { none: 'none', low: 'low', medium: 'medium', high: 'high' }

class Task {
  constructor (name, desc, date, priority) {
    this.ID = guidGenerator()
    this.name = name
    this.desc = desc
    this.date = date
    this.priority = priority
    this.div = CreateTask(this.ID, name, desc, date, priority)
    tasksObject[this.ID] = this
  }

  Delete () {
    this.div.remove()
  }
}

export const GetName = (id) => {
  return tasksObject[id].name
}
export const GetDescription = (id) => {
  return tasksObject[id].desc
}
export const GetDate = (id) => {
  return tasksObject[id].date
}
export const GetPriority = (id) => {
  return tasksObject[id].priority
}

const task = new Task('Task Name Test', 'This is the task description')
const task2 = new Task('task 2 for testing', 'This is another description for task 2\'s')
console.log(tasksObject)
