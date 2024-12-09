<template>
  <v-btn icon @click="onClickHome">
    <v-icon>mdi-home</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
const router = useRouter()
const onClickHome = () => {
  router.push('/')
}
</script>