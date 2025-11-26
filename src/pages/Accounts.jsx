// src/pages/Accounts.jsx
import React from 'react'
import { accounts } from '../data/accounts'
import { formatCurrency, formatAccountNumber } from '../utils/formatters'
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card'

const Accounts = () => {
  const getAccountIcon = (type) => {
    switch (type) {
      case 'checking': return '💳'
      case 'savings': return '💰'
      case 'credit': return '💸'
      case 'investment': return '📈'
      default: return '🏦'
    }
  }

  const getAccountTypeName = (type) => {
    switch (type) {
      case 'checking': return 'Checking Account'
      case 'savings': return 'Savings Account'
      case 'credit': return 'Credit Card'
      case 'investment': return 'Investment Account'
      default: return 'Account'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
        <p className="text-gray-600">Manage your accounts and view balances</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {getAccountIcon(account.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {getAccountTypeName(account.type)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatAccountNumber(account.number)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${
                    account.balance < 0 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {formatCurrency(account.balance)}
                  </div>
                  {account.type === 'credit' && (
                    <p className="text-sm text-gray-600">
                      Limit: {formatCurrency(account.creditLimit)}
                    </p>
                  )}
                  {account.type !== 'credit' && (
                    <p className="text-sm text-gray-600">
                      Available: {formatCurrency(account.available)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Total Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(
                  accounts
                    .filter(acc => acc.type !== 'credit')
                    .reduce((sum, acc) => sum + acc.balance, 0)
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Liabilities</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(
                  accounts
                    .filter(acc => acc.type === 'credit')
                    .reduce((sum, acc) => sum + Math.abs(acc.balance), 0)
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Net Worth</p>
              <p className="text-2xl font-bold text-citi-blue-500">
                {formatCurrency(
                  accounts.reduce((sum, acc) => sum + acc.balance, 0)
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Accounts