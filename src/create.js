import { GetDescription, GetName } from '.'

function CreateElement (parent, { type = 'div', classList = '', id = '', innerHTML = '' }) {
  const element = document.createElement(type)

  if (classList) element.classList = classList
  if (id) element.id = id
  if (innerHTML) element.innerHTML = innerHTML

  parent.appendChild(element)
  return element
}
function CreateInput (parent, { inputType, name, id }) {
  const input = document.createElement('input')

  input.type = inputType
  input.name = name
  input.id = id

  parent.appendChild(input)
  return input
}
function CreateLabel (parent, { _for, innerHTML }) {
  const label = document.createElement('label')
  label.htmlFor = _for
  label.innerHTML = innerHTML

  parent.appendChild(label)
  return label
}

// const pagecon = CreateElement(document.body, { id: 'page_con' })
// const sidebar = CreateElement(pagecon, { id: 'sidebar_con' })
// CreateElement(sidebar, { id: 'logo', innerHTML: 'SideQuest' })
// const tasksview = CreateElement(pagecon, { id: 'tasks_view' })
// tasksview.onclick = () => { if (!descbox.classList.contains('hide')) hideToggle(descbox) }
// const taskscon = CreateElement(tasksview, { id: 'tasks_con' })
const taskscon = document.getElementById('tasks_con')

// const descpopup = CreateElement(tasksview, { id: 'desc-popup', classList: 'hide' })
const descpopup = document.getElementById('desc-popup')

// const desccon = CreateElement(tasksview, { id: 'desc_con' })
// const descbox = CreateElement(desccon, { id: 'desc-box', classList: 'hide' })
const descbox = document.getElementById('desc-box')
// const descboxname = CreateElement(descbox, { id: 'desc-box-name' })
const descboxname = document.getElementById('desc-box-name')
// const descboxdesc = CreateElement(descbox, { id: 'desc-box-desc' })
const descboxdesc = document.getElementById('desc-box-desc')
// const descboxdate = CreateElement(descbox, { id: 'desc-box-date' })
// const descboxpriority = CreateElement(descbox, { id: 'desc-box-priority' })

// const taskEntry_Con = CreateElement(tasksview, { id: 'task-entry_con' })
// const taskEntryNameLabel = CreateLabel(taskEntry_Con, { _for: 'task-entry-name', innerHTML: 'Name' })
// const taskEntryNameInput = CreateInput(taskEntry_Con, { inputType: 'text', name: 'task-entry-name', id: 'task-entry-name' })
// const taskEntryDescLabel = CreateLabel(taskEntry_Con, { _for: 'task-entry-desc', innerHTML: 'Description' })
// const taskEntryDescInput = CreateInput(taskEntry_Con, { inputType: 'textarea', name: 'task-entry-desc', id: 'task-entry-desc' })
// const taskEntryDueDateLabel = CreateLabel(taskEntry_Con, { _for: 'task-entry-date', innerHTML: 'Due Date' })
// const taskEntryDueDateInput = CreateInput(taskEntry_Con, { inputType: 'date', name: 'task-entry-date', id: 'task-entry-date' })

// const use = document.createElementNS('http://www.w3.org/2000/svg', 'use') //idk if this is necessary but svgs apparently use a different namespace (NS)
const descicon = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" width="100%" height="100%" viewBox="0 0 256 256"><path class="desc-icon" d="M240.07 21.17C240.07 9.486 230.584 0 218.9 0H21.17C9.487 0 0 9.486 0 21.17v9.294c0 11.684 9.487 21.17 21.17 21.17H218.9c11.684 0 21.17-9.486 21.17-21.17V21.17ZM256 123.353c0-11.684-9.485-21.17-21.17-21.17H21.17c-11.684 0-21.17 9.486-21.17 21.17v9.294c0 11.684 9.486 21.17 21.17 21.17h213.66c11.685 0 21.17-9.486 21.17-21.17v-9.294ZM128 225.536c0-11.684-9.486-21.17-21.17-21.17H21.17c-11.684 0-21.17 9.486-21.17 21.17v9.294C0 246.514 9.486 256 21.17 256h85.66c11.684 0 21.17-9.486 21.17-21.17v-9.294Z"/></svg>'

function hideToggle (element) {
  element.classList.toggle('hide')
}

export const CreateTask = (id, name, desc, date, priority) => {
  const task = CreateElement(taskscon, { classList: 'task', id })
  // task name
  CreateElement(task, { classList: 'task-name', innerHTML: name })
  // task desc
  const descbtn = CreateElement(task, { type: 'button', classList: 'task-desc', innerHTML: descicon })
  descbtn.addEventListener('mouseenter', DescPopupMove)
  descbtn.addEventListener('mouseleave', () => hideToggle(descpopup))
  descbtn.addEventListener('click', DescBoxShow)
  // task date
  return task
}

function DescPopupMove (e) {
  descpopup.innerHTML = GetDescription(e.relatedTarget.id)
  const btn = getPopupXY(e.target)
  hideToggle(descpopup) // this has to go before you calculate the div's height or it won't have a height to calculate
  descpopup.style.left = `${btn.x}px`
  descpopup.style.top = `${btn.y - (descpopup.offsetHeight / 2)}px`
  // the popup shouldn't appear if the decbox is open to that task
}

function DescBoxShow (e) {
  // so its really supposed to show the box if its not currently visible
  if (descbox.classList.contains('hide')) hideToggle(descbox)
  // and switch what it says when u click
  const id = e.currentTarget.parentElement.id
  descboxname.innerHTML = GetName(id)
  descboxdesc.innerHTML = GetDescription(id)
  // maybe also do a little animation when it switches that would be good but do it later
  // and then close if you press elsewhere on the page or press the same btn again ig
  event.stopPropagation() // this is maybe scuffed bc it will only stop pressing the btn from closing the window but uh idk deal with it later ig llooool
}

function getPopupXY (element) {
  const el = element.getBoundingClientRect()
  const x = el.right + element.offsetHeight / 2
  const y = (el.top + el.bottom) / 2
  return { x, y }
}
