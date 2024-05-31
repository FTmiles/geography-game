import { SingleCountryData, FullData } from "./interface";
import { apiGetAllCountries } from "./api-service";
import { Subject } from "rxjs";

type callback = () => void;

export class DataKeeper {
    fullData:FullData = {  allCountries: [], allFlags: [], allCapitals: [], allSubregions: [], allPopulations: [], allChinese: []  };
    callbackInitCurrGame: callback;
    
    constructor(callbackInitCurrGame:callback) {
        this.callbackInitCurrGame = callbackInitCurrGame;
    }
    
    downloadData() {
        const countriesSub:any = apiGetAllCountries()
        .subscribe({
            next: data => {
                this.fullData.allCountries = data.map((x:SingleCountryData) => x.country),
                this.fullData.allChinese = data.map((x:SingleCountryData) => x.chinese),
                this.fullData.allCapitals = data.map((x:SingleCountryData) => x.capital),
                this.fullData.allFlags = data.map((x:SingleCountryData) =>  x.flag),
                this.fullData.allPopulations = data.map((x:SingleCountryData) => x.population.toString()),
                this.fullData.allSubregions = data.map((x:SingleCountryData) => x.subregion)
            },
            error: error => console.error('Error fetching data: ', error),
            complete: () => {
                countriesSub.unsubscribe();
                this.callbackInitCurrGame();
            }
        })
    }

}