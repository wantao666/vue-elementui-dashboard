<template>
  <div>
    <div style="width:100%;height:200px;background-color:white;margin-right:10px;">
        <el-row>
            <el-col>
                <h3 class="title">基本情报</h3>
            </el-col>
        </el-row>
        <el-row>
            <el-col style="margin-left:40px;margin-top:10px;" :offset="2">
                <el-avatar style="transform:scale(2)" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </el-col>
            <el-col :offset="2">
                <h4>hello</h4>
            </el-col>
        </el-row>
    </div>
    <div style="width:100%;height:400px;margin-right:10px;margin-top:20px;">
      <div style="width:49%;background-color:white;height:400px;float:left"></div>
      <div style="width:49%;background-color:white;height:400px;float:right"></div>
    </div>
    <div style="width:100%;height:300px;background-color:white;margin-right:10px;margin-top:20px"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            user:{
                username:'wan.tao@cn.ricoh.com',
            }
        }
    }
};
</script>

<style>
body {
  background-color: #e8ecf0;
}
.title{
    margin-left:15px;
}
</style>