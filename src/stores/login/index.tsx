// 创建store
import { action, computed, observable } from "mobx";
import { LoginInterface } from "models/login/index";

class LoginStore implements LoginInterface {
    @observable public phone: string = "";
    @observable public password: string = "";
    @computed
    public get greeting(): string {
        return `hello ${this.phone}`;
    }

    @action.bound
    public setName(phone: string): void {
        this.phone = phone;
    }
}

export default LoginStore;
