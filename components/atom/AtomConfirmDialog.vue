<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  message: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: '취소',
  },
  confirmColor: {
    type: String,
    default: 'primary',
  },
})
const emit = defineEmits(['update:isOpen', 'confirm', 'cancel'])

const isActive = ref(false)

watch(
  () => props.isOpen,
  (newVal) => {
    isActive.value = newVal
  }
)

const closeDialog = () => {
  isActive.value = false
  emit('update:isOpen', false)
}

const onCancel = () => {
  closeDialog()
  emit('cancel')
}

const onConfirm = () => {
  closeDialog()
  emit('confirm')
}
</script>

<template>
  <v-dialog v-model="isActive" max-width="400">
    <v-card>
      <v-card-title>{{ message }}</v-card-title>
      <v-card-actions>
        <v-btn @click="onCancel" color="black">{{ cancelText || '취소' }}</v-btn>
        <v-btn @click="onConfirm" :color="confirmColor">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
