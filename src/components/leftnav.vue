/**
* 左边菜单
*/ 
<template>
  <el-menu
    default-active="/user"
    :collapse="collapsed"
    collapse-transition
    router
    unique-opened
    class="el-menu-vertical-demo"
    background-color="#334157"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="logobox">
      <span>AI-OCR</span>
    </div>
    <el-submenu v-for="menu in menus" :key="menu.id" :index="menu.name">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.name}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for=" submenu in menu.submenus" :key="submenu.id" :index="submenu.url">
          <i :class="submenu.icon"></i>
          <span>{{submenu.name}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "leftnav",
  data() {
    return {
      collapsed: false,
      menus: [
        {
          id: 1,
          name: "システム管理",
          icon: "el-icon-menu",
          submenus: [
            {
              id: 1,
              name: "ユーザー管理",
              icon: "el-icon-user",
              url: "/user"
            },
            {
              id: 2,
              name: "コース管理",
              icon: "el-icon-coin",
              url: "/point"
            }
          ]
        },
        {
          id: 2,
          name: "データ統計",
          icon: "el-icon-star-off",
          submenus: [
            {
              id: 1,
              name: "データレポート",
              icon:"el-icon-s-data",
              url:'/data'
            }
          ]
        }
      ]
    };
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 监听
    this.$root.Bus.$on("toggle", value => {
      this.collapsed = !value;
    });
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: red;
  font-size: 18px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>