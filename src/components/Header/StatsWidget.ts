import { BehaviorSubject } from "rxjs";
import { CurrentGame } from "../../CurrentGame";
import { GameStats } from "../../interface";

export class StatsWidget {
    gameStats: BehaviorSubject<GameStats>

    
    constructor(gameStats: BehaviorSubject<GameStats>) {
        this.gameStats = gameStats;
    }

    render() {
        const container = document.createElement("div");
        container.className = "rounded-md border-b-purple-600 border-3";
    
        const ul = document.createElement("ul");
    
        const liHit = document.createElement("li");
        liHit.className = "text-green-300";
    
        const liMiss = document.createElement("li");
        liMiss.className = "text-red-300";

        this.gameStats.subscribe(statsObj => {
            liHit.innerText = `Hits: ${statsObj.hits}`;
            liMiss.innerText = `Misses: ${statsObj.misses}`;
        })

    
        ul.append(liHit, liMiss);
        container.append(ul);
        return container;
      }
    
      delayedSubscription() {
        
      }
}