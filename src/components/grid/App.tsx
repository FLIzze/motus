import './grid.css';

interface GridProps {
    word: string,
    currentWord: string,
    currentRow: number,
    wordsTried: string[],
    animation: string
}

const Grid = ({ word, currentWord, currentRow, wordsTried, animation }: GridProps) => {
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
            </div>
        </body>
    )
}

export default Grid;