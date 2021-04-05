<template>
  <q-list separator>
    <q-item @click="createRoom" clickable>
      <q-item-section>
        <q-item-label>
          <q-icon name="fas fa-plus" />
          <span class="text-subtitle1 q-ml-sm">Создать комнату</span>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-for="(room, index) in rooms"
      :key="`room-${index}`"
      :active="currentRoom === room"
      active-class="bg-indigo-1"
      @click="setActiveRoom(room)"
      clickable
    >
      <q-item-section>
        <q-item-label>{{ room.name }}</q-item-label>
        <q-item-label v-if="room.lastMessage" caption>
          {{ room.lastMessage.text }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Room } from '@/models'
import { router } from '@/router'
import { ActionType, store } from '@/store'

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const rooms = computed(() => store.getters.rooms)
    const currentRoom = computed(() => store.getters.currentRoom)
    const maxLength = computed(() => store.getters.settings?.maxRoomTitleLength)

    function setActiveRoom(room: Room) {
      router.push(`/room/${room.name}`)
    }

    async function createRoom() {
      const name = prompt('Название комнаты', '')?.trim()

      if (name === '') {
        alert('Нужен хотя бы один символ!')
      } else if (name) {
        if (maxLength.value && name.length > maxLength.value) {
          alert(`Разрешенное кол-во символов: ${maxLength.value}`)
        } else {
          await store.dispatch(ActionType.CreateRoom, name)
          router.push(`/room/${name}`)
        }
      }
    }

    return { rooms, currentRoom, maxLength, setActiveRoom, createRoom }
  },
})
</script>
