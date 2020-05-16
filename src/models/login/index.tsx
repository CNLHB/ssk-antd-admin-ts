// 创建store类型接口
export interface LoginInterface {
  userName: string;
  password: string;
  setName(userName: string): void;
}
