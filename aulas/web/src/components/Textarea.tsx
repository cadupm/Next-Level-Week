import React, { TextareaHTMLAttributes } from 'react'

import './Textarea.css'

interface TextareaProps extends TextareaHTMLAttributes <HTMLTextAreaElement> {
    label: string
    name: string
}

// quero que meu componente Textarea receba todas as propriedades que um Textarea HTML padrão receba, 
// logo extenderemos ao TextareaHTMLAttributes que precisa receber um generics que será HTMLTextareaElement
// e para usar todos os Textareas na props faremos uma operação rest que vai atribuir todas as props

const Textarea: React.FC <TextareaProps> = ({ label, name, ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>    
    )
    
}

export default Textarea