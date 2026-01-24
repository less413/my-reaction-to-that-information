import AuthToken from "../types/AuthToken";

const STORAGE_KEY = "token";

function setToken(token: AuthToken): void {
    localStorage.setItem(STORAGE_KEY, token);
}

function getToken(): AuthToken | null {
    const token = localStorage.getItem(STORAGE_KEY);
    return token;
}

function deleteToken(): void {
    localStorage.removeItem(STORAGE_KEY);
}

export { setToken, getToken, deleteToken };
