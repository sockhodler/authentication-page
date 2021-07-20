<template>
  <div class="auth-page-wrapper">
    <div class="auth-page">
      <img src="@/assets/icons/close-gray.svg" class="btn-close" alt="Close">

      <!-- loading screen -->
      <div class="__loading">

      </div>

      <!-- close icon -->

      <!-- icon header -->
      <div class="__header">
        <img src="@/assets/icons/status-success.svg" class="status-icon" alt="Success">
        <h2 class="title">
          Authenticated
          <img src="@/assets/icons/question-dark.svg" alt="Question">
        </h2>
        <p class="message text-muted m-0">Here is where we can have the error message on this screen and the next action</p>
      </div>

      <!-- status box -->
      <div class="__status-box">
        <div class="d-flex align-items-center justify-content-between">
          <span class="tag">Status</span>
          <img src="@/assets/icons/check-white.svg" alt="Checked">
        </div>

        <h1 class="item">Nike AirMax 2021</h1>
        <p class="description text-muted" @click="readMore = !readMore" :class="!readMore ? 'hide' : ''">Lorem ipsum dolor sit amet, r sit amet, consectetur adipis cing ipsum dolor sit amet, r sit amet, consectetur adipis cing elit ut aliquam, purus sit.m, ipsum dolor sit amet, r sit amet, consectetur adipis cing elit ut aliquam, purus sit.m, elit ut aliquam, purus sit.m, purus</p>

        <div class="row align-items-center justify-content-between">
          <div class="key col-5 p-0">UID</div>
          <div class="value col-7 p-0">58210384172032</div>
        </div>
        <div class="row align-items-center justify-content-between">
          <div class="key col-5 p-0">Token ID</div>
          <div class="value col-7 p-0">0acf77d4-b486-4c99</div>
        </div>
        <div class="row align-items-center justify-content-between">
          <div class="key col-5 p-0">Owner Address</div>
          <div class="value col-7 p-0">19emjx4vqHPn6ZTish</div>
        </div>
        <div class="row align-items-center justify-content-between">
          <div class="key col-5 p-0">Contract Address</div>
          <div class="value col-7 p-0">19emjx4vqHPn6ZTish332423</div>
        </div>
      </div>

      <!-- button -->
      <a href="" class="btn btn-blue">Redeem NFT</a>

      <!-- copyright -->
      <div class="__copyright">
        <a href="https://www.smartseal.io/" target="_blank">Powered by <strong>SmartSeal</strong></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AuthPage extends Vue {
  public data() {
    return {
      readMore: false,
    };
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/base';

  .auth-page-wrapper {
    position: fixed;
    bottom: -1px;

    // Overlay
    &::before {
      content: '';
      display: inline-block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
    }

    .auth-page {
      position: relative;
      padding: 10px 20px;
      color: white;
      background: $midnight;
      border-radius: 20px 20px 0 0;
      .btn-close {
        position: absolute;
        top: 20px;
        left: 20px;
      }
      .__header {
        text-align: center;
        margin-bottom: 20px;
        .status-icon {
          margin: -15px 0 -25px;
        }
        .title {
          img {
            margin-left: 8px;
            margin-right: -8px;
          }
        }
      }
      .__status-box {
        margin-bottom: 14px;
        padding: 20px;
        background: $gradient-evening;
        border-radius: 24px;
        .tag {
          padding: 6px 12px;
          font-family: 'Roboto Mono';
          font-weight: bold;
          font-size: 10px;
          line-height: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: $midnight;
          border-radius: 6px;
        }
        .item {
          margin: 10px 0;
          font-family: 'Roboto Mono';
          font-weight: 500;
          font-size: 20px;
          line-height: 26px;
          letter-spacing: 0.5px;
        }
        .description {
          margin-bottom: 20px;
          font-size: 12px;
          line-height: 18px;
          &::after {
            content: 'less';
            display: inline;
            margin-left: 5px;
            color: white;
          }
          &.hide {
            @include truncateBlock(12px, 1.6, 2);
            &::after {
              content: 'more';
            }
          }
        }
        > .row { margin: 7px 0; }
        .key {
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        .value {
          @include truncate();
          font-family: 'Roboto Mono';
          font-size: 12px;
          text-align: right;
          letter-spacing: 1px;
          text-decoration-line: underline;
        }
      }
      .__copyright {
        margin-top: 14px;
        text-align: center;
        a { color: $gray; }
        strong {
          color: white;
          font-weight: 500;
        }
      }

      .btn-blue {
        width: 100%;
        color: white;
        background: $blue;
      }
    }
  }
</style>
