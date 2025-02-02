let SESSION_ID_LOCAL_STORAGE_KEY = "solaris_app_session_id"
let USER_ID_LOCAL_STORAGE_KEY = "solaris_app_user_id"

export function hasActiveSession() {
    return localStorage.getItem(SESSION_ID_LOCAL_STORAGE_KEY) != null
}

export function getActiveSession() {
    return localStorage.getItem(SESSION_ID_LOCAL_STORAGE_KEY)
}

export function setActiveSession(sessionId) {
    localStorage.setItem(SESSION_ID_LOCAL_STORAGE_KEY, sessionId)
}

export function setActiveUser(userId) {
localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY, userId)
}

export function getActiveUser() {
    return localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY)
}

export function hasActiveUser() {
    return localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY) != null
}
