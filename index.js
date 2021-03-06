function main() {
  fetchPosts();
  createPostFormEventListener();
  userLogin();
  toggleLogin();
  togglePostForm();
  toggleUserProfile();

  toggleCodeItYourself();
  qs('#profile-nav').style.display = 'none';
  qs('#new-post-nav').style.display = 'none';
  editUserContainer.style.display = 'none';
  loginContainer.style.display = 'none';
}

let currentPosts = [];
let currentUser;

function ce(element) {
  return document.createElement(element);
}

function qs(selector) {
  return document.querySelector(selector);
}

const USERS_URL = 'http://localhost:3000/api/v1/users';
const POSTS_URL = 'http://localhost:3000/api/v1/posts';
const COMMENTS_URL = 'http://localhost:3000/api/v1/comments';
const postForm = qs('.post-form');

const postsContainer = qs('.posts-container');
const postFormContainer = qs('.post-form-container');

const usersContainer = qs('.users-container');
const userLoginForm = qs('.user-login');
const showContainer = qs('.show-container');
const loginContainer = qs('.login-container');
const showPostContainer = qs('.show-post-container');
const profileContainer = qs('.profile-container');
const editUserContainer = qs('.edit-user-container');
const editUserForm = qs('.edit-user-form');
const logoContainer = qs('.home-page');
const loginNav = qs('#login-nav');

function userLogin() {
  userLoginForm.addEventListener('submit', e => {
    e.preventDefault();

    fetch(USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        email: e.target[1].value,
        profile_pic: e.target[2].value
      })
    })
      .then(resp => resp.json())
      .then(loggedInUser => {
        if (loggedInUser.error) {
          alert(loggedInUser.error);
          return (loginContainer.style.display = 'block');
        } else {
          //assigns user to currentUser
          currentUser = loggedInUser;
          createUserProfile();
          loginContainer.style.display = 'none';
          profileContainer.style.display = 'block';
          qs('#profile-nav').style.display = 'block';
          qs('#profile-text').innerText = `${currentUser.username}'s Profile`;
          qs('#new-post-nav').style.display = 'block';
          loginNav.innerText = 'Logout';
        }
      });

    e.target.reset();
  });
}

function toggleLogin() {
  loginContainer.style.display = 'none';

  loginNav.addEventListener('click', () => {
    loginContainer.style.display = 'block';
    editUserContainer.style.display = 'none';
    postFormContainer.style.display = 'none';
    profileContainer.style.display = 'none';
    showPostContainer.style.display = 'none';
    logoContainer.style.display = 'none';
    if (loginNav.innerText === 'Logout') {
      loginNav.innerText = 'Login';
      qs('#profile-nav').style.display = 'none';
      qs('#new-post-nav').style.display = 'none';
      currentUser = null;
    }
  });
}

function toggleCodeItYourself() {
  const codeNav = qs('#code-nav');
  logoContainer.style.display = 'block';

  codeNav.addEventListener('click', () => {
    logoContainer.style.display = 'block';
    postFormContainer.style.display = 'none';
    profileContainer.style.display = 'none';
    showPostContainer.style.display = 'none';
    loginContainer.style.display = 'none';
  });
}

function togglePostForm() {
  const postFormNav = qs('#new-post-nav');
  postFormContainer.style.display = 'none';

  postFormNav.addEventListener('click', () => {
    if (!currentUser) {
      return alert('You must be logged in to make a new post.');
    }
    loginContainer.style.display = 'none';
    showPostContainer.style.display = 'none';
    profileContainer.style.display = 'none';
    editUserContainer.style.display = 'none';
    logoContainer.style.display = 'none';
    postFormContainer.style.display = 'block';
  });
}

function toggleUserProfile() {
  const profileNav = qs('#profile-nav');
  profileContainer.style.display = 'none';

  profileNav.addEventListener('click', () => {
    if (!currentUser) {
      return alert('You must be logged in to see your profile.');
    }
    createUserProfile();
    loginContainer.style.display = 'none';
    showPostContainer.style.display = 'none';
    postFormContainer.style.display = 'none';
    editUserContainer.style.display = 'none';
    logoContainer.style.display = 'none';
    profileContainer.style.display = 'block';
  });
}

