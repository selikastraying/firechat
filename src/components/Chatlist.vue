<template>
  <div
    class="
      h-100
      d-flex
      flex-column-reverse
      px-3
      noscrollbar
      overflow-auto
      panel
    "
  >
    <div class="my-3" v-for="(data, index) in reversemessages" :key="index">
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
  </div>
</template>

<script>
export default {
  props: {
    reversemessages: {
      type: Array,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
}
</script>

<style></style>
