<script>
export default {
  data() {
    return {
      UserInfo:{},
      showMenu: false
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    Logout() {
      console.log('logout')
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/';
    }
  },
  computed: {
    isLogin() {
      const access_token = localStorage.getItem('access_token');
      return access_token !== null;
    },
    UserInfo() {
      return this.$store.state.UserInfo;
    }
  }
}
</script>

<template>
  <header>
    <nav class="navbar is-spaced has-shadow" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a href="/" class="navbar-item">
            <img src="../assets/images/2222.png" draggable="false"  alt="Logo" />
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" :class="{'navbar-menu': true, 'is-active': showMenu}">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">Home</router-link>
            <router-link to="/userCenter/surveyActivity" class="navbar-item">Investigation activities</router-link>
            <router-link to="/userCenter/survey" class="navbar-item">Participate in the survey</router-link>
            <router-link to="/userCenter/promotion" class="navbar-item">Promotion Commission</router-link>
            <router-link to="/userCenter/serviceTicket" class="navbar-item">Service Ticket</router-link>
          </div>

          <div v-if="isLogin" class="navbar-end">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link is-arrowless">Hello, <span class="is-capitalized">{{ UserInfo.last_name }}</span></a>
              <div class="navbar-dropdown">
                <router-link to="/userCenter/wallet" class="navbar-item">
                    <span class="icon is-small">
                      <i class="bi bi-wallet2"></i>
                    </span>
                  <span>My Wallet</span>
                  </router-link>
                <router-link to="/userCenter/userManage" class="navbar-item">
                    <span class="icon is-small">
                      <i class="bi bi-people"></i>
                    </span>
                  <span>User Management</span>
                  </router-link>
                <router-link to="/userCenter/questionnaireRecord" class="navbar-item">
                    <span class="icon is-small">
                      <i class="bi bi-clock"></i>
                    </span>
                  <span>Questionnaire History</span>
                  </router-link>
                <router-link to="/userCenter/promotion" class="navbar-item">
                  <span class="icon is-small">
                      <i class="bi bi-database-add"></i>
                    </span>
                  <span>Promotion Commission</span>
                  </router-link>
                <router-link to="/userCenter/profile" class="navbar-item">
                    <span class="icon is-small">
                      <i class="bi bi-person"></i>
                    </span>
                  <span>Profile Info</span>
                  </router-link>
                <hr class="navbar-divider">
                <a class="navbar-item" @click="Logout">
                    <span class="icon is-small">
                      <i class="bi bi-box-arrow-right"></i>
                    </span>
                    <span>Logout</span>
                  </a>
              </div>
            </div>
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/userCenter" class="has-text-white">
                  <a-button type="primary">
                      <span class="icon is-small">
                      <i class="bi bi-speedometer2"></i>
                    </span>
                    <span class="ml-2">User Center</span>
                  </a-button>
                </router-link>

              </div>
            </div>
          </div>
          <div v-else class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/register" class="has-text-white">
                  <a-button type="primary">
                    <span>Sign up</span>
                  </a-button>
                </router-link>
                <router-link to="/login" class="has-text-white">
                  <a-button class="is-light">
                    <span>Log in</span>
                  </a-button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar-burger{
  color: $primary;
}
</style>