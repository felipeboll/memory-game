import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header.jsx'
import Body from './components/body.jsx'

const characterApiUrl = 'https://thesimpsonsapi.com/api/characters/'; 
const portraitImage = 'https://cdn.thesimpsonsapi.com/1280';

function App() {
  const [characters, setCharacters] = useState([]);
  const [board, setBoard] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [reset, setReset] = useState(false);

  const levelConfig = [
    { cards: 4, cols: 2 },  
    { cards: 6, cols: 3 },   
    { cards: 9, cols: 3 },   
    { cards: 12, cols: 4 },  
    { cards: 15, cols: 5 },  
    { cards: 18, cols: 6 },  
  ];

  const levelThresholds = levelConfig.map((_, i) => 
    levelConfig.slice(0, i + 1).reduce((acc, l) => acc + l.cards, 0)
  );
 

  useEffect(() => {

    const loadCharacters = async () => {
      const INITIAL_BATCH = 4;
      const TOTAL = 64;

      const fetchCharacter = async () => {
        const characterId = getRandomInt(0, 1182);
        const response = await fetch(`${characterApiUrl}${characterId}`);
        const data = await response.json();
        return {
          name: data.name,
          image: `${portraitImage}${data.portrait_path}`,
          wasClicked: false,
          id: characterId,
        };
      };

      // Load first batch in parallel
      const firstBatch = await Promise.allSettled(
        Array.from({ length: Math.min(INITIAL_BATCH, TOTAL) }, fetchCharacter)
      );
      const initialChars = firstBatch
        .filter(item => item.status === "fulfilled")
        .map(item => item.value);
      
      setCharacters(initialChars);
      setBoard(initialChars)

      // Load remaining in parallel
      const remaining = TOTAL - INITIAL_BATCH;
      if (remaining > 0) {
        const restBatch = await Promise.allSettled(
          Array.from({ length: remaining }, fetchCharacter)
        );
        const restChars = restBatch
          .filter(item => item.status === "fulfilled")
          .map(item => item.value);

        setCharacters(prev => [...prev, ...restChars]);
      }
    };

    loadCharacters();

  }, []);

  useEffect(() => {

    if(level != 0){
      setNewBoard();
    }

  }, [level]);

  function setNewBoard(currentLevel = level){
    const newBoard = characters
          .filter(item => item.wasClicked === false)
          .sort(() => Math.random() - 0.5)
          .slice(0, levelConfig[currentLevel].cards)
          console.log(newBoard);
          setBoard(newBoard);
  }

  function shuffleBoard(){
    let i = board.length, j, temp;
    let newBoard = board;

    while (--i > 0){
      const j = Math.floor(Math.random() * (i + 1));

      temp = board[i];

      newBoard[i] = newBoard[j];
      newBoard[j] = temp;

      setBoard(newBoard);
    }
  }

  const handleReset = () =>{
      setScore(0);
      setLevel(0);
      setReset(false);
      setNewBoard(0);
  }

  function handleCardClick(id){

    const character = characters.find(c => c.id === id);

    if(character.wasClicked === true){
      setBestScore(score);
      setReset(true);
    }else{

      const newScore = score + 1;
      const newCharactersInfo = characters.map((item) => {
          if(item.id === id){
            return {...item, wasClicked: true };
          }
          return item;
        }

      );
    
      setScore(newScore);

      console.log(score);
      
      if (newScore === levelThresholds[level]) {
          setLevel(level + 1);
      }

      shuffleBoard();

      setCharacters(newCharactersInfo);
      
    }

  }


  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <Header
        score={score}
        bestScore={bestScore}
      />
      <Body reset={reset} handleReset={handleReset} bestScore={bestScore} characters={board} columns={levelConfig[level].cols} handleCardClick={handleCardClick}/>
    </>
  )
}

export default App
