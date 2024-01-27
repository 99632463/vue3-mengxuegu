<template>
   <el-card shadow="hover">
      <div ref="chartRef" :style="{ width: props.width, height: props.height }"></div>
   </el-card>
</template>

<script setup lang="ts">
import { useEcharts } from '@/hooks/useEcharts'
import { watch, ref } from 'vue';

const props = withDefaults(defineProps<{
   width?: string;
   height?: string;
   theme?: string;
   bgColor?: string;
   title: string;
   subtitle?: string;
   data: number[];
   xAxisData: string[];
}>(), {
   width: '100%',
   height: '380px',
   data: () => []
})

const chartRef = ref()

watch(() => props.data, newVal => {
   const option = {
      backgroundColor: props.bgColor,
      title: {
         text: props.title,
         subtext: props.subtitle,
         left: 'left'
      },
      tooltip: {
         trigger: 'axis',
         axisPointer: {
            type: 'shadow'
         }
      },
      xAxis: {
         type: 'category',
         data: props.xAxisData
      },
      yAxis: {
         type: 'value'
      },
      series: [
         {
            data: newVal,
            type: 'bar'
         }
      ]
   };

   useEcharts({
      props,
      option,
      chartRef
   })
})

</script>

<style scoped lang="scss"></style>