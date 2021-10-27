type FormItemType = "input" | "password" | "select" | "datepicker";

interface OptionType {
  label: string;
  value: string;
}

interface PickerType {
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  // 是否只读
  readonly?: boolean;
  type?: string;
}
/**
 *表单的类型
 *
 * @interface FormType
 */
interface FormType {
  // 表单项的类型
  type: FormItemType;
  label: string;
  rules?: any[];
  placeholder?: any;
  options?: OptionType[];
  datePickerType?: PickerType;
  // 外部样式类
  style?: string[];
}

interface IForm {
  formItems: FormItemType[];
  labelWidth?: string;
  colLayout?: any;
  itemLayout?: any;
}

export { FormType, IForm };
