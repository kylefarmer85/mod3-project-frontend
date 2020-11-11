function main() {
  fetchPosts()
  createPostFormEventListener()
  createEditPostFormEventListener()
  // fetchUser()
  // hideForm() 
  userLogin()
  toggleLogin()
  togglePostForm()

}

let currentPosts = []
let currentUser;

function ce(element){
  return document.createElement(element)
}

function qs(selector){
  return document.querySelector(selector)
}


const USERS_URL = "http://localhost:3000/api/v1/users"
const POSTS_URL = "http://localhost:3000/api/v1/posts"
const COMMENTS_URL = "http://localhost:3000/api/v1/comments"
const postForm = qs('.post-form')
const editPostForm = qs('.edit-post-form')
const postsContainer = qs('.posts-container')
const postFormContainer = qs('.post-form-container')

const usersContainer = qs('.users-container')
const userLoginForm = qs('.user-login')
const showContainer = qs('.show-container')
const loginContainer = qs('.login-container')
const showPostContainer = qs('.show-post-container')


function userLogin() {

  userLoginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch (USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        email: e.target[1].value,
        profile_pic: e.target[2].value

      })
    })
    .then(resp => resp.json())
    .then(loggedInUser => currentUser = loggedInUser)
    //assigns user to currentUser
    e.target.reset()
    userLoginForm.style.display = "none"
  })
}


function toggleLogin() {

  const loginNav = qs('#login-nav')
  loginContainer.style.display = "none"
  loginNav.addEventListener("click", () => {
    loginContainer.style.display = "block"
    postFormContainer.style.display = "none"
    showPostContainer.style.display = "none"
  })  
}

function togglePostForm() {
  
  const postFormNav = qs('#new-post-nav')
  postFormContainer.style.display = "none"

  postFormNav.addEventListener("click", () => {
    loginContainer.style.display = "none"
    showPostContainer.style.display = "none"
    postFormContainer.style.display = "block"
  })
}


function fetchPosts() {
  fetch(POSTS_URL)
  .then(resp => resp.json())
  .then(posts => posts.forEach(renderPost))
}

function renderPost(post) {
  currentPosts.push(post)
    
  const postDiv = ce('div')
  postDiv.innerHTML = ''
  postDiv.className = "card"

  const titleH3 = ce('h3')
  titleH3.innerText = post.title

  const postImage = ce('img')
  postImage.src = post.image_url

  const author = ce('p')
  author.innerText = post.author

  const upVoteBtn = ce("button")
  upVoteBtn.className = "like-btn"
  upVoteBtn.setAttribute("data-id", post.id)
  upVoteBtn.innerText = `${post.upvote} Up-vote`
  upVoteBtn.value = post.upvote

// const editBtn = ce("button")
  // editBtn.innerText = "Edit Post"
 
  // editBtn.addEventListener('click', () => {
  //   // if (currentUser.id === post.user_id)
  //     editPostForm[0].value = post.title
  //     editPostForm[1].value = post.image_url
  //     editPostForm[2].value = post.content
  //     editPostForm[3].value = post.github_url
  //     editPostForm[4].value = post.author
  //     editPostForm[5].value = post.user_id
  //     editPostForm[6].value = post.id
  //   })
  
  postDiv.append(titleH3, postImage, author, upVoteBtn)
  postsContainer.append(postDiv)

// add event listener to card to append post to show-container
  postDiv.addEventListener("click", () => {
    loginContainer.style.display = "none"
    postFormContainer.style.display = "none"
    showPostContainer.style.display = "block"
    showPostContainer.innerHTML = 
    `<h1>${post.title}</h1>
    <img src=${post.image_url}/>
    <p>${post.content}</p>
    <ul id=comment>
    </ul>`

    post.comments.forEach(renderComment) 

    function renderComment(comment) {
      const commentLi = ce('li')
      const commentUl = document.getElementById(`comment`)
      commentLi.innerHTML = 
      `<p>${comment.text}</p>
      <p>${comment.author}</p>`
      commentUl.append(commentLi)
    }
  })
}

postsContainer.addEventListener('click', (e) => {
  if (e.target.className === 'like-btn') {
    handleUpVotes(e.target)
  }
})

const handleUpVotes = (target) => {
  
  const postId = target.dataset.id
  const upVoteCount = parseInt(target.value) + 1

  const upVoteData = {
    upvote: upVoteCount 
  }

  const reqObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(upVoteData)
  }

  fetch(`http://localhost:3000/api/v1/posts/${postId}`, reqObj)
  .then(resp => resp.json())
  .then(updatedPost => {
    target.innerText = `${updatedPost.upvote} Up-vote`
    target.value++  
  })
}


function createPostFormEventListener() {

  postForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch (POSTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: e.target[0].value, 
        image_url: e.target[1].value,
        content: e.target[2].value,
        github_url: e.target[3].value,
        author: "this will be currentUser.username",       
        user_id: 1,
        upvote: 0,
      })
    })
    .then(resp => resp.json())
    .then(newPost => renderPost(newPost))

    e.target.reset()
  })  
}


function createEditPostFormEventListener() {

  editPostForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const postId = parseInt(e.target[6].value)

    fetch (`${POSTS_URL}/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: e.target[0].value,
        image_url: e.target[1].value,
        content: e.target[2].value,
        github_url: e.target[3].value,
        author: e.target[4].value,
        user_id: e.target[5].value,
        id: e.target[6].value
      })
    })
    .then(resp => resp.json())
    .then(console.log)

    e.target.reset()
  })
}



main()




// function fetchUser() {
//   fetch(USERS_URL)
//   .then(resp => resp.json())
//   .then(users => 
//     users.forEach(user => renderUser(user))
// )}

// function renderUser(user) {
//   currentuser = user
//   const userDiv = ce('div')

//   const userName = ce('p')
//   userName.innerText = user.userName

//   const profilePic = ce('img')
//   profilePic.src = user.profile_pic

//   const email = ce('h4')
//   email.innerText = user.email

//   const space = ce('br')

//   const editBtn = ce('button')
//   editBtn.className = "user-edit-btn"
//   editBtn.innerText = "Edit"

//   editBtn.addEventListener("click", (e) => {
  

//     const email = e.target.previousElementSibling.previousElementSibling.innerText

//     // profile_pic
//     const userImage = e.target.previousElementSibling.previousElementSibling.previousElementSibling.src

//     // profileName is the user name 
//     const profileName = e.target.parentElement.firstElementChild.innerText

    
//   })

//   userDiv.append(userName, profilePic, email, space, editBtn)
//   usersContainer.append(userDiv)

// }


// function hideForm() {
//   let addUser = false;
//   const newUserBtn = document.querySelector("#new-user-btn");
//   const userFormContainer = document.querySelector(".container");
//   newUserBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addUser = !addUser;
//     if (addUser) {
//       userFormContainer.style.display = "none";
//     } else {
//       userFormContainer.style.display = "block";
//     }
//   });
// }
