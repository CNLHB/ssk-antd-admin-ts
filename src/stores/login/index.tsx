// 创建store
import { action, computed, observable } from "mobx";
import { LoginInterface } from "models/login/index";

class LoginStore implements LoginInterface {
  @observable public userName: string = "skk";
  @observable public password: string = "123456";
  @computed
  public get greeting(): string {
    return `hello ${this.userName}`;
  }

  @action.bound
  public setName(userName: string): void {
    this.userName = userName;
  }
}

export default LoginStore;
