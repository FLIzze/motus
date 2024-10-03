import Footer from "./components/footer/App";
import Grid from "./components/grid/App";
import './App.css';
import { useEffect, useState } from "react";
import motsFrancais from "./frenchWords";

const App = () => {
  const [word, setWord] = useState<string>("UUIDV4IFEBAF39HF#(#(#FEFAENO");

  const [currentWord, setCurrentWord] = useState<string>("");

  const [currentRow, setCurrentRow] = useState<number>(0);

  const [wordsTried, setWordsTried] = useState<string[]>([]);

  const [animation, setAnimation] = useState<string>('');

  useEffect(() => {
    newWord();
  }, [])

  useEffect(() => {
    if (word === currentWord.toLocaleLowerCase()) {
      alert("You won !");
      location.reload();
    } else if (currentRow === 6) {
      alert("You lost !");
      location.reload();
    } else if (word.length == currentWord.length) {      
      setWordsTried([...wordsTried, currentWord]);
      setCurrentRow(currentRow + 1);
      setCurrentWord('');
    }
  }, [currentWord, word, setCurrentWord, setCurrentRow, setAnimation]);

  useEffect(() => {
    if (wordsTried.length > 0) {
      setAnimation('fail');
      wordsTried[wordsTried.length - 1]
      for (let i = 0; i < wordsTried[wordsTried.length - 1].length; i++) {
        if (word.includes(wordsTried[wordsTried.length - 1][i].toLocaleLowerCase())) {
          setAnimation('success');
          break;
        }
      }
    }
  }, [wordsTried])

  const newWord = () => {
    setWord(motsFrancais[Math.floor(Math.random() * motsFrancais.length)]);
  }

  return (
    <div className="bg">
      <Grid
        word={word}
        currentWord={currentWord}
        currentRow={currentRow}
        wordsTried={wordsTried}
        animation={animation}
      />
      <Footer
        setCurrentWord={setCurrentWord}
      />
    </div>
  )
}

export default App;