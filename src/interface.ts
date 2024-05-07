export interface SingleCountryData {
    capital: string,
    chinese: string,
    country: string,
    flag: string,
    population: number,
    subregion: string
}

export interface FullData {
    allCountries: string[],
    allFlagsEl: HTMLElement[],
    allCapitals: string[],
    allSubregions: string[],
    allPopulations: number[],
    allChinese: string[]
}