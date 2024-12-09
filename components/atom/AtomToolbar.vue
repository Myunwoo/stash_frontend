<script setup type="ts">
const router = useRouter()

const onClickTitle = () => {
  router.push('/')
}

const onClickHome = () => {
  router.push('/')
}

const onClickAlarm = () => {
  router.push('/alarm')
}

const onClickAccount = () => {
  router.push('/account')
}

const onClickCalendar = () => {
  router.push('/calendar')
}
</script>

<template>
  <v-toolbar density="compact">
    <v-toolbar-title @click="onClickTitle">Stash</v-toolbar-title>
    <v-spacer></v-spacer>

    <HomeBtn></HomeBtn>

    <v-menu open-on-hover location="bottom" offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" @click="onClickAccount">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <AccountDropView />
    </v-menu>

    <v-menu open-on-hover location="bottom" offset-y :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" @click="onClickCalendar">
          <v-icon>mdi-calendar-blank</v-icon>
        </v-btn>
      </template>
      <CalendarDropView />
    </v-menu>
  </v-toolbar>
</template>
