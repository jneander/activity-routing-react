import {Routing} from '@jneander/activity-routing-history'
import {createContainer} from '@jneander/spec-utils-dom'
import {render} from '@testing-library/react'
import {createMemoryHistory} from 'history'

import {createRoutingContext} from '../routing-context'
import {RoutingViewProps, createRoutingView} from '../routing-view'
import type {RoutingProvider} from '../types'
import {router} from './example-router'

describe('RoutingView', () => {
  let container: HTMLElement
  let component: ReturnType<typeof render>
  let history
  let props: RoutingViewProps
  let routing: Routing
  let RoutingProvider: RoutingProvider
  let RoutingView: ReturnType<typeof createRoutingView>

  beforeEach(() => {
    container = createContainer()

    history = createMemoryHistory()
    routing = new Routing({history, router: router})
    const context = createRoutingContext()
    RoutingProvider = context.RoutingProvider
    RoutingView = createRoutingView(context.RoutingConsumer)

    props = {
      children: <p>Children Content</p>,
      name: 'listUsers',
    }
  })

  afterEach(() => {
    component.unmount()
    container.remove()
  })

  async function renderComponent() {
    const element = (
      <RoutingProvider routing={routing}>
        <RoutingView {...props} />
      </RoutingProvider>
    )
    component = render(element, {container})
  }

  context('when given a "children" prop', () => {
    context('when navigated to the url for the activity', () => {
      it('renders the children', async () => {
        history.push('/users')
        await renderComponent()
        const $content = container.querySelector('p')
        expect($content.textContent).to.equal('Children Content')
      })
    })

    context('when navigated to the url for a different activity', () => {
      it('does not render the children', async () => {
        history.push('/')
        await renderComponent()
        const $content = container.querySelector('p')
        expect($content).to.be.null
      })
    })
  })

  context('when given an "as" component prop', () => {
    function Content() {
      return <p>Component Content</p>
    }

    beforeEach(() => {
      props.as = Content
    })

    context('when navigated to the url for the activity', () => {
      it('renders the children', async () => {
        history.push('/users')
        await renderComponent()
        const $content = container.querySelector('p')
        expect($content.textContent).to.equal('Component Content')
      })
    })

    context('when navigated to the url for a different activity', () => {
      it('does not render the children', async () => {
        history.push('/')
        await renderComponent()
        const $content = container.querySelector('p')
        expect($content).to.be.null
      })
    })
  })
})
