import React, { useState } from 'react'
import { Menu } from 'antd'
import User from './user'
import News from './news'
import './app.css'

function App () {
  const routeMap = { User, News }
  const [route, setRoute] = useState('User')
  const Route = routeMap[route]
  return (
    <div className="app">
      <div className="app-header">Logo</div>
      <Menu
        className="app-menu"
        defaultSelectedKeys={['User']}
        onClick={({ key }) => setRoute(key)}
        mode="inline">
        <Menu.Item key="User">
          用户管理
        </Menu.Item>
        <Menu.Item key="News">
          新闻管理
        </Menu.Item>
      </Menu>
      <div className="app-content">
        <Route/>
      </div>
    </div>
  )
}

export default App
