<template>
  <div class="main-layout">
    <div class="main-layout__left" ref="leftPanel">
      <button class="main-layout__button main-layout__button--left" @click="toggleLeftFull">
        <img 
          :src="arrowSrc"
          :alt="arrowAlt"
          :style="leftArrowStyle"
          class="arrow-img"
        />
      </button>
      <JsonParser />
    </div>
    <div class="main-layout__resizer" ref="resizer" @mousedown="onMouseDown"></div>
    <div class="main-layout__right" ref="rightPanel">
      <button class="main-layout__button main-layout__button--right" @click="toggleRightFull">
        <img 
          :src="arrowSrc"
          :alt="arrowAlt"
          :style="rightArrowStyle"
          class="arrow-img"
        />
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const leftPanel = ref<HTMLElement | null>(null)
const rightPanel = ref<HTMLElement | null>(null)
const resizer = ref<HTMLElement | null>(null)
const isLeftFull = ref(false)
const isRightFull = ref(false)
const savedLeftWidth = ref<string | null>(null)
const savedRightWidth = ref<string | null>(null)
const arrowSrc = ref('/images/arrow.png')
const arrowAlt = ref('Full')
const leftArrowRotation = ref(90)
const rightArrowRotation = ref(-90)

const rotateImage180 = (rotation: globalThis.Ref<number, number>) => {
  rotation.value = (rotation.value + 180) % 360
}

const rotateImageMinus180 = (rotation: globalThis.Ref<number, number>) => {
  rotation.value = (rotation.value - 180) % 360
}

watch(isLeftFull, (newProps) => {
  if (newProps) {
    rotateImageMinus180(leftArrowRotation)
  } else {
    rotateImage180(leftArrowRotation)
  }
})

watch(isRightFull, (newProps) => {
  if (newProps) {
    rotateImageMinus180(rightArrowRotation)
  } else {
    rotateImage180(rightArrowRotation)
  }
})

const leftArrowStyle = computed(() => ({
  transform: `rotate(${leftArrowRotation.value}deg)`
}))

const rightArrowStyle = computed(() => ({
  transform: `rotate(${rightArrowRotation.value}deg)`
}))

// 데이터 저장을 pinia로 옮겨야 할듯?
const toggleLeftFull = () => {
  if (isLeftFull.value) {
    restorePanels()
  } else {
    savePanelSizes()
    expandLeftPanel()
  }
  isLeftFull.value = !isLeftFull.value
  isRightFull.value = false
}

const toggleRightFull = () => {
  if (isRightFull.value) {
    restorePanels()
  } else {
    savePanelSizes()
    expandRightPanel()
  }
  isRightFull.value = !isRightFull.value
  isLeftFull.value = false
}

const savePanelSizes = () => {
  if (leftPanel.value && rightPanel.value) {
    savedLeftWidth.value = leftPanel.value.style.flexBasis || "60%"
    savedRightWidth.value = rightPanel.value.style.flexBasis || "40%"
  }
}

const expandLeftPanel = () => {
  if (leftPanel.value && rightPanel.value) {
    leftPanel.value.style.flexBasis = "100%"
    rightPanel.value.style.flexBasis = "0"
    rightPanel.value.style.display = "none"
  }
}

const expandRightPanel = () => {
  if (leftPanel.value && rightPanel.value) {
    rightPanel.value.style.flexBasis = "100%"
    leftPanel.value.style.flexBasis = "0"
    leftPanel.value.style.display = "none"
  }
}

const restorePanels = () => {
  if (leftPanel.value && rightPanel.value) {
    leftPanel.value.style.flexBasis = savedLeftWidth.value || "60%"
    rightPanel.value.style.flexBasis = savedRightWidth.value || "40%"
    leftPanel.value.style.display = "flex"
    rightPanel.value.style.display = "flex"
  }
}

let isResizing = false
let startX = 0
let startLeftWidth = 0

const onMouseDown = (e: MouseEvent) => {
  isResizing = true
  startX = e.clientX
  startLeftWidth = leftPanel.value?.offsetWidth || 0
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
}

const onMouseMove = (e: MouseEvent) => {
  if (!isResizing || !leftPanel.value || !rightPanel.value) return
  const deltaX = e.clientX - startX
  const newWidth = startLeftWidth + deltaX
  const minLeftWidth = 100
  const maxLeftWidth = window.innerWidth - minLeftWidth

  if (newWidth > minLeftWidth && newWidth < maxLeftWidth) {
    leftPanel.value.style.flexBasis = `${newWidth}px`
    rightPanel.value.style.flexBasis = `calc(100% - ${newWidth}px)`
  }
}

const onMouseUp = () => {
  isResizing = false
  document.removeEventListener("mousemove", onMouseMove)
  document.removeEventListener("mouseup", onMouseUp)
}
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  height: 100%;
}

.main-layout__left {
  flex-basis: 60%;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: relative;
}

.main-layout__resizer {
  width: 5px;
  background-color: #ccc;
  cursor: ew-resize;
}

.main-layout__right {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  padding-top: 40px;
  background-color: #f4f4f4;
}

.main-layout__button {
  position: absolute;
  top: 8px;
  display: flex;
  padding: 6px 14px;
  font-size: 14px;
  color: #fff;
  background-color: #b0b0b0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
}

.main-layout__button--left {
  right: 8px;
}

.main-layout__button--right {
  left: 8px;
}

.main-layout__button:hover {
  background-color: #808080;
}

.arrow-img {
  width: 24px;
  height: 24px;
}
</style>
