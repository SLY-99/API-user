// Select Elements from DOM
const elUsersWrapper = document.querySelector("#users-wrapper");
const elPostsWrapper = document.querySelector("#posts-wrapper");
const elCommentsWrapper = document.querySelector("#comments-wrapper");

const elUsersCounter = document.querySelector("#users-counter");
const elPostsCounter = document.querySelector("#posts-counter");
const elCommentsCounter = document.querySelector("#comments-counter");

const elUsersTemplate = document.querySelector("#users-template").content
const elPostsTemplate = document.querySelector("#posts-template").content
const elCommentsTemplate = document.querySelector("#comments-template").content




// Render users info
function renderUsers(array, wrapper) {
    let users = document.createDocumentFragment()
    
    if(array){
        array.forEach(function(item) {
            let usersTemplate = elUsersTemplate.cloneNode(true)
            
            usersTemplate.querySelector("#users-name").textContent = `${item.name} - ${item.username}`
            usersTemplate.querySelector("#users-email").textContent = item.email
            usersTemplate.querySelector("#users-country").textContent = item.address.city
            usersTemplate.querySelector("#users-company").textContent = item.company.name
            usersTemplate.querySelector("#users-website").textContent = item.website
            usersTemplate.querySelector("#users-name").dataset.id = item.id
            
            
            users.appendChild(usersTemplate)
        })
        wrapper.innerHTML = null
        wrapper.appendChild(users);
        
        elUsersCounter.textContent = array.length;
        
    }
}

fetch("https://jsonplaceholder.typicode.com/users")
.then(response => response.json())
.then(json => renderUsers(json,elUsersWrapper));





// Render posts info
function renderPosts(array, wrapper) {
    let posts = document.createDocumentFragment()
    
    if(array){
        array.forEach(function(item) {
            let postsTemplate = elPostsTemplate.cloneNode(true)
            
            postsTemplate.querySelector("#posts-title").textContent = item.title
            postsTemplate.querySelector("#posts-text").textContent = item.body
            postsTemplate.querySelector("#posts-title").dataset.id = item.id
            
            posts.appendChild(postsTemplate)
        })
        wrapper.innerHTML = null
        wrapper.appendChild(posts);
        console.log(array);
        
        elPostsCounter.textContent = array.length;   
    }
}

elUsersWrapper.addEventListener("click" , (e) => {
    let usersId = e.target.dataset.id;
    if(usersId){
        fetch(`https://jsonplaceholder.typicode.com/user/${usersId}/posts`)
        .then(response => response.json())
        .then(json => renderPosts(json , elPostsWrapper));
    }
})




// Render comments info
function renderComments(array, wrapper) {
    let comments = document.createDocumentFragment()
    
    if(array){
        array.forEach(function(item) {
            let commentsTemplate = elCommentsTemplate.cloneNode(true)
            
            commentsTemplate.querySelector("#comments-title").textContent = item.name
            commentsTemplate.querySelector("#comments-email").textContent = item.email
            commentsTemplate.querySelector("#comments-text").textContent = item.body
            
            comments.appendChild(commentsTemplate)
        })
        wrapper.innerHTML = null
        wrapper.appendChild(comments)
        
        elCommentsCounter.textContent = array.length;
    }
}



elPostsWrapper.addEventListener("click" , (e) => {
    let usersId = e.target.dataset.id;
    console.log(usersId);
    if(usersId){
        fetch(`https://jsonplaceholder.typicode.com/posts/${usersId}/comments`)
        .then(response => response.json())
        .then(json => renderComments(json, elCommentsWrapper));
    }
})
