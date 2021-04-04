<template>
  <q-page>
    <div v-if="!isDataReady" class="preloader">
      <img
        src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
      />
    </div>
    <div class="column chat">
      <div class="col chat-history">
        <div class="chat-scroller" ref="scroller" @scroll="onScroll">
          <div v-if="history" class="col q-pa-md">
            <q-chat-message
              v-for="(message, index) in history"
              :key="`message-${index}`"
              :name="message.sender.username"
              :text="[message.text]"
              :sent="message.sender.username === username"
              :stamp="new Date(message.created).toLocaleString('ru')"
              :bg-color="
                message.sender.username === username ? 'green-3' : 'indigo-2'
              "
            />
          </div>
        </div>
      </div>
      <div class="col chat-input">
        <InputPannel @message="scrollToBottom(true)" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue'
import InputPannel from '@/components/InputPannel.vue'
import { router } from '@/router'
import { ActionType, MutationType, store } from '@/store'

export default defineComponent({
  name: 'Room',
  components: { InputPannel },
  setup() {
    const roomName = router.currentRoute.value.params.name as string

    const username = computed(() => store.getters.username)
    const rooms = computed(() => store.getters.rooms)
    const history = computed(() => store.getters.history)
    const messageCount = computed(() => history.value?.length)

    const scroller = ref<HTMLInputElement | null>(null)
    const isScrollerFixed = ref(true)
    const isDataReady = ref(false)

    onMounted(async () => {
      await store.dispatch(ActionType.FetchHistory, roomName)

      // Sorry😐
      setTimeout(() => {
        scrollToBottom(true)
        isDataReady.value = true
      }, 500)
    })

    onBeforeUnmount(() => {
      store.commit(MutationType.SetCurrentRoom, undefined)
      store.commit(MutationType.SetHistory, undefined)
    })

    watch(
      () => messageCount.value,
      async () => {
        await nextTick()
        scrollToBottom()
      },
    )

    watchEffect(() => {
      const room = rooms.value?.find(el => el.name === roomName)
      if (room) store.commit(MutationType.SetCurrentRoom, room)
    })

    function onScroll() {
      if (scroller.value) {
        const scrollMax =
          scroller.value.scrollHeight - scroller.value.clientHeight
        isScrollerFixed.value = scroller.value.scrollTop === scrollMax
      }
    }

    function scrollToBottom(force = false) {
      if (scroller.value && (force || isScrollerFixed.value)) {
        scroller.value.scrollTop = scroller.value.scrollHeight
      }
    }

    return {
      username,
      history,
      scroller,
      isDataReady,
      onScroll,
      scrollToBottom,
    }
  },
})
</script>
