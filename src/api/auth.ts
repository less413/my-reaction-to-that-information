import api from "./caller";
import AuthLogin from "../types/AuthLogin";
import AuthToken from "../types/AuthToken";
import User from "../types/User";

const processDate = (user: User) => ({ ...user, joindate: new Date(user.joindate) });

async function postLogin(login: AuthLogin): Promise<AuthToken> {
    const response = await api.post("/auth/login", login);
    return response.data.token;
}

async function postSignUp(login: AuthLogin): Promise<AuthToken> {
    const response = await api.post("/auth/signup", login);
    return response.data.token;
}

async function getMe(): Promise<User> {
    const response = await api.get<User[]>("/auth/me");
    return processDate(response.data[0]);
}

export { postLogin, postSignUp, getMe };
