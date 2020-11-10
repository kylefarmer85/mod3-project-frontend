function main() {
  fetchPosts()

}

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
const userLogin = qs('.user-form')
const postsContainer = qs('.posts-container')















function fetchPosts() {
  fetch(POSTS_URL)
  .then(resp => resp.json())
  .then(posts => posts.forEach(renderPost))
}

function renderPost(post) {
  currentPosts << post
  const postDiv = ce('div')
  postDiv.className = "card"
  const titleH3 = ce('h3')
  const postImage = ce('img')
  const author = ce('p')

  titleH3.innerText = post.title
  postImage.src = post.image_url

  author.innerText = post.author

  postDiv.append(titleH3, postImage, author)
  postsContainer.append(postDiv)

//add delete btn dataset.id, add edit btn make here
//create like btn, innerText = post.upvote
//event listener for editbtn inside of render post. post.title, add attribute data-id post.id, post.image_url

// const hiddenInput = ce("input")
// hiddenInput.setAttribute("type", "hidden")
// hiddenInput.value = post.id
// hiddenInput.name = "id"

// editForm.append(hiddenInput)

const editBtn = ce("button")
editBtn.innerText = "Edit Post"

editBtn.eventListner('click' (e) => {
  if (currentUser.id === post.user_id)
  // submitBtn.className = "Edit"
  postForm[0].value = post.title
  postForm[1].value = post.image_url
  postForm[2].value = post.content
  postForm[3].value = post.user_id
  postForm[4].value = 
})


postForm.addEventListener('submit' , )
// if submitBtn.className = "edit"
currentPosts.forEach(post => {
  if post.id === e.target[3].value
    fetch PATCH
//     submitBtn.clssName = "post"
// if submitBtn.className = "post"
  else
    fetch POST



main()