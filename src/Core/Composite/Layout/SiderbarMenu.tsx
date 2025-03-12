import React from 'react'
import { Avatar, Menu, Tooltip } from "antd";

const SiderbarMenu = ({ collapsed = true }) => {
    return (
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
            {
                !collapsed && (
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
    )
}

export default SiderbarMenu