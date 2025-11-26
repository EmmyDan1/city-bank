// src/pages/Transfers.jsx
import React, { useState } from 'react'
import { accounts } from '../data/accounts'
import { formatCurrency } from '../utils/formatters'
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'

const Transfers = () => {
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      alert('Transfer completed successfully!')
      setFormData({
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: ''
      })
      setLoading(false)
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const filteredToAccounts = accounts.filter(acc => acc.id !== parseInt(formData.fromAccount))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transfers</h1>
        <p className="text-gray-600">Transfer money between your accounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transfer Form */}
        <Card>
          <CardHeader>
            <CardTitle>Make a Transfer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Account
                </label>
                <select
                  name="fromAccount"
                  value={formData.fromAccount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-citi-blue-500"
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Account
                </label>
                <select
                  name="toAccount"
                  value={formData.toAccount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-citi-blue-500"
                  required
                >
                  <option value="">Select account</option>
                  {filteredToAccounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />

              <Input
                label="Description (Optional)"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Transfer description"
              />

              <Button
                type="submit"
                variant="primary"
                size="large"
                loading={loading}
                className="w-full"
              >
                Transfer Money
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Transfers */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">To Savings Account</p>
                  <p className="text-sm text-gray-600">Jan 15, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">-{formatCurrency(1000)}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">From Checking</p>
                  <p className="text-sm text-gray-600">Jan 10, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{formatCurrency(500)}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Transfers