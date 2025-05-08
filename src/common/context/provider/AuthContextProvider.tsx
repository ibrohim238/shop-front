import { createContext, useContext, useState, ReactNode } from 'react'
import { authenticate, logout as authLogout, isAuthenticated } from '@/common/services/AuthService.ts'

interface AuthContextType {
  isAuth: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated())

  const login = async (username: string, password: string) => {
    await authenticate(username, password)
    setIsAuth(true);
  }

  const logout = () => {
    authLogout();
    setIsAuth(false)
  }

  return (
      <AuthContext.Provider value={{ isAuth, login, logout }}>
        {children}
      </AuthContext.Provider>
  )
}

// Хук-обёртка для более удобного доступа
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}