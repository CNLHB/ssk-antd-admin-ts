import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { LoginInterface } from "models/login/index";


interface UserAppProps {
    loginStore?: LoginInterface; //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
@inject("loginStore")
@observer
class UserInfo extends Component<UserAppProps, {}> {
    public render() {
        const { password, phone } = this.props.loginStore!;

        return (
            <div className="App">
                <header className="App-header">
                    {phone}:{password}
                    <button onClick={this.clickHandler}>Change Greeting</button>
                </header>
            </div>
        );
    }

    private clickHandler = (): void => {
        const { setName } = this.props.loginStore!;
        setName("Bob");
    };
}
export default UserInfo;
