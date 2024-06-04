import { createContext, useContext, useState, ReactNode } from "react";

interface AuthUser {
  _id: string;
  // Add other fields as necessary
}

interface AuthContextProps {
  authUser: any | null;
  setAuthUser: (user: any | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem("chat-user") as string) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
