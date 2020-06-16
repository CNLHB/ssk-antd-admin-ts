// 创建store类型接口
export interface AdminInterface {
    admin: any;
    isLogin: boolean;
    topic: []
    title: []
    getTopic(): Promise<any>
    getTitle(): Promise<any>
    auth(): Promise<any>;
    setAdmin(admin: object): Promise<any>;
    login(admin: object): Promise<any>;
    logout(): void;
    updateInfo(admin:string):void

}
