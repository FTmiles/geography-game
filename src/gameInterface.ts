


const root = document.getElementById('root');

export function renderGameInterface() {
    if (root === null) return;

    root.className = "grow  bg-gray-500 mx-auto w-full" //max-w-screen-md

    root.append(
        topicSection(),
        questionSection()
    )
       
        
}

function topicSection() {
    const topicSection = document.createElement("section");
    topicSection.className = "flex justify-evenly"

    const hint:HTMLElement = document.createElement('div');
    hint.className = "bg-orange-300 text-lg ";
    hint.innerText = "Country: ";

    const suppliedInfo:HTMLElement = document.createElement('div');
    suppliedInfo.className = "text-lg"
    suppliedInfo.innerText = "Estonia";

    topicSection.append(hint, suppliedInfo)

    return topicSection;
}

function questionSection()  {
    const questionSection = document.createElement("section");
    const hint: HTMLElement = document.createElement("div");
    hint.className = "w-200 bg-yellow-200";
    hint.innerText = "Capital city:";
    
    const optionsDiv: HTMLElement = document.createElement("div");
    
    const option = (optionContent:string | HTMLElement) => {
        const wrapper: HTMLElement = document.createElement("div");
        wrapper.className = "w-1/3 h-40 bg-red-500 inline-block p-3"
        const optionDiv: HTMLElement = document.createElement("div");
        if (typeof optionContent === "string") optionDiv.innerText = optionContent;
            else optionDiv.append(optionContent)
        optionDiv.className = "w-full h-full bg-blue-400 flex justify-center items-center"
        wrapper.append(optionDiv);
        return wrapper;
    }

    const options:string[] | HTMLElement[] = ["Vilnius", "Talin", "Shanghai", "Copenhagen", "Miami", "Sydney"]
    const optionsEl = options.map(x=>option(x));
    console.log("ASDASAA", optionsEl)
    questionSection.append(hint)
    optionsEl.forEach(x=>  questionSection.append(x) )

    return questionSection;
}

