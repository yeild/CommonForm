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
      name: 'Allen Belem',
      age: 20,
      gender: '男',
      tel: 13000000000,
      email: 'allen@brown.com',
      remark: 'Allen Brown'
    },
    {
      id: 2,
      name: 'Berry Jerry',
      age: 21,
      gender: '男',
      tel: 13111111111,
      email: 'berry@jerry.com',
      remark: 'Berry Jerry'
    },
    {
      id: 3,
      name: 'Anna Ella',
      age: 22,
      gender: '女',
      tel: 13222222222,
      email: 'anna@ella.com',
      remark: 'Anna Ella'
    }
  ]
  const fields = [
    {
      col: 2,
      fields: [
        {
          dataIndex: 'name',
          title: '姓名',
          required: true,
          rules: [{
            required: true,
            type: 'string'
          }]
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
          rules: [{
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式错误'
          }]
        },
        {
          dataIndex: 'email',
          title: '邮箱',
          rules: [{
            pattern: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/,
            message: '邮箱格式错误'
          }]
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
  function search (key) {
    console.log(key)
  }
  function deleteItem (keys, items) {
    console.log(keys)
    console.log(items)
  }
  function submit (data) {
    console.log(data)
  }
  return (
    <DataDisplay
      table={{ columns, dataSource: data, rowKey: 'id' }}
      onSearch={search}
      onDelete={deleteItem}
      container="drawer"
      title="用户"
      fields={fields}
      onSubmit={submit}/>
  )
}

export default User
