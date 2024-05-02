export default function Header(){

    const headerDom : HTMLElement | null = document.querySelector('header');
    if (headerDom  === null) return;
    console.log("header dog", headerDom);
    
    headerDom.className = "bg-sky-300 font-semibold p-4";
    const h1 = document.createElement('h1');
    h1.className = "text-lg text-center";
    h1.innerText = "Geography Game - Country Quiz";
    headerDom.append(h1);


    console.log("THIS IS INSIDE HEADER FUNCTION COMPONENT");
    
    
}