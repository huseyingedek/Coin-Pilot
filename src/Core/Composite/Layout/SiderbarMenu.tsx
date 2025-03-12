import React from 'react'
import { Avatar, Menu, Tooltip } from "antd";
import { useRouter } from "next/router";
import Link from 'next/link';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineExitToApp } from 'react-icons/md';
import useTranslation from "next-translate/useTranslation";

const SiderbarMenu = ({ collapsed = true }) => {

    const { t, lang } = useTranslation("common");
    const router = useRouter();

    return (
        <>
            <div className="text-center text-white w-full float-left my-5">
                <Tooltip
                    placement="rightTop"
                    title={
                        collapsed && (
                            <div>
                                <h3
                                    className={`${collapsed ? "text-sm" : "text-xl"
                                        } font-bold tracking-tight dark:text-gray-400`}
                                >
                                    <a href="#" className="hover:text-white">
                                        Hüseyin
                                    </a>
                                </h3>
                            </div>
                        )}
                >
                    <Avatar size={70} src="https://picsum.photos/id/237/200/300" >H</Avatar>
                </Tooltip>
                {!collapsed && (
                    <div>
                        <h3
                            className={`${collapsed ? "text-sm" : "text-xl"
                                } font-bold tracking-tight text-gray-900 dark:text-white`}
                        >
                            <a href="#">Hüseyin</a>
                        </h3>
                        <p className="font-light text-gray-400 dark:text-gray-400">
                            Kullanıcı
                        </p>
                    </div>
                )}
            </div>
            <Menu
                mode="inline"
                className="!bg-transparent"
                defaultSelectedKeys={[router?.pathname]}
                items={[
                    {
                        key: "/dashboard",
                        icon: <LuLayoutDashboard size="25" />,
                        label: <Link href="/dashboard">{t("dashboard")}</Link>,
                    },
                    {
                        key: "10",
                        icon: <MdOutlineExitToApp size="25" color="red" />,
                        label: "Çıkış",
                    },
                ]}
            />
        </>

    )
}

export default SiderbarMenu