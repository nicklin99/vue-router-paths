<template>
  <div>
    <a-layout style="padding: 24px 0; background: #fff">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu>
          <a-menu-item v-for="menu in menus" :key="menu.meta.key">{{menu.meta.title}}</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">Content</a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  computed:{
    menus(){
      return this.$route.meta.paths[this.$vnode.data.routerViewDepth].children
    }
  }
}
</script>
