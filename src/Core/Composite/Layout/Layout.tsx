import React, { useState } from 'react'
import { Header, SiderbarMenu } from '@/Core/index'
import { Button, ConfigProvider, Layout, theme } from "antd";
import { LuArrowRightFromLine, LuArrowLeftToLine } from "react-icons/lu";
import { useTheme } from "next-themes";

interface LayoutProps {
    children: React.ReactNode;
}

const { Sider } = Layout;

const LayoutPage: React.FC<LayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { systemTheme, theme: getTheme, setTheme } = useTheme();
    const currentTheme = getTheme === "system" ? systemTheme : getTheme;

    return (
        <div className='w-full h-full flex-col'>
            <ConfigProvider
                theme={{
                    algorithm: 
                        currentTheme !== "light" 
                            ? theme.darkAlgorithm 
                            : theme.defaultAlgorithm,
                    token: {
                        borderRadius: 10,
                        fontFamily: '"Roboto", sans-serif',
                        colorTextLabel: "#F16135",
                        colorTextHeading: currentTheme !== "light" ? "#ffffff" : "#1E5A89",
                        colorPrimary: "#1E5A89",
                        colorLink: "#F16135",
                    },
                    components: {
                        Layout: {
                            siderBg: currentTheme !== "light" ? "#0e1c2b" : "#fff4f1",
                            bodyBg: currentTheme !== "light" ? "#172f47" : "#ffffff",
                        },
                        Form: {
                            labelColor: currentTheme === "light" ? undefined : "#ccc",
                            margin: 5,
                            marginLG: 5,
                            marginSM: 5,
                            paddingXS: 5,
                            paddingSM: 5,
                            verticalLabelPadding: 0,
                        },
                        Table: {
                            cellPaddingInlineSM: 4,
                            cellPaddingBlockSM: 4
                        },
                    },
                }}
            >
                <div className='flex h-full'>
                    <Sider
                        className='hidden lg:block relative h-full'
                        trigger={null}
                        width={200}
                        collapsible
                        collapsed={collapsed}
                    >
                        <SiderbarMenu collapsed={collapsed} />
                        <div className="bottom-0 absolute w-full">
                            <Button
                                className="float-right -mr-8 p-0"
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
                        <div className="overflow-x-hidden p-6 pb-0">
                            {children}
                        </div>
                    </Layout>
                </div>
            </ConfigProvider>
        </div>
    )
}

export default LayoutPage