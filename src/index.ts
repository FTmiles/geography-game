
import { apiGetAllCountries, apiGetCountryDetails } from "./api-service";
import {  fromEvent, map, tap } from "rxjs";
import { getRandom1, getRandomMany, pick6RandomCountries, shuffleArray } from "./businessLogic";
import { render } from "./businessLogic";
import { renderGameInterface, taskSection } from "./gameInterface"
import './output.css';
import { SingleCountryData, FullData } from "./interface";
import { BehaviorSubject } from "rxjs";
import Footer from "./Footer";
import Header from "./Header";
import { topicSection } from "./gameInterface";
import { taskHintsDescriptive } from "./businessLogic";
import { Task } from "./Task";



const countries = ['germany', 'spain', 'kenya', 'japan', 'canada', 'australia'];
export let fullData:FullData = {  allCountries: [], allFlags: [], allCapitals: [], allSubregions: [], allPopulations: [], allChinese: []  }


let questionHint =  new BehaviorSubject<string>('Given country: ');
let questionKey = new BehaviorSubject<string>("estone");


export const questionCountryIndSubj = new BehaviorSubject<number>(0);
type FullDataKey = keyof FullData;
export let taskNames: FullDataKey[];
let taskNameKey:FullDataKey = 'allCountries';
let tasksDOM: HTMLElement[] = [];

const logState$ = fromEvent(document.querySelector('footer')  || document.body, 'click');
logState$.subscribe(event=>{
    console.log("touched your body")
    questionKey.next("MicroState")
})

export function nextQuestion () {
    questionCountryIndSubj.next(getRandom1(fullData.allCountries.length - 1))
    tasksDOM.forEach(task=> task.remove())
    addTask();
}

//NEXT QUESTION IMPLEMENTATION
questionCountryIndSubj.subscribe(questionCountryInd => {
    //new value issued equals to game restart / change country
    if (questionCountryInd == null) {
        console.log("questionCountryInd === null, so I'm quitting early guard clause");
        return;
    }
    
    //set / reset game questions
    taskNames = shuffleArray(Object.keys(fullData) as FullDataKey[] );
    // taskNames = Object.keys(fullData) as FullDataKey[];
    taskNames = taskNames.filter(task => task != taskNameKey)
    console.log("taskNames: ", taskNames)
    questionHint.next("Here's a country >> ")
    questionKey.next( fullData.allCountries[questionCountryInd]  )

})

function addTask(){
    let random5: number[] = getRandomMany(fullData.allCountries.length - 1, 5, questionCountryIndSubj.getValue());
    random5.push(questionCountryIndSubj.getValue())
    random5 = shuffleArray(random5);
    console.log("RANDOM 5: ", random5);
    
    const taskName: FullDataKey | undefined = taskNames.shift();
    if (typeof taskName === "undefined") return;

    const options: string[] = random5.map((n:number) => fullData[taskName][n]) //as (string[] | number[] | HTMLElement[]); //without as..., gives  (string | number | HTMLElement)[]
    // const newTask = taskSection(taskHintsDescriptive[taskName], options);
    const newTask: Task = new Task(options, "gimme the shitty!", taskName === 'allFlags', random5.findIndex(x=> x === questionCountryIndSubj.getValue()))
    root?.append(
        newTask.setup()
    );
    // tasksDOM.push(newTask)
}



const countriesSub:any = apiGetAllCountries()
.subscribe({
    next: data => {
        fullData.allCountries = data.map((x:SingleCountryData) => x.country),
        fullData.allChinese = data.map((x:SingleCountryData) => x.chinese),
        fullData.allCapitals = data.map((x:SingleCountryData) => x.capital),
        fullData.allFlags = data.map((x:SingleCountryData) =>  x.flag),
        fullData.allPopulations = data.map((x:SingleCountryData) => x.population.toString()),
        fullData.allSubregions = data.map((x:SingleCountryData) => x.subregion),

        nextQuestion ();
        // questionCountryIndSubj.next( getRandom1(data.length - 1)  )

    },
    error: error => console.error('Error fetching data: ', error),
    complete: () => countriesSub.unsubscribe()
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
        topicSection(questionHint, questionKey)
        // questionSection()
    )
}



renderPage();