import Footer from "./Footer";
import Header from "./Header";

const root = document.getElementById('root');


export function pick6RandomCountries(countries: string[]){
    const maxIndex = countries.length - 1;
    let countries6:string[] = [];

    for (let i = 0; i < 6; i++) countries6.push( 
        countries[
            Math.floor( (maxIndex + 1) * Math.random()  )
        ]        
     )
     return countries6;
}

export function render(countries: string[]){
    const body = document.querySelector('body');
    if (body!==null) body.className = "flex flex-col min-h-screen"
    Header();
    Footer();
    
    const ul = document.createElement("ul");

    countries.forEach(country => {
        const li: HTMLElement = document.createElement("li");
        li.innerText = country;
        ul.appendChild(li);
    });

    root?.append(ul)

};

function game () {
    
}

