<template>
   <div class="home-statistics">
      <div class="home-statistics-title">营业数据统计</div>
      <el-row :gutter="15" v-loading="state.loading">
         <el-col :span="6" v-for="(item, index) in blockList" :key="index">
            <el-card class="home-statistics-card" shadow="hover"
               :style="{ 'background-image': `linear-gradient(to right, ${item.startColor}, ${item.endColor})` }">
               <div class="home-business-title">
                  <span>{{ item.name }}</span>
                  <el-tooltip :content="item.content" placement="top">
                     <SvgIcon name="e-QuestionFilled" />
                  </el-tooltip>
               </div>
               <div class="item-num">
                  <span>{{ state.statisticsData[item.column] }}</span>
                  <span class="unit">{{ item.unit }}</span>
               </div>
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getStatisticsData } from '@/api/home'

const state = reactive({
   loading: false,
   statisticsData: {
      totalOrderNum: 0,
      totalSaleMoney: 0,
      totalReturnedMoney: 0,
      totalIncomeMoney: 0
   } as any
})

onMounted(() => {
   loadStatisticsData()
})

async function loadStatisticsData() {
   try {
      state.loading = true
      const { data } = await getStatisticsData()
      state.statisticsData = data
   } finally {
      state.loading = false
   }
}

const blockList = [
   { column: 'totalOrderNum', name: '订单笔数', unit: '笔', content: 'xxxxxx', startColor: '#00ba26', endColor: '#00ba26a1' },
   { column: 'totalSaleMoney', name: '销售金额', unit: '笔', content: 'xxxxxx', startColor: '#f52c12', endColor: '#f52c12c7' },
   { column: 'totalReturnedMoney', name: '退款总额', unit: '笔', content: 'xxxxxx', startColor: '#fb9a08', endColor: '#fb9a08db' },
   { column: 'totalIncomeMoney', name: '综合收入', unit: '笔', content: 'xxxxxx', startColor: '#2062e6', endColor: '#2062e696' },
]
</script>

<style scoped lang="scss">
.home-statistics {
   .home-statistics-title {
      font-size: 18px;
      height: 25px;
      line-height: 25px;
      border-left: 2px solid var(--el-color-primary);
      padding-left: 10px;
      margin: 15px 0;
   }

   .home-statistics-card {
      margin-bottom: 15px;
      padding-left: 9px;
      color: #fff;
      line-height: 30px;
      cursor: pointer;

      .home-business-title {
         display: flex;
         flex-direction: row;
         align-items: center;
      }

      .item-num {
         font-size: 25px;
         font-weight: 500;
      }

      .unit {
         font-size: 13px;
         line-height: 16px;
         margin-left: 2px;
      }
   }
}
</style>