interface OptionTypes {
  label: string
  value: any
}

interface FieldTypes {
  dataIndex: string
  label: string
  type?: string
  inputProps?: any
  rules?: any[]
  relate?: string
  options?: string[] | OptionTypes[]
  defaultValue?: any
}

interface FieldsTypes {
  col?: number
  title?: string
  labelCol?: any
  wrapperCol?: any
  fields: FieldTypes[]
}

interface DataDisplayProps {
  tableProps: any
  fields: FieldsTypes[]
  onSearch?: (key:string) => void
  onDelete?: (selectedRowKeys:any[], selectedRows:any[]) => void
  container?: 'modal' | 'drawer'
  containerProps?: any
  title?: string
  onSubmit: (type:string, data) => void
}

export default function DataDisplay (props: DataDisplayProps)
