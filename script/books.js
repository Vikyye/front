import { getActiveUser, getActiveSession, setActiveSession } from './session.js';

// запрещаем вызов стандартного меню
document.oncontextmenu = function() { return false; };

function applyContextMenu(book) {
    $(book).mousedown(
        function (event) {
            if (event.which === 3) {
                // создаём новый блок, в котором будет наше меню
                $('<div/>', {
                    // назначаем ему свой класс, описанный в стилях, чтобы блок появился на странице
                    class: 'context-menu' 
                    })
                    .css({
                    // получаем координаты клика и делаем их координатами меню
                    left: event.pageX+'px', 
                    top: event.pageY+'px' 
                    })
                    // добавляем блок на страницу
                    .appendTo('body') 
                    // и добавляем пункты в новое контекстное меню
                    .append( 
                    $('<ul/>').append('<li>Отдать</li>') 
                    //.append('<li>Удалить</li>') 
                        )
                    // показываем новое меню
                    .show('fast'); 
            } else {
                setTimeout(() => {  $('.context-menu').remove(); }, 10);
            }
        }
    )
}

function getMyBooks() {
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
                        const bookCard = document.createElement("p")
                        bookCard.classList.add('book')
                        bookCard.textContent = books[i].title
                        //applyContextMenu(bookCard)
                        document.getElementById('my').prepend(bookCard)
                    }
                }
            })
        } else {
            response.text().then(msg => alert(msg))
        }
    })
}

function iTake(bookId, giverId, date) {
    fetch("https://crocsolaris.ru/api/book/" + bookId, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'SessionID': getActiveSession(),
        }
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            response.json().then(json => {
                const bookCard = document.createElement("p")
                bookCard.classList.add('book')
                bookCard.textContent = json.title
                //applyContextMenu(bookCard)
                document.getElementById('taker').prepend(bookCard)
            })
        } else {
            response.text().then(msg => alert(msg))
        }
    })

}

function iGive(bookId, takerId, date) {
    fetch("https://crocsolaris.ru/api/book/" + bookId, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'SessionID': getActiveSession(),
        }
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            response.json().then(json => {
                const bookCard = document.createElement("p")
                bookCard.classList.add('book')
                bookCard.textContent = json.title
                //applyContextMenu(bookCard)
                document.getElementById('giver').prepend(bookCard)
            })
        } else {
            response.text().then(msg => alert(msg))
        }
    })
}

function getShares() {
    fetch("https://crocsolaris.ru/api/shares", {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'SessionID': getActiveSession(),
        }
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            response.json().then(json => {
                let shares = json.shares
                for (let i = 0; i < shares.length; i++) {
                    if (shares[i].taker_id == getActiveUser()) {
                        iTake(shares[i].book_id, shares[i].giver_id, shares[i].final_date)
                    }
                    if (shares[i].giver_id == getActiveUser()) {
                        iGive(shares[i].book_id, shares[i].taker_id, shares[i].final_date)
                    }
                }
            })
        } else {
            response.text().then(msg => alert(msg))
        }
    })

}

document.getElementById('to_profile').addEventListener('click', (e) => window.location.href = "/profile.html")
document.getElementById('add_book').addEventListener('click', (e) => window.location.href = "/add_book.html")
document.getElementById('share_book').addEventListener('click', (e) => window.location.href = "/share_book.html")

getMyBooks()
getShares()
