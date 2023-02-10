import Home from '@/assets/imgs/home.png'
import Inspection from '@/assets/imgs/inspection.png'
import Book from '@/assets/imgs/book.png'
import Error from '@/assets/imgs/error.png'
import Mine from '@/assets/imgs/mine.png'
import UnHome from '@/assets/imgs/un-home.png'
import UnInspection from '@/assets/imgs/un-inspection.png'
import UnBook from '@/assets/imgs/un-book.png'
import UnError from '@/assets/imgs/un-error.png'
import UnMine from '@/assets/imgs/un-mine.png'

const tabBarList = {
  color: '#B8B8D2',
  selectedColor: '#42A2FA',
  list: [
    {
      pagePath: '/home',
      selectedIconPath: Home,
      iconPath: UnHome,
      text: '首页'
    },
    {
      pagePath: '/inspection',
      selectedIconPath: Inspection,
      iconPath: UnInspection,
      text: '巡检'
    },
    {
      pagePath: '/book',
      selectedIconPath: Book,
      iconPath: UnBook,
      text: '台账'
    },
    {
      pagePath: '/error',
      selectedIconPath: Error,
      iconPath: UnError,
      text: '异常'
    },
    {
      pagePath: '/mine',
      selectedIconPath: Mine,
      iconPath: UnMine,
      text: '我的'
    }
  ]
}

export default tabBarList
