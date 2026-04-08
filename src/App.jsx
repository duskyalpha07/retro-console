
import { useEffect, useState } from 'react';
import './App.css';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import useFetch from './hooks/useFetch';
import GameScreen from './components/GameScreen';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data, loading, error } = useFetch(url);

  const [pokemones, setPokemones] = useState([]);
  const getListPokemones = () => {
    const list = data?.results?.filter((p) => p.url);
    const plist = list?.map((l) => fetch(l.url).then((res) => res.json()));
    Promise.all(plist).then((values) => {
      console.log('promesa values', values);
      setPokemones(values);
    });
  };

  useEffect(() => {
    getListPokemones();
  }, [data]);

  const[position,setPosition]=useState(1);

  const [myPokeSelection, setMyPokeSelection] = useState([])
  const [pcPokeSelection, setPcPokeSelection] = useState([])

const handleDirection = (direction) => {
  setPosition((prev) => {
    let newPosition = prev;
    if (direction === 'right') {
      newPosition = prev + 1;
    } else if (direction === 'left') {
      newPosition = prev - 1;
    } else if (direction === 'up') {
      newPosition = prev - 4;
    } else if (direction === 'down') {
      newPosition = prev + 4;
    }
    
    if (newPosition < 1) return 1;
    if (newPosition > 100) return 100;
    return newPosition;
  });
};

    function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const computerSelection = () => {
    const rnd = getRandomInt(1,100)
    const pc = pokemones.filter((p) => p.id === rnd);
    setPcPokeSelection(pc);
  }

  const handleSelection =()=>{
    const selectPokemon = pokemones.filter((p) => p.id === position)
    setMyPokeSelection(selectPokemon);
    computerSelection();
  
  };

  console.log(myPokeSelection.length);
  console.log(pcPokeSelection.length);



  return (
    <div className="flex justify-center pt-10">
      <LeftControl handleDirection={handleDirection}/>
      {myPokeSelection.length?(
        <GameScreen myPokemon={myPokeSelection[0]}pcPokemon={pcPokeSelection[0]}onBack={()=> setMyPokeSelection([])}/>
      ):(
      
      <Screen pokemones={pokemones} position={position}/>
      )}
      <RightControl handleSelection={handleSelection}/>
    </div>
  );
}

export default App;
