// src/components/NavBar.jsx
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const NavBar = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-citi-blue-500 via-citi-blue-600 to-citi-blue-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-3 rounded-2xl text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10">
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-inner">
                  <svg className="w-5 h-5 text-citi-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-white tracking-tight">
                  Citi Bank
                </span>
                <div className="h-1 w-12 bg-white/30 rounded-full mt-2 backdrop-blur-sm"></div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <div className="flex space-x-1 mr-8 bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
              {['Accounts', 'Transfers', 'Cards', 'Investments'].map((item) => (
                <button
                  key={item}
                  className="px-5 py-3 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - User Menu */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <button className="relative p-3 text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-2xl transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 0-6 6v2.25l-2 2.25h16.5l-2-2.25V9.75a6 6 0 0 0-6-6z"/>
              </svg>
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-citi-blue-600"></span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-4 p-2 rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white group-hover:text-white/95">
                    {user?.name?.split(' ')[0] || 'User'}
                  </p>
                  <p className="text-xs text-white/70">Premium Client</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:bg-white/30 transition-all duration-300">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <svg 
                  className={`w-4 h-4 text-white/70 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-3 z-50">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                    <div className="inline-flex items-center px-2 py-1 mt-1 bg-gradient-to-r from-citi-blue-500 to-citi-blue-600 rounded-full">
                      <span className="text-xs font-medium text-white">Premium Banking</span>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    {[
                      { icon: '👤', label: 'Profile & Settings', action: () => navigate('/profile') },
                      { icon: '💳', label: 'Account Management', action: () => navigate('/accounts') },
                      { icon: '🔄', label: 'Transfer History', action: () => navigate('/transfers') },
                      { icon: '🛡️', label: 'Security Center', action: () => {} },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          item.action()
                          setShowUserMenu(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-citi-blue-50 hover:text-citi-blue-600 transition-all duration-200 rounded-xl mx-2"
                      >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="border-t border-white/10 pt-2 mx-3">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 rounded-xl"
                    >
                      <span className="text-base">🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile User Info */}
        <div className="lg:hidden border-t border-white/20 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-white/70">Premium Client</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar