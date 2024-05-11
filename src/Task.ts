
export class Task {
    options: string[] | number[] | HTMLElement[];
    taskEl: HTMLElement = document.createElement('section');
    taskDescr: string;
    constructor (options: string[] | number[] | HTMLElement[], taskDescr: string) {
        this.options = options;
        this.taskDescr = taskDescr;
    }

    setup() {
        const wrapper = document.createElement('div');
        wrapper.className = "text-xl b"
        const taskDescr = document.createElement('div');
        taskDescr.innerText = this.taskDescr;
        // taskDescr.
    }

    render() {}
    selfDestruct() {}
}