<template>
  <v-alert dismissible type="error" @input="onClose" v-model="show">
    {{ error || '' }}
  </v-alert>

</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    show() {
      return !!this.error;
    }
  },
  methods: {
    onClose() {
      this.$emit('dismissed');
    }
  }
};
</script>

<style>
</style>
