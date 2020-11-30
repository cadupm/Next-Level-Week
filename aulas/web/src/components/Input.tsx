import React, { InputHTMLAttributes } from 'react'

import './Input.css'

interface InputProps extends InputHTMLAttributes <HTMLInputElement> {
    label: string
    name: string
}

// quero que meu componente Input receba todas as propriedades que um input HTML padrão receba, 
// logo extenderemos ao InputHTMLAttributes que precisa receber um generics que será HTMLInputElement
// e para usar todos os inputs na props faremos uma operação rest que vai atribuir todas as props

const Input: React.FC <InputProps> = ({ label, name, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>    
    )
    
}

export default Input