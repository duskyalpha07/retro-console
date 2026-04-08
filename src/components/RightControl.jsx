import React from 'react'

function RightControl({handleSelection}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div>RightControl</div>
      <div className="flex flex-col items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
          X
        </button>
        <div className="flex gap-2">
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Y
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            B
          </button>
          <button onClick={handleSelection}className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            A
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightControl