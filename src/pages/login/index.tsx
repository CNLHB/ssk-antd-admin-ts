import React, { Fragment } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import logo from "assets/images/logo.png";
import { inject, observer } from 'mobx-react'
import { Button, Checkbox, Row, Input, Form, message } from 'antd'
import styles from './index.module.less'
import FooterWrap from "layout/footer/index";
import { AdminInterface } from "models/user/user";
import { FormInstance } from 'antd/lib/form';
const FormItem = Form.Item
interface AdminProps extends RouteComponentProps {
    adminStore?: AdminInterface; //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
@inject("adminStore")
@observer
class Login extends React.Component<AdminProps> {
    formRef = React.createRef<FormInstance>();
    componentDidMount() {
        let rememberCache = window.localStorage.getItem("remember")
        if (rememberCache != null) {
            let info = JSON.parse(rememberCache) as any;
            this.formRef.current?.setFieldsValue({
                phone: info.phone,
                password: info.password
            });

        }
    }
    render() {

        const onFinish = async (values: object) => {
            const { login } = this.props.adminStore!;
            let result = await login(values)
            if (!result) {
                message.error("账号或密码错误")
                return
            }
            this.props.history.push('/');
        };

        const onFinishFailed = (errorInfo: object) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Fragment>
                <div className={styles.bgColor}>

                    <div className={styles.form}>
                        <div className={styles.logo}>
                            <img alt="logo" src={logo} />
                            <span>{"昵称"}</span>
                        </div>
                        <Form
                            ref={this.formRef}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <FormItem name="phone"
                                rules={[{ required: true }]} hasFeedback>
                                <Input
                                    placeholder={"手机号"}
                                />
                            </FormItem>
                            <FormItem name="password"
                                rules={[{ required: true }]} hasFeedback>
                                <Input
                                    type="password"
                                    placeholder={"密码"}
                                />
                            </FormItem>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Row>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                // loading={}loading
                                >
                                    Sign in
                            </Button>

                            </Row>
                            <Row>
                                <p>
                                    <span className={styles.marginRight}>
                                        phone：15363398328
                                             </span>

                                    <span>
                                        ps ：123456
                                     </span>
                                </p>
                            </Row>

                        </Form>
                    </div>
                    <div className={styles.footer}>
                        <FooterWrap></FooterWrap>
                    </div>
                </div>
            </Fragment>

        )
    }
}



export default withRouter(Login as any)
