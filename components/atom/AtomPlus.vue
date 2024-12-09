<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: 'big',
    validator: (value: string) => ['big', 'medium', 'small'].includes(value),
  },
  isFloating: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['click'])
const buttonClass = computed(() => (props.isFloating ? 'floating-button' : 'static-button'));
const buttonSize = computed(() => {
  switch (props.size) {
    case 'medium':
      return { width: '40px', height: '40px', fontSize: '20px' }
    case 'small':
      return { width: '32px', height: '32px', fontSize: '16px' }
    case 'big':
    default:
      return { width: '56px', height: '56px', fontSize: '24px' }
  }
})
</script>

<template>
  <v-btn :class="buttonClass" :style="buttonSize" icon @click="$emit('click')">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: orange;
  color: white;
  border-radius: 50%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.static-button {
  background-color: orange;
  color: white;
  border-radius: 50%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
