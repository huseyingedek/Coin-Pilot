import React, { useState } from 'react'
import { Header, SiderbarMenu } from '@/Core/index'
import { Button, ConfigProvider, Layout, theme } from "antd";
import { LuArrowRightFromLine, LuArrowLeftToLine } from "react-icons/lu";

interface LayoutProps {
    children: React.ReactNode;
}

const { Sider } = Layout;

const LayoutPage: React.FC<LayoutProps> = ({ children }) => {

    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <div className='w-full h-full flex-col'>
            <div className='flex h-full'>
                <Sider
                    className='hidden lg:block relative h-full'
                    trigger={null}
                    width={200}
                    collapsible
                    collapsed={collapsed}
                >
                    <SiderbarMenu />
                    <div className="bottom-0 absolute w-full">
                        <Button
                            className=" float-right -mr-8 p-0"
                            type="text"
                            icon={
                                collapsed ? <LuArrowRightFromLine /> : <LuArrowLeftToLine />
                            }
                            onClick={() => setCollapsed(!collapsed)}
                        />
                    </div>
                </Sider>
                <Layout>
                    <Header />
                    <div>
                        {children}
                    </div>
                </Layout>
            </div>
        </div>
    )
}

export default LayoutPage