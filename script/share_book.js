import { getActiveUser, getActiveSession, setActiveSession } from './session.js';

function loadUsers() {
    fetch("https://crocsolaris.ru/api/users", {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'SessionID': getActiveSession(),
        }
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            response.json().then(json => {
                let users = json.users
                for (let i = 0; i < users.length; i++) {
                    const userOption = document.createElement("option")
                    userOption.setAttribute('value', users[i].id)
                    userOption.textContent = users[i].name + " (" + users[i].email + ")"
                    document.getElementById('taker').append(userOption)
                }
            })
        } else {
            response.text().then(msg => alert(msg))
        }
    })
}

function loadBooks() {
    fetch("https://crocsolaris.ru/api/books", {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'SessionID': getActiveSession(),
        }
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            response.json().then(json => {
                let books = json.book
                for (let i = 0; i < books.length; i++) {
                    if (books[i].owner_id == getActiveUser()) {
                        const bookOption = document.createElement("option")
                        bookOption.setAttribute('value', books[i].id)
                        bookOption.textContent = books[i].title + " (" + books[i].author + ")"
                        document.getElementById('book').append(bookOption)
                    }
                }
            })
        } else {
            response.text().then(msg => alert(msg))
        }
    })
}

document.getElementById('submit').addEventListener('click', (e) => {
    let book = document.getElementById('book').value
    let taker = document.getElementById('taker').value
    let return_date = document.getElementById('return').value
    
    fetch("https://crocsolaris.ru/api/share", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'SessionID': getActiveSession(),
        },
        body: JSON.stringify({
            book_id: book,
            taker_id: taker,
            final_date: return_date,
        })
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            window.location.href = "/books.html"
        } else {
            response.text().then(msg => alert(msg))
        }
    })
})

loadBooks()
loadUsers()
