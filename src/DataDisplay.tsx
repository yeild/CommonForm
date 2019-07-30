import React, { useState } from 'react'
import { Divider, Table, Select, Input, Button, Modal } from 'antd'
import DataEdit from './DataEdit'
import './index.css'

interface DataTypes {
  columns: any
  dataSource: any
  rowKey: any
  container?: 'modal' | 'drawer'
  title?: string
  fields: any
}

function DataDisplay ({ columns, dataSource, rowKey, container, title, fields }:DataTypes) {
  const [isVisible, setIsVisible] = useState(true)
  const [modalTitle, setModalTitle] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    }
  }
  function openAddModal () {
    setModalTitle('添加' + title)
    setIsVisible(true)
  }
  function openEditModal () {
    setModalTitle('编辑' + title)
    setIsVisible(true)
  }
  const columnsWithAction = [...columns, {
    key: 'action',
    title: '操作',
    render: () => (
      <span>
        <a href="javascript:" onClick={openEditModal}>编辑</a>
        <Divider type="vertical"/>
        <a href="javascript:">删除</a>
      </span>
    )
  }]


  function confirm () {
    Modal.confirm({
      title: '确认要删除吗?',
      content: '该操作将不可撤销。',
      okText: '确认',
      cancelText: '取消'
    })
  }
  return (
    <div className="commonTable">
      <div className="commonTable-toolbar">
        <div className="commonTable-search">
          <Input placeholder="用户名"/>
          <Button type="primary">查询</Button>
        </div>
        <span>
          <Button type="primary" onClick={openAddModal}>添加</Button>
          <Button type="danger" onClick={confirm}>删除</Button>
        </span>
      </div>
      <Table
        columns={columnsWithAction}
        dataSource={dataSource}
        rowKey={rowKey}
        rowSelection={rowSelection}/>
      <DataEdit
        container={container}
        title={modalTitle}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        fields={fields}/>
    </div>
  )
}

export default DataDisplay
