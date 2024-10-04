import { atom } from "jotai";

export const wordAtom = atom('UUIDV4IFEBAF39HF#(#(#FEFAENO');

export const currentWordAtom = atom('');

export const currentRowAtom = atom(0);

export const wordsTriedAtom = atom<string[]>([]);

export const animationAtom = atom('');

export const errorMessageAtom = atom('');