import { hasActiveSession, getActiveSession, setActiveSession } from './session.js';

document.getElementById('submit').addEventListener('click', (e) => {
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let year = document.getElementById('year').value
    
    fetch("https://crocsolaris.ru/api/book", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'SessionID': getActiveSession(),
        },
        body: JSON.stringify({
            title: title,
            author: author,
            release_year: year,
        })
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            window.location.href = "/books.html"
        } else {
            response.text().then(msg => alert(msg))
        }
    })
})
