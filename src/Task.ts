import { fromEvent } from "rxjs";


export class Task {
    options: HTMLElement[];
    taskEl: HTMLElement = document.createElement('section');
    taskDescr: string;
    correctIndex: number;
    correctAnswerEl: HTMLElement;  //span or img (when flag)

    constructor (options: string[] , taskDescr: string, isImg: boolean, correctIndex: number) {
        this.options = this.wrapOptionsInDomEl(options, isImg);
        this.taskDescr = taskDescr;
        this.correctIndex = correctIndex;
        //reusing wrapOptionsInDomEl, since  it returns  [], i'm destructuring
        [this.correctAnswerEl] = this.wrapOptionsInDomEl([options[correctIndex]], isImg)
    }

    wrapOptionsInDomEl(options: string[], isImg:boolean):HTMLElement[]{
        return options.map(option => {
            let el: HTMLElement;
            if (isImg) {
                el = document.createElement('img');
                (el as HTMLImageElement).src = option;
            } else {
                el = document.createElement('span');
                el.innerText = option;
            }
            return el;
        })
    }

    setup() {
        const wrapper = document.createElement('div');
        wrapper.className = "wrapper-task text-xl mb-6";

        const taskDescr = document.createElement('div');
        taskDescr.innerText = this.taskDescr;
        taskDescr.className = "p-3 inline-block";

        wrapper.append(taskDescr);

        const optionWrapper = document.createElement('div');
        optionWrapper.className = "flex flex-row flex-wrap gap-3"

        this.options.map(option => {
            if  (option instanceof HTMLElement)
                return option;
            else  {
                const span = document.createElement("span");
                span.innerText = option;
                return span;
            } 
        })

        this.options.forEach((option:HTMLElement, i:number) => {
            //@ts-ignore
            option.style.viewTransitionName = "option" + i;

            const optionClickObs = fromEvent(option, 'click');
            optionClickObs.subscribe((e:Event) => this.handleOptionClick(e.currentTarget as HTMLElement, i))
            
        })

        this.taskEl.append(wrapper, optionWrapper)
        return this.taskEl;
    }


    handleOptionClick(clickedDiv: HTMLElement, i:number){
        //correct answer
        if (i === this.correctIndex) {
            clickedDiv.classList.add("")
            //@ts-ignore
            clickedDiv.style.viewTransitionName = "animateMe"
            //@ts-ignore
            clickedDiv.querySelector('img, span')?.style?.viewTransitionName = "animateMeInner"

            if ("startViewTransition" in document){
                //@ts-ignore
                const transition = document.startViewTransition(  () => this.handleClickedCorrect(clickedDiv)  )
                this.cleanAfterViewTransition(transition, clickedDiv);
            }
            else 
            this.handleClickedCorrect(clickedDiv)
        } else {
            clickedDiv.classList.add("opacity-50");
        }
    }

    handleClickedCorrect(correctDiv: HTMLElement) {
        console.log("clicked correct answer")
        this.options.forEach(option => option.remove())

        const taskQAnswered: HTMLElement = document.createElement('div');
        taskQAnswered.className = "p-3 bg-red-400 inline-block";
        //@ts-ignore
        taskQAnswered.style.viewTransitionName = "animateMe"
        //@ts-ignore
        this.correctAnswerEl.style.viewTransitionName = "animateMeInner"

        taskQAnswered.append(this.correctAnswerEl);
        this.taskEl.querySelector('.wrapper-task')?.append(taskQAnswered);
    }  

    async cleanAfterViewTransition (transition:any, correctDiv: HTMLElement) {
        try {
            await transition.finished;
        } finally {
            console.log("transition has completed")
            correctDiv.removeAttribute('style')
            correctDiv.querySelector('img, span')?.removeAttribute('style')
      }
    }

    render() {}
    selfDestruct() {}
}