function fetchPosts() {
  postsContainer.innerHTML = '';

  fetch(POSTS_URL)
    .then(resp => resp.json())
    .then(posts => posts.forEach(renderPost));
}

function renderPost(post) {
  currentPosts.push(post);

  const postDiv = ce('div');
  postDiv.innerHTML = '';
  postDiv.className = 'card';

  const postImage = ce('img');
  postImage.className = 'post-image';
  postImage.src = post.image_url;

  const titleH4 = ce('h4');
  titleH4.innerText = post.title;

  const author = ce('p');
  author.innerText = `by: ${post.author}`;

  const upVoteBtn = ce('button');
  upVoteBtn.className = 'like-btn';
  upVoteBtn.setAttribute('data-id', post.id);
  upVoteBtn.innerText = `Up-vote ⬆  ${post.upvote}`;
  upVoteBtn.value = post.upvote;

  postDiv.append(titleH4, postImage, author, upVoteBtn);
  postsContainer.append(postDiv);

  // add event listener to card to append post to show-container
  postDiv.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    postFormContainer.style.display = 'none';
    profileContainer.style.display = 'none';
    editUserContainer.style.display = 'none';
    showPostContainer.style.display = 'block';
    logoContainer.style.display = 'none';

    showPostContainer.innerHTML = `<div class="jumbotron">
      <h1 class="display-4">${post.title}</h1>
      <img src=${post.image_url}/>
      <hr class="my-4">
      <p>${post.content}</p>
      <a href=${post.github_url}>GitHub URL</a>
      <p>by: ${post.author}</p>
      <ul id=comment>
    </div>`;

    post.comments.forEach(renderComment);

    function renderComment(comment) {
      const commentLi = ce('li');
      const commentUl = document.getElementById(`comment`);
      commentLi.innerHTML = `<p><br><b>Comment:</b> ${comment.text}<br>
      <b>Posted by:</b> ${comment.author}</p><br><br>`;
      commentUl.append(commentLi);
    }
    const commentForm = ce('form');
    commentForm.className = 'comment-form';

    commentForm.innerHTML = `<input type="hidden"
          name="id"
          value=${post.id}
         />
        <div class="form-group">
         <label for="comment"></label>
          <textarea type="text" class="form-control" name="comment" value="" placeholder="Leave a Comment"></textarea>
        </div>
         <button type="submit" name="submit" class="btn btn-primary">Submit</button>`;

    commentForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!currentUser) {
        return alert('You must be logged in to post a comment.');
      }
      const newComment = e.target['comment'].value;
      const postId = e.target['id'].value;

      fetch(COMMENTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: newComment,
          author: currentUser.username,
          user_id: currentUser.id,
          post_id: postId
        })
      })
        .then(resp => resp.json())
        .then(comment => {
          if (comment.error) {
            alert(comment.error);
          } else {
            updateCurrentUser();
            renderComment(comment);
          }
        });
      e.target.reset();
    });
    showPostContainer.append(commentForm);
  });
}

function updateCurrentUser() {
  fetch(`${USERS_URL}/${currentUser.id}`)
    .then(resp => resp.json())
    .then(updatedUser => (currentUser = updatedUser));
}

