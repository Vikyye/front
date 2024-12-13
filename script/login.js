import { hasActiveSession, getActiveSession, setActiveSession } from './session.js';

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

function onAuthButtonPressed() {
    console.log("Выполнен вход")
    window.location.href = "/books.html"
}

document.getElementById('change_mode').addEventListener('click', (e) => toggleRegistrationAuthMode())
document.getElementById('submit').addEventListener('click', (e) => onAuthButtonPressed())

toggleRegistrationAuthMode()
