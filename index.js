function main() {
  fetchPosts()

}

function ce(element){
  return document.createElement(element)
}

function qs(selector){
  return document.querySelector(selector)
}

const USERS_URL = "http://localhost:3000/api/v1/users"
const POSTS_URL = "http://localhost:3000/api/v1/posts"
const COMMENTS_URL = "http://localhost:3000/api/v1/comments"


const postsContainer = qs('.posts-container')

function fetchPosts() {
  fetch(POSTS_URL)
  .then(resp => resp.json())
  .then(posts => posts.forEach(renderPost))
}

function fetchPosts() {
  fetch(POSTS_URL)
  .then(resp => resp.json())
  .then(posts => posts.forEach(renderPost))
}

function renderPost(post) {
 
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

}

main()