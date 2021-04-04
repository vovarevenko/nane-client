<template>
  <q-page class="q-px-md">
    <h1 class="text-h4">Авторизация</h1>
    <q-form @submit="submit">
      <q-input
        v-model="username"
        @keyup.enter="submit"
        placeholder="Как вас зовут?"
        autofocus
        outlined
        counter
        :maxlength="maxLength"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="fas fa-check" @click="submit" />
        </template>
      </q-input>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { router } from '@/router'
import { ActionType, store } from '@/store'

export default defineComponent({
  name: 'Room',
  setup() {
    const username = ref('')
    const maxLength = computed(() => store.getters.settings?.maxUsernameLength)

    async function submit() {
      if (username.value) {
        await store.dispatch(ActionType.ChangeUsername, username.value)
        router.push('/')
      }
    }

    return { username, maxLength, submit }
  },
})
</script>
