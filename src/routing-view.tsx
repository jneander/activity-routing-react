import type {ElementType, ReactNode} from 'react'

import type {RoutingConsumer} from './types'

export interface RoutingViewProps {
  as?: ElementType
  children: ReactNode
  name: string
}

export function createRoutingView(RoutingConsumer: RoutingConsumer) {
  return function RoutingView(props: RoutingViewProps) {
    const {as: Component, children} = props

    const renderChildren = () => {
      if (Component) {
        return <Component />
      }
      return children
    }

    return (
      <RoutingConsumer>
        {routing => {
          const currentActivity = routing.getCurrentActivity()

          if (props.name === currentActivity.name) {
            return renderChildren()
          }

          return null
        }}
      </RoutingConsumer>
    )
  }
}
