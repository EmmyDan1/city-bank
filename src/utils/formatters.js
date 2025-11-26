// src/utils/formatters.js
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export const formatDate = (dateString, options = {}) => {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

export const formatAccountNumber = (number) => {
  return number.replace(/\*/g, '•')
}

export const getTransactionTypeColor = (type) => {
  return type === 'credit' ? 'text-green-600' : 'text-red-600'
}

export const getTransactionTypeText = (type) => {
  return type === 'credit' ? 'Credit' : 'Debit'
}