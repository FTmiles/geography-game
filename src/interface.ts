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