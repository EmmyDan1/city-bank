// src/hooks/useAuth.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const AuthContext = createContext(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user was previously logged in
    const savedAuth = localStorage.getItem('citi_auth')
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        setIsAuthenticated(true)
        setUser(authData.user)
      } catch (error) {
        console.error('Error parsing saved auth data:', error)
        localStorage.removeItem('citi_auth')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Fake authentication - accept any email/password for demo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // DEMO: Accept ANY email and password
        if (email && password) {
          const userData = {
            id: 1,
            email: email,
            name: 'Curry Lenny',
            avatar: null
          }
          setIsAuthenticated(true)
          setUser(userData)
          localStorage.setItem('citi_auth', JSON.stringify({ user: userData }))
          resolve(userData)
        } else {
          reject(new Error('Please enter both email and password'))
        }
      }, 1000) // Simulate API delay
    })
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('citi_auth')
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}