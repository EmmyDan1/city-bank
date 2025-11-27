import React from 'react'
import { accounts } from '../data/accounts'
import { formatCurrency, formatDate } from '../utils/formatters'

const Dashboard = () => {
  const totalBalance = accounts
    .filter(acc => acc.type !== 'credit')
    .reduce((sum, acc) => sum + acc.balance, 0)

  const recentTransactions = [
    { id: 1, description: 'Starbucks Coffee', amount: -5.75, date: '2024-01-15', category: 'Food', type: 'debit' },
    { id: 2, description: 'Salary Deposit', amount: 4500.00, date: '2024-01-14', category: 'Income', type: 'credit' },
    { id: 3, description: 'Amazon Shopping', amount: -89.99, date: '2024-01-13', category: 'Shopping', type: 'debit' },
    { id: 4, description: 'Netflix Subscription', amount: -15.99, date: '2024-01-12', category: 'Entertainment', type: 'debit' },
  ]

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': '🍔',
      'Income': '💰',
      'Shopping': '🛍️',
      'Entertainment': '🎬',
      'Transfer': '🔄',
      'Utilities': '🏠'
    }
    return icons[category] || '💳'
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-citi-blue-500 via-citi-blue-600 to-citi-blue-700 px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Good morning</h1>
            <p className="text-white/80 text-sm mt-1">Welcome back to your finances</p>
          </div>
          <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
            <span className="text-white text-base">🔔</span>
          </div>
        </div>

        {/* Total Balance Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80 text-xs">Total Balance</span>
            <div className="flex space-x-1">
              <button className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">👁️</span>
              </button>
              <button className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">⚙️</span>
              </button>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {formatCurrency(totalBalance)}
          </div>
          <div className="flex items-center text-white/70 text-xs">
            <span className="text-green-400 mr-1">↑</span>
            +2.4% from last month
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-5 mb-4">
        <div className="bg-white rounded-xl shadow-sm p-3 border border-gray-100">
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: '🔄', label: 'Transfer', color: 'text-citi-blue-600' },
              { icon: '💳', label: 'Pay', color: 'text-green-600' },
              { icon: '📊', label: 'Invest', color: 'text-purple-600' },
              { icon: '📥', label: 'Top Up', color: 'text-orange-600' }
            ].map((action, index) => (
              <button key={index} className="flex flex-col items-center space-y-1">
                <div className={`w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center ${action.color}`}>
                  <span className="text-lg">{action.icon}</span>
                </div>
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accounts - Vertical Stack on Mobile */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">My Accounts</h2>
          <button className="text-citi-blue-600 text-xs font-semibold">View All</button>
        </div>
        
        <div className="space-y-3">
          {accounts.map((account) => (
            <div key={account.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    account.type === 'checking' ? 'bg-blue-100 text-blue-600' :
                    account.type === 'savings' ? 'bg-green-100 text-green-600' :
                    account.type === 'credit' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {account.type === 'checking' ? '💳' : 
                     account.type === 'savings' ? '💰' : 
                     account.type === 'credit' ? '💸' : '📈'}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-700 block">
                      {account.type === 'checking' ? 'Checking' : 
                       account.type === 'savings' ? 'Savings' : 
                       account.type === 'credit' ? 'Credit Card' : 'Investment'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {account.type === 'credit' ? 
                       `Available: ${formatCurrency(account.available)}` : 
                       `•••• ${account.number.slice(-4)}`}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-base font-bold ${
                    account.balance < 0 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {formatCurrency(account.balance)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Recent Transactions</h2>
          <button className="text-citi-blue-600 text-xs font-semibold">See All</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {recentTransactions.map((transaction, index) => (
            <div key={transaction.id} className={`flex items-center space-x-3 p-3 ${
              index !== recentTransactions.length - 1 ? 'border-b border-gray-100' : ''
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <span className="text-base">{getCategoryIcon(transaction.category)}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{transaction.description}</p>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded-full text-gray-600">
                    {transaction.category}
                  </span>
                </div>
              </div>
              
              <div className={`text-right ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                <div className="font-bold text-sm">
                  {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {transaction.type === 'credit' ? 'Income' : 'Expense'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;