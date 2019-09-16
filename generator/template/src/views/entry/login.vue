<template>
  <div class="xag-login-page">
    <form class="login-form xag-theme-color" @submit.stop.prevent="onLogin">
      <!-- <img class="login-main-logo" src="../../assets/images/xaos_logo.svg"> -->
      <h2 class="login-title"><%= rootOptions.projectName %></h2>
      <input
        class="login-input"
        v-model.trim="query.userName"
        type="text"
        :placeholder="$t('账号')"
      />
      <input
        class="login-input"
        v-model.trim="query.password"
        type="password"
        :placeholder="$t('密码')"
      />
      <div style="display:flex;justify-content: space-between;">
        <a
          href="https://passport.xag.cn/#/register"
          target="_blank"
          class="login-radios"
          >{{ $t("注册") }}</a
        >
        <a
          href="https://passport.xag.cn/#/reset"
          target="_blank"
          class="login-radios"
          >{{ $t("忘记密码?") }}</a
        >
      </div>
      <input
        class="login-input button xag-bg-theme"
        :class="{ loging: isSubmitting }"
        type="submit"
        :value="buttonText"
      />
    </form>
    <img class="login-logo" src="../../assets/images/logo.png" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSubmitting: false,
      query: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    buttonText () {
      return this.isSubmitting ? this.$t('登录中..') : this.$t('登录')
    }
  },
  methods: {
    onLogin () {
      if (this.isSubmitting) return
      <%_ if (element) { _%>
      if (!this.query.userName) return this.$message.warning(this.$t('请输入账号'))
      if (!this.query.password) return this.$message.warning(this.$t('请输入密码'))
      <%_ } else { _%>
      if (!this.query.userName) return alert(this.$t('请输入账号'))
      if (!this.query.password) return alert(this.$t('请输入密码'))
      <%_ } _%>
      this.isSubmitting = true
      this.$store.dispatch('login', this.query).then(data => {
        this.isSubmitting = false
        if (this.$route.query.goto) {
          this.$router.replace(this.$route.query.goto)
        } else {
          this.$router.replace({ name: 'farms' })
        }
      }).catch(err => {
        this.isSubmitting = false
        <%_ if (element) { _%>
        this.$message.error(err.message || this.$t('登录失败'))
        <%_ } else { _%>
        alert(err.message || this.$t('登录失败'))
        <%_ } _%>
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.xag-login-page {
  height: 100vh;
  width: 100vw;
  background: url(../../assets/images/login_bg_image.png) center/cover no-repeat;

  .login-form {
    position: absolute;
    top: 23%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background-color: white;
    padding: 30px 50px;
    // box-shadow: 3px 3px 8px #cccccc;
    .login-main-logo {
      width: 50%;
      margin: 20px auto 40px;
      display: block;
    }
    .login-title {
      font-size: 32px;
      text-align: center;
      margin-bottom: 40px;
      margin-top: 10px;
      font-weight: 500;
      text-shadow: 0 0 6px white;
    }

    .login-input {
      position: relative;
      display: block;
      border: 0;
      margin: 10px;
      width: 280px;
      border-radius: 3px;
      line-height: 20px;
      padding: 10px 20px;
      outline: none;
      font-size: 14px;

      &:not(.button) {
        background-color: #e9effe;
      }

      &.button {
        user-select: none;
        cursor: pointer;
      }

      &.loging {
        opacity: 0.8;
      }
    }

    .login-radios {
      display: flex;
      font-size: 14px;
      padding: 5px 10px 5px;
      cursor: pointer;

      .label {
        margin-right: 20px;
        line-height: 24px;
        cursor: pointer;
      }

      .radio {
        display: inline-block;
        height: 16px;
        width: 16px;
        margin-right: 5px;
        border-radius: 50%;
        background-color: white;
        vertical-align: -3px;
        transition: 0.2s;
        user-select: none;
        box-shadow: 2px 2px 8px #dddddd;

        &.active {
          border: 5px solid $theme_color;
          border: 5px solid var(--theme-color);
          background-color: white;
        }
      }
    }
  }
  @media (max-width: 700px) {
    .login-form {
      background-color: inherit;
    }
  }

  .login-logo {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 80px;
    // filter: invert(1);
  }
}
</style>