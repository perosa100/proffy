import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import study from '../../assets/images/icons/study.svg'
import landingImg from '../../assets/images/landing.svg'
import logoImg from '../../assets/images/logo.svg'
import api from '../../services/api'
import './styles.css'
const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState<number>(0)

  useEffect(() => {
    api.get('connections').then((response) => {
      setTotalConnections(response.data.total)
    })
  }, [])
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua Plataforma de estudos online.</h2>
        </div>

        <img src={landingImg} alt="" className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={study} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar Aulas" />
            Dar Aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões ja realizads{' '}
          <img src={purpleHeartIcon} alt="coraçao roxo" />
        </span>
      </div>
    </div>
  )
}

export default Landing
