<template>
  <div class="bg-light py-3">
    <div class="text-center">
      <small
        >&copy; 2021
        <a href="https://arthur1.github.io/" target="_blank" rel="noopener"
          >Arthur</a
        ></small
      >
    </div>
    <div class="text-center">
      <small
        ><span class="mr-3">Front-end: v{{ frontendVersion }}</span
        >API: v{{ apiVersion }}</small
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiVersion: 'unknown',
    }
  },
  async fetch() {
    const data = await this.$axios.$get('/utils/version')
    this.apiVersion = data.version
  },
  computed: {
    frontendVersion() {
      return process.env.frontendVersion
    },
  },
}
</script>
