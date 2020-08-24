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
import { getAllEquips } from '@/api/equip'
export default {
  data() {
    return {
      equipId: null,
      equips: []
    }
  },
  created() {
    this.getEquips()
  },
  methods: {
    getEquips() {
      getAllEquips().then(response => {
        this.equips = response.results
      })
    }
  }
}
</script>
