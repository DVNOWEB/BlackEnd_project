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
  caseId: id,
  email: email,
  message: document.querySelector('.messageInput').value,
  createdAt: new Date(),
}
let newStatus = {}
let statusId = null

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
    createdAt: new Date(),
    statusId: statusId,
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
      notStarted.checked = true
      return
    case 2:
      ongoing.checked = true
      return
    case 3:
      finished.checked = true
      return
    default:
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

    const email = document.createElement('span')
    email.innerText = comment.email
    commentDiv.appendChild(email)

    const message = document.createElement('p')
    message.innerText = comment.message
    commentDiv.appendChild(message)

    if (comment.createdAt) {
      const time = document.createElement('span')
      time.innerText = new Date(comment.createdAt).toLocaleString()
      commentDiv.appendChild(time)
    }

    commentList.appendChild(commentDiv)
  })
}

// Call the function after the element is created
window.addEventListener('load', () => {
  const comments = [
    /* Your comments data */
  ]
  displayComments(comments)
})

const getCase = () => {
  return fetch(CASE_URL + id)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      email = data.email
      caseId = data.id
      if (data.status) {
        setStatus(data.status._id)
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
        setStatus(data.statusId._id)
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
  return fetch(CASE_URL + _id + '/status', {
    method: 'PUT',
    body: JSON.stringify({
      id: _id,
      statusId: statusId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res)

      if (data.statusId) {
        setStatus(data.statusId._id)
      }
      getCase()
    })
    .catch((err) => console.log(err))
}
getCase().then((sortedComments) => {
  comments = sortedComments
  displayComments(comments)
})



// const id = new URLSearchParams(window.location.search).get('id')
// const CASE_URL = 'http://localhost:8082/api/cases/'
// const COMMENT_URL = '/comments'
// const COMPLETE_URL = CASE_URL + id + COMMENT_URL
// console.log(COMPLETE_URL)
// const wrapper = document.querySelector('.container_details')
// const form = document.querySelector('.userInput')
// const inline = document.querySelector('.inline')
// const time_add = document.querySelector('.time_add')
// const finished = document.querySelector('#green_btn')
// const ongoing = document.querySelector('#orange_btn')
// const notStarted = document.querySelector('#red_btn')
// const email = document.querySelector('#email_input')
// const message = document.querySelector('#message_input')


// const comments = []
// let newComment = {}
// let newStatus = {}
// let caseId = null

// finished.addEventListener('click', (e) => {
//   if (caseId) {
//     putStatus(caseId, 3)
//   }
//   // Put function ta emot(id, 3);
// })

// ongoing.addEventListener('click', (e) => {
//   if (caseId) {
//     putStatus(caseId, 2)
//   }
// })

// notStarted.addEventListener('click', (e) => {
//   if (caseId) {
//     putStatus(caseId, 1)
//   }
// })

// form.addEventListener('submit', (e) => {


//   console.log(JSON.stringify(newComment))
//   document.querySelector('.emailInput').value = ''
//   document.querySelector('.messageInput').value = ''
//   e.preventDefault()

//   postComment()
// })

// // set case status with switch based on status id
// const setStatus = (statusId) => {
//   switch (statusId) {
//     case 1:
//       notStarted.checked = true
//       return

//     case 2:
//       ongoing.checked = true
//       return

//     case 3:
//       finished.checked = true
//       return

//     default:
//       return
//   }
// }

// const getCase = () => {
//   return fetch(CASE_URL + id)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("get data")
//       console.log(data)
//       // let email = data.email
//       // caseId = data._id
//       // caseId = data.id
//       // message = data.message

//       if (data.status) {
//         setStatus(data.status)
//       }

//       // time_add.innerText = data.created.replace('T', ' ').substring(0, 16)

//       const card = document.querySelector('div')

//       const subject = card.querySelector('h2')
//       const _email = document.querySelector('.detailsEmail')
//       const message = document.querySelector('.detailsMessage')
//       subject.innerText = data.subject
//       _email.innerText = data.email
//       message.innerText = data.message

//       data.comments.forEach((element) => {
//         comments.push(element)
//       })
//       comments.sort(function (a, b) {
//         if (a.created > b.created) return -1
//         if (a.created < b.created) return 1
//         return 0
//       })
//       console.log(comments)

//       const commentList = document.querySelector('#commentList')

//       console.log(data.comments.length)
//       commentList.innerHTML = ''
//       for (let i = 0; i < data.comments.length; i++) {
//         const time_add = document.createElement('span')
//         time_add.innerText = comments[i].createdAt
//           .replace('T', ' ')
//           .substring(0, 16)
//         commentList.appendChild(time_add)

//         const email = document.createElement('span')
//         email.innerText = comments[i].email
//         commentList.appendChild(email)

//         const comment = document.createElement('textarea')
//         comment.innerText = comments[i].message
//         comment.readOnly = true
//         commentList.appendChild(comment)
//       }

//       return data
//     })
// }

// const postComment = () => {


//   // newComment = {
//   //   // case: id,
//   //   email: document.querySelector('#email_input'),
//   //   message: document.querySelector('#message_input')
//   //   // status: 
//   // }


// //   return fetch(COMPLETE_URL, {
// //     method: 'POST',
// //     body: JSON.stringify(newComment),
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //   })
// //     .then((res) => {
// //       console.log(res)
// //       getCase()
// //     })
// //     .catch((err) => console.log(err))
// // }

// // Comment post payload - CONTENT TO POST
// const addComment = {
//     email: document.querySelector('#email_input').value,
//     message: document.querySelector('#message_input').value,
// }
// console.log(JSON.stringify(addComment))
// // Options for fetch method
// let commentOptions = {
//   method: "POST",
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
//   body: JSON.stringify(addComment)
// }

//   // Try to add comment
//   try{
//     fetch(COMPLETE_URL, commentOptions)
//     .then((commentRes) => console.log(commentRes))

//     document.querySelector('.messageInput').value = "";
//     document.querySelector('#email_input').value = "";

//     // Reloads the page after the comment to show the comment just added
//     // Remove to see response (reload necessary to see the status change on DOM)
//     // setTimeout(() => {
//     //   window.location.reload();
//     // }, "400")

//     // setTimeout();

//   } 


//   // Catch error - output error message
//   catch(err) {
//     return console.log(err);
//   } 

// }

// const putStatus = (id, status) => {
//   return fetch(CASE_URL + id, {
//     method: 'PUT',
//     body: JSON.stringify({
//       id: _id,
//       statusId: status,
//     }),
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//   })
//     .then((res) => {
//       console.log(res)
//       getCase()
//     })
//     .catch((err) => console.log(err))
// }

finished.addEventListener('click', (e) => {
  if (statusId) {
    statusId = 3 // set the value of statusId to 3 when the user clicks on the finished button
    putStatus(id, statusId)
  }
})

ongoing.addEventListener('click', (e) => {
  if (statusId) {
    statusId = 2 // set the value of statusId to 2 when the user clicks on the ongoing button
    putStatus(id, statusId)
  }
})

notStarted.addEventListener('click', (e) => {
  if (statusId) {
    statusId = 1 // set the value of statusId to 1 when the user clicks on the notStarted button
    putStatus(id, statusId)
  }
})

getCase().then((sortedComments) => {
  comments = sortedComments
  displayComments(comments)
})
