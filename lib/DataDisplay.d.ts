interface OptionTypes {
  label: string
  value: any
}

interface MappedOptionTypes {
  [key: string]: string[] | OptionTypes[]
  [key: number]: string[] | OptionTypes[]
}

interface FieldTypes {
  dataIndex: string
  label: string
  type?: string
  inputProps?: object
  rules?: object[]
  defaultValue?: string | number
  relate?: string
  options?: string[] | OptionTypes[] | MappedOptionTypes
  render?: () => any
  visible?: (fields: {[key:string]: string | number}, editType: 'create' | 'update') => boolean |  boolean
}

interface FieldSectionTypes {
  col?: number
  title?: string
  labelCol?: object
  wrapperCol?: object
  fields: FieldTypes[]
}

interface DataDisplayProps {
  tableProps: object
  searchPlaceholder?: string
  onSearch?: (key:string) => void
  onDelete?: (selectedRowKeys:any[], selectedRows:any[]) => void
  container?: 'modal' | 'drawer'
  containerProps?: object
  title?: string
  fields: FieldSectionTypes[]
  onSubmit: (type:string, data) => void
}

export default function DataDisplay (props: DataDisplayProps)
