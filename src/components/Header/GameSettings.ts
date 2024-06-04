import { FullDataKey } from "../../interface";
import { Dropdown } from "./Dropdown";
import { RadioButtonGroup } from "./RadioButtonGroup";

export class GameSettings {
    answerOptionCount:number = 6;
    taskNames: FullDataKey[] = ["allFlags", "allCapitals", "allSubregions", "allPopulations", "allChinese"];
    mainQuestionOptions: FullDataKey[] = ["allCountries", "allCapitals", "allFlags"];
    isMainQuestionRandom: boolean  = false;


    renderIcon() {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = "bg-accent10-500 w-8 h-8";
        return iconWrapper;

    }

    renderSettingsPanel() {
        const settingsPanel = document.createElement('div');
        settingsPanel.className = "bg-base60-500 border-red-700 flex flex-wrap";
        // const drops1 = new Dropdown(['hi', 'foo', 'bar'])
        // settingsPanel.append(drops1.render())

        const radio1 = new RadioButtonGroup(this.taskNames, "Tasks")
        radio1.getSelectionObservable().subscribe(selection => console.log(selection))
        const radio2 = new RadioButtonGroup(this.mainQuestionOptions, "Main Q")
        settingsPanel.append(
            radio1.render(),
            radio2.render()
        )

        return settingsPanel;

    }

    buildRadio() {

    }


}