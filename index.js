const mainContent = document.getElementById("main-content")
const postsHeader = document.getElementById("posts-header")
const postsContent = document.getElementById("posts-content")


async function getUsers() {
    let response = await fetch('https://jsonplaceholder.typicode.com/users')
    let users = await response.json()
    return users
}

async function getPosts(userName, userID) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
    let posts = await response.json()
    return posts.map(post => ({
        username: userName,
        title: post.title,
        body: post.body
    }))
}

function getUserHtml(userData) {
    const { name, username, email, id } = userData
    return  `
        <div class="card" id=${`user-${id}`}>
            <h1>${name}</h1>
            <h2>@${username}</h2>
            <h2>${email}</h2>
        </div>
    `
}

function displayUsers(users) {
    mainContent.innerHTML = `
        <h1 class="main-header">Ksense Users</h1>
        <div class="main-content">
            ${users.map(getUserHtml).join('')}
        </div>
    `
    for(let i of users){
        document.getElementById(`user-${i.id}`).onclick = () => {
            getPosts(i.name,i.id)
            .then(displayPosts)
            .catch(e => console.log(`Error: ${e}`))
        window.scroll(0,0)
        }
    }
}

function getPostHtml(posts){
    const { username, title, body } = posts
    return `
        <div class="card card__post">
            <h1>${title}</h1>
            <h3>by ${username}</h3>
            <p>${body}<p>
        </div>
    `
}

function displayPosts(posts) {
    mainContent.innerHTML = `
        <button id="back-btn">Back to users</button>
        <div class="main-content main-content__posts">
            ${posts.map(getPostHtml).join('')}
        </div>
    `
    document.getElementById("back-btn").onclick = () => {
        getUsers()
            .then(displayUsers)
            .catch(e => console.log(`Error: ${e}`))
    }
}

getUsers()
    .then(displayUsers)
    .catch(e => console.log(`Error: ${e}`))

