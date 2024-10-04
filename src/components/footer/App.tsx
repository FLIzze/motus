import { useEffect } from "react";
import "./footer.css";
import { useAtom } from "jotai";
import { currentWordAtom } from "../../atom";

const Footer = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [, setCurrentWord] = useAtom(currentWordAtom);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Backspace") {
                setCurrentWord((prev) => prev.slice(0, prev.length - 1));
            } else if (alphabet.includes(e.key.toUpperCase())) {
                setCurrentWord((prev) => prev + e.key.toUpperCase());
            } 
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setCurrentWord]);

    return (
        <footer className="footer">
            <div className="input">
                {alphabet.map((letter, index) => (
                    <button 
                        key={index}
                        className="letter"
                        onClick={() => setCurrentWord((prev) => prev + letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </footer>
    );
}

export default Footer;