// src/components/Card.jsx
import React from 'react'

const Card = ({ 
  children, 
  className = '',
  padding = 'p-6',
  shadow = 'shadow-sm',
  rounded = 'rounded-2xl',
  border = 'border border-gray-100',
  background = 'bg-white',
  ...props 
}) => {
  return (
    <div 
      className={`
        ${background} ${rounded} ${border} ${shadow} ${padding} ${className}
        transition-all duration-300 hover:shadow-lg
      `.trim()}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-bold text-gray-900 ${className}`}>
      {children}
    </h3>
  )
}

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default Card