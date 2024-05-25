import { fromEvent } from "rxjs";
import { nextQuestion } from "..";



export default function Header(){

    const headerDom : HTMLElement | null = document.querySelector('header');
    if (headerDom  === null) return;
    console.log("header dog", headerDom);
    
    headerDom.className = "bg-primary30-500 font-semibold p-4";
    const h1 = document.createElement('h1');
    h1.className = "text-lg text-center";
    h1.innerText = "Geography Game - Country Quiz";

    const resetButton: HTMLElement = document.createElement('button');
    resetButton.innerText = "reset question"
    resetButton.className = "rounded-md border-b-purple-300 border-2 "
    const buttonObs = fromEvent(resetButton, 'click');
    buttonObs.subscribe(event => nextQuestion())

    headerDom.append(
        h1,
        resetButton
    );


    console.log("THIS IS INSIDE HEADER FUNCTION COMPONENT");
    
    
}