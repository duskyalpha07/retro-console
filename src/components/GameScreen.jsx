import React, { useEffect, useState } from 'react'

function GameScreen({ myPokemon, pcPokemon, onBack }) {
  const [myHP, setMyHP] = useState(100);
  const [pcHP, setPcHP] = useState(100);
  const [turn, setTurn] = useState('player');
  const [message, setMessage] = useState('Tu turno');

  useEffect(() => {
    if (turn === 'pc' && pcHP > 0 && myHP > 0) {
      const timer = setTimeout(() => {
        const randomMove = pcPokemon.moves[Math.floor(Math.random() * pcPokemon.moves.length)];
        const damage = randomMove.attack;

        setMyHP((prev) => Math.max(0, prev - damage));
        setMessage(`PC usó ${randomMove.name}`);
        setTurn('player'); 
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [turn, pcHP, myHP, pcPokemon]);

  const dealPlayerDmg = (move) => {
    if (turn !== 'player' || pcHP <= 0 || myHP <= 0) return;

    const damage = move.attack;
    setPcHP((prev) => Math.max(0, prev - damage));
    setMessage(`Usaste ${move.name}!`);
    
    if (pcHP - damage <= 0) {
      setMessage('¡Ganaste!');
    } else {
      setTurn('pc');
    }
  }

  return (
    <div className="relative w-[500px] min-h-[300px] border-4 border-slate-700 flex flex-col items-center p-4 bg-white rounded-xl">
      
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-xs uppercase">Tu Pokémon</h2>
          <p className="capitalize italic">{myPokemon?.name}</p>
          <div className='bg-gray-200 w-24 rounded-full h-2.5 mb-1 mt-2'>
            <div 
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${myHP}%` }}
            ></div>
          </div>
          <p className="text-sm text-red-600 font-bold">HP: {myHP}/100</p>
          <img src={myPokemon?.sprites?.back_default} alt={myPokemon?.name} className="w-20 h-20" />
        </div>

        <div className="font-black text-gray-300">VS</div>

        <div className="flex flex-col items-center">
          <h2 className="font-bold text-xs uppercase">PC Pokémon</h2>
          <p className="capitalize italic">{pcPokemon?.name}</p>
          <div className='bg-gray-200 w-24 rounded-full h-2.5 mb-1 mt-2'>
            <div 
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${pcHP}%` }}
            ></div>
          </div>
          <p className="text-sm text-red-600 font-bold">HP: {pcHP}/100</p>
          <img src={pcPokemon?.sprites?.front_default} alt={pcPokemon?.name} className="w-20 h-20" />
        </div>
      </div>

      <div className="mb-4 text-center font-medium text-blue-800 bg-blue-50 px-4 py-1 rounded-full border border-blue-200">
        {message}
      </div>

      <div className='grid grid-cols-2 gap-2 w-full'>
        {myPokemon?.moves?.map((move, index) => (
          <button
            key={index}
            onClick={() => dealPlayerDmg(move)}
            disabled={turn !== 'player' || myHP <= 0 || pcHP <= 0}
            className='bg-slate-800 hover:bg-slate-700 disabled:bg-gray-300 text-white text-[10px] uppercase font-bold py-2 px-2 rounded transition-all'
          > 
            {move.name} 
          </button>
        ))}
      </div>

      <button 
        onClick={onBack}
        className="mt-6 text-gray-400 hover:text-black text-xs font-bold uppercase tracking-widest"
      >
        Back
      </button>
    </div>
  )
}

export default GameScreen