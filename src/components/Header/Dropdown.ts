
export class Dropdown {
    options: string[];

    constructor(options: string[]) {
        this.options = options;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'relative inline-block text-left mx-20';

        container.append(
            this.buildButton(),
            this.buildDropdown()
        );

        return container;
    }

    buildButton() {
        const container = document.createElement('div');
        
        const button = document.createElement('button');
        button.className = "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
        button.id = 'menu-button';
        button.innerText = "Screw you butt";

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "-mr-1 h-5 w-5 text-gray-400");
        svg.setAttribute("viewBox", "0 0 20 20");
        svg.setAttribute("fill", "currentColor");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill-rule", "evenodd");
        path.setAttribute("d", "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z");
        path.setAttribute("clip-rule", "evenodd");

        svg.appendChild(path);
        button.append(svg);
        container.append(button)
        return container;
    }

    buildDropdown() {
        const mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none');
        mainDiv.setAttribute('role', 'menu');
        mainDiv.setAttribute('aria-orientation', 'vertical');
        mainDiv.setAttribute('aria-labelledby', 'menu-button');
        mainDiv.setAttribute('tabindex', '-1');

        // Create the inner div element
        const innerDiv = document.createElement('div');
        innerDiv.setAttribute('class', 'py-1');
        innerDiv.setAttribute('role', 'none');

        // Create the anchor elements
        const linkTexts = ['Account settings', 'Support', 'License'];
        const linkIds = ['menu-item-0', 'menu-item-1', 'menu-item-2'];

        linkTexts.forEach((text, index) => {
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.setAttribute('class', 'text-gray-700 block px-4 py-2 text-sm');
        a.setAttribute('role', 'menuitem');
        a.setAttribute('tabindex', '-1');
        a.setAttribute('id', linkIds[index]);
        a.textContent = text;
        innerDiv.appendChild(a);
        });

        // Append inner div to main div
        mainDiv.appendChild(innerDiv);
        return mainDiv;
    }
}