import { useState } from 'react'

function MemoryCard({character, handleCardClick}) {

  return (
    <div className='memory-card' onClick={() => handleCardClick(character.id)}>
        <img src={character.image} className='memory-card-image'></img>
        <h3>{character.name}</h3>
    </div>
  )
}

export default MemoryCard
