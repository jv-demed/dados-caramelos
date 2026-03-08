import '@/app/globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Dados Caramelos do Vale',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-br">
            <body className="antialiased">
                <AntdRegistry>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#eab74a',
                                colorInfo: '#1e95b3',
                                colorBorder: '#d9d9d9',
                                borderRadius: 8,
                                fontSize: 16,
                            },
                            components: {
                                Button: {
                                    colorPrimary: '#1e95b3',
                                    colorPrimaryHover: '#187c95',
                                    colorPrimaryActive: '#14687d',
                                    colorTextLightSolid: '#ffffff',
                                    borderRadius: 8,
                                },
                                Menu: {
                                    colorBgContainer: '#eab74a',

                                    itemColor: '#1a1a1a',
                                    itemHoverColor: '#ffffff',

                                    itemBg: '#eab74a',
                                    itemHoverBg: '#f3c86a',

                                    itemSelectedColor: '#1a1a1a',
                                    itemSelectedBg: '#ffffff80',

                                    horizontalItemSelectedColor: '#1a1a1a',
                                    horizontalItemSelectedBg: '#ffffff80',

                                    subMenuItemSelectedColor: '#1a1a1a',
                                    groupTitleColor: '#1a1a1a',
                                    popupBg: '#eab74a',
                                },
                                Checkbox: {
                                    colorPrimary: '#1e95b3',
                                    colorPrimaryHover: '#1e95b3',
                                    colorBorder: '#1e95b3',
                                },
                                Switch: {
                                    colorPrimary: '#1e95b3',
                                    colorPrimaryHover: '#1e95b3',
                                    colorBorder: '#1e95b3',
                                    handleBg: '#ffffff',
                                },
                                Input: {
                                    colorPrimaryHover: '#187c95',
                                    activeBorderColor: '#1e95b3',
                                    hoverBorderColor: '#187c95',
                                },
                                Select: {
                                    colorPrimaryHover: '#187c95',
                                    activeBorderColor: '#1e95b3',
                                    hoverBorderColor: '#187c95',
                                },
                                DatePicker: {
                                    colorPrimaryHover: '#187c95',
                                    activeBorderColor: '#1e95b3',
                                    hoverBorderColor: '#187c95',
                                },
                            },
                            algorithm: theme.defaultAlgorithm,
                        }}
                    >
                        {children}
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
