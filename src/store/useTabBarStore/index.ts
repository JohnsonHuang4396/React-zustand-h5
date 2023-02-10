import tabBarList from './config'
import { create } from 'zustand'

interface UseTabBarStore {
  currentTab: string
  config: typeof tabBarList
  switchTab: (url: string) => void
}
const initStoreVal = {
  currentTab: tabBarList.list[0].pagePath,
  config: tabBarList
}
const useTabBarStore = create<UseTabBarStore>()(set => ({
  ...initStoreVal,
  switchTab: (url: string) => {
    set({ currentTab: url })
  }
}))

export default useTabBarStore
