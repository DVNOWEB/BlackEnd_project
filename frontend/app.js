// define port
const PORT = 3000

// API key

const CASE_URL = `http://localhost:3000/api/cases/`

const email = document.querySelector('#email_input')
const subject = document.querySelector('#subject_input')
const message = document.querySelector('#message_input')
const form = document.querySelector('#task_form')
const container = document.querySelector('.case_container')

const cases = []
let newPost = {}
form.addEventListener('submit', (e) => {
  e.preventDefault()
  newPost = {
    email: email.value,
    subject: subject.value,
    message: message.value,
  }

  console.log(JSON.stringify(newPost))

  postCase()
})

const postCase = () => {
  return fetch(CASE_URL, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res)
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((data) => {
      console.log(data)
      form.reset()

      // Add the newly created case to the cases array
      cases.unshift(data)

      container.innerHTML = ''
      cases.forEach((element) => {
        caseList(
          element.subject,
          element.email,
          element.message,
          element.createdAt,
          element._id,
          element.status
        )
      })
    })
    .catch((err) => console.log(err))
}


const getCase = () => {
  return fetch(CASE_URL)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        cases.push(element)
      })
      cases.sort(function (a, b) {
        if (a.created < b.created) return -1
        if (a.created > b.created) return 1
        return 0
      })
      cases.reverse()
      console.log(cases)
      cases.forEach((element) => {
        caseList(
          element.subject,
          element.email,
          element.message,
          element.createdAt,
          element._id,
          element.status
        )
      })

      return cases
    })
}

const caseList = (subject, email, message, createdAt, id, statusId) => {
  const data = new Date(createdAt).toLocaleString()
  
  // Create the container element
  const caseContainer = document.createElement('div')
  caseContainer.classList.add('user', 'user_dark')

  // Create the inline element
  const inlineContainer = document.createElement('div')
  inlineContainer.classList.add('inline')

  // Create the statusInfo element
  const statusInfo = document.createElement('div')
  statusInfo.classList.add('statusInfo')

  // Create the status span elements
  const statusCompleted = document.createElement('span')
  statusCompleted.textContent = 'Finished'

  const statusOngoing = document.createElement('span')
  statusOngoing.textContent = 'Ongoing'

  const statusNotStarted = document.createElement('span')
  statusNotStarted.textContent = 'Not Started'

  // Add the status span elements to the statusInfo element
  statusInfo.appendChild(statusCompleted)
  statusInfo.appendChild(statusOngoing)
  statusInfo.appendChild(statusNotStarted)

  // Add the appropriate class to the status span element based on the statusId
  if (statusId === 3) {
    statusCompleted.classList.add('green')
  } else if (statusId === 2) {
    statusOngoing.classList.add('orange')
  } else if (statusId === 1) {
    statusNotStarted.classList.add('red')
  }

  // Create the time_add element
  const timeAdd = document.createElement('span')
  timeAdd.classList.add('time_add')
  // timeAdd.textContent = time.replace('T', ' ').substring(0, 16)
  timeAdd.textContent = data
  // createdAt.replace('T', ' ').substring(0, 16)

  // Append the statusInfo and time_add elements to the inline element
  inlineContainer.appendChild(statusInfo)
  inlineContainer.appendChild(timeAdd)


  // Append the inline element to the caseContainer element
  caseContainer.appendChild(inlineContainer)

  // Create the subject, email, and message elements
  const subjectEl = document.createElement('p')
  subjectEl.classList.add('user_subject')
  subjectEl.textContent = subject

  const emailEl = document.createElement('p')
  emailEl.classList.add('user_email')
  emailEl.textContent = email

  const messageEl = document.createElement('p')
  messageEl.classList.add('user_message')
  messageEl.textContent = message

  // Create the "Add comment" link
  const addCommentLink = document.createElement('a')
  addCommentLink.href = `details.html?id=${id}`
  addCommentLink.classList.add('show_modal')
  addCommentLink.textContent = 'Add comment'

  caseContainer.appendChild(inlineContainer)
  caseContainer.appendChild(subjectEl)
  caseContainer.appendChild(emailEl)
  caseContainer.appendChild(messageEl)
  caseContainer.appendChild(addCommentLink)

  // Add the caseContainer element to the container element
  container.appendChild(caseContainer)
}
getCase()

const filterCases = () => {
  const filterValue = document.querySelector('#filter').value.toLowerCase()
  const filteredCases = cases.filter(
    (caseItem) =>
      (caseItem.subject &&
        caseItem.subject.toLowerCase().includes(filterValue)) ||
      (caseItem.email && caseItem.email.toLowerCase().includes(filterValue)) ||
      (caseItem.message && caseItem.message.toLowerCase().includes(filterValue))
  )
  container.innerHTML = '' // Clear the container element
  filteredCases.forEach((element) => {
    caseList(
      element.subject,
      element.email,
      element.message,
      element.createdAt,
      element._id,
      element.status
    )
  })
}


document.querySelector('#filter').addEventListener('input', filterCases)
