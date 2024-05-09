import { BehaviorSubject } from "rxjs";




const root = document.getElementById('root');

export function renderGameInterface() {
    
       
        
}

export function topicSection(questionHint: BehaviorSubject<string>, questionKey: BehaviorSubject<string>) {
    const topicSection = document.createElement("section");
    topicSection.className = "flex justify-evenly"

    const hint:HTMLElement = document.createElement('div');
    hint.className = "bg-orange-300 text-lg ";
    
    questionHint.subscribe(value => hint.innerHTML = value)

    const suppliedInfo:HTMLElement = document.createElement('div');
    suppliedInfo.className = "text-lg"
    
    
        // Subscribe to changes in the questionKey BehaviorSubject
        questionKey.subscribe(value => {
            // Update the text content of suppliedInfo element
            suppliedInfo.innerText = value;
        });
    
    // suppliedInfo.innerText = questionKey.getValue();



    topicSection.append(hint, suppliedInfo)

    return topicSection;
}

export function taskSection(hintPara:string, options: string[] | HTMLElement[] | number[])  {
    const questionSection = document.createElement("section");
    const hint: HTMLElement = document.createElement("div");
    hint.className = "w-200 bg-yellow-200";
    hint.innerText = hintPara;
    
    const optionsDiv: HTMLElement = document.createElement("div");
    
    const option = (optionContent:string | HTMLElement | number) => {
        const wrapper: HTMLElement = document.createElement("div");
        wrapper.className = "w-1/3 h-40 bg-red-500 inline-block p-3"
        const optionDiv: HTMLElement = document.createElement("div");
        if (typeof optionContent === "string" || typeof optionContent === "number") optionDiv.innerText = optionContent.toString();
            else optionDiv.append(optionContent)
        optionDiv.className = "w-full h-full bg-blue-400 flex justify-center items-center"
        wrapper.append(optionDiv);
        return wrapper;
    }

    // const options:string[] | HTMLElement[] = ["Vilnius", "Talin", "Shanghai", "Copenhagen", "Miami", "Sydney"]
    const optionsEl = options.map(x=>option(x));
    questionSection.append(hint)
    optionsEl.forEach(x=> questionSection.append(x))
    return questionSection;
}

