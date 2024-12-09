import { VALIDATE_RULES } from '@/constants/com'

type ValidationResult = string | boolean
type ValidationRule = ValidationResult | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>)

/** SelectBox, CheckBox, RadioButton 유효성 검사를 위한 룰 정의 타입 */
interface ValidateType {
  /** 유효성 검사 대상 여부 */
  required?: boolean,
  /** 유효성 검사 실패 시 노출할 메시지의 폼 이름 정의 (ex: `{0}을/를 입력해 주세요`) */
  label?: string
  /** 유효성 검사할 그룹 정의 */
  group?: string
  /** 버튼 클릭시 유효성 검사를 위한 룰 정의 */
  alertRules?: (ValidationRule | keyof typeof VALIDATE_RULES)[]
}

/** TextField 유효성 검사를 위한 룰 정의 타입 */
interface InputValidateType extends ValidateType {
  /** 실시간 유효성 검사를 위한 룰 정의 */
  realTimeRules?: (ValidationRule | keyof typeof VALIDATE_RULES)[]
}

export type { ValidateType, InputValidateType }
