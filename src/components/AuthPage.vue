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
      <h2 class="title">
        Authenticated
        <img src="@/assets/icons/question-dark.svg" alt="Question">
      </h2>
      <p class="message">Here is where we can have the error message on this screen and the next action</p>
    </div>

    <!-- status box -->
    <div class="__status-box">
      <div class="d-flex align-items-center justify-content-between">
        <span class="tag">Status</span>
        <img src="@/assets/icons/check-white.svg" alt="Checked">
      </div>

      <h1 class="item">Nike AirMax 2021</h1>
      <p class="description">Lorem ipsum dolor sit amet, r sit amet, consectetur adipis cing ipsum dolor sit amet, r sit amet, consectetur adipis cing elit ut aliquam, purus sit.m, ipsum dolor sit amet, r sit amet, consectetur adipis cing elit ut aliquam, purus sit.m, elit ut aliquam, purus sit.m, purus</p>

      <div class="d-flex align-items-center justify-content-between">
        <div class="key">UID</div>
        <div class="value">58210384172032</div>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="key">Token ID</div>
        <div class="value">0acf77d4-b486-4c99</div>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="key">Owner Address</div>
        <div class="value">19emjx4vqHPn6ZTish</div>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <div class="key">Contract Address</div>
        <div class="value">19emjx4vqHPn6ZTish</div>
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
