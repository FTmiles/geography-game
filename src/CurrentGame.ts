import { FullData } from "./interface";
import { getRandom1, shuffleArray } from "./utilities";
import { questionCountryIndSubj } from ".";

type FullDataKey = keyof FullData;

export class CurrentGame {
    //stats
    missedCount: number = 0;
    correctCount: number = 0;
    
    //game  setting
    answerOptionCount: number = 6;
    taskNames: FullDataKey[] = [];
    
    mainQuestion: FullDataKey | undefined = 'allCountries';
    mainQuestionRandom: boolean = false;
    mainQuestionOptions: FullDataKey[] = [];

    gameLength: number = 177; //number of countries
    gameSequenceCountryIndices: number[] = [];

    //under current Main Question
    taskNamesShuffled: FullDataKey[] = [];
    tasksDOM: HTMLElement[] = [];


    getMainQuestion() {
        if (this.mainQuestionRandom) 
            return this.mainQuestionOptions[getRandom1(this.mainQuestionOptions.length)]
        else 
            return this.mainQuestion;
    }

    nextMainQuestion() {
        this.taskNamesShuffled = shuffleArray(this.taskNames)
        questionCountryIndSubj.next(this.getNextGameSequenceCountryIndex())
        this.tasksDOM.forEach(task=> task.remove())
    }

    getNextGameSequenceCountryIndex (): number {
        const nextCountryIndex: number | undefined = this.gameSequenceCountryIndices.pop();
        if (nextCountryIndex)
            return nextCountryIndex;

        // this.resetGameSequenceCountryIndices();
        this.gameSequenceCountryIndices  = this.getShuffledArray0ToN(this.gameLength -1);
        return this.getNextGameSequenceCountryIndex();        

    }

    getShuffledArray0ToN(n:number):number[] {
        let newArray = [...Array(n).keys()]
        return shuffleArray(newArray);
    }
    // resetGameSequenceCountryIndices() {
    //     let newArray = [...Array(this.gameLength -1).keys()]
    //     this.gameSequenceCountryIndices = shuffleArray(newArray);
    // }

}