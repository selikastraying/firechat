<template>
  <div class="h-100 list-group panel">
    <div
      class="list-group-item list-group-item-action"
      v-for="room in rooms"
      :key="room.room"
      @click="enterRoom(room.room)"
    >
      {{ room.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rooms: {
      type: Array,
      require: true,
    },
  },
  methods: {
    enterRoom(room) {
      this.$emit('update', room)
    },
  },
}
</script>

<style></style>
