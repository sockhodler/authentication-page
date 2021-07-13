<template>
  <div class="home">
    <AuthPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthPage from '@/components/AuthPage.vue';

@Component({
  components: {
    AuthPage,
  },
})
export default class Home extends Vue {}
</script>
