<template>
  <VDialog v-model="open" eager no-click-animation :width="cSize" :persistent="!bgDim" :open-on-focus="openOnFocus"
    :retain-focus="retainFocus" :class="{ dimmed: bgDim }">
    <div class="modal-header">
      <slot name="header" />
      <span class="close-btn" @click="closePopup" />
    </div>

    <div class="modal-body" :class="[props.scrollable ? 'scroll' : '']">
      <slot name="content" />
    </div>

    <div class="modal-foot">
      <slot name="footer" />
    </div>
  </VDialog>
</template>

<script setup lang="ts">
interface Props {
  visible?: boolean,
  size?: string,
  scrollable?: boolean,
  noDim?: boolean,
  openOnFocus?: boolean,
  retainFocus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  size: undefined,
  scrollable: false,
  noDim: false,
  openOnFocus: false,
  retainFocus: false
})

const emit = defineEmits([
  'update:visible',
  'close'
])

// router
const route = useRoute()
const cProps = computed(() => props)
const open = ref(cProps.value.visible)
const bgDim = ref(false)
const cSize = computed(() => {
  let res = 'auto'
  if (props.size) {
    res = `${props.size}`
  }
  return res
})

// inactive 시
onDeactivated(() => {
  // 팝업 닫기
  closePopup()
})

// 경로가 변경 시
watch(() => route.path, () => {
  // 팝업 닫기
  closePopup()
})

// visible 값 변경 시
watch(open, (newVisible) => {
  if (!newVisible) {
    // 팝업 닫기
    closePopup()
  }
}, { deep: true })

// prop 변경 시(prop 추적을 위해 computed로 선언)
watch(cProps, (newProps) => {
  bgDim.value = newProps.noDim || false
  open.value = newProps.visible
}, {
  deep: true
})


const closePopup = () => {
  emit('update:visible', false)
  emit('close')
}

</script>
