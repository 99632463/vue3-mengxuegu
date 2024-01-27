<template>
   <el-card shadow="hover">
      <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
   </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, markRaw, onMounted, reactive, watch, onActivated, onBeforeUnmount, nextTick } from 'vue';

const props = withDefaults(defineProps<{
   width?: string;
   height?: string;
   theme?: string;
   bgColor?: string;
   title: string;
   subtitle: string;
   data: any[];
}>(), {
   width: '100%',
   height: '380px',
   data: () => []
})

const chartRef = ref()
const state = reactive({
   chart: null as any,
   nvll: ['', null, undefined]
})

watch(() => [props.data, props.bgColor, props.theme], () => {
   nextTick(() => {
      initChart()
   })
})

onMounted(() => {
   window.addEventListener('resize', echartsResizeFun)
})

onActivated(() => state.chart && state.chart.resize())

onBeforeUnmount(() => {
   window.removeEventListener('resize', echartsResizeFun)
   if (state.chart) {
      state.chart.dispose()
      state.chart = null
   }
})

function initChart() {
   if (state.chart) {
      state.chart.dispose()
      state.chart = null
   }

   state.chart = markRaw(echarts.init(chartRef.value, props.theme))
   const option = {
      backgroundColor: props.bgColor,
      title: {
         text: props.title,
         subtext: props.subtitle,
         left: 'left'
      },
      tooltip: {
         trigger: 'item'
      },
      // legend: {
      //    orient: 'vertical',
      //    left: 'left'
      // },
      series: [
         {
            name: '单位',
            type: 'pie',
            radius: '60%',
            data: props.data,
            emphasis: {
               itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
               }
            }
         }
      ]
   };
   state.chart.setOption(option)
}

function echartsResizeFun() {
   state.chart && state.chart.resize()
}
</script>

<style scoped lang="scss"></style>