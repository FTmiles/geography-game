export interface FullData {
    allCountries: string[];
    allPopulations: number[];
}

const data:FullData = {
    allCountries: ['Estonia', 'Spain', 'Chad'],
    allPopulations:  [11111, 22222, 333333333]
}


type ty = keyof FullData;

const keys:ty[] = Object.keys(data) as ty[];  // ['allCountries', 'allPopulations']

let prop: ty = keys[Math.floor(Math.random() * 2)]; //random 0 or 1     = random 'allCountries' or 'allPopulations'


let tt = data[prop]
const bb = [0, 1].map(n => tt[n]) as (string[] | number[]);
