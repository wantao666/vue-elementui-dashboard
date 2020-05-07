/**
* 头部菜单
*/ 
<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#334157"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="2-0">
        <el-button class="buttonimg">AI-OCR</el-button>
      </el-menu-item>
      <el-menu-item index="2-1">手形の管理</el-menu-item>
      <el-menu-item index="2-2">フィールドタイプの管理</el-menu-item>
      <el-menu-item index="2-3">履歴を識別する</el-menu-item>
      <el-submenu index="2" style="float:right">
        <!-- <template slot="title">{{user.userRealName}}</template> -->
        <template slot="title">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </template>
        <el-menu-item @click="exit()" index="2-3">終了</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "navcon",
  data() {
    return {
      collapsed: true,
      user: {}
    };
  },
  // 创建完毕状态(里面是操作)
  created() {},
  methods: {
    // 退出登录
    exit() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          setTimeout(() => {
            this.$store.commit("logout", "false");
            this.$router.push({ path: "/login" });
            this.$message({
              type: "success",
              message: "已退出登录!"
            });
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}

.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
  line-height: 40px;
  color: red;
  font-size: 30px;
  text-align: center;
}
</style>