import type { RouteObject } from 'react-router-dom'

import Home from '@/pages/home'
import Inspection from '@/pages/inspection'

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/home'} />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/inspection',
    element: <Inspection />
  }
]

export default routesConfig
