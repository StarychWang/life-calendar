import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import './index.css'
import App from './App.tsx'

dayjs.locale('zh-cn')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#66bb6a',
          colorText: '#5d4e37',
          colorTextHeading: '#3d2e1a',
          colorBgLayout: '#fef9ef',
          colorBgContainer: '#ffffff',
          borderRadius: 8,
          borderRadiusLG: 16,
          fontFamily: "'Comic Neue', 'Nunito', system-ui, sans-serif",
          colorBorder: '#e0d5c0',
          colorBorderSecondary: '#e0d5c0',
          fontSize: 14,
        },
        components: {
          Card: {
            boxShadowTertiary: '0 4px 12px rgba(93, 78, 55, 0.15)',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)