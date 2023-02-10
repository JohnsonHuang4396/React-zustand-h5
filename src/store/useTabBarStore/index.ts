import tabBarList, { type TabBar } from './config'
import { type Location } from 'react-router-dom'
import { create } from 'zustand'

const matchedTabBarList = (route: Location): boolean => {
  let result = true

  const { list } = tabBarList
  const path = route.pathname
  const matchedLength = list.filter(item => item.pagePath === path).length
  if (!matchedLength) result = false

  return result
}

interface UseTabBarStore {
  isShow: boolean
  currentTab: string
  config: TabBar
  contentStyle: { marginBottom: number; paddingBottom: number }
  switchTab: (url: string) => void
  setMarginBottom: (height: number) => void
  setTabBarShowState: (state: boolean) => void
  confirmIsShowAfterNavigate: (route: Location) => void
}
const initStoreVal = {
  isShow: true,
  currentTab: tabBarList.list[0].pagePath,
  config: tabBarList,
  contentStyle: { marginBottom: 0, paddingBottom: 0 }
}
const useTabBarStore = create<UseTabBarStore>()((set, get) => ({
  ...initStoreVal,
  switchTab: (url: string) => {
    set({ currentTab: url })
  },
  setMarginBottom: (height: number) => {
    set({ contentStyle: { marginBottom: height - 24, paddingBottom: 24 } })
  },
  setTabBarShowState: (state: boolean) => {
    set({ isShow: state })
  },
  confirmIsShowAfterNavigate: (route: Location) => {
    // 如果跳转的路由属于tabBar，则显示tabBar
    if (matchedTabBarList(route)) {
      if (!get().isShow) get().setTabBarShowState(true)
      if (get().currentTab !== route.pathname) get().switchTab(route.pathname)
      return
    }
    // 如果跳转的不是tabBar路由，则隐藏tabBar
    get().setTabBarShowState(false)
  }
}))

export default useTabBarStore
