<template>
  <div>
    <notifications
      group="error"
      :duration="3000"
      :height:="200"
      animation-name="v-fade-left"
      ignoreDuplicate="true"
      position="top right"
    />
    <notifications
      group="success"
      :duration="1500"
      :height:="200"
      animation-name="v-fade-left"
      position="top right"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Notification",
  computed: {
    ...mapState(["error", "success"]),
  },
  watch: {
    success(value) {
      if (value) {
        this.sendSuccess(value);
        this.setError(null);
      }
    },
    error(value) {
      if (value) {
        this.sendError(value);
        this.setMessage(null);
      }
    },
  },
  methods: {
    ...mapActions({
      setError: "setError",
      setMessage: "setMessage",
    }),
    sendError(message) {
      Vue.notify({
        group: "error",
        type: "error",
        text: message,
      });
    },
    sendSuccess(message) {
      Vue.notify({
        group: "success",
        type: "success",
        text: message,
      });
    },
  },
};
</script>

<style scoped></style>
