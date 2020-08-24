<template>

  <el-select v-model="equipId">
    <el-option
      v-for="equip in equips"
      :key="equip.id"
      :label="equip.equip_no"
      :value="equip.id"
    />
  </el-select>
</template>

<script>
import { getAllProductBatchings } from '@/api/product-batching'
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
      
  }
}
</script>
