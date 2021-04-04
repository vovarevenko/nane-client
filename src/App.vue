<template>
  <q-layout view="lHh lpR lfr">
    <Header @toggle-click="toggleLeftDrawer" />
    <q-drawer
      v-if="$route.path !== '/login'"
      show-if-above
      v-model="leftDrawerOpen"
    >
      <Sidebar />
    </q-drawer>
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { ActionType, store } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Sidebar,
  },
  setup() {
    store.dispatch(ActionType.Bootstrap)

    const leftDrawerOpen = ref(false)

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return { leftDrawerOpen, toggleLeftDrawer }
  },
})
</script>
