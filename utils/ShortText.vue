<template>
  <span>
    {{ displayText }}
  </span>
</template>

<script>
export default {
  data() {
    return {
      chunks: [],
    }
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.chunks = this.getChunks()
  },
  computed: {
    isTooLong() {
      return this.chunks.length == 2
    },
    displayText() {
      if (!this.isTooLong) return this.chunks.join(' ')
      return this.chunks[0] + '...'
    },
  },
  methods: {
    getChunks() {
      const position = this.text.indexOf(' ', this.target)
      if (this.text.length <= this.target || position === -1) return [this.text]
      return [this.text.substring(0, position), this.text.substring(position)]
    },
  },
}
</script>

<style>
</style>