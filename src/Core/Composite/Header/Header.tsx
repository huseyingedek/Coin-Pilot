import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, Menu, Dropdown, Button, Switch, Avatar, Space, Typography, Badge } from 'antd';
import type { MenuProps } from 'antd';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import {
    MoonOutlined,
    SunOutlined,
    BellOutlined,
    GlobalOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    WalletOutlined,
    DownOutlined
} from '@ant-design/icons';
import Image from 'next/image';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [notifications] = useState(5);
    const [currentTheme, setCurrentTheme] = useState<string>('dark');
    const { locale, locales, pathname, query, asPath } = router;

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        setCurrentTheme(savedTheme);
    }, []);

    useEffect(() => {
        if (mounted) {
            const newTheme = theme === "system" ? systemTheme : theme;
            setCurrentTheme(newTheme || 'dark');

            if (newTheme) {
                localStorage.setItem('theme', newTheme);
            }
        }
    }, [theme, systemTheme, mounted]);

    const changeLanguage = (newLocale: string) => {
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    const renderThemeChanger = () => {
        if (!mounted) return null;

        return (
            <Switch
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                checked={currentTheme === 'dark'}
                onChange={() => {
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    setTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                }}
            />
        );
    };

    const languageItems: MenuProps['items'] = [
        {
            key: 'en',
            label: 'English',
            onClick: () => changeLanguage('en'),
        },
        {
            key: 'tr',
            label: 'Türkçe',
            onClick: () => changeLanguage('tr'),
        },
    ];

    const userItems: MenuProps['items'] = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: t('profile'),
        },
        {
            key: '2',
            icon: <WalletOutlined />,
            label: t('myWallet'),
        },
        {
            key: '3',
            icon: <SettingOutlined />,
            label: t('settings'),
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            icon: <LogoutOutlined />,
            label: t('logout'),
        },
    ];

    return (
        <header className="flex items-center justify-between px-6 h-16" style={{
            background: currentTheme === 'dark' ? '#0e1c2b' : '#fff',
            boxShadow: '0 1px 4px rgba(0,21,41,0.08)'
        }}>
            <div className="flex items-center">
                <div className="mr-8">
                    <Link href="/">
                        <div className="flex items-center">
                            <WalletOutlined style={{
                                fontSize: '24px',
                                color: currentTheme === 'dark' ? '#F16135' : '#1E5A89'
                            }} />
                            <Text
                                strong
                                style={{
                                    marginLeft: 8,
                                    fontSize: '18px',
                                    color: currentTheme === 'dark' ? '#fff' : '#1E5A89'
                                }}
                            >
                                Coin Pilot
                            </Text>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {renderThemeChanger()}
                
                <Dropdown menu={{ items: languageItems }} trigger={['click']}>
                    <Button type="text" icon={<GlobalOutlined />} className="flex items-center">
                        <span className="ml-1 hidden sm:inline">{locale === 'en' ? 'EN' : 'TR'}</span>
                        <DownOutlined className="text-xs ml-1" />
                    </Button>
                </Dropdown>
                
                <Badge count={notifications} size="small">
                    <Button type="text" icon={<BellOutlined />} />
                </Badge>
                
                <Dropdown menu={{ items: userItems }} trigger={['click']}>
                    <Space className="cursor-pointer">
                        <Avatar icon={<UserOutlined />} className="bg-blue-500" />
                        <Text className="hidden sm:inline" style={{ color: currentTheme === 'dark' ? '#fff' : '#1E5A89' }}>
                            {t('user') || 'User'}
                        </Text>
                        <DownOutlined className="text-xs" />
                    </Space>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;