import { createContext, useContext, useState } from "react"

type User = { id: string; role: string } | null

type AuthContextType = {
  user: User
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  const login = (u: User, t: string) => {
    setUser(u)
    setToken(t)
    localStorage.setItem("token", t)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)!
