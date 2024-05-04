import { createContext, ReactNode, useState } from "react";
import { IAuthContext, IUser } from "../types";

type Props = {
  children: ReactNode;
};

const initialUser: IUser = {
  id: "",
  username: "",
  email: "",
  token: "",
};

const initialValue = {
  user: initialUser,
  authenticated: false,
  setUser: () => {},
  setAuthenticated: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>(initialUser || null);

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
