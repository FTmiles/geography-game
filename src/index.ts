
import { apiGetAllCountries, apiGetCountryDetails } from "./api-service";
import { map, tap } from "rxjs";
import { getRandom1, pick6RandomCountries } from "./businessLogic";
import { render } from "./businessLogic";
import { renderGameInterface } from "./gameInterface"
import './output.css';
import { SingleCountryData, FullData } from "./interface";
import { BehaviorSubject } from "rxjs";

const countries = ['germany', 'spain', 'kenya', 'japan', 'canada', 'australia'];
let fullData:FullData = {  allCountries: [], allFlagsEl: [], allCapitals: [], allSubregions: [], allPopulations: [], allChinese: []  }

// let allCountries: string[];
// let allFlagsEl: HTMLElement[];
// let allCapitals: string[];
// let allSubregions: string[];
// let allPopulations: number[];
// let allChinese: string[];

let topicCountryInd: number;
let startTopicSubjec = new BehaviorSubject(null);

let selected6countries:string[];


const subscription = apiGetCountryDetails("latvia").subscribe({ 
    next: data=> {
        return console.log(data);
    },
    error: error => console.error('Error fetching data:', error),
    complete: () => {subscription.unsubscribe();console.log("unsubbing");}
})


const countriesSub:any = apiGetAllCountries()
.subscribe({
    next: data => {
        fullData.allCountries = data.map((x:SingleCountryData) => x.country),
        fullData.allChinese = data.map((x:SingleCountryData) => x.chinese),
        fullData.allCapitals = data.map((x:SingleCountryData) => x.capital),
        fullData.allFlagsEl = data.map((x:SingleCountryData) => {
            let el = document.createElement('img');
            el.src = x.flag;
            return el;
        }),
        fullData.allPopulations = data.map((x:SingleCountryData) => x.population),
        fullData.allSubregions = data.map((x:SingleCountryData) => x.subregion),

        topicCountryInd = getRandom1(fullData.allCountries.length);

        setSelected6countries(pick6RandomCountries(fullData.allCountries))
    },
    error: error => console.error('Error fetching data: ', error),
    complete: () => countriesSub.unsubscribe()
})

getRandom1(2)


export function setSelected6countries(new6:string[]){
    selected6countries = new6;
    
    renderGameInterface()
    render(new6);
}


