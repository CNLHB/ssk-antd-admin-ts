// 创建store
import { action, observable } from "mobx";

import { AdminInterface } from "../models/user/user";
import { getTopicList, ITopicTitle, ITopic, getTitle, authAPI, loginAPI } from 'xhr/api/stores/user/user'
class AdminStore implements AdminInterface {
    @observable public admin: any = {};
    @observable public title: ITopicTitle[] = [];
    @observable public topic: ITopic[] = [];
    @observable public isLogin: boolean = false;
    @action.bound
    public async setAdmin(admin: any): Promise<any> {
        await authAPI();
        this.isLogin = true
        this.admin = admin
        return true
    }
    @action.bound
    public async getTopic(): Promise<any> {
        let result = await getTopicList(this.admin.id);
        this.topic = result
        return true
    }
    @action.bound
    public async getTitle(): Promise<any> {
        let result = await getTitle(this.admin.id);
        this.title = result
        return true
    }
    @action.bound
    public async auth(): Promise<boolean> {
        let result = await authAPI();
        if (result.code !== 0) {
            return false
        }
        window.localStorage.setItem("token", result.data.token);
        this.isLogin = true
        this.admin = result.data.userInfo;
        return true
    }
    @action.bound
    public async login(admin: any): Promise<any> {
        let data = {
            phoneNumber: admin.phone,
            password: admin.password,
            identity: "管理员",

        }
        let result = await loginAPI(data);
        if (result.code !== 0) {
            return false
        }
        window.localStorage.setItem("token", result.data.token);
        if (admin.remember) {
            window.localStorage.setItem("remember", JSON.stringify(admin));
        }
        this.isLogin = true
        this.admin = result.data.userInfo;
        return true
    }
    @action.bound
    public logout(): void {
        window.localStorage.removeItem("token")
        this.isLogin = false
    }
    @action.bound
    public updateInfo(url: string): void {
        this.admin.authorUrl = url
    }
}

export default AdminStore;
