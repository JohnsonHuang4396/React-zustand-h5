import React, { FC } from 'react'
import useTabBarStore from '@/store/useTabBarStore'
import WithLocationListener from '@/routes/modules/RouteGuard'
import { Image, Layout, Tabs } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import type { TabBarList } from '@/store/useTabBarStore/config'

import './index.scss'

interface Config extends TabBarList {
  currentTab: string
}
export interface TabProps {
  config: Config
}
const TabLabel: FC<TabProps> = (props: TabProps) => {
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

  const { currentTab, config, switchTab, confirmNavigate } = useTabBarStore(
    state => ({
      currentTab: state.currentTab,
      config: state.config,
      switchTab: state.switchTab,
      confirmNavigate: state.confirmIsShowAfterNavigate
    })
  )

  const location = useLocation()
  useMount(() => confirmNavigate(location))

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
const LayoutWithTabBar: FC<LayoutWithTabBarProps> = (
  props: LayoutWithTabBarProps
) => {
  const { children } = props

  const { contentStyle, setMarginBottom, isShow } = useTabBarStore(state => ({
    isShow: state.isShow,
    contentStyle: state.contentStyle,
    setMarginBottom: state.setMarginBottom
  }))

  const footerRef = useRef(null)
  const size = useSize(footerRef)
  useEffect(() => {
    setMarginBottom((size?.height as number) ?? 0)
  }, [size, isShow])

  return (
    <Layout className="custom-layout">
      <Content className="custom-layout-content" style={contentStyle}>
        <WithLocationListener>{children}</WithLocationListener>
      </Content>
      {useMemo(
        () => (
          <Footer
            ref={footerRef}
            className={mergeClassName([
              'custom-layout-footer',
              isShow ? 'flex' : 'hidden'
            ])}
          >
            <TabBar />
          </Footer>
        ),
        [isShow]
      )}
    </Layout>
  )
}

export default LayoutWithTabBar
