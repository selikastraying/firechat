<template>
  <div class="h-100 list-group panel">
    <div
      v-for="(user, index) in userlist"
      :key="index"
      @click="newRoom(user.uid, user.name)"
    >
      <div
        class="list-group-item list-group-item-action"
        v-if="user.uid != uid"
      >
        {{ user.name }}
      </div>
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
    uid: {
      type: String,
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
