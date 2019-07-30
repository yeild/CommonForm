import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import App from './view/app'
import 'antd/dist/antd.css'

const HotApp = hot(App)
ReactDOM.render(
  <HotApp/>,
  document.getElementById('root')
)
