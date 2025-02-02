import { setActiveUser, setActiveSession } from './session.js';

var isRegistration = true

function toggleRegistrationAuthMode() {
    if (isRegistration) {
        document.getElementById('name_label').style.display = 'none'
        document.getElementById('name').style.display = 'none'
        document.getElementById('password_repeat_label').style.display = 'none'
        document.getElementById('password_repeat').style.display = 'none'
        document.getElementById('change_mode').textContent = 'Ещё нет аккаунта?'    
        document.getElementById('submit').setAttribute('value', 'Войти')
    } else {
        document.getElementById('name_label').style.display = ''
        document.getElementById('name').style.display = ''
        document.getElementById('password_repeat_label').style.display = ''
        document.getElementById('password_repeat').style.display = ''
        document.getElementById('change_mode').textContent = 'Уже есть аккаунт?'    
        document.getElementById('submit').setAttribute('value', 'Зарегистрироваться')
    }

    isRegistration = !isRegistration
}

function login(email, password) {
    fetch("https://crocsolaris.ru/api/login", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password:password,  
            email: email,
        })
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            response.json().then(json => {
                setActiveSession(json.session_id)
                setActiveUser(json.user_id)
                window.location.href = "/books.html"
            })
        } else {
            response.text().then(msg => alert(msg))
        }
    })
}

function register(username, email, password) {
    fetch("https://crocsolaris.ru/api/register", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username,
            password: password,  
            email: email,
        })
    }).then(response => {
        if (Math.floor(response.status / 100) == 2) {
            login(email, password)
        } else {
            response.text().then(msg => alert(msg))
        }
    })
}

function onAuthButtonPressed() {
    if (!isRegistration) {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        login(email, password)
    } else {
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let password_repeat = document.getElementById('password_repeat').value

        if (password_repeat == password) {
            register(name, email, password)
        } else {
            alert("Проверьте пароль")
        }
    }
}

document.getElementById('change_mode').addEventListener('click', (e) => toggleRegistrationAuthMode())
document.getElementById('submit').addEventListener('click', (e) => onAuthButtonPressed())

toggleRegistrationAuthMode()
