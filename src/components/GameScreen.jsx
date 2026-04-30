import React, { useEffect, useState } from 'react'

function GameScreen({ myPokemon, pcPokemon, onBack }) {
  const [myHP, setMyHP] = useState(100);
  const [pcHP, setPcHP] = useState(100);
  const [turn, setTurn] = useState('player');
  const [message, setMessage] = useState('Your turn');

  useEffect(() => {
    if (turn === 'pc' && pcHP > 0 && myHP > 0) {
      const timer = setTimeout(() => {
        const randomMove = pcPokemon.moves[Math.floor(Math.random() * pcPokemon.moves.length)];
        const damage = randomMove.attack;

          setMyHP((prev) => {
        const newHP = Math.max(0, prev - damage);
        if (newHP <= 0) {
          setMessage(`Enemy used ${randomMove.name}. You lost!`);
        } else {
          setMessage(`Enemy used ${randomMove.name}`);
          setTurn('player');
        }
        return newHP;
      });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [turn, pcHP, myHP, pcPokemon]);

  const dealPlayerDmg = (move) => {
    if (turn !== 'player' || pcHP <= 0 || myHP <= 0) return;

    const damage = move.attack;
    setPcHP((prev) => Math.max(0, prev - damage));
    setMessage(`You used ${move.name}!`);
    
    if (pcHP - damage <= 0) {
      setMessage('You won!');
    } else {
      setTurn('pc');
    }
  }

  return (
    <div className="w-[450px] h-[300px] bg-gray-900 border-[8px] border-y-[12px] border-gray-900 flex flex-col items-center justify-center p-1 shadow-2xl relative">
      <div className="w-full h-full bg-slate-800 rounded overflow-hidden flex flex-col items-center p-2 relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-2 border-black">
        <button 
          onClick={onBack}
          className="absolute top-2 left-2 text-white/50 hover:text-white text-[10px] font-bold uppercase z-20 transition-colors"
        >
          &lt; Back
        </button>

        <div className="flex w-full justify-between items-center mb-2 mt-4 px-4">
          <div className="flex flex-col items-center z-10 w-1/3">
            <h2 className="font-bold text-[10px] uppercase text-gray-400 tracking-wider">My Pokémon</h2>
            <p className="capitalize italic text-white font-medium text-xs">{myPokemon?.name}</p>
            <div className='bg-gray-900 w-full rounded-full h-1.5 mb-1 mt-1 border border-gray-700'>
              <div 
                className="bg-green-400 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_5px_#4ade80]" 
                style={{ width: `${myHP}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-300">{myHP}/100 HP</p>
            <img src={myPokemon?.sprites?.back_default} alt={myPokemon?.name} className="w-20 h-20 drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
          </div>
          <div className="font-black text-yellow-400 text-2xl italic opacity-80 z-0">VS</div>
          <div className="flex flex-col items-center z-10 w-1/3">
            <h2 className="font-bold text-[10px] uppercase text-gray-400 tracking-wider">Enemy</h2>
            <p className="capitalize italic text-white font-medium text-xs">{pcPokemon?.name}</p>
            <div className='bg-gray-900 w-full rounded-full h-1.5 mb-1 mt-1 border border-gray-700'>
              <div 
                className="bg-red-400 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_5px_#f87171]" 
                style={{ width: `${pcHP}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-300">{pcHP}/100 HP</p>
            <img src={pcPokemon?.sprites?.front_default} alt={pcPokemon?.name} className="w-20 h-20 drop-shadow-md" style={{ imageRendering: 'pixelated' }} />
          </div>
        </div>
        <p className="text-[10px] text-yellow-400/80 font-bold uppercase tracking-widest mb-2 mt-auto text-center w-full">
          {message}
        </p>
        <div className='grid grid-cols-2 gap-2 w-[90%] mt-auto mb-2'>
          {myPokemon?.moves?.map((move, index) => (
            <button
              key={index}
              onClick={() => dealPlayerDmg(move)}
              disabled={turn !== 'player' || myHP <= 0 || pcHP <= 0}
              className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:border-gray-800 text-white text-[10px] uppercase font-bold py-1.5 px-2 rounded border-b-4 border-blue-800 transition-all'
            > 
              {move.name} 
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameScreen