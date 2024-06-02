
import { apiGetAllCountries, apiGetCountryDetails } from "./api-service";
import {  Subject, fromEvent, map, tap } from "rxjs";
import { getRandom1, getRandomMany, shuffleArray } from "./utilities";
import { mainQuestionHintStrings, taskHintsDescriptive, defGameSettings } from "./configs";

import './static/output.css';
import { SingleCountryData, FullData } from "./interface";
import { BehaviorSubject } from "rxjs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { topicSection } from "./components/MainQuestionSection";
import { Task } from "./components/Task";
import { DataKeeper } from "./DataKeeper";
import { CurrentGame } from "./CurrentGame";
// export let fullData:FullData = {  allCountries: [], allFlags: [], allCapitals: [], allSubregions: [], allPopulations: [], allChinese: []  }


let mainQuestionHint =  new BehaviorSubject<string>('');
let mainQuestionKey = new BehaviorSubject<string>('');

export let nextTaskSubj = new Subject<void>();
export let nextMainQSubj = new Subject<void>();

let currentGame: CurrentGame;

const tasksArr: Task[] = [];

nextTaskSubj.subscribe(() => {
    const newTaskName: FullDataKey | undefined = currentGame.getNextTaskName();
    if (!newTaskName) {
        setTimeout(()=>nextMainQSubj.next(), 1000)
        return;
    }

    let task:Task = new Task(
        dataKeeper.fullData[newTaskName],
        taskHintsDescriptive[newTaskName],
        newTaskName === 'allFlags',
        currentGame.currCountryIndex, 
        currentGame.answerOptionCount,
    )
    tasksArr.push(task);

    const stuff = task.setup();
    root?.append( stuff );
    // tasksDOM.push(stuff)
})

    const removeOldTasks = () => {
        tasksArr.forEach(task => task.selfDestruct())
        tasksArr.length = 0;
    }

nextMainQSubj.subscribe(() => {
    removeOldTasks();

    currentGame.nextMainQuestion();

    //renders main-Question on screen
    mainQuestionHint.next(mainQuestionHintStrings[currentGame.mainQuestionChosen])
    mainQuestionKey.next( dataKeeper.fullData[currentGame.mainQuestionChosen][currentGame.currCountryIndex] )
    
    //renders the first task
    nextTaskSubj.next();
})

type FullDataKey = keyof FullData;

//callback after data has been downloaded
const initCurrentGame = () :void => {
    currentGame = new CurrentGame(defGameSettings.answerOptionCount, defGameSettings.taskNames, defGameSettings.mainQuestionOptions, defGameSettings.isMainQuestionRandom, defGameSettings.gameLength )
    nextMainQSubj.next();

}

//init DataKeeper object, download data, then run this callback
const dataKeeper = new DataKeeper(initCurrentGame);
dataKeeper.downloadData();




const logState$ = fromEvent(document.querySelector('footer')  || document.body, 'click');
logState$.subscribe(event=>{
    console.log("touched your body");
    // console.log("tasksDOM > ", tasksDOM)
})





const root = document.getElementById('root');


export function renderPage(){
    const body = document.querySelector('body');
    if (body!==null) body.className = "flex flex-col min-h-screen"
    Header();
    Footer();
    
    if (root === null) return;

    root.className = "grow  bg-gray-500 mx-auto w-full" //max-w-screen-md

    root.append(
        topicSection(mainQuestionHint, mainQuestionKey)
        // questionSection()
    )
}



renderPage();