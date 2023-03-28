import { Fragment, ReactNode } from 'react'
import Navigation from './Navigation'

const Layout = (props: { children: ReactNode }) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
