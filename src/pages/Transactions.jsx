// src/pages/Transactions.jsx
import React, { useState } from 'react'
import { transactions } from '../data/transactions'
import {
  formatCurrency,
  formatDate,
  getTransactionTypeColor,
  getTransactionTypeText,
} from '../utils/formatters'
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card'
import Input from '../components/Input'

const Transactions = () => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === 'all' || transaction.type === filter
    const matchesSearch =
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600">View and manage your transaction history</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  filter === 'all'
                    ? 'bg-citi-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilter('credit')}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  filter === 'credit'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Credits
              </button>

              <button
                onClick={() => setFilter('debit')}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  filter === 'debit'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Debits
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-800">{formatDate(t.date)}</td>
                    <td className="py-3 px-4 text-gray-800">{t.description}</td>
                    <td className="py-3 px-4 text-gray-800">{t.category}</td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getTransactionTypeColor(
                          t.type
                        )}`}
                      >
                        {getTransactionTypeText(t.type)}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      {formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <p className="text-center py-6 text-gray-500">No transactions found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Transactions
