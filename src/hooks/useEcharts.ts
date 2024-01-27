import * as echarts from 'echarts'
import { markRaw, onMounted, reactive, toRefs, watch, onActivated, onBeforeUnmount, nextTick } from 'vue';

interface Params {
   props: any;
   option: any;
   chartRef: any;
}

function useEcharts(params: Params) {
   const { props, option, chartRef } = params
   const state = reactive({
      chart: null as any,
      nvll: ['', null, undefined]
   })

   watch(() => [props.data, props.bgColor, props.theme], () => {
      nextTick(() => {
         initChart()
      })
   }, { immediate: true })

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
      state.chart.setOption(option)
   }

   function echartsResizeFun() {
      state.chart && state.chart.resize()
   }

   return {
      // chartRef,
      ...toRefs(state),
      echartsResizeFun
   }
}

export default useEcharts
export { useEcharts }