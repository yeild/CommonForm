import React, { useState, useEffect } from 'react'
import { Divider, Table, Select, Input, Button, Modal } from 'antd'
import DataEdit from './DataEdit'
import './index.css'

interface propTypes {
  table: any
  onSearch?: (key:string) => void
  container?: 'modal' | 'drawer'
  title?: string
  fields: any
}

function DataDisplay ({ table, onSearch, container, title, fields }:propTypes) {
  const [searchKey, setSearchKey] = useState('')
  const [isVisible, setIsVisible] = useState(false)
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

  const tableProps = {
    ...table,
    columns: [
      ...table.columns,
      {
        key: 'action',
        title: '操作',
        render: () => (
          <span>
        <a href="javascript:" onClick={openEditModal}>编辑</a>
        <Divider type="vertical"/>
        <a href="javascript:">删除</a>
      </span>
        )
      }
    ]
  }

  console.log(table)

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
        {
          onSearch ? (
            <div className="commonTable-search">
              <Input placeholder="用户名" onChange={e => setSearchKey(e.target.value)}/>
              <Button type="primary" onClick={() => onSearch(searchKey)}>查询</Button>
            </div>
          ) : null
        }
        <span>
          <Button type="primary" onClick={openAddModal}>添加</Button>
          <Button type="danger" onClick={confirm}>删除</Button>
        </span>
      </div>
      <Table
        {...tableProps}
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
