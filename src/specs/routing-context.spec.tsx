import {Routing} from '@jneander/activity-routing-history'
import {createContainer} from '@jneander/spec-utils-dom'
import {act, render} from '@testing-library/react'
import {History, createMemoryHistory} from 'history'
import type {ReactNode} from 'react'
import sinon from 'sinon'

import {createRoutingContext} from '../routing-context'
import type {RoutingConsumer, RoutingProvider} from '../types'
import {router} from './example-router'

describe('RoutingContext', () => {
  let container: HTMLElement
  let childFn: (routing: Routing) => ReactNode
  let component: ReturnType<typeof render>
  let history: History
  let routing: Routing
  let RoutingConsumer: RoutingConsumer
  let RoutingProvider: RoutingProvider

  beforeEach(() => {
    container = createContainer()

    history = createMemoryHistory()
    routing = new Routing({history, router: router})
    const context = createRoutingContext()
    RoutingProvider = context.RoutingProvider
    RoutingConsumer = context.RoutingConsumer

    childFn = routing => <h1>{routing.getCurrentActivity().name}</h1>
  })

  afterEach(() => {
    component.unmount()
    container.remove()
  })

  async function renderComponent() {
    const element = (
      <RoutingProvider routing={routing}>
        <RoutingConsumer>{childFn}</RoutingConsumer>
      </RoutingProvider>
    )
    component = render(element, {container})
  }

  it('passes the router to the "children" render prop', async () => {
    let childArgs
    childFn = (...args: [Routing]) => {
      childArgs = args
      return <></>
    }
    await renderComponent()
    expect(childArgs).to.have.ordered.members([routing])
  })

  it('displays the result of the children prop render function', async () => {
    await renderComponent()
    const $activity = container.querySelector('h1')
    expect($activity.textContent).to.equal('home')
  })

  it.only('re-renders when the current activity changes', async () => {
    await renderComponent()
    act(() => {
      history.push('/users')
    })
    const $activity = container.querySelector('h1')
    expect($activity.textContent).to.equal('listUsers')
  })

  it('disconnects from activity changes when unmounting', async () => {
    const unsubscribe = sinon.spy()
    sinon.stub(routing, 'subscribe').returns(unsubscribe)
    await renderComponent()
    component.unmount()
    expect(unsubscribe.callCount).to.equal(1)
  })
})
