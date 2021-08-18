import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { IStoreState } from '../store/types'
import Sidebar from '../components/LayoutSideBar/index'
import { Settings } from '../store/module/settings'
import Header from '../components/LayoutHeader'
import LayoutSettings from '../components/LayoutSettings'
import MainRoutes from './MainRoutes'

interface LayoutProps {
  layout: Settings['layout']

  colorWeak: boolean

  fixedHeader: boolean

  contentWidth: Settings['contentWidth']
}

function Layout(props: LayoutProps) {
  return (
    <>
      <section>
        {/* {props.layout === 'side' && <Sidebar />} */}
        <section>
          {/* <Header /> */}
          <div>
            <Suspense fallback={<Spin size="large" />}>
              {/* <MainRoutes /> */}
            </Suspense>
          </div>
        </section>
        {/* <LayoutSettings /> */}
      </section>
    </>
  )
}

export default connect(
  ({
    settings: { layout, colorWeak, fixedHeader, contentWidth },
  }: IStoreState) => ({
    layout,
    colorWeak,
    fixedHeader,
    contentWidth,
  })
)(Layout)
