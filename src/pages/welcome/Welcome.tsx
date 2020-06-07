import React from 'react';
import { Card, Typography, Alert } from 'antd';
import { Button } from 'antd';
import styles from './Welcome.module.less';
import { get } from 'config/api/axios'

const CodePreview: React.FC<{}> = ({ children }) => (
    <pre className={styles.pre}>
        <code>
            <Typography.Text copyable>{children}</Typography.Text>
        </code>
    </pre>
);

const Welcome: React.FC<{}> = (props: any) => (
    <div>
        <Card>
            <Alert
                message="ssk admin 现已发布，点击右下角 连接即可前往下载"
                type="success"
                showIcon
                banner
                style={{
                    margin: -12,
                    marginBottom: 24,
                }}
            />
            <Typography.Text strong>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/CNLHB/ssk-antd-admin-ts">
                    基于 antd 开发，快速构建标准页面
                </a>
            </Typography.Text>
            <br />
            <Typography.Text strong>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/CNLHB/ssk-antd-admin-ts">
                    克隆到本地项目
                </a>
            </Typography.Text>
            <CodePreview> git clone https://github.com/CNLHB/ssk-antd-admin-ts</CodePreview>
            <Typography.Text
                strong
                style={{
                    marginBottom: 12,
                }}
            >
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/CNLHB/ssk-antd-admin-ts"
                >
                    切换到项目根目录
        </a>
            </Typography.Text>
            <CodePreview> cd  [your project name] </CodePreview>
            <Typography.Text strong>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/CNLHB/ssk-antd-admin-ts">
                    下载项目依赖
                </a>
            </Typography.Text>
            <CodePreview> npm installl || yarn </CodePreview>
            <Typography.Text strong>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/CNLHB/ssk-antd-admin-ts">
                    启动项目
                </a>
            </Typography.Text>
            <CodePreview> npm start || yarn start</CodePreview>

        </Card>
        <p
            style={{
                textAlign: 'center',
                marginTop: 24,
            }}
        >
            Want to add more pages? Please refer to{' '}
            <a href="https://github.com/CNLHB/ssk-antd-admin-ts" target="_blank" rel="noopener noreferrer">
                use block
      </a>
      。
    </p>
        <Button type="primary" onClick={() => { get('auth/verify') }}>Back Home</Button>

    </div>
);
export default Welcome