function createUserProfile() {
  const userProfileDiv = ce('div');
  userProfileDiv.className = 'user-profile';

  const displayUsername = ce('h2');
  const displayEmail = ce('p');
  const displayProfilePic = ce('img');

  const userPostsUl = ce('ul');
  userPostsUl.className = 'user-posts';
  const userCommentsUl = ce('ul');
  userCommentsUl.className = 'user-comments';

  const userDeleteBtn = ce('button');
  userDeleteBtn.className = 'delete-user';
  userDeleteBtn.innerText = 'Delete My Account!';

  const userEditBtn = ce('button');
  userEditBtn.className = 'edit-user';
  userEditBtn.innerText = 'Edit Profile';

  displayUsername.innerText = currentUser.username;
  displayEmail.innerText = currentUser.email;
  displayProfilePic.src = currentUser.profile_pic;

  if (currentUser.posts.length === 0) {
    userPostsUl.innerHTML = `<em>${currentUser.username} has no posts</em>`;
  } else {
    userPostsUl.innerHTML = `<strong>${currentUser.username}'s Posts</strong>`;
  }

  if (currentUser.comments.length === 0) {
    userCommentsUl.innerHTML = `<em>${currentUser.username} hasn't made any comments</em>`;
  } else {
    userCommentsUl.innerHTML = `<br><strong>${currentUser.username}'s Comments</strong><br>`;
  }

  currentUser.posts.forEach(post => {
    const postLi = ce('li');
    postLi.className = 'user-post-li';
    postLi.setAttribute('data-id', post.id);
    postLi.innerHTML = `<br><p>Title: ${post.title}</p>`;

    const postDeleteBtn = ce('button');
    postDeleteBtn.className = 'delete';
    postDeleteBtn.innerText = '🗑️';
    postDeleteBtn.setAttribute('data-id', post.id);
    postLi.append(postDeleteBtn);
    userPostsUl.append(postLi);
  });

  currentUser.comments.forEach(comment => {
    const commentLi = ce('li');
    commentLi.innerHTML = `<br><p>Comment: ${comment.text}</p>`;

    const commentDeleteBtn = ce('button');
    commentDeleteBtn.className = 'delete-comment';
    commentDeleteBtn.innerHTML = '🗑️';
    commentDeleteBtn.setAttribute('data-id', comment.id);
    commentLi.append(commentDeleteBtn);
    userCommentsUl.append(commentLi);
  });

  userProfileDiv.append(
    displayUsername,
    displayEmail,
    displayProfilePic,
    userPostsUl,
    userCommentsUl,
    userEditBtn,
    userDeleteBtn
  );
  profileContainer.innerHTML = '';
  profileContainer.append(userProfileDiv);
}

profileContainer.addEventListener('click', e => {
  if (e.target.className === 'delete') {
    deletePost(e.target);
  } else if (e.target.className === 'delete-user') {
    if (
      window.confirm(
        `Are you sure you want to delete "${currentUser.username}"?`
      )
    ) {
      deleteUser(e.target);
    }
  } else if (e.target.className === 'delete-comment') {
    deleteComment(e.target);
  } else if (e.target.className === 'edit-user') {
    editUser();
  } else if (e.target.className === 'user-post-li') {
    fetchPost(e);
  }
});

const deleteUser = target => {
  fetch(`${USERS_URL}/${currentUser.id}`, {
    method: 'DELETE'
  })
    .then(resp => resp.json())
    .then(deletedObj => {
      alert(`${currentUser.username} was DELETED`);
      currentUser = null;
      target.parentElement.innerHTML = '';
      loginContainer.style.display = 'block';
      qs('#profile-nav').style.display = 'none';
      qs('#new-post-nav').style.display = 'none';
      profileContainer.style.display = 'none';
      fetchPosts();
      loginNav.innerText = 'Login';
    });
};

const deletePost = target => {
  fetch(`${POSTS_URL}/${target.dataset.id}`, {
    method: 'DELETE'
  })
    .then(resp => resp.json())
    .then(deletedObj => {
      alert(`${deletedObj.post.title} was DELETED`);
      target.parentElement.remove();
      updateCurrentUser();
      fetchPosts();

      if (currentUser.posts.length === 1) {
        qs(
          '.user-posts'
        ).innerHTML = `<em>${currentUser.username} has no posts</em>`;
      }
    });
};

const deleteComment = target => {
  fetch(`${COMMENTS_URL}/${target.dataset.id}`, {
    method: 'DELETE'
  })
    .then(resp => resp.json())
    .then(deletedObj => {
      alert(`${deletedObj.comment.text} was DELETED`);
      target.parentElement.remove();
      updateCurrentUser();
      fetchPosts();

      if (currentUser.comments.length === 1) {
        qs(
          '.user-comments'
        ).innerHTML = `<em>${currentUser.username} hasn't made any comments</em>`;
      }
    });
};

