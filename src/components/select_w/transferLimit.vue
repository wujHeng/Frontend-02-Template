<template>
  <div>
    <el-transfer
      v-model="user_permissions"
      :render-content="renderFunc"
      :titles="['可用 用户权限', '选中的 用户权限']"
      :data="permissionsArr"
      @change="changeTransferPermissions"
    />
  </div>
</template>

<script>
export default {
  props: {
    permissionsArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultPermissions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // user_permissions: []
    }
  },
  computed: {
    user_permissions: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        if (this.defaultPermissions.length > 0) {
          return this.defaultPermissions || []
        }
      },
      set() { }
    }
  },
  created() {
  },
  methods: {
    renderFunc(h, option) {
      return <span title={option.name}>{option.name}</span>
    },
    changeTransferPermissions(val) {
      this.$emit('changeTransferPermissions', val)
    }
  }
}
</script>

<style>

</style>
