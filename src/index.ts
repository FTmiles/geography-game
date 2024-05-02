
import { apiGetAllCountries, apiGetCountryDetails } from "./api-service";
import { map, tap } from "rxjs";
import { pick6RandomCountries } from "./businessLogic";
import { render } from "./businessLogic";
import { renderGameInterface } from "./gameInterface"
import './output.css';
import Header from "./Header";
/*
get all countries by name
https://restcountries.com/v3.1/all?fields=name
https://restcountries.com/v3.1/independent?status=true&fields=name


then randomly choose 1 
https://restcountries.com/v3.1/name/chad

I need
country name
flag
capital
region > subregion
*/

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
    map(countryArr => countryArr.map((country:any) =>  country.name.common)),
    tap((countries: string[]) => setSelected6countries(pick6RandomCountries(countries)))
)
.subscribe({
    next: data => allCountries = data,
    error: error => console.error('Error fetching data: ', error),
    complete: () => countriesSub.unsubscribe()
})

export function setSelected6countries(new6:string[]){
    selected6countries = new6;
    
    renderGameInterface()
    render(new6);
}


