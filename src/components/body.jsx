import bgImage from '../assets/the-simpsons-background.jpg'
import { useState } from 'react'
import MemoryCard from './memory-card';
import GameOver from './game-over';

function Body({characters, columns, handleCardClick, bestScore, handleReset, reset}) {
    
    const sectionStyle = {
        backgroundImage: `linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%), url(${bgImage})`,
    };

    return (
           
        <section className='game-body' style={sectionStyle}>
            {(reset) ? (
                    <GameOver bestScore={bestScore} handleReset={handleReset}/>
                ):
                <div className='memory-card-section'  style={{'--columns': columns}}>
                    {characters.map((character) => (
                        <MemoryCard character={character} key={character.id} handleCardClick={handleCardClick}/>
                    ))}
                </div>
            }
        </section>
        
    )
}

export default Body
