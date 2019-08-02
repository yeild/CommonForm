import React from 'react'
import { Modal, Drawer, Form, Typography, Row, Col, Input, InputNumber, Select, Button } from 'antd'

interface PropTypes {
  form: any
  container?: 'modal' | 'drawer'
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
  title: string
  fields: any
}

function DataEdit ({ form, container = 'modal', title, isVisible, setIsVisible, fields }) {
  function getFields () {
    const children = []
    fields.forEach(function ({ title, col = 1, labelCol = { span: 6 }, wrapperCol = { span: 16 }, fields }, index) {
      const rows = []
      if (title) rows.push(<Typography.Title level={4}>{title}</Typography.Title>)

      fields.forEach(function ({ dataIndex, title, required, props, rules, initialValue, disabled, type = 'string', placeholder = title, options }, index) {
        const getFieldDecorator = form.getFieldDecorator
        const input = (function () {
          if (type === 'string' || type === 'number' || type === 'textarea') {
            const InputType = type === 'string' ? Input : type === 'number' ? InputNumber : Input.TextArea

            return getFieldDecorator(dataIndex, {
              initialValue,
              rules: [{ required, type }]
              // @ts-ignore
            })(<InputType placeholder={placeholder} disabled={disabled} {...props}/>)
          }
          return getFieldDecorator(dataIndex, {
            initialValue,
            rules
          })(<Select>
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
            <Form.Item label={title}
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
  const Container = container === 'modal' ? (
    <Modal
      className="commonTable-edit"
      visible={isVisible}
      title={title}
      okText="确认"
      cancelText="取消"
      onCancel={hideEdit}>
      <Form>
        {getFields()}
      </Form>
    </Modal>
  ) : (
    <Drawer
      className="commonTable-edit"
      width="80%"
      visible={isVisible}
      title={title}
      onClose={hideEdit}>
      <Form>
        {getFields()}
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={hideEdit}>
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

const WrappedDataEdit = Form.create<PropTypes>()(DataEdit)

export default WrappedDataEdit
