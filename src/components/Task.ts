import { fromEvent } from "rxjs";


export class Task {
    options: HTMLElement[];
    taskEl: HTMLElement = document.createElement('section');
    taskDescr: string;
    correctIndex: number;
    correctAnswerEl: HTMLElement;  //span or img (when flag)
    taskQAnswered: HTMLElement = document.createElement('div');

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

        const optionContainer = document.createElement('div');
        optionContainer.className = "flex flex-row flex-wrap gap-3"


        this.options.forEach((option:HTMLElement, i:number) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = "aspect-[1.8] w-[300px] bg-red-200 flex justify-center items-center";
            optionDiv.append(option)
            //@ts-ignore
            optionDiv.style.viewTransitionName = "option" + i;

            const optionClickObs = fromEvent(optionDiv, 'click');
            optionClickObs.subscribe((e:Event) => this.handleOptionClick(e.currentTarget as HTMLElement, i))
            optionContainer.append(optionDiv)
        })

        this.taskEl.append(wrapper, optionContainer)
        return this.taskEl;
    }


    handleOptionClick(clickedDiv: HTMLElement, i:number){
        //CORRECT ANSWER
        if (i === this.correctIndex) {
            // clickedDiv.classList.add("")
            //@ts-ignore
            clickedDiv.style.viewTransitionName = "animateMe"
            //@ts-ignore
            clickedDiv.querySelector('img, span')?.style?.viewTransitionName = "animateMeInner"

            if ("startViewTransition" in document){
                //@ts-ignore
                const transition = document.startViewTransition(  () => this.handleClickedCorrect(clickedDiv)  )
                this.cleanAfterViewTransition(transition);
            }
            else 
            this.handleClickedCorrect(clickedDiv)
        } else { //INCORRECT ANSWER
            clickedDiv.classList.add("opacity-50");
        }
    }

    handleClickedCorrect(correctDiv: HTMLElement) {
        console.log("clicked correct answer")
        this.options.forEach(option => {
            const parent: HTMLElement | null = option.parentElement;
            if (parent) parent.remove()
            })

        this.taskQAnswered.className = "p-3 bg-red-400 inline-block";
        //@ts-ignore
        this.taskQAnswered.style.viewTransitionName = "animateMe"
        //@ts-ignore
        this.correctAnswerEl.style.viewTransitionName = "animateMeInner"

        this.taskQAnswered.append(this.correctAnswerEl);
        this.taskEl.querySelector('.wrapper-task')?.append(this.taskQAnswered);
    }  

    async cleanAfterViewTransition (transition:any) {
        try {

            await transition.finished;
        } finally {
            console.log("transition has completed")
            this.taskQAnswered.removeAttribute('style')
            this.taskQAnswered.querySelector('img, span')?.removeAttribute('style')
      }
    }

    render() {}
    selfDestruct() {}
}