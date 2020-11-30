import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import landingImg from '../assets/images/landing.svg'

import studyIcon from '../assets/images/icons/study.svg'
import giveClassesIcon from '../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../assets/images/icons/purple-heart.svg'
import api from '../services/api'

import './Landing.css'

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => { // primeiro parametro: funcao, segundo parametro: array de dependencias (oq vai precisar pra disparar a funcao) ou basicamento qnd oq tiver dentro do [] mudar ou para renderizar 1x so o []
        api.get('/connections')
            .then(res => {
            const {total} = res.data

            setTotalConnections(total)
            })
    }, []) 



    return (
       <div id="page-landing">
           <div id="page-landing-content" className="container">
               <div className="logo-container">
                   <img src={logoImg} alt="Proffy"/>
                   <h2>Sua Plataforma de estudos online.</h2>
               </div>
               <img src={landingImg}
                    alt="Plataforma de Estudos" 
                    className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to ="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
                </span>
           </div>
       </div>
    )
}

export default Landing