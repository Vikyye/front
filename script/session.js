let SESSION_ID_LOCAL_STORAGE_KEY = "solaris_app_session_id"

export function hasActiveSession() {
    return localStorage.getItem(SESSION_ID_LOCAL_STORAGE_KEY) != null
}

export function getActiveSession() {
    return localStorage.getItem(SESSION_ID_LOCAL_STORAGE_KEY)
}

export function setActiveSession(sessionId) {
    localStorage.setItem(SESSION_ID_LOCAL_STORAGE_KEY, sessionId)
}
