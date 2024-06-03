import { BehaviorSubject, fromEvent } from "rxjs";
import { StatsWidget } from "./StatsWidget";
// import { nextQuestion } from "..";

export class Header {
  gameStats;

  constructor(gameStats: any) {
    this.gameStats = gameStats;
  }

  setup() {
    const headerDom: HTMLElement | null = document.querySelector("header");
    if (headerDom === null) return;
    console.log("header dog", headerDom);

    headerDom.className = "bg-primary30-500 font-semibold p-4";
    const h1 = document.createElement("h1");
    h1.className = "text-lg text-center";
    h1.innerText = "Geography Game - Country Quiz";

    const resetButton: HTMLElement = document.createElement("button");
    resetButton.innerText = "reset question";
    resetButton.className = "rounded-md border-b-purple-300 border-2 ";
    const buttonObs = fromEvent(resetButton, "click");
    // buttonObs.subscribe(event => nextQuestion())

    const statsWidget = new StatsWidget(this.gameStats);
   headerDom.append(h1, statsWidget.render());
  }

 
}
