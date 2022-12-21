import {Routing} from '@jneander/activity-routing-history'
import {ActivityParams, ActivityQuery} from '@jneander/activity-routing'
import {
  MouseEvent as ReactMouseEvent,
  PureComponent,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'

import type {RoutingConsumerProps, RoutingContext, RoutingProviderProps} from './types'

type ActivitySetMethod = Parameters<Routing['setActivity']>[1]

export function createRoutingContext(): RoutingContext {
  const context = createContext(null)
  const {Consumer, Provider} = context

  function RoutingProvider(props: RoutingProviderProps) {
    const [state, setState] = useState({
      currentActivity: props.routing.getCurrentActivity(),
      routing: props.routing,
    })

    useLayoutEffect(() => {
      return props.routing.subscribe(currentActivity => {
        setState({currentActivity, routing: props.routing})
      })
    }, [props.routing])

    return <Provider value={state}>{props.children}</Provider>
  }

  class RoutingConsumerImpl extends PureComponent<RoutingConsumerProps> {
    render() {
      return <Consumer>{providerState => this.props.children(providerState.routing)}</Consumer>
    }
  }

  function useRouting(): Routing {
    const value = useContext(context)
    return value.routing
  }

  function useRoutingTriggerBuilder() {
    const routing = useRouting()

    return function build(
      activityName: string,
      params: ActivityParams = {},
      query: ActivityQuery = {},
      method: ActivitySetMethod = 'push',
    ) {
      const activity = routing.router.buildActivity(activityName, params, query)

      function onClick(event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>): void {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
          return
        }

        event.preventDefault()
        routing.setActivity(activity, method)
      }

      return {href: activity.url, onClick}
    }
  }

  function useRoutingTrigger(
    activityName: string,
    params: ActivityParams = {},
    query: ActivityQuery = {},
    method: ActivitySetMethod = 'push',
  ) {
    const build = useRoutingTriggerBuilder()
    return build(activityName, params, query, method)
  }

  return {
    RoutingConsumer: RoutingConsumerImpl,
    RoutingProvider,
    useRouting,
    useRoutingTrigger,
    useRoutingTriggerBuilder,
  }
}
