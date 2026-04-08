import React from 'react'

function GameScreen({ myPokemon, pcPokemon, onBack }) {
  return (
    <div className="w-[450px] h-[200px] border-4 border-solid flex items-center justify-between p-4">
      <div className="flex flex-col items-center">
        <h2 className="font-bold mb-2">Your Pokémon</h2>
        <p>{myPokemon?.name}</p>
        <img
          src={myPokemon?.sprites?.front_default}
          alt={myPokemon?.name}
          className="w-25 h-25"
        />
      </div>
      
      <div className="text-center">
        <p className="font-bold">VS</p>
      </div>
      
      <div className="flex flex-col items-center">
        <h2 className="font-bold mb-2">PC Pokémon</h2>
        <p>{pcPokemon?.name}</p>
        <img
          src={pcPokemon?.sprites?.front_default}
          alt={pcPokemon?.name}
          className="w-25 h-25"
        />
      </div>
      
      <button 
        onClick={onBack}
        className="absolute bottom-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
    </div>
  )
}

export default GameScreen