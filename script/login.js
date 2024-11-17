import { hasActiveSession, getActiveSession, setActiveSession } from './session.js';

var isRegistration = true

function toggleRegistrationAuthMode() {
    if (isRegistration) {
        document.getElementById('name_label').style.display = 'none'
        document.getElementById('name').style.display = 'none'
        document.getElementById('password_repeat_label').style.display = 'none'
        document.getElementById('password_repeat').style.display = 'none'
        document.getElementById('change_mode').textContent = 'Ещё нет аккаунта?'    
        document.getElementById('submit').setAttribute('value', 'value')
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

}

document.getElementById('change_mode').addEventListener('click', (e) => toggleRegistrationAuthMode())

toggleRegistrationAuthMode()
