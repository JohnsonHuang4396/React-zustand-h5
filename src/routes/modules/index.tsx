import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/pages/home'))
const Inspection = lazy(() => import('@/pages/inspection'))
const Book = lazy(() => import('@/pages/book'))
const Mine = lazy(() => import('@/pages/mine'))
const Error = lazy(() => import('@/pages/error'))
const InspectionDetail = lazy(() => import('@/pages/inspection/detail'))

const UnDefPage = lazy(() => import('@/pages/404'))

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
    path: '/book',
    element: <Book />
  },
  {
    path: '/inspection',
    element: <Inspection />
  },
  {
    path: '/inspection-detail',
    element: <InspectionDetail />
  },
  {
    path: '/error',
    element: <Error />
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/404',
    element: <UnDefPage />
  },
  {
    path: '*',
    element: <Navigate to={'/404'} />
  }
]

export default routesConfig
