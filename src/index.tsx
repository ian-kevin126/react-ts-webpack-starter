import ReactDOM from 'react-dom'
import './index.css'
import zhCN from 'antd/es/locale/zh_CN'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
