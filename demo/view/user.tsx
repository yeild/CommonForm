import React from 'react'
import DataDisplay from 'src/DataDisplay'

function User () {
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
      title: '性别'
    },
    {
      dataIndex: 'age',
      title: '年龄',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
    },
  ]
  const data = [
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      gender: '男',
      email: 'a@b.com'
    },
    {
      id: 2,
      name: 'John Brown',
      age: 32,
      gender: '男',
      email: 'a@b.com'
    },
    {
      id: 3,
      name: 'John Brown',
      gender: '男',
      age: 32,
      email: 'a@b.com'
    }
  ]
  const fields = [
    {
      col: 2,
      fields: [
        {
          dataIndex: 'name',
          title: '姓名',
          required: true
        },
        {
          dataIndex: 'gender',
          title: '性别',
          type: 'select',
          options: ['男', '女'],
          initialValue: 0
        },
        {
          dataIndex: 'age',
          title: '年龄',
          type: 'number'
        },
        {
          dataIndex: 'tel',
          title: '手机号',
          type: 'number',
          pattern: /^1[3456789]\d{9}$/
        },
        {
          dataIndex: 'email',
          title: '邮箱',
          pattern: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
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
          title: '备注',
          type: 'textarea'
        }
      ]
    },
  ]
  return (
    <DataDisplay
      columns={columns}
      dataSource={data}
      container="drawer"
      rowKey="id"
      title="用户"
      fields={fields}/>
  )
}

export default User
