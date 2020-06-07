// 创建store
import { action, observable } from "mobx";
import { AdminInterface } from "models/user/user";
import { post, get } from 'config/api/axios'
// interface loginResult {
//     code: 0,
//     data: {
//         userInfo: object,
//         token: string
//     }
//     message: string
//     status: number
// }
class AdminStore implements AdminInterface {
    @observable public admin: object = {};
    @observable public isLogin: boolean = false;
    @action.bound
    public async setAdmin(admin: any): Promise<any> {

        this.isLogin = true
        this.admin = admin
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

    }
}

export default AdminStore;
