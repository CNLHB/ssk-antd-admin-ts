// 创建store类型接口
export interface AdminInterface {
    admin: object;
    isLogin: boolean;
    auth(): Promise<any>;
    setAdmin(admin: object): Promise<any>;
    login(admin: object): Promise<any>;
    logout(): void;

}
