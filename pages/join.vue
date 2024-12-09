<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-card max-width="400" class="pa-4">
      <v-card-title class="text-h5">회원가입</v-card-title>

      <v-card-text>
        <!-- 이름 입력 -->
        <v-text-field label="이름" v-model="name" outlined clearable prepend-inner-icon="mdi-account" />

        <!-- 아이디 입력 및 중복 확인 -->
        <v-row no-gutters align="center">
          <v-col cols="8">
            <v-text-field label="아이디" v-model="username" outlined clearable prepend-inner-icon="mdi-account-circle" />
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" @click="checkUsername" block>중복 확인</v-btn>
          </v-col>
        </v-row>

        <!-- 비밀번호 입력 -->
        <v-text-field label="비밀번호" v-model="password" outlined clearable prepend-inner-icon="mdi-lock"
          type="password" />

        <!-- 비밀번호 확인 입력 -->
        <v-text-field label="비밀번호 확인" v-model="passwordConfirm" outlined clearable prepend-inner-icon="mdi-lock-check"
          type="password" :error="!passwordsMatch && passwordConfirm.length > 0" error-messages="비밀번호가 일치하지 않습니다" />
      </v-card-text>

      <v-card-actions class="d-flex flex-column">
        <!-- 회원가입 버튼 -->
        <v-btn color="primary" block @click="signUp" :disabled="!passwordsMatch">
          회원가입
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const name = ref('');
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');

// 비밀번호 일치 확인
const passwordsMatch = computed(() => password.value === passwordConfirm.value);

// 중복 확인 로직
const checkUsername = () => {
  console.log('아이디 중복 확인:', username.value);
  // 중복 확인 로직 추가 필요
};

// 회원가입 로직
const signUp = () => {
  if (passwordsMatch.value) {
    console.log('회원가입 정보:', {
      name: name.value,
      username: username.value,
      password: password.value,
    });
    // 회원가입 로직 추가 필요
  } else {
    console.log('비밀번호가 일치하지 않습니다.');
  }
};
</script>

<style scoped>
html,
body,
.v-application {
  height: 100%;
}
</style>
