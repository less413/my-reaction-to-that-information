import api from "./caller";
import User from "../types/User";

const processDate = (user: User) => ({ ...user, joindate: new Date(user.joindate) });

async function getUser(uname: string): Promise<User[]> {
    const response = await api.get<User[]>("/users", { params: { username: uname } });
    return response.data.map(processDate);
}

export { getUser };
