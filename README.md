# CommonForm

### 背景

后台管理系统经常有大量表格展示数据+弹窗添加修改数据的页面，每个页面都会有大量重复代码，于是提取出此组件，以提升开发效率。
  
### 展示 ([查看在线demo](https://yeild.github.io/CommonForm/dist/index.html))
![](https://img2018.cnblogs.com/blog/1150501/201908/1150501-20190807103619892-1946674910.png)
![](https://img2018.cnblogs.com/blog/1150501/201908/1150501-20190807103706998-317315508.png)


### 使用

该组件依赖antd, 请在react+antd项目中使用

```
# bash
npm install antd-common-form

// user.tsx
import CommonForm from 'antd-common-form'

function User () {
  const columns = [...]
  const data = [...]
  const fields = [...]
  function doSth () {...}
  return (
    <CommonForm
      tableProps={{ columns, dataSource: data, rowKey: 'id' }}
      onSearch={doSth}
      onDelete={doSth}
      containerProps={{ width: 760 }}
      title="用户"
      fields={fields}
      onSubmit={doSth}/>
  )
}

```

具体代码请查看：[user.tsx](https://github.com/yeild/CommonForm/blob/master/demo/view/user.tsx)


### API

<table>
    <tr>
        <th>属性</th>
        <th>描述</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>tableProps</td>
        <td>数据展示页的表格参数</td>
        <td>与antd.Table参数一致</td>
        <td></td>
    </tr>
    <tr>
        <td>searchPlaceholder</td>
        <td>搜索输入框的placeholder</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>onSearch</td>
        <td>点击搜索按钮的回调,参数为输入框的值, 无此参数则不显示搜索框</td>
        <td>(key: string)=> void</td>
        <td></td>
    </tr>
    <tr>
        <td>onDelete</td>
        <td>点击行中的删除或者右上角删除按钮的回调, 无此参数则不显示删除按钮和表格行前的选择框</td>
        <td>(selectedRowKeys, selectedRows)=> void</td>
        <td></td>
    </tr>
    <tr>
        <td>container</td>
        <td>弹窗类型</td>
        <td>'modal' | 'drawer'</td>
        <td>'modal'</td>
    </tr>
    <tr>
        <td>containerProps</td>
        <td>弹窗属性</td>
        <td>与antd.Modal的参数或antd.Drawer的参数一致</td>
        <td></td>
    </tr>
    <tr>
        <td>title</td>
        <td>弹窗标题, 添加弹窗显示`添加${title}`, 修改弹窗显示`修改${title}`</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>fields</td>
        <td>表单项分组</td>
        <td>FieldSectionTypes[], 见下方文档</td>
        <td></td>
    </tr>
    <tr>
        <td>onSubmit</td>
        <td>弹窗点击确认时的回调, 参数为所有表单项的值</td>
        <td>(data: fields) => void</td>
        <td></td>
    </tr>
</table>

##### FieldSectionTypes
<table>
    <tr>
        <th>属性</th>
        <th>描述</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>col</td>
        <td>一行显示几列</td>
        <td>number</td>
        <td>1</td>
    </tr>
    <tr>
        <td>title</td>
        <td>该组表单项的标题，如'基本信息', '联系方式'等</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>labelCol</td>
        <td>label标签布局</td>
        <td>与antd.grid.Col参数一致</td>
        <td>{ span: 6 }</td>
    </tr>
    <tr>
        <td>wrapperCol</td>
        <td>输入控件布局</td>
        <td>与antd.grid.Col参数一致</td>
        <td>{ span: 18 }</td>
    </tr>
    <tr>
        <td>fields</td>
        <td>表单项</td>
        <td>FieldTypes, 见下方文档</td>
        <td></td>
    </tr>
</table>

##### FieldTypes
<table>
    <tr>
        <th>属性</th>
        <th>描述</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>dataIndex</td>
        <td>表单数据项的key</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>label</td>
        <td>输入控件的label</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>type</td>
        <td>输入控件类型</td>
        <td>'string' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox'</td>
        <td>'string'</td>
    </tr>
    <tr>
        <td>inputProps</td>
        <td>输入控件参数</td>
        <td>与antd的输入框参数一致</td>
        <td>{ placeholder: label }</td>
    </tr>
    <tr>
        <td>rules</td>
        <td>输入控件验证规则</td>
        <td>与antd.form.getFieldDecorator.rules参数一致</td>
        <td></td>
    </tr>
    <tr>
        <td>defaultValue</td>
        <td>输入控件默认值</td>
        <td>string | number</td>
        <td></td>
    </tr>
    <tr>
        <td>relate</td>
        <td>下拉框/选择框联动, 根据relate指向的key的值, 显示不同的options选项</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>options</td>
        <td>下拉框、选择框的选项, 如果为字符串数组, 则value值为数组index</td>
        <td>string[] | OptionTypes[] | MappedOptionTypes</td>
        <td></td>
    </tr>
    <tr>
        <td>render</td>
        <td>渲染函数，可由此生成自定义输入控件</td>
        <td>function</td>
        <td></td>
    </tr>
</table>

##### OptionTypes
<table>
    <tr>
        <th>属性</th>
        <th>描述</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>label</td>
        <td>选项显示的文字</td>
        <td>string</td>
        <td></td>
    </tr>
    <tr>
        <td>value</td>
        <td>选项的值</td>
        <td>string | number</td>
        <td></td>
    </tr>
</table>

##### MappedOptionTypes
<table>
    <tr>
        <th>属性</th>
        <th>描述</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>[key]</td>
        <td>relate指向的key的每个值对应的选项,具体使用请<a href=https://github.com/yeild/CommonForm/blob/master/demo/view/user.tsx#L103>查看示例</a></td>
        <td>string[] | OptionTypes[]</td>
        <td></td>
    </tr>
</table>

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
