// define port
const PORT = 3000

const id = new URLSearchParams(window.location.search).get('id')
const CASE_URL = 'http://localhost:3000/api/cases/'
const COMMENT_URL = '/comments'
const wrapper = document.querySelector('.container_details')
const form = document.querySelector('.userInput')
const inline = document.querySelector('.inline')
const time_add = document.querySelector('.time_add')
const finished = document.querySelector('#green_btn')
const ongoing = document.querySelector('#orange_btn')
const notStarted = document.querySelector('#red_btn')

let comments = []
let email = ''
let newComment = {
  case: id,
  email: email,
  message: document.querySelector('.messageInput').value,
  createdAt: new Date(),
}
let newStatus = {}
// let statusId = null

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = document.querySelector('.emailInput').value.trim() // get email input value and remove whitespace

  if (email.length === 0) {
    // if email is empty, show an error message to the user
    alert('Please enter your email.')
    return
  }

  newComment = {
    caseId: id,
    email: email,
    message: document.querySelector('.messageInput').value,
    // createdAt: new Date(),
    // status: statusId,
  }

  console.log(JSON.stringify(newComment))
  document.querySelector('.emailInput').value = ''
  document.querySelector('.messageInput').value = ''

  postComment(newComment).then((res) => {
    // Add the new comment to the comments array and display the updated comments
    comments.push(newComment)
    sortComments(comments)
    displayComments(comments)
  })
})

// set case status with switch based on status id
const setStatus = (statusId) => {
  switch (statusId) {
    case 1:
      console.log("status id is 1")
      notStarted.checked = true
      return

    case 2:
      console.log("status id is 2")
      ongoing.checked = true
      return

    case 3:
      console.log("status id is 3")
      finished.checked = true
      return

    default:
      console.log("no status id")
      return
  }
}

const sortComments = (comments) => {
  comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

const displayComments = (comments) => {
  const commentList = document.querySelector('#commentList')
  commentList.innerHTML = '' // clear the comment list before adding new comments

  if (!commentList) {
    return
  }

  comments.forEach((comment) => {
    const commentDiv = document.createElement('div')

    const message = document.createElement('p')
    message.innerText = comment.message
    commentDiv.appendChild(message)


    const email = document.createElement('p')
    email.innerText = comment.email
    commentDiv.appendChild(email)


    if (comment.createdAt) {
      const time = document.createElement('span')
      time.innerText = new Date(comment.createdAt).toLocaleString()
      commentDiv.appendChild(time)
    }

    commentList.appendChild(commentDiv)
  })
}

// Call the function after the element is created
// window.addEventListener('load', () => {
//   const comments = [
//     /* Your comments data */
//   ]
//   displayComments(comments)
// })

const getCase = () => {
  return fetch(CASE_URL + id)
    .then((res) => res.json())
    .then((data) => {
      console.log("got case:")
      console.log(data)
      email = data.email
      caseId = data.id
      statusId = data.status

      if (data.status) {
        console.log("case status:")
        console.log(data.status)
        setStatus(data.status)
      }

      const card = document.querySelector('div')

      const subject = card.querySelector('h2')
      const _email = document.querySelector('.detailsEmail')
      const message = document.querySelector('.detailsMessage')
      subject.innerText = data.subject
      _email.innerText = data.email
      message.innerText = data.message

      sortComments(data.comments)
      const sortedComments = [...data.comments] // make a copy of the sorted comments array
      displayComments(sortedComments)

      if (
        sortedComments.length > 0 &&
        sortedComments[sortedComments.length - 1].message
      ) {
        _email.innerText = sortedComments[sortedComments.length - 1].email
      }

      return sortedComments // return the sorted comments array
    })
}

const postComment = (newComment) => {
  return fetch(CASE_URL + id + COMMENT_URL, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json()) // parse the response as JSON
    .then((data) => {
      console.log(data)
      email = data.email
      caseId = data.id
      message = data.message

      if (data.statusId) {
        setStatus(data.statusId)
      }

      const card = document.querySelector('div')

      const subject = card.querySelector('h2')
      const _email = document.querySelector('.detailsEmail')
      const _message = document.querySelector('.detailsMessage')
      subject.innerText = data.subject
      _email.innerText = data.email
      _message.innerText = data.message

      getCase() // refresh the comments section
      comments.push(data.comment) // add the new comment to the comments array
      return data.comment // return the newly created comment
    })
    .catch((err) => console.log(err))
}

const putStatus = (_id, statusId) => {
  return fetch(CASE_URL + _id, {
    method: 'PUT',
    body: JSON.stringify({
      status: statusId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  .then((res) => res.json()) // parse the response as JSON
  .then((data) => {
    // .then((res) => {
      console.log(data)

      if (data.statusId) {
        setStatus(data.statusId)
      }
      getCase()
    })
    .catch((err) => console.log(err))
}

finished.addEventListener('click', (e) => {
  console.log("Change status to finnished")
  console.log("case id")
  console.log(id)
  statusId = 3 // set the value of statusId to 3 when the user clicks on the finished button
  console.log("status id:")
  console.log(statusId)
  putStatus(id, statusId)

})

ongoing.addEventListener('click', (e) => {
  console.log("Change status to ongoing")
  console.log("case id")
  console.log(id)
  statusId = 2 // set the value of statusId to 2 when the user clicks on the ongoing button
  console.log("status id:")
  console.log(statusId)
  putStatus(id, statusId)
})

notStarted.addEventListener('click', (e) => {
  console.log("Change status to not started")
  console.log("case id")
  console.log(id)
  statusId = 1 // set the value of statusId to 1 when the user clicks on the notStarted button
  console.log("status id:")
  console.log(statusId)
  putStatus(id, statusId)

})

getCase().then((sortedComments) => {
  comments = sortedComments
  displayComments(comments)
})
