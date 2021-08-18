import { Button, Spin } from 'antd'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'
import { Suspense } from 'react'
import config from './config'
import { IRoute } from './router/config'

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <div>111</div>
      <Router basename={config.BASENAME}>
        <Switch>
          {[].map((route: IRoute) => (
            <Route
              key={config.BASENAME + route.path}
              path={route.path}
              component={route.component}
            ></Route>
          ))}
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
