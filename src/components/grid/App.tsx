import { useAtom } from 'jotai';
import './grid.css';
import { animationAtom, currentRowAtom, currentWordAtom, errorMessageAtom, wordAtom, wordsTriedAtom } from '../../atom';

const Grid = () => {
    const [word] = useAtom(wordAtom);
    const [currentRow] = useAtom(currentRowAtom);
    const [currentWord] = useAtom(currentWordAtom);
    const [wordsTried] = useAtom(wordsTriedAtom);
    const [animation] = useAtom(animationAtom);
    const [errorMessage] = useAtom(errorMessageAtom);

    return (
        <body>
            <div className="gridHolder">
                {Array.from({ length: 6 }).map((_, colIndex) => (
                    <div className='rowDirection' key={colIndex}>
                        {Array.from({ length: word.length }).map((_, rowIndex) => (
                            <div
                                className='grid'
                                key={rowIndex}
                            >
                                {colIndex === currentRow && (
                                    <div>
                                        {currentWord[rowIndex]}
                                    </div>
                                )}

                                {wordsTried[colIndex] !== undefined && (
                                    <div
                                        style={
                                            wordsTried[colIndex][rowIndex].toLocaleLowerCase() === word[rowIndex] ?
                                                { backgroundColor: '#3EAA42' } : word.includes(wordsTried[colIndex][rowIndex].toLocaleLowerCase()) ?
                                                    { backgroundColor: '#CD8729' } : { backgroundColor: '#3A3A3C' }
                                        }
                                        className={`lastAttempt ${animation === 'success' ? 'jumpAnimation' : 'shakeAnimation'}`}
                                    >
                                        {wordsTried[colIndex][rowIndex]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}

                {errorMessage !== "" && (
                    <div className='errorContainer'>
                        <p className='errorMessage'>{errorMessage}</p>
                        <button
                            onClick={() => location.reload()}
                            className='reloadButton'
                        >RELOAD</button>
                    </div>
                )}
            </div>
        </body>
    )
}

export default Grid;