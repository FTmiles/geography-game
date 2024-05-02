import { from, switchMap, take } from "rxjs"

const apiUrl = 'https://restcountries.com/v3.1'
const urlAllData = 'https://restcountries.com/v3.1/independent?status=true&fields=name,translations,flags,population,capital,subregion'
const urlFindByCountry = '/name/' //e.g. /name/germany

function getData(url:string){
return from(fetch(url))
        .pipe(
            switchMap(response => {
                if (!response.ok) throw new Error("Network response NOT ok")
                return from(response.json())
            }),
            take(1)
)


}

export const apiGetAllCountries = () => {
    return getData(urlAllData)
}

export const apiGetCountryDetails = (country:string) => {
    return getData(apiUrl + urlFindByCountry + country)
}