<template>
  <el-select
    v-model="productBatchingId"
    clearable
    filterable
    :loading="loading"
    @change="productBatchingChanged"
    @visible-change="visibleChange"
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
    // 根据stage_product_batch_no去重
    isStageProductbatchNoRemove: {
      type: Boolean,
      default: false
    },
    // 过滤出启用和弃用的胶料
    makeUseBatch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productBatchings: [],
      productBatchingId: '',
      productBatchingById: {},
      loading: true
    }
  },
  created() {
  },
  methods: {
    productBatchingChanged() {
      this.$emit('productBatchingChanged', this.productBatchingById[this.productBatchingId])
    },
    visibleChange(bool) {
      if (bool && this.productBatchings.length === 0) {
        this.getProductBatchings()
      }
    },
    getProductBatchings() {
      getAllProductBatchings().then(response => {
        let productBatchings = response.results
        productBatchings.forEach(productBatching => {
          this.productBatchingById[productBatching.id] = productBatching
        })
        if (this.makeUseBatch) {
          let arr = []
          arr = productBatchings.filter(D => D.used_type === 4 || D.used_type === 6)
          productBatchings = arr
        }
        if (this.isStageProductbatchNoRemove) {
          var obj = {}
          var newArr = productBatchings.reduce((item, next) => {
            obj[next.stage_product_batch_no]
              ? ' '
              : (obj[next.stage_product_batch_no] = true && item.push(next))
            return item
          }, [])
          productBatchings = newArr || []
        }
        this.loading = false
        this.productBatchings = productBatchings
      })
    }
  }
}
</script>
