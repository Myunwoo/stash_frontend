export default defineNuxtRouteMiddleware((to, from) => {
  const token = getCookie('SAT')

  if (!token) {
    return navigateTo('/login')
  }
})
