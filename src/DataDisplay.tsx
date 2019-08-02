import React, { useState } from 'react'
import { Divider, Table, Input, Button, Modal, message } from 'antd'
import DataEdit from './DataEdit'
import './index.css'

interface DataDisplayPropTypes {
  table: any
  onSearch?: (key:string) => void
  onDelete?: (selectedRowKeys:any[], selectedRows:any[]) => void
  container?: 'modal' | 'drawer'
  title?: string
  fields: any
  onSubmit: (type:string, data) => void
}

function DataDisplay ({ table, onSearch, onDelete, container, title, fields, onSubmit }:DataDisplayPropTypes) {
  const [searchKey, setSearchKey] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [editType, setEditType] = useState('')
  const [editData, setEditData] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    }
  }

  function deleteRows () {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的数据')
      return
    }
    confirm(function () {
      onDelete(selectedRowKeys, selectedRows)
    })
  }

  function deleteSingle (record) {
    const rowKey = table.rowKey ? record[table.rowKey] : record['key']
    confirm(function () {
      onDelete([rowKey], [record])
    })
  }

  function openAddModal () {
    setModalTitle('添加' + title)
    setEditType('create')
    setIsVisible(true)
  }

  function openEditModal (record) {
    setModalTitle('编辑' + title)
    setEditType('update')
    setEditData(record)
    setIsVisible(true)
  }

  const tableProps = {
    ...table,
    columns: [
      ...table.columns,
      {
        key: 'action',
        title: '操作',
        render: (text, record) => (
          <span>
            <a href="javascript:" onClick={() => openEditModal(record)}>编辑</a>
            <Divider type="vertical"/>
            <a href="javascript:" onClick={() => deleteSingle(record)}>删除</a>
          </span>
        )
      }
    ]
  }

  function confirm (onOk, onCancel?) {
    Modal.confirm({
      title: '确认要删除吗?',
      content: '该操作将不可撤销。',
      okText: '确认',
      cancelText: '取消',
      onOk,
      onCancel
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
          <Button type="danger" onClick={deleteRows}>删除</Button>
        </span>
      </div>
      <Table
        {...tableProps}
        rowSelection={rowSelection}/>
      <DataEdit
        container={container}
        title={modalTitle}
        editType={editType}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        fields={fields}
        data={editData}
        onSubmit={onSubmit}/>
    </div>
  )
}

export default DataDisplay
