import React from 'react'
import { Menu } from 'antd'
import User from './user'
import './app.css'

function App () {
  return (
    <div className="app">
      <div className="app-header">Logo</div>
      <Menu
        className="app-menu"
        defaultSelectedKeys={['User']}
        mode="inline">
        <Menu.Item key="User">
          用户管理
        </Menu.Item>
      </Menu>
      <div className="app-content">
        <User/>
      </div>
    </div>
  )
}

export default App
