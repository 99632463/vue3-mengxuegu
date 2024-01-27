<template>
  <!-- <renderC /> -->
  <el-icon :size="props.size" :color="props.color">
    <component :is="props.name" v-if="props.name && props.name.startsWith('e-')" />
    <i v-else></i>
  </el-icon>
</template>

<script setup lang="ts">
import { h, resolveComponent } from "vue";

interface IProps {
  name?: string;
  color?: string;
  size?: number | string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    name: "",
    size: 18
  }
);

// const { name, color, size } = props

// const renderC = () => {
//   if (name?.startsWith('e-')) {
//     // return h(resolveComponent("el-icon"), { size, color }, () =>
//     //   h(resolveComponent(name))
//     // );
//   }
//   // return h('i')
// }
</script>

<style scoped lang="scss"></style>