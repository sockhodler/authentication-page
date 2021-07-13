<template>
  <div class="auth-page">
    <div class="container">
      hi
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AuthPage extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
</style>
