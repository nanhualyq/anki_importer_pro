<template>
  <q-btn color="primary" icon="check" label="OK" @click="sendTest" />
</template>

<script setup lang="ts">
function sendTest() {
  pycmd('test')
}
</script>
