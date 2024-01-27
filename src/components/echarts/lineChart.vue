<template>
   <el-card shadow="hover">
      <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
   </el-card>
</template>

<script setup lang="ts">
import { useEcharts } from '@/hooks/useEcharts'
import { watch, ref } from 'vue';

interface Series {
   typeName: string;
   list: number[];
}

const props = withDefaults(defineProps<{
   width?: string;
   height?: string;
   theme?: string;
   bgColor?: string;
   title: string;
   subtitle?: string;
   data: Series[];
   xAxisData: string[];
}>(), {
   width: '100%',
   height: '380px',
   data: () => []
})

const chartRef = ref()

watch(() => props.data, newVal => {
   const legendData = newVal.map(item => item.typeName)
   const series = newVal.map(item => ({
      name: item.typeName,
      data: item.list,
      type: 'line',
      stack: 'Total'
   }))

   const option = {
      backgroundColor: props.bgColor,
      title: {
         text: props.title,
         subtext: props.subtitle,
         left: 'left'
      },
      tooltip: {
         trigger: 'axis'
      },
      legend: {
         data: legendData,
         right: '50px'
      },
      grid: {
         left: '3%',
         right: '4%',
         bottom: '3%',
         containLabel: true
      },
      toolbox: {
         feature: {
            saveAsImage: {}
         }
      },
      xAxis: {
         type: 'category',
         boundaryGap: false,
         data: props.xAxisData
      },
      yAxis: {
         type: 'value'
      },
      series
   }

   useEcharts({
      props,
      option,
      chartRef
   })
})

</script>

<style scoped lang="scss"></style>