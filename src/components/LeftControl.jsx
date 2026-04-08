import React from 'react'

function LeftControl({handleDirection}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div>LeftControl</div>
      <div className="flex flex-col items-center">
        <button
        onClick={()=>handleDirection('up')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
          ↑
        </button>
        <div className="flex gap-2">
          <button
          onClick={()=>handleDirection('left')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            ←
          </button>
          <button
          onClick={()=>handleDirection('down')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            ↓
          </button>
          <button
          onClick={()=>handleDirection('right')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            →
          </button>
        </div>
      </div>
    </div>
  )
}


export default LeftControl