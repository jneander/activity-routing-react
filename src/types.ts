import type {ActivityParams, ActivityQuery} from '@jneander/activity-routing'
import type {Routing} from '@jneander/activity-routing-history'
import type {FC, MouseEvent as ReactMouseEvent, ReactNode, ElementType} from 'react'

type ActivitySetMethod = Parameters<Routing['setActivity']>[1]

export interface RoutingConsumerProps {
  children: (routing: Routing) => ReactNode
}

export type RoutingConsumer = ElementType<RoutingConsumerProps>

export interface RoutingProviderProps {
  children: ReactNode
  routing: Routing
}

export type RoutingProvider = FC<RoutingProviderProps>

export type RoutingTrigger = {
  href: string
  onClick(event: ReactMouseEvent<HTMLElement, MouseEvent>): void
}

export type UseRoutingTrigger = (
  activityName: string,
  params?: ActivityParams,
  query?: ActivityQuery,
  method?: ActivitySetMethod,
) => RoutingTrigger

export type RoutingContext = {
  RoutingConsumer: RoutingConsumer
  RoutingProvider: RoutingProvider
  useRouting: () => Routing
  useRoutingTrigger: UseRoutingTrigger
  useRoutingTriggerBuilder: () => UseRoutingTrigger
}
