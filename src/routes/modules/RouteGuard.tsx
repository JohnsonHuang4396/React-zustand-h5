import React, { createContext, useContext, useEffect, useRef } from 'react'
import {
  matchRoutes,
  useLocation,
  type Location,
  type NavigateFunction
} from 'react-router-dom'
import { isNull } from 'lodash'
import routes from '@/routes/modules'
import useTabBarStore from '@/store/useTabBarStore'

type LocationTrans = {
  from: Location | null
  to: Location | null
}
export const LocationContext = createContext<
  React.MutableRefObject<LocationTrans | null>
>({ current: null })

export default function WithLocationListener(props: {
  children: React.ReactNode
}) {
  const { setTabBarState, confirmRoute } = useTabBarStore(state => ({
    confirmRoute: state.confirmIsShowAfterNavigate,
    setTabBarState: state.setTabBarShowState
  }))

  const routeGuard = (
    location: Location,
    negative: NavigateFunction,
    cb: () => void
  ): (() => void) => {
    const matched = getMatchedRoute(location)
    if (isNull(matched)) {
      return () => {
        setTabBarState(false)
        negative('/404')
      }
    }
    return cb
  }

  const negative = useNavigate()
  const location = useLocation()
  const locationState = useRef<LocationTrans>({
    from: null,
    to: null
  })
  useEffect(() => {
    routeGuard(location, negative, () => {
      confirmRoute(location)
      locationState.current.from = locationState.current.to
      locationState.current.to = location
    })()
  }, [location])

  return (
    <LocationContext.Provider value={locationState}>
      {props.children}
    </LocationContext.Provider>
  )
}

export function useLocationConsumer(): LocationTrans {
  const ref = useContext(LocationContext)
  return ref.current as LocationTrans
}

export const getMatchedRoute = (location: Location) => {
  const matchedResult = matchRoutes(routes, location)
  const length = !isNull(matchedResult) && matchedResult?.length
  if (length) {
    return matchedResult[length - 1].route
  }
  return null
}
