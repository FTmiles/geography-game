import { DefGameSettings } from "./interface"
import { FullDataKey } from "./interface"

export const taskHintsDescriptive:  { [key in FullDataKey]: string } = {
    allCountries: "Name the country",
    allFlags: "Pick the flag",
    allCapitals: "What is the capital city?",
    allSubregions: "Where is the country located?",
    allPopulations: "Guess the population",
    allChinese: "In Chinese"
  }

  

  export const mainQuestionHintStrings: {[key in FullDataKey]: string } = {
    allCountries: "Given info - country: ",
    allFlags: "Given info - flag: ",
    allCapitals: "Given info - capital city: ",
    allChinese: "Given info - Chinese name: ",
    
    allSubregions: "never gonna give you this",
    allPopulations: "never gonna give you this",
}

//default game settings will be rendered to the header, later user can change these settings
export const defGameSettings:DefGameSettings = {
    answerOptionCount: 6,
    taskNames:  ["allFlags", "allCapitals", "allSubregions", "allPopulations", "allChinese"],
    mainQuestionOptions: ["allCountries"],
    isMainQuestionRandom: false,     
    gameLength: 188,
}