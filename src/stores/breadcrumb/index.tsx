// 创建store
import { action, observable } from "mobx";
import { BreadInterface } from "../models/breadcrumb/index";

class BreadStore implements BreadInterface {
    @observable public breadTitle: string[] = [];

    @action.bound
    public setBreadTitle(breadTitle: string[]): void {
        this.breadTitle = breadTitle;
    }
}

export default BreadStore;
