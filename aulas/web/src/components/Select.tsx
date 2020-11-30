import React, { SelectHTMLAttributes } from 'react'

import './Select.css'

interface SelectProps extends SelectHTMLAttributes <HTMLSelectElement> {
    label: string
    name: string
    options: Array<{
        value: string
        label: string
    }>
}

// quero que meu componente Select receba todas as propriedades que um Select HTML padrão receba, 
// logo extenderemos ao SelectHTMLAttributes que precisa receber um generics que será HTMLSelectElement
// e para usar todos os Selects na props faremos uma operação rest que vai atribuir todas as props

const Select: React.FC <SelectProps> = ({ label, name, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option value='' disabled hidden>Selecione uma opção</option>
                { options.map(option => {
                    return (
                        <option key={option.value} value={option.value} label={option.label}></option>
                    )
                })}
            </select>
        </div>    
    )
    
}

export default Select