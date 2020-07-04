// 创建store类型接口
import { ITopic, ITopicTitle } from 'xhr/api/stores/user/user'

export interface AdminInterface {
    admin: any;
    isLogin: boolean;
    topic: ITopic[]
    title: ITopicTitle[]
    getTopic(): Promise<any>
    getTitle(): Promise<any>
    auth(): Promise<any>;
    setAdmin(admin: object): Promise<any>;
    login(admin: object): Promise<any>;
    logout(): void;
    updateInfo(admin: string): void

}
