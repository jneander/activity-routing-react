import type {ElementType, ReactNode} from 'react'

import type {RoutingConsumer} from './types'

export type RoutingViewProps = {
  name: string
} & (
  | {
      as?: never
      children: ReactNode
    }
  | {
      as: ElementType
      children?: never
    }
)
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
