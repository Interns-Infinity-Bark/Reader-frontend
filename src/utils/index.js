export function isLoggedIn() {
  return window.__session && window.__session.username && window.__session.expiresAt > Date.now();
}

export function setSession(session) {
  window.__session = { ...window.__session, ...session };
  localStorage.setItem('session', JSON.stringify(window.__session));
}
