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
                    .append('<li>Удалить</li>') 
                        )
                    // показываем новое меню
                    .show('fast'); 
            } else {
                setTimeout(() => {  $('.context-menu').remove(); }, 10);
            }
        }
    )
}


let books = document.getElementsByClassName("book")
for (let i = 0; i < books.length; i++) {
    applyContextMenu(books[i])
}

function toProfileRedirect() {
    window.location.href = "/profile.html"
}

document.getElementById('to_profile').addEventListener('click', (e) => toProfileRedirect())
