import React from 'react'
import { BaseButton } from './ButtonStyles'

type ButtonProps  = {
  children: string
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <BaseButton>{children}</BaseButton>
  )
}

export default Button