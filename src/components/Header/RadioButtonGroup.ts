import { Observable, Subject, fromEvent } from "rxjs";

let groupIdCounter = 0;

export class RadioButtonGroup {
    selections: string[];
    groupLabel: string;
    groupId: number;
    selectionSubject: Subject<string>;

    constructor(selections: string[], groupLabel: string) {
        this.selections = selections;
        this.groupLabel = groupLabel;
        this.groupId = groupIdCounter++;

        this.selectionSubject = new Subject<string>();

    }

    render() {
        const container = document.createElement('div');
        container.className = 'radio-group';
        
        //group label
        const p = document.createElement('p');
        p.textContent = this.groupLabel;
        p.className = "text-center"
        container.append(p)

        this.selections.forEach((selection, index) => {
            const radioContainer = document.createElement('div');
            radioContainer.className = 'flex items-center mb-4';

            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `radio-${this.groupId}-${index}`;
            input.name = `selection-${this.groupId}`; // Unique name for each group
            input.value = selection;
            input.className = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"

            const label = document.createElement('label');
            label.setAttribute('for', `radio-${this.groupId}-${index}`);
            label.className = "ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            label.textContent = selection;

            //Adding event listener 
            const event = fromEvent(input, "change");
            event.subscribe(() => this.selectionSubject.next(selection))

            radioContainer.appendChild(input);
            radioContainer.appendChild(label);
            container.appendChild(radioContainer);
        });

        return container;
    }

    getSelectionObservable(): Observable<string> {
        return this.selectionSubject.asObservable();
    }
}

