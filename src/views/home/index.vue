<template>
   <div>
      <statisticsBlock />
      <el-row :gutter="15">
         <el-col v-loading="state.category.loading" :xs="24" :sm="24" :md="11" :lg="9" class="mb15">
            <pieChart title="分类销售统计" subtitle="每种商品分类的近30天销售数据" :data="state.category.data" :theme="theme"
               :bg-color="bgColor" />
         </el-col>
         <el-col v-loading="state.last30Days.loading" :xs="24" :sm="24" :md="13" :lg="15" class="mb15">
            <lineChart title="近30天销售趋势" :x-axis-data="state.last30Days.xAxisData" :data="state.last30Days.data"
               :theme="theme" :bg-color="bgColor" />
         </el-col>
         <el-col v-loading="state.memberTop10.loading" :xs="24" :sm="24" :md="13" :lg="15" class="mb15">
            <barChart title="会员消费top10" :data="state.memberTop10.data" :x-axis-data="state.memberTop10.xAxisData"
               :theme="theme" :bg-color="bgColor" />
         </el-col>
         <el-col :xs="24" :sm="24" :md="11" :lg="9" class="mb15">
            <el-card shadow="hover">
               气温仪表盘
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { getCategoryData, getLast30DaysSaleData, getMemberTop10Data } from '@/api/home'
import statisticsBlock from './components/statisticsBlock.vue'
import pieChart from '@/components/echarts/pieChart.vue'
import lineChart from '@/components/echarts/lineChart.vue'
import barChart from '@/components/echarts/barChart.vue'
import { useLayoutConfigStore } from '@/stores/layoutConfig'

const layoutConfig = useLayoutConfigStore()

const theme = computed(() => layoutConfig.isDark ? 'dark' : '')
const bgColor = computed(() => layoutConfig.isDark ? 'transparent' : '')

const state = reactive({
   category: {
      loading: false,
      data: []
   },
   last30Days: {
      loading: false,
      xAxisData: [] as string[],
      data: [] as any[]
   },
   memberTop10: {
      loading: true,
      xAxisData: [] as string[],
      data: [] as number[]
   }
})

onMounted(() => {
   loadCategoryData()
   loadLast30DaysSaleData()
   loadMemberTop10Data()
})

async function loadCategoryData() {
   try {
      state.category.loading = true
      const { data } = await getCategoryData()
      state.category.data = data
   } finally {
      state.category.loading = false
   }
}

async function loadLast30DaysSaleData() {
   try {
      state.last30Days.loading = true
      const { data } = await getLast30DaysSaleData()
      const { last30Day, orderNumList, rechargeMoneyList, returnMoneyList, saleMoneyList } = data
      state.last30Days.xAxisData = last30Day
      state.last30Days.data = [
         { typeName: '订单数', list: orderNumList },
         { typeName: '销售额', list: saleMoneyList },
         { typeName: '退款额', list: returnMoneyList },
         { typeName: '充值额', list: rechargeMoneyList }
      ]
   } finally {
      state.last30Days.loading = false
   }
}

async function loadMemberTop10Data() {
   try {
      state.memberTop10.loading = true
      const { data } = await getMemberTop10Data()
      state.memberTop10.xAxisData.length = 0
      state.memberTop10.data.length = 0

      let memberTop10XAxisData: string[] = []
      let memberTop10Data: number[] = []

      data.forEach((item: any) => {
         memberTop10XAxisData.push(item.name)
         memberTop10Data.push(item.consumeMoney)
      })
      state.memberTop10.xAxisData = memberTop10XAxisData
      state.memberTop10.data = memberTop10Data
   } finally {
      state.memberTop10.loading = false
   }
}
</script>

<style scoped lang="scss"></style>