/* eslint-disable react/prop-types */
import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'
import Navigation from './navigation'
import { Outlet } from 'react-router'
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
