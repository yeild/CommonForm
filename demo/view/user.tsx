import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import DataDisplay from 'src/DataDisplay'
import { Checkbox } from 'antd'
import { getUserList, searchUsers, addUser, deleteUser, updateUser } from '../api'

function User () {
  const [userList, setUserList] = useState([])
  function fetchUserList () {
    getUserList().then(setUserList)
  }
  function onSuccess ({ code, message: msg }) {
    if (code === 1) message.success(msg)
    fetchUserList()
    // fixme render delayed
  }
  useEffect(fetchUserList, [])

  const columns = [
    {
      dataIndex: 'id',
      title: 'ID'
    },
    {
      dataIndex: 'name',
      title: '姓名'
    },
    {
      dataIndex: 'gender',
      title: '性别',
      render: (text) => text === 0 ? '男' : '女'
    },
    {
      dataIndex: 'age',
      title: '年龄'
    },
    {
      dataIndex: 'email',
      title: '邮箱'
    },
    {
      dataIndex: 'createTime',
      title: '创建时间'
    }
  ]
  const fields = [
    {
      col: 2,
      fields: [
        {
          dataIndex: 'id',
          label: 'ID',
          inputProps: { disabled: true }
        },
        {
          dataIndex: 'name',
          label: '姓名',
          required: true,
          rules: [{
            required: true
          }]
        },
        {
          dataIndex: 'gender',
          label: '性别',
          type: 'radio',
          options: [{
            label: '男',
            value: 0
          }, {
            label: '女',
            value: 1
          }],
          defaultValue: 0
        },
        {
          dataIndex: 'age',
          label: '年龄',
          type: 'number'
        },
        {
          dataIndex: 'tel',
          label: '手机号',
          type: 'number',
          rules: [{
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式错误'
          }]
        },
        {
          dataIndex: 'email',
          label: '邮箱',
          rules: [{
            pattern: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/,
            message: '邮箱格式错误'
          }]
        },
        {
          dataIndex: 'city',
          label: '城市',
          type: 'select',
          options: ['北京', '上海', '广州'],
          defaultValue: 0
        },
        {
          dataIndex: 'authority',
          label: '权限',
          type: 'checkbox',
          options: [{
            label: '访问',
            value: 0
          }, {
            label: '评论',
            value: 1
          }],
          defaultValue: [0, 1]
        }
      ]
    },
    {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 20
      },
      fields: [
        {
          dataIndex: 'remark',
          label: '备注',
          type: 'textarea'
        }
      ]
    }
  ]
  function search (key) {
    searchUsers(key).then(setUserList)
  }
  function deleteUsers (ids) {
    deleteUser(ids).then(onSuccess)
  }
  function submit (type, data) {
    if (type === 'create') addUser(data).then(onSuccess)
    else updateUser(data.id, data).then(onSuccess)
  }
  return (
    <DataDisplay
      tableProps={{ columns, dataSource: userList, rowKey: 'id' }}
      onSearch={search}
      onDelete={deleteUsers}
      container="drawer"
      title="用户"
      fields={fields}
      onSubmit={submit}/>
  )
}

export default User
