import React, { useState } from 'react'
import { Divider, Table, Input, Button, Modal, message } from 'antd'
import DataEdit from './DataEdit'
import './index.css'

interface DataDisplayPropTypes {
  tableProps: any
  searchPlaceholder?: string
  onSearch?: (key:string) => void
  onDelete?: (selectedRowKeys:any[], selectedRows:any[]) => void
  container?: 'modal' | 'drawer'
  containerProps?: any
  title?: string
  fields: any[]
  onSubmit: (type:string, data) => void
}

function DataDisplay ({ tableProps, searchPlaceholder, onSearch, onDelete, container, containerProps, title, fields, onSubmit }:DataDisplayPropTypes) {
  const [searchKey, setSearchKey] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [editType, setEditType] = useState('')
  const [editData, setEditData] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const rowSelection = onDelete ? {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    }
  } : null
  function search () {
    if (searchKey !== '') onSearch(searchKey)
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
    const rowKey = tableProps.rowKey ? record[tableProps.rowKey] : record['key']
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
    setModalTitle('修改' + title)
    setEditType('update')
    setEditData(record)
    setIsVisible(true)
  }

  const tablePropsWithAction = {
    ...tableProps,
    columns: [
      ...tableProps.columns,
      {
        key: 'action',
        title: '操作',
        render: (text, record) => (
          <span>
            <a href="javascript:" onClick={() => openEditModal(record)}>修改</a>
            { onDelete ? (
              <>
                <Divider type="vertical"/>
                <a href="javascript:" onClick={() => deleteSingle(record)}>删除</a>
              </>
            ) : null}
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
    <div className="commonForm">
      <div className="commonForm-toolbar">
        {
          onSearch ? (
            <div className="commonForm-search">
              <Input placeholder={searchPlaceholder} onChange={e => setSearchKey(e.target.value)}/>
              <Button type="primary" onClick={search}>查询</Button>
            </div>
          ) : <span />
        }
        <span>
          <Button type="primary" onClick={openAddModal}>添加</Button>
          {onDelete ? <Button type="danger" onClick={deleteRows}>删除</Button> : null}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        {...tablePropsWithAction}/>
      <DataEdit
        container={container}
        containerProps={containerProps}
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
