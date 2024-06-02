import { FullDataKey } from "./interface";
import { getRandom1, shuffleArray } from "./utilities";



export class CurrentGame {
    //stats
    missedCount: number = 0;
    correctCount: number = 0;
    
    //game  setting
    answerOptionCount: number = 6;
    taskNames: FullDataKey[] = [];

    mainQuestionOptions: FullDataKey[] = [];
    isMainQuestionRandom: boolean = false;
    mainQuestionChosen: FullDataKey;

    gameLength: number = 177; //number of countries
    countryIndices: number[] = [];
    currCountryIndex!: number;

    //under current Main Question
    taskNamesShuffled: FullDataKey[] = [];
    tasksDOM: HTMLElement[] = [];


    constructor(answerOptionCount:number, taskNames: FullDataKey[], mainQuestionOptions: FullDataKey[], isMainQuestionRandom: boolean, gameLength: number) {
        this.answerOptionCount = answerOptionCount;
        this.taskNames = taskNames;
        this.gameLength = gameLength;

        this.mainQuestionOptions = mainQuestionOptions;
        this.isMainQuestionRandom = isMainQuestionRandom;
        this.mainQuestionChosen = mainQuestionOptions[0];
    }

    getNextTaskName(): FullDataKey | undefined {
            return this.taskNamesShuffled.pop();
    }

    nextMainQuestion() {
        this.currCountryIndex = this.getNextGameSequenceCountryIndex();

        if (this.isMainQuestionRandom) 
            this.mainQuestionChosen = this.mainQuestionOptions[getRandom1(this.mainQuestionOptions.length)]

        this.taskNamesShuffled = shuffleArray(this.taskNames)
        this.tasksDOM.forEach(task=> task.remove())
    }

    getNextGameSequenceCountryIndex (): number {
        const nextCountryIndex: number | undefined = this.countryIndices.pop();
        if (nextCountryIndex)
            return nextCountryIndex;

        this.countryIndices  = this.getShuffledArray0ToN(this.gameLength -1);
        return this.getNextGameSequenceCountryIndex();        

    }

    getShuffledArray0ToN(n:number):number[] {
        let newArray = [...Array(n).keys()]
        return shuffleArray(newArray);
    }

    

}