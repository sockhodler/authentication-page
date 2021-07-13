<template>
  <div class="auth-page">

    <!-- loading screen -->
    <div class="__loading">

    </div>

    <!-- close icon -->
    <img src="@/assets/icons/close-gray.svg" alt="Close">

    <!-- icon header -->
    <div class="__header">
      <img src="@/assets/icons/status-success.svg" alt="Success">
      <h2>
        Authenticated
        <img src="@/assets/icons/question-dark.svg" alt="Question">
      </h2>
    </div>

    <!-- status box -->
    <div class="__status-box">
      <div class="d-flex justify-content-between">
        <span>apple</span>
        <span>apple</span>
      </div>
    </div>

    <!-- button -->
    <a href="" class="button blue">Redeem NFT</a>

    <!-- copyright -->
    <div class="__copyright">Powered by <strong>SmartSeal</strong></div>
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
  .auth-page {
    padding: 10px 20px;
    color: white;
    background: #18182F;
    .__header {
      text-align: center;
    }
    .__status-box {
      padding: 20px;
      background: linear-gradient(180deg, #313450 0%, rgba(49, 52, 80, 0.5) 100%);
      border-radius: 24px;
    }
    .__copyright {
      text-align: center;
    }
  }
</style>
