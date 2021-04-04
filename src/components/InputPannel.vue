<template>
  <section class="input-panel">
    <div class="message-panel">
      <q-input
        class="message-input bg-primary q-py-xs q-px-md"
        v-model="message"
        placeholder="Ваше сообщение"
        autofocus
        @keyup.enter="sendMessage()"
        borderless
        dense
        ref="input"
        :maxlength="maxLength"
      >
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="fas fa-paper-plane"
            @click="sendMessage()"
          />
        </template>
      </q-input>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ActionType, store } from '@/store'

export default defineComponent({
  name: 'InputPanel',
  emits: ['message'],
  setup(_, { emit }) {
    const maxLength = computed(() => store.getters.settings?.maxMessageLength)
    const currentRoom = computed(() => store.getters.currentRoom)
    const history = computed(() => store.getters.history)
    const message = ref<string | null>(null)
    const input = ref<HTMLInputElement | null>(null)

    function focusInput() {
      input.value?.focus()
    }

    function sendMessage() {
      if (message.value && currentRoom.value) {
        store.dispatch(ActionType.SendMessage, {
          roomName: currentRoom.value.name,
          text: message.value,
        })
        emit('message')
        message.value = null
        focusInput()
      }
    }

    return { maxLength, history, message, input, sendMessage }
  },
})
</script>
