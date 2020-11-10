function main() {
  fetchPosts()
  createPostFormEventListener()
  createEditPostFormEventListener()

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
const userLogin = qs('.user-form')
const postsContainer = qs('.posts-container')
const postFormContainer = qs('.post-form-container')
















function fetchPosts() {
  fetch(POSTS_URL)
  .then(resp => resp.json())
  .then(posts => posts.forEach(renderPost))
}

function renderPost(post) {
  currentPosts.push(post)

  const postDiv = ce('div')
  postDiv.className = "card"
  const titleH3 = ce('h3')
  const postImage = ce('img')
  const author = ce('p')

  titleH3.innerText = post.title
  postImage.src = post.image_url

  author.innerText = post.author

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



main()