<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// eslint-disable-next-line no-unused-vars
import { EventItem } from '../types'
import EventService from '../services/EventService'
import { fold } from 'fp-ts/lib/Either'
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      event: {} as EventItem
    }
  },
  created() {
    // EventService.getEvent(this.id)
    //   .then(response => {
    //     this.event = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    EventService.getEventTE(this.id).then(
      fold(
        (err: Error) => console.log(err),
        // FIXME: what is correct type for res?
        (res: any) => (this.event = res.data)
      )
    )
  }
})
</script>
