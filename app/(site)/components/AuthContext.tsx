'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface User {
  _id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')

    console.log('userId capturado da URL:', userId)

    if (userId) {
      fetch(`http://localhost:3001/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('resposta do backend:', data)
          if (!data.error && data.user) {
            setUser(data.user)
            localStorage.setItem('user', JSON.stringify(data.user))
            window.history.replaceState({}, '', window.location.pathname)
          }
        })
        .catch((err) => console.error('Erro ao buscar user:', err))
      return
    }

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, ...updates }
      localStorage.setItem('user', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider value={{ user, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}