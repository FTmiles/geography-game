export interface SingleCountryData {
    capital: string;
    chinese: string;
    country: string;
    flag: string;
    population: number;
    subregion: string;
}

export interface FullData {
    allCountries: string[];
    allFlags: string[];
    allCapitals: string[];
    allSubregions: string[];
    allPopulations: string[];
    allChinese: string[];
}

export type FullDataKey = keyof FullData;

export interface DefGameSettings {
    answerOptionCount: number,
    taskNames:  FullDataKey[],
    mainQuestionOptions: FullDataKey[],
    isMainQuestionRandom: boolean,
    gameLength: number,
}


export interface GameStats {
    hits: number,
    misses: number
}