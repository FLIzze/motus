"use client";

import Footer from "./components/footer/App";
import Grid from "./components/grid/App";
import './App.css';
import { useEffect } from "react";
import axios from 'axios';
import { animationAtom, currentRowAtom, currentWordAtom, errorMessageAtom, wordAtom, wordsTriedAtom } from "./atom";
import { useAtom } from "jotai";

const App = () => {
  const [word, setWord] = useAtom(wordAtom);
  const [currentWord, setCurrentWord] = useAtom(currentWordAtom);
  const [currentRow, setCurrentRow] = useAtom(currentRowAtom);
  const [, setAnimation] = useAtom(animationAtom);
  const [wordsTried, setWordsTried] = useAtom(wordsTriedAtom);
  const [, setErrorMessage] = useAtom(errorMessageAtom);

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

  const newWord = async () => {
    try {
      const response = await axios.get('https://trouve-mot.fr/api/random');
      console.log(response.data[0].name);
      setWord(response.data[0].name);
    } catch (error) {
      console.error(error);
      setWord("ERROR");
      setWordsTried(["ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR"]);
      setErrorMessage('An error occured while fetching the word');
    }
  }

  return (
    <div className="bg">
      <Grid/>
      <Footer/>
    </div>
  )
}

export default App;