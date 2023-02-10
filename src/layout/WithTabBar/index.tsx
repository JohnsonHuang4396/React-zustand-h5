import { Image, Layout, Tabs } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import useTabBarStore from '@/store/useTabBarStore'

import './index.scss'

export interface TabProps {
  config: {
    currentTab: string
    text: string
    iconPath: string
    selectedIconPath: string
    pagePath: string
  }
}
const TabLabel = (props: TabProps) => {
  const { iconPath, text, selectedIconPath, pagePath, currentTab } =
    props.config

  const isCurrentTab = () => currentTab === pagePath

  return (
    <div>
      <Image
        src={isCurrentTab() ? selectedIconPath : iconPath}
        width={30}
        preview={false}
      />
      <div className={isCurrentTab() ? 'text-[#42A2FA]' : 'text-[#B8B8D2]'}>
        {text}
      </div>
    </div>
  )
}

const TabBar = () => {
  const negative = useNavigate()

  const { currentTab, config, switchTab } = useTabBarStore(state => ({
    currentTab: state.currentTab,
    config: state.config,
    switchTab: state.switchTab
  }))

  const handleTabChange = (activeTab: string) => {
    negative(activeTab)
    switchTab(activeTab)
  }

  return (
    <Tabs
      activeKey={currentTab}
      items={config.list.map(item => {
        return {
          key: item.pagePath,
          label: <TabLabel config={{ ...item, currentTab }} />
        }
      })}
      tabPosition="bottom"
      onChange={handleTabChange}
    />
  )
}

interface LayoutWithTabBarProps {
  children: React.ReactNode
}
const LayoutWithTabBar = (props: LayoutWithTabBarProps) => {
  const { children } = props

  const [layoutStyle, setLayoutStyle] = useState({
    marginBottom: 0
  })

  const footerRef = useRef(null)
  const size = useSize(footerRef)
  useEffect(() => {
    setLayoutStyle({
      marginBottom: size?.height as number
    })
  }, [size])

  return (
    <Layout className="custom-layout">
      <Content className="custom-layout-content" style={layoutStyle}>
        {children}
      </Content>
      <Footer ref={footerRef} className="custom-layout-footer">
        <TabBar />
      </Footer>
    </Layout>
  )
}

export default LayoutWithTabBar
