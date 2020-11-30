import React from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import backIcon from '../assets/images/icons/back.svg'

import './PageHeader.css'

interface PageHeaderProps {
    title: string
    description?: string // o ponto de interrog antes dos dois pontos mostra que a props é nao opcional
}

const PageHeader: React.FC <PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to ='/'>
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description && <p>{props.description}</p> } 
            
            {props.children}
            </div>
            
        </header>
    )
}
// { props.description ? <p>{props.description</p> : null} no entanto podemos nao precisar desse 'else' depois dos dois pontos e podemos usar o && (and) para fazer
// algo que seja sintaxamente valido ou seja, A && B se A for verdadeiro, faça B.

export default PageHeader