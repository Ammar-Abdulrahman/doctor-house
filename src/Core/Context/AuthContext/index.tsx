import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  user: string | null;
  permissions: string[];
  setUser: (user: string | null) => void;
  setPermissions: (permissions: string[]) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  permissions: [],
  setUser: () => {},
  setPermissions: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  return (
    <AuthContext.Provider
      value={{ user, permissions, setUser, setPermissions }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
