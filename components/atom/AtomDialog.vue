<template>
  <VDialog v-model="visibleVal" eager :persistent="bgDim" max-width="500px" :class="{ dimmed: bgDim }">
    <VCard>
      <VCardTitle class="text-h6 d-flex align-center justify-space-between" style="position: relative;">
        <span>{{ header }}</span>
        <VBtn icon small @click="emitClose" class="dialog-close-btn" style="position: absolute; top: 8px; right: 8px;">
          <VIcon small>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>

      <VCardText>
        <div v-dompurify-html="props.msg" />
        <VBtn v-show="props.type === 'confirm' && props.option?.textBtn" color="primary" class="mt-4"
          @click="emitTxtBtn">
          {{ props.option?.textBtn }}
        </VBtn>
      </VCardText>

      <VCardActions class="justify-end">
        <VBtn v-show="btnCancelShow" color="grey" class="me-4" @click="emitClose">
          {{ cancelLabel }}
        </VBtn>
        <VBtn v-show="btnOkShow" color="primary" @click="emitConfirm">
          {{ confirmLabel }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
interface dialogOption {
  header?: string,
  btnOkShow?: boolean,
  confirmLabel?: string,
  btnCloseShow?: boolean,
  btnCancelShow?: boolean,
  cancelLabel?: string,
  textBtn?: string,
  bgDim?: boolean,
}

interface Props {
  visible: boolean,
  type?: string,
  msg?: string,
  option?: dialogOption
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  type: 'alert',
  msg: ''
})

// 이벤트 등록
const emit = defineEmits([
  'confirm',
  'close',
  'txtLink'
])

// computed variables
const header = computed(() => props.option?.header || '안내')
const btnOkShow = computed(() => props.type !== 'error')
const btnCancelShow = computed(() => props.type === 'confirm' ? true : props.option?.btnCancelShow)
const confirmLabel = computed(() => props.option?.confirmLabel || '확인')
const cancelLabel = computed(() => props.option?.cancelLabel || '취소')
const cProps = computed(() => props)

// ref variables
const bgDim = ref(false)
const visibleVal = ref(false)

// watch props
watch(cProps, (newProps) => {
  bgDim.value = newProps.option?.bgDim || false
  visibleVal.value = newProps.visible
}, { deep: true })

// watch visible
watch(visibleVal, (newVisible) => {
  if (!newVisible) {
    emitClose()
  }
}, { deep: true })

// confirm event emit
const emitConfirm = () => {
  emit('confirm', true)
}

// close event emit
const emitClose = () => {
  emit('close', false)
}

// text click event emit
const emitTxtBtn = () => {
  emit('txtLink', true)
}
</script>

<style scoped>
.dialog-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>