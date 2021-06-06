<template>
  <div class="h-100 list-group">
    <div
      class="list-group-item list-group-item-action"
      v-for="(user, index) in userlist"
      :key="index"
      @click="newRoom(user.uid, user.name)"
    >
      {{ user.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userlist: {
      type: Array,
      require: true,
    },
  },
  methods: {
    newRoom(uid, name) {
      this.$emit('update', uid, name)
    },
  },
}
</script>

<style></style>
