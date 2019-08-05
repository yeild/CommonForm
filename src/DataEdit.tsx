import React from 'react'
import { Modal, Drawer, Form, Typography, Row, Col, Input, InputNumber, Select, Button } from 'antd'

interface DataEditPropTypes {
  form: any
  container?: 'modal' | 'drawer'
  containerProps?: any
  title: string
  editType: string
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
  fields: any
  data: any
  onSubmit: (type: string, data) => void
}

function DataEdit ({
  isVisible,
  setIsVisible,
  container = 'modal',
  containerProps,
  title,
  editType,
  form,
  fields,
  data,
  onSubmit
}) {
  function getFields () {
    const isCreate = editType === 'create'
    const children = []
    fields.forEach(function ({ title, col = 1, labelCol = { span: 6 }, wrapperCol = { span: 16 }, fields }, index) {
      const rows = []
      if (title) rows.push(<Typography.Title level={4}>{title}</Typography.Title>)

      fields.forEach(function ({
        dataIndex,
        label,
        type = 'string',
        initialValue,
        inputProps,
        rules,
        options // 下拉框的选项
      }, index) {
        inputProps.placeholder = inputProps.placeholder || label
        initialValue = isCreate ? initialValue : data[dataIndex]
        const getFieldDecorator = form.getFieldDecorator
        const input = (function () {
          if (type === 'string' || type === 'number' || type === 'textarea') {
            const InputType = type === 'string' ? Input : type === 'number' ? InputNumber : Input.TextArea
            return getFieldDecorator(dataIndex, {
              initialValue,
              rules
              // @ts-ignore
            })(<InputType {...inputProps}/>)
          }
          return getFieldDecorator(dataIndex, {
            initialValue,
            rules
          })(<Select {...inputProps}>
            {
              options.map(function (option, index) {
                const value = option.value || index
                const text = option.text || option
                return <Select.Option key={value} value={value}>{text}</Select.Option>
              })
            }
          </Select>)
        }())
        rows.push(
          <Col span={24 / col} key={index}>
            <Form.Item label={label}
              labelCol={labelCol}
              wrapperCol={wrapperCol}>
              {input}
            </Form.Item>
          </Col>
        )
      })
      children.push(
        <Row key={index}>
          {rows}
        </Row>
      )
    })
    return children
  }

  function hideEdit () {
    setIsVisible(false)
  }
  function submit () {
    form.validateFields(function (err, data) {
      if (!err) {
        onSubmit(editType, data)
        setIsVisible(false)
      }
    })
  }
  const Container = container === 'modal' ? (
    <Modal
      className="commonTable-edit"
      visible={isVisible}
      title={title}
      okText="确认"
      cancelText="取消"
      onCancel={hideEdit}
      {...containerProps}>
      <Form>
        {getFields()}
      </Form>
    </Modal>
  ) : (
    <Drawer
      className="commonTable-edit"
      width="90%"
      visible={isVisible}
      title={title}
      onClose={hideEdit}
      {...containerProps}>
      <Form>
        {getFields()}
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={submit}>
              保存
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={hideEdit}>
              取消
            </Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
  return Container
}

const WrappedDataEdit = Form.create<DataEditPropTypes>()(DataEdit)

export default WrappedDataEdit
