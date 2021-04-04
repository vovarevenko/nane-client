<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn
        v-if="$route.path !== '/login'"
        dense
        flat
        round
        icon="fas fa-bars"
        @click="toggleClick"
      />
      <q-toolbar-title>{{ title }}</q-toolbar-title>
      <q-btn
        v-if="username"
        :label="username"
        @click="$router.push('/login')"
        flat
        no-caps
        clickable
      />
      <q-btn
        v-if="username"
        label="Выйти"
        @click="logout"
        flat
        no-caps
        clickable
      />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { MutationType, store } from '@/store'
import { router } from '@/router'

export default defineComponent({
  name: 'Header',
  emits: ['toggleClick'],
  setup(_, { emit }) {
    const username = computed(() => store.getters.username)
    const title = computed(() => {
      const currentRoomName = store.getters.currentRoom?.name
      return currentRoomName ? currentRoomName : 'Игрушечный чат'
    })

    function toggleClick() {
      emit('toggleClick')
    }

    function logout() {
      store.commit(MutationType.SetUsername, undefined)
      router.push('/login')
    }

    return { username, title, toggleClick, logout }
  },
})
</script>
