import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'
import Navigation from './navigation'

const Layout = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined
}) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
