// src/data/user.js
export const userProfile = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  preferences: {
    language: 'English',
    currency: 'USD',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  }
}