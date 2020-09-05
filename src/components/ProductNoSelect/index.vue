<template>
  <el-select
    v-model="productBatchingId"
    clearable
    @change="productBatchingChanged"
  >
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
  props: {
    isStageProductbatchNoRemove: {
      type: Boolean,
      default: false
    }
  },
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
        let productBatchings = response.results
        productBatchings.forEach(productBatching => {
          this.productBatchingById[productBatching.id] = productBatching
        })
        if (this.isStageProductbatchNoRemove) {
          // 根据stage_product_batch_no去重
          var obj = {}
          var newArr = productBatchings.reduce((item, next) => {
            obj[next.stage_product_batch_no]
              ? ' '
              : (obj[next.stage_product_batch_no] = true && item.push(next))
            return item
          }, [])
          productBatchings = newArr || []
        }
        this.productBatchings = productBatchings
      })
    }
  }
}
</script>
