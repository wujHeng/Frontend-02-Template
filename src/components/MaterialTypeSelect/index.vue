<template>
  <el-select
    v-model="materialType"
    clearable
    clearable
    placeholder="请选择"
    @change="materialTypeChanged"
  >
    <el-option
      v-for="item in materialTypes"
      :key="item.id"
      :label="item.global_name"
      :value="item.global_name"
    />
  </el-select>
</template>

<script>
import { getMaterialTypes } from '@/api/material'

export default {
  data() {
    return {
      materialTypes: [],
      materialType: null
    }
  },
  created() {
    this.getMaterialTypes()
  },
  methods: {
    materialTypeChanged() {
      this.$emit('materialTypeChanged', this.materialType)
    },
    getMaterialTypes() {
      getMaterialTypes().then(response => {
        this.materialTypes = response.results
      })
    }
  }
}
</script>
