import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("sonic_meet_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch (_) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (nameArg, emailArg) => {
    const providedName = typeof nameArg === "string" ? nameArg : "";
    const name = providedName.trim();
    if (!name) return null;
    const email = typeof emailArg === "string" && emailArg.trim() ? emailArg.trim() : null;
    const localUser = {
      uid: `local_${Math.random().toString(36).slice(2)}${Date.now()}`,
      displayName: name,
      email,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
    };
    setUser(localUser);
    localStorage.setItem("sonic_meet_user", JSON.stringify(localUser));
    return localUser;
  };

  const logout = async () => {
    console.log("Logout");
    localStorage.removeItem("sonic_meet_user");
    setUser(null);
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading || children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
