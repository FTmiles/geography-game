
import { apiGetAllCountries, apiGetCountryDetails } from "./api-service";
import { map, tap } from "rxjs";
import { pick6RandomCountries } from "./businessLogic";
import { render } from "./businessLogic";
import { renderGameInterface } from "./gameInterface"
import './output.css';



const countries = ['germany', 'spain', 'kenya', 'japan', 'canada', 'australia'];

const subscription = apiGetCountryDetails("latvia").subscribe({ 
    next: data=> {
        return console.log(data);
    },
    error: error => console.error('Error fetching data:', error),
    complete: () => {subscription.unsubscribe();console.log("unsubbing");}
})



let allCountries:string[];
let selected6countries:string[];

const countriesSub:any = apiGetAllCountries()
.pipe(
    map(countryArr => countryArr.map((country:any) => ({
        country: country.name.common,
        flag: country.flags.svg || country.flags.png,
        capital: country.capital.join(", "),
        subregion: country.subregion,
        chinese: country.translations.zho?.common || country.name.nativeName.zho.common,
        population: country.population,
    })))

)
.subscribe({
    next: data => {
        allCountries = data,
        setSelected6countries(pick6RandomCountries(data.map((x:any)=>x.name)))
    },
    error: error => console.error('Error fetching data: ', error),
    complete: () => countriesSub.unsubscribe()
})

export function setSelected6countries(new6:string[]){
    selected6countries = new6;
    
    renderGameInterface()
    render(new6);
}


