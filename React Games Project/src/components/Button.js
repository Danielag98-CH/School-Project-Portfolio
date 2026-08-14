import React from 'react'
import logo from '../logo.svg';
import styles from './Button.module.css'

const Button = ({label, onButtonClick, isPromo}) => {
  return (
    <button className={ isPromo ? styles.promo :"" } onClick={onButtonClick}>
      {label}
      <img src={logo} width="30" alt="React Logo" />  
    </button>
  )
}

export default Button