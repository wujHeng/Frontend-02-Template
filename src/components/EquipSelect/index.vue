<template>

  <el-select v-model="equipId" clearable @change="equipChanged">
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
      equips: [],
      equipById: {}
    }
  },
  created() {
    this.getEquips()
  },
  methods: {
    equipChanged() {
      this.$emit('equipChanged', this.equipById[this.equipId])
    },
    getEquips() {
      getAllEquips().then(response => {
        this.equips = response.results
        this.equips.forEach(equip => {
          this.equipById[equip.id] = equip
        })
      })
    }
  }
}
</script>
