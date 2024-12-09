<script setup lang="ts">
import { VALIDATE_RULES } from '@/constants/com'
import type { InputValidateType } from '@/types/validate-type'

interface Props {
  // 값
  value?: string | number,
  // 넓이
  size?: number,
  // 입력값 허용 길이
  maxLength?: number,
  // placeholder
  placeholder?: string,
  // readonly
  readonly?: boolean,
  // disabled
  disabled?: boolean,
  // style class
  class?: string,
  // 텍스트 지우기
  clearable?: boolean,
  rows?: number,
  // 유효성 검사를 위한 룰 정의
  validate?: InputValidateType
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  readonly: false,
  disabled: false,
  class: '',
  alignR: false,
  clearable: false,
  rows: 2,
  validate: undefined
})

// 넓이
const cSize = computed(() => {
  let res = 'max-width:auto;'
  if (props.size) {
    res = `width:${props.size}px;`
  }
  return res
})

// 클래스
const cClass = computed(() => {
  return props.class
})

// input value
const inputValue = ref(props.value);

// 이벤트 등록
const emit = defineEmits<{
  (e: 'update:value' | 'input' | 'click' | 'change' | 'blur' | 'focus' | 'keydown' | 'clear', value?: any): void;
}>()

const emitEvent = (event: string, e: Event) => {
  const eventValue = (e.target as HTMLInputElement).value;
  emit(event as any, eventValue);
  emit('update:value', eventValue);
}

const eventHandlers = {
  emitInput: (e: Event) => emitEvent('input', e),
  emitChange: (e: Event) => emitEvent('change', e),
  emitClick: (e: Event) => emit('click', e),
  emitBlur: (e: FocusEvent) => emit('blur', e),
  emitFocus: (e: FocusEvent) => emit('focus', e),
  emitKeyDown: (e: KeyboardEvent) => emit('keydown', e),
  clearInput: () => emit('clear', inputValue.value),
}
</script>

<template>
  <VTextarea ref="textArea" v-model="inputValue" outlined no-resize variant="outlined" class="com-textarea com-v-input"
    :style="cSize" :placeholder="props.placeholder" :maxlength="props.maxLength || ''" :readonly="props.readonly"
    :disabled="props.disabled" :clearable="props.clearable" :class="{
      [props.class]: props.class,
      'is-hint': props.validate?.required
    }" :rows="props.rows" @input="eventHandlers.emitInput" @change="eventHandlers.emitChange"
    @click="eventHandlers.emitClick" @blur="eventHandlers.emitBlur" @focus="eventHandlers.emitFocus"
    @keydown="eventHandlers.emitKeyDown" @click:clear="eventHandlers.clearInput" />
</template>