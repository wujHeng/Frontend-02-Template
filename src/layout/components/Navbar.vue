<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown
        class="edition-dropdown"
        @command="commandClick"
      >
        <span class="el-dropdown-link">
          {{ currentEdition === 'v1'?'万龙版':'国自版' }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="v1">万龙版</el-dropdown-item>
          <el-dropdown-item command="v2">国自版</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        class="avatar-container"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <span>用户名：</span>
          <div style="margin-right:5px">{{ name }}</div>
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="user-dropdown"
        >
          <router-link to="/">
            <el-dropdown-item>首 页</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">退 出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <password-dialog
      :table-visible="tableVisible"
      @dialogTableVisible="tableVisible = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import PasswordDialog from '@/components/select_w/changePassword'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    PasswordDialog
  },
  data() {
    return {
      tableVisible: false,
      currentEdition: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'editionNo'])
  },
  created() {
    this.currentEdition = this.editionNo
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    changePassword() {
      this.tableVisible = true
    },
    commandClick(val) {
      this.currentEdition = val
      this.$store.commit('user/SET_EDITION', val)
      const { fullPath } = this.$route
      this.$router.replace({
        path: '/redirect?path=' + fullPath
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  color:#fff !important;
  background: #e99d2a;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .edition-dropdown{
    margin-right:30px;
    color:#fff;
  }

  .right-menu .avatar-container .avatar-wrapper{
    margin-top: 0 !important;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display:flex;
        color:#fff;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 17px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
