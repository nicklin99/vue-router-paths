<template>
  <div>
    hello {{name}}
    <br>
    hello {{$route.params.name}}
    <br>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <div class="logo"/>
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[]">
          <a-menu-item
            v-for="route in $router.routes"
            :key="route.meta.key"
            @click="href(route)"
          >{{route.meta.title}}</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <p>面包屑</p>
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(route,i) in $route.meta.paths" :key="i">
              <router-link :to="route.path">{{route.title}}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>

          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  props:{
    name: String
  },
  data(){
    return {
      collapsed: false
    }
  },
  methods:{
    href(menu){
      this.$router.push(menu.meta.fullPath)
    }
  }
}
</script>
