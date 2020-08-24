<template>
  <el-select v-model="productBatchingId" clearable @change="productBatchingChanged">
    <el-option
      v-for="item in productBatchings"
      :key="item.id"
      :label="item.stage_product_batch_no"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getAllProductBatchings } from '@/api/product-batching'
export default {
  data() {
    return {
      productBatchings: [],
      productBatchingId: '',
      productBatchingById: {}
    }
  },
  created() {
    this.getProductBatchings()
  },
  methods: {
    productBatchingChanged() {
      this.$emit('productBatchingChanged', this.productBatchingById[this.productBatchingId])
    },
    getProductBatchings() {
      getAllProductBatchings().then(response => {
        this.productBatchings = response.results
        this.productBatchings.forEach(productBatching => {
          this.productBatchingById[productBatching.id] = productBatching
        })
      })
    }
  }
}
</script>
