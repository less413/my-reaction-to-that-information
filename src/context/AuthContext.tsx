import { getMe } from "../api/auth";
import { deleteToken, getToken, setToken } from "../auth/tokenStorage";
import AuthToken from "../types/AuthToken";
import User from "../types/User";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthProviderType = {
    currentUser: User | null;
    updateCurrentUser: (token: AuthToken | null) => Promise<void>;
};

const AuthContext = createContext<AuthProviderType | null>(null);

function useAuth() {
    // throw error if null, so whenever i call this it CANNOT be null
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("no AuthProvider?");
    }
    return context;
}

type Props = {
    children: ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    async function updateCurrentUser(token: AuthToken | null) {
        if (token === null) {
            // logout
            setCurrentUser(null);
            deleteToken();
            return;
        }
        setToken(token);
        getMe()
            .then(setCurrentUser)
            .catch(() => updateCurrentUser(null)); // bad token
    }

    useEffect(() => {
        // at the start, get the token from storage and update
        updateCurrentUser(getToken());
    }, []);

    return <AuthContext.Provider value={{ currentUser, updateCurrentUser }}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