function fetchPost(e) {
  fetch(`${POSTS_URL}/${e.target.dataset.id}`)
    .then(resp => resp.json())
    .then(postObj => showPost(postObj));
  profileContainer.style.display = 'none';
}

const editUser = () => {
  profileContainer.style.display = 'none';
  editUserContainer.style.display = 'block';

  editUserForm[0].value = currentUser.username;
  editUserForm[1].value = currentUser.email;
  editUserForm[2].value = currentUser.profile_pic;

  createEditFormListener();
};

const handleUpVotes = target => {
  if (!currentUser) {
    return alert('You must be logged in to upvote a post.');
  }
  const postId = target.dataset.id;
  const upVoteCount = parseInt(target.value) + 1;

  const upVoteData = {
    upvote: upVoteCount
  };

  const reqObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(upVoteData)
  };

  fetch(`http://localhost:3000/api/v1/posts/${postId}`, reqObj)
    .then(resp => resp.json())
    .then(updatedPost => {
      target.innerText = `Up-vote ⬆  ${updatedPost.upvote}`;
      target.value++;
    });
};
postsContainer.addEventListener('click', e => {
  if (e.target.className === 'like-btn') {
    handleUpVotes(e.target);
  }
});

function createPostFormEventListener() {
  postForm.addEventListener('submit', e => {
    e.preventDefault();

    fetch(POSTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: e.target[0].value,
        image_url: e.target[1].value,
        content: e.target[2].value,
        github_url: e.target[3].value,
        author: currentUser.username,
        user_id: currentUser.id,
        upvote: 0
      })
    })
      .then(resp => resp.json())
      .then(newPost => {
        if (newPost.error) {
          alert(newPost.error);
        } else {
          renderPost(newPost);
          showPost(newPost);
        }
      });
    postFormContainer.style.display = 'none';
    e.target.reset();
  });
}

function showPost(post) {
  showPostContainer.style.display = 'block';
  showPostContainer.innerHTML = `<div class="jumbotron">
      <h1 class="display-4">${post.title}</h1>
      <img src="${post.image_url}">
      <hr class="my-4">
      <p>${post.content}</p>
      <a href=${post.github_url}>GitHub URL</a>
      <p>by: ${post.author}</p>

      <ul id=comment>
    </div>`;

  post.comments.forEach(renderComment);

  function renderComment(comment) {
    const commentLi = ce('li');
    const commentUl = document.getElementById(`comment`);
    commentLi.innerHTML = `<p><b>Comment:</b> ${comment.text}</p>
      <p><b>Posted by:</b> ${comment.author}</p><br><br>`;
    commentUl.append(commentLi);
  }
  const commentForm = ce('form');
  commentForm.className = 'comment-form';

  commentForm.innerHTML = `<input type="hidden"
          name="id"
          value=${post.id}
         />
        <div class="form-group">
         <label for="comment"></label>
          <textarea type="text" class="form-control" name="comment" value="" placeholder="Leave a Comment"></textarea>
        </div>
         <button type="submit" name="submit" class="btn btn-primary">Submit</button>`;

  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!currentUser) {
      return alert('You must be logged in to post a comment.');
    }
    const newComment = e.target['comment'].value;
    const postId = e.target['id'].value;

    fetch(COMMENTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: newComment,
        author: currentUser.username,
        user_id: currentUser.id,
        post_id: postId
      })
    })
      .then(resp => resp.json())
      .then(comment => {
        renderComment(comment);
      });
    e.target.reset();
  });
  showPostContainer.append(commentForm);
  updateCurrentUser();
}

function createEditFormListener() {
  editUserForm.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`${USERS_URL}/${currentUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        email: e.target[1].value,
        profile_pic: e.target[2].value
      })
    })
      .then(resp => resp.json())
      .then(updatedUser => {
        if (updatedUser.error) {
          alert(updatedUser.error);
          return (editUserContainer.style.display = 'block');
        } else {
          //assigns user to currentUser
          currentUser = updatedUser;
          createUserProfile();
          editUserContainer.style.display = 'none';
          profileContainer.style.display = 'block';
        }
      });
  });
}

main();
