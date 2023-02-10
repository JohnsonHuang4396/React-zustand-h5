import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import LayoutWithTabBar from './layout/WithTabBar'

import './index.css'
import 'uno.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider>
    <BrowserRouter>
      <LayoutWithTabBar>
        <Suspense>
          <Routes />
        </Suspense>
      </LayoutWithTabBar>
    </BrowserRouter>
  </ConfigProvider>
)
