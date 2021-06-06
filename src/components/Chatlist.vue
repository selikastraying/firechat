<template>
  <div
    class="
      h-100
      d-flex
      flex-column
      justify-content-end
      px-3
      overflow-auto
      noscrollbar
      panel
    "
  >
    <div class="my-3" v-for="(data, index) in roomdata.messages" :key="index">
      <div class="d-flex justify-content-end" v-if="data.name == name">
        <div>
          <p class="border rounded-pill p-2 bg-light">
            {{ data.text }}
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-start" v-if="data.name != name">
        <div>
          <p class="text-left mb-0">{{ data.name }}</p>
          <p class="border rounded-pill p-2 bg-light">
            {{ data.text }}
          </p>
        </div>
      </div>
    </div>
    <div class="d-flex my-3" style="height: 6%; min-height: 6%">
      <div class="input-group">
        <input
          type="text"
          class="form-control text-left h-100"
          v-model="newchat"
          @keyup.enter="sent"
          placeholder="Chat Here..."
        />
        <div class="input-group-append">
          <button
            class="btn btn-primary mx-2"
            @click="sent"
            :disabled="newchat == ''"
          >
            <p class="my-auto" style="line-height: 80%">Sent</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomdata: {
      type: Object,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      newchat: '',
    }
  },
  methods: {
    sent() {
      if (this.newchat != '') {
        this.$emit('update', this.newchat)
        this.newchat = ''
      }
    },
  },
}
</script>

<style></style>
