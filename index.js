function main() {
<<<<<<< HEAD
  // fetchPosts()
  fetchUser()
  hideForm()
=======
  fetchPosts()
  createPostFormEventListener()
  createEditPostFormEventListener()

>>>>>>> 1def0106b482a3a3510bfcd2414f5f51296cb649
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
<<<<<<< HEAD
const usersContainer = qs('.users-container')
=======
const editPostForm = qs('.edit-post-form')
const userLogin = qs('.user-form')
>>>>>>> 1def0106b482a3a3510bfcd2414f5f51296cb649
const postsContainer = qs('.posts-container')
const postFormContainer = qs('.post-form-container')



function fetchUser() {
  fetch(USERS_URL)
  .then(resp => resp.json())
  .then(users => console.log(users)
    // users.forEach(user => console.log(user))
)}

function renderUser(user) {
  currentuser = user
  const userDiv = ce('div')
  userDiv.className = "card"
  const userName = ce('h3')
  userName.innerText = user.userName

  const profilePic = ce('img')
  profilePic.src = user.profile_pic

  const email = ce('p')
  email.innerText = user.email

  const editBtn = ce('button')
  editBtn.innerText = "Edit"

  editBtn.addEventListener("click", (e) => {
    
    debugger

    editForm[0].value = e.target.parentElement.parentElement.children[0].innerText
    
    editForm[1].value = e.target.parentElement.parentElement.children[1].innerText
  
    editForm[2].value = e.target.parentElement.parentElement.children[2].innerText
  })

  userDiv.append(userName, profilePic, email)
  usersContainer.append(userDiv)

}

function hideForm() {
  let addUser = false;
  const newUserBtn = document.querySelector("#new-user-btn");
  const userFormContainer = document.querySelector(".container");
  newUserBtn.addEventListener("click", () => {
    // hide & seek with the form
    addUser = !addUser;
    if (addUser) {
      userFormContainer.style.display = "none";
    } else {
      userFormContainer.style.display = "block";
    }
  });
}

  
  
  



function fetchPosts() {
  fetch(POSTS_URL)
  .then(resp => resp.json())
  .then(posts => posts.forEach(renderPost))
}

function renderPost(post) {
  currentPosts.push(post)

  const postDiv = ce('div')
  postDiv.className = "card"
  const userName = ce('h3')
  const postImage = ce('img')
  const author = ce('p')

  userName.innerText = post.title
  postImage.src = post.image_url

  author.innerText = post.author

<<<<<<< HEAD
  postDiv.append(userName, postImage, author)
  postsContainer.append(postDiv)

}
  
//add delete btn dataset.id, add edit btn make here
//create like btn, innerText = post.upvote
//event listener for editbtn inside of render post. post.title, add attribute data-id post.id, post.image_url

// const hiddenInput = ce("input")
// hiddenInput.setAttribute("type", "hidden")
// hiddenInput.value = post.id
// hiddenInput.name = "id"

// editForm.append(hiddenInput)

// const editBtn = ce("button")
// editBtn.innerText = "Edit Post"

// editBtn.eventListner('click' (e) => {
//   if (currentUser.id === post.user_id)
//   // submitBtn.className = "Edit"
//   postForm[0].value = post.title
//   postForm[1].value = post.image_url
//   postForm[2].value = post.content
//   postForm[3].value = post.user_id
//   postForm[4].value = 
// })


// postForm.addEventListener('submit' , )
// // if submitBtn.className = "edit"
// currentPosts.forEach(post => {
//   if post.id === e.target[3].value
//     fetch PATCH
// //     submitBtn.clssName = "post"
// // if submitBtn.className = "post"
//   else
//     fetch POST
=======
  const editBtn = ce("button")
  editBtn.innerText = "Edit Post"

  postDiv.append(titleH3, postImage, author, editBtn)
  postsContainer.append(postDiv)


  editBtn.addEventListener('click', () => {
  // if (currentUser.id === post.user_id)
    editPostForm[0].value = post.title
    editPostForm[1].value = post.image_url
    editPostForm[2].value = post.content
    editPostForm[3].value = post.github_url
    editPostForm[4].value = post.author
    editPostForm[5].value = post.user_id
    editPostForm[6].value = post.id
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
        upvote: 0
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



>>>>>>> 1def0106b482a3a3510bfcd2414f5f51296cb649
main()