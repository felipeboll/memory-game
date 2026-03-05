import { useState } from 'react'
import memoryGameLog from '../assets/Memory-Game.png'
import simpsonsLogo from '../assets/The-Simpsons-yellow-logo.png'


function Header({score, bestScore}) {

  return (
    <>
        <header className="header">
            <div>
                <img src={simpsonsLogo} alt="The Simpsons Logo" className="logo" style={{ width: '100px'}}/>
                <h2 className='red-separator'>|</h2>
                <img src={memoryGameLog} alt="Memory Game Logo" className="logo" style={{ width: '190px'}}/>
            </div>
            <h2>Score: {score} <span className='red-separator'>|</span> Best Score: {bestScore}</h2>
        </header>
    </>
  )
}

export default Header
