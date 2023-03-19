<template>
    <router-view :name="name" v-slot="{ Component }">
    <keep-alive>
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view>

</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'default',
  }
})

</script>
