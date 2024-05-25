
import { questionCountryIndSubj, fullData } from ".";
import { BehaviorSubject } from "rxjs";
import { FullData } from "./interface";

const root = document.getElementById('root');


export const questionHintStrings = {
    allCountries: "Given info - country: ",
    allFlags: "Given info - flag: ",
    allCapitals: "Given info - capital city: ",
    allChinese: "Given info - Chinese name: "
}

export function pick6RandomCountries(countries: string[]){
    const maxIndex = countries.length - 1;
    let countries6:string[] = [];

    for (let i = 0; i < 6; i++) countries6.push( 
        countries[
            Math.floor( (maxIndex + 1) * Math.random()  )
        ]        
     )
     return countries6;
}

export function render(countries: string[]){

    


};

/**
 *Returns random number from zero to max
 *
 * Including 0, including max
 * */ 
export function getRandom1 (max: number) {
    return Math.floor(Math.random() * (max + 1))
}

/**
 * Returns [ 0 <= random num <= max ]
 * 
 * excludes the "exclude" param
 * 
 * array el  count = howMany
 */
export function getRandomMany (max: number, howMany: number, exclude: number)  {
    let arr = [...Array(howMany)]

    arr = arr.map(()=>{
        let num;
        do num = getRandom1(max);
        while (num == exclude)
        return num;
    })

    return arr;
}

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  export const taskHintsDescriptive:  { [key: string]: string } = {
    allCountries: "Name the country",
    allFlagsEl: "Pick the flag",
    allCapitals: "What is the capital city?",
    allSubregions: "Where is the country located?",
    allPopulations: "Guess the population",
    allChinese: "In Chinese"
  }