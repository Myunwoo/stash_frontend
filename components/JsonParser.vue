<template>
  <div class="json-parser">
    <h2 class="json-parser__title">JSON Parser</h2>
    <textarea
      class="json-parser__input"
      v-model="jsonInput"
      placeholder="Paste your JSON here"
      @input="adjustHeight($event)"
    ></textarea>
    <div class="json-parser__output">
      <h3>Parsed Output</h3>
      <pre>{{ parsedOutput }}</pre>
    </div>
    <div class="json-parser__error" v-if="error">
      <h3>Error</h3>
      <p>{{ error }}</p>
    </div>
    <button class="json-parser__button" @click="onClickSave">저장</button>
  </div>
</template>

<script setup lang="ts">
const jsonInput = ref('')
const parsedOutput = ref<null | object>(null)
const error = ref<null | string>(null)
const isLoggedIn = computed(() => !!getCookie('SAT'))

watch(jsonInput, async () => {
  try {
    parsedOutput.value = JSON.parse(jsonInput.value)
    error.value = null
  } catch (e) {
    parsedOutput.value = null
    error.value = 'Invalid JSON'
  }
})

const onClickSave = () => {
  if (isLoggedIn.value) {
    showAlert('저장 api 호출')
  } else {
    showAlert('로그인 후 저장할 수 있습니다.')
  }
}

const adjustHeight = (event: Event) => {
  const element = event.target as HTMLTextAreaElement
  element.style.height = `${element.scrollHeight}px`
}
</script>

<style scoped>
.json-parser {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}

.json-parser__title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.json-parser__input {
  width: 100%;
  height: auto;
  min-height: 100px;
  max-height: none;
  resize: none;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: auto;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  background-color: #fff;
}

.json-parser__output {
  width: 100%;
  min-height: 100px;
  max-height: none;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-family: monospace;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #333;
}

.json-parser__button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #ff7f32;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.json-parser__button:hover {
  background-color: #ff5400;
}

.json-parser__error {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ff7f32;
  border-radius: 4px;
  background-color: #fff3e6;
  color: #ff5400;
  font-family: monospace;
}
</style>
