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
  accounts: User[]
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  switchAccount: (userId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function loadAccounts(): User[] {
  const stored = localStorage.getItem('accounts')
  return stored ? JSON.parse(stored) : []
}

function saveAccounts(accounts: User[]) {
  localStorage.setItem('accounts', JSON.stringify(accounts))
}

function upsertAccount(accounts: User[], account: User): User[] {
  const existing = accounts.filter((a) => a._id !== account._id)
  return [...existing, account]
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accounts, setAccounts] = useState<User[]>([])

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
            const updatedAccounts = upsertAccount(loadAccounts(), data.user)
            saveAccounts(updatedAccounts)
            setAccounts(updatedAccounts)

            setUser(data.user)
            localStorage.setItem('activeUserId', data.user._id)
            window.history.replaceState({}, '', window.location.pathname)
          }
        })
        .catch((err) => console.error('Erro ao buscar user:', err))
      return
    }

    const storedAccounts = loadAccounts()
    setAccounts(storedAccounts)

    const activeUserId = localStorage.getItem('activeUserId')
    const activeUser = storedAccounts.find((a) => a._id === activeUserId)
    if (activeUser) {
      setUser(activeUser)
    }
  }, [])

  const logout = () => {
    if (!user) return
    const remaining = accounts.filter((a) => a._id !== user._id)
    saveAccounts(remaining)
    setAccounts(remaining)

    setUser(null)
    localStorage.removeItem('activeUserId')
  }

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, ...updates }

      const updatedAccounts = upsertAccount(accounts, updated)
      saveAccounts(updatedAccounts)
      setAccounts(updatedAccounts)

      return updated
    })
  }

  const switchAccount = (userId: string) => {
    const account = accounts.find((a) => a._id === userId)
    if (!account) return
    setUser(account)
    localStorage.setItem('activeUserId', userId)
  }

  return (
    <AuthContext.Provider value={{ user, accounts, logout, updateUser, switchAccount }}>
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