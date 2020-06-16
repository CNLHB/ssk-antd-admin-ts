// 创建store
import { action, observable } from "mobx";
import { AdminInterface } from "../models/user/user";
import { post, get } from 'config/api/axios'

class AdminStore implements AdminInterface {
    @observable public admin: any = {};
    @observable public title: [] = [];
    @observable public topic: [] = [];
    @observable public isLogin: boolean = false;
    @action.bound
    public async setAdmin(admin: any): Promise<any> {
        await get('auth/verify');
        this.isLogin = true
        this.admin = admin
        return true
    }
    @action.bound
    public async getTopic(): Promise<any> {
        let result = await get('topic/list/' + this.admin.id);
        console.log(result);
        if (result) {

        }
        if (result === 500 || typeof result === "string") {
            this.topic = []
            return result === 500 ? 500 : 404
        }
        this.topic = result
        return true
    }
    @action.bound
    public async getTitle(): Promise<any> {
        let result = await get('topic/title/user/' + this.admin.id);
        if (result === 500 || typeof result === "string") {
            this.title = []
            return result === 500 ? 500 : 404
        }
        this.topic = result
        return true
    }
    @action.bound
    public async auth(): Promise<any> {
        let result = await get('auth/verify');
        if (!result.status) {
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
            password: admin.password

        }
        let result = await post('user/login', data);
        if (result === 500 || typeof result === "string") {
            return result === 500 ? 500 : 404
        }
        console.log(result);

        if (!result.status) {
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
        window.location.href = "login"
    }
    @action.bound
    public updateInfo(url: string): void {
        this.admin.authorUrl = url
    }
}

export default AdminStore;
