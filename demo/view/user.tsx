import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import CommonForm from 'src/DataDisplay'
import { getUserList, searchUsers, addUser, deleteUser, updateUser } from '../api'

function User () {
  const [userList, setUserList] = useState([])
  function fetchUserList () {
    getUserList().then(setUserList)
  }
  function onSuccess ({ code, message: msg }) {
    if (code === 1) message.success(msg)
    fetchUserList()
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
      dataIndex: 'createDate',
      title: '创建日期'
    }
  ]
  const fields = [
    {
      col: 2,
      fields: [
        {
          dataIndex: 'id',
          label: 'ID',
          inputProps: { disabled: true },
          visible: (fields, editType) => editType === 'update'
        }
      ]
    },
    {
      col: 2,
      fields: [
        {
          dataIndex: 'name',
          label: '姓名',
          rules: [{
            required: true
          }]
        },
        {
          dataIndex: 'age',
          label: '年龄',
          type: 'number'
        }
      ]
    },
    {
      col: 2,
      fields: [
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
          dataIndex: 'province',
          label: '省',
          type: 'select',
          options: [
            {
              label: '请选择',
              value: -1
            },
            {
              label: '四川',
              value: 0
            },
            {
              label: '浙江',
              value: 1
            },
            {
              label: '江苏',
              value: 2
            }
          ],
          defaultValue: -1
        },
        {
          dataIndex: 'city',
          label: '市',
          type: 'select',
          relate: 'province',
          options: {
            0: ['成都', '绵阳'],
            1: ['杭州', '宁波'],
            2: ['南京', '无锡']
          },
          defaultValue: 0,
          visible: ({ province }) => province !== -1
        }
      ]
    },
    {
      col: 2,
      fields: [
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
          dataIndex: 'interest',
          label: '爱好',
          type: 'checkbox',
          relate: 'gender',
          options: {
            0: [{
              label: '唱',
              value: 0
            }, {
              label: '跳',
              value: 1
            }, {
              label: 'rap',
              value: 2
            }, {
              label: '篮球',
              value: 3
            }],
            1: [{
              label: '购物',
              value: 0
            }, {
              label: '购物',
              value: 1
            }, {
              label: '购物',
              value: 2
            }, {
              label: '购物',
              value: 3
            }]
          },
          defaultValue: [0, 1, 2, 3]
        }
      ]
    },
    {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 21
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
    <CommonForm
      tableProps={{ columns, dataSource: userList, rowKey: 'id' }}
      searchPlaceholder="用户名"
      onSearch={search}
      onDelete={deleteUsers}
      containerProps={{ width: 760 }}
      title="用户"
      fields={fields}
      onSubmit={submit}/>
  )
}

export default User
