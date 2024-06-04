import { BehaviorSubject } from "rxjs";
import { CurrentGame } from "../../CurrentGame";
import { GameStats } from "../../interface";

export class StatsWidget {
    statsHits: BehaviorSubject<number>;
    statsMisses: BehaviorSubject<number>;

    
    constructor(statsHits: BehaviorSubject<number>, statsMisses: BehaviorSubject<number>) {
        this.statsHits = statsHits;
        this.statsMisses = statsMisses;
    }

    render() {
        const container = document.createElement("div");
        container.className = "rounded-md border-b-purple-600 border-3";
    
        const ul = document.createElement("ul");
    
        const liHit = document.createElement("li");
        liHit.className = "text-green-300";
        this.statsHits.subscribe((hits:number) => liHit.innerText = `Hit: ${hits}` )

        const liMiss = document.createElement("li");
        liMiss.className = "text-red-300";
        this.statsMisses.subscribe((misses:number) => liMiss.innerText = `Missed: ${misses}` )

        ul.append(liHit, liMiss);
        container.append(ul);
        return container;
      }
    
      delayedSubscription() {
        
      }
}