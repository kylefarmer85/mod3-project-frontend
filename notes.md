--create user login form 
  -create html login form, hard code in index.html = 
  -fetch one user and assign the newUser to the global JS user variable
-window alert successfully logged in or not

  -buttons and other user access elements hidden until user.id === true?
  After buttons created:
    -if NOT user, hide these:
    -create new post button
    -create a new comment
    -upvot a post
    -access user profile
  
--create a post form
  -create a new post button
  -add event listener to button to render new post form that is listening for 'submit'
  -dont make fields for user.id or author, will fill those in our self with the global user variable (currentUser.id, currentUser.username)
  -on submit, make a fetch POST to posts url
    body:
    title: e.target[0].value
    image_url: e.target[1].value
    content: e.trget[2].value
    github_url: e.target[3].value
    user_id: currentUser.id
    author: currentUser.username
    upvote: 0
  --post comes back from db, render post function

  --render post function add delete button
  -add new post form HTML to index.html
  
--append post.comments
  --add comment comment button


