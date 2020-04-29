<template>
  <div>
    <el-row style="margin-bottom:20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="margin-bottom:10px;" :gutter="5">
      <el-col :span="3">
        <el-button size="small" type="danger" @click="batchDeleteUser">
          <i class="el-icon-delete"></i>批量删除
        </el-button>
        <el-button size="small" type="primary" @click="addUser">
          <i class="el-icon-plus"></i>添加用户
        </el-button>
      </el-col>
      <el-col :span="4" :offset="15">
        <el-input placeholder="搜索用户">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type icon="el-icon-refresh" @click="refresh">刷新</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        ref="userTable"
        v-loading="load"
        :data="user"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="90" sortable align="center"></el-table-column>
        <el-table-column prop="name" label="用户名" width="180" sortable align="center"></el-table-column>
        <el-table-column label="头像" width="180" align="center">
          <template slot-scope="scope">
            <el-avatar :size="30" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="password" label="密码" width="180" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="180" align="center"></el-table-column>
        <el-table-column prop="lastLoginTime" label="上次登录时间" width="180" sortable align="center"></el-table-column>
        <el-table-column prop="point" label="积分" width="90" sortable align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="updateUser(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="margin-top:30px;">
      <el-col :offset="15">
        <el-pagination
          background
          :page-sizes="[5,10]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!--修改用户-->
    <el-dialog width="30%" title="修改用户" :visible.sync="showUpdateUserForm">
      <el-form :model="userForm" label-width="100px" ref="updateUserForm" :rules="rules">
        <el-form-item label="用户名:" prop="name">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="头像:">
          <el-col :span="18" :offset="2">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
              <el-avatar v-if="userForm.avatar" :size="50" :src="userForm.avatar"></el-avatar>
              <el-link type="info" icon="el-icon-upload" style="margin-left:20px;">修改头像</el-link>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.password" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="18" :offset="2">
            <password-stronger v-model="userForm.password" style="padding-top: 10px;"></password-stronger>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="积分:" prop="point">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.point"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateUserHandler('updateUserForm')">取 消</el-button>
        <el-button type="primary" @click="updateUserHandler('updateUserForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加用户-->
    <el-dialog width="30%" title="添加用户" :visible.sync="showAddUserForm">
      <el-form :model="userForm" label-width="100px" ref="addUserForm" :rules="rules" status-icon>
        <el-form-item label="用户名:" prop="name">
          <el-col :span="18" :offset="2">
            <el-input v-model="userForm.name" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="头像:">
          <el-col :span="18" :offset="2">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
              <el-avatar v-if="userForm.avatar" :size="50" :src="userForm.avatar"></el-avatar>
              <el-link type="info" icon="el-icon-upload" style="margin-left:20px;">上传头像</el-link>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.password" placeholder="请输入密码" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="18" :offset="2">
            <password-stronger v-model="userForm.password" style="padding-top: 10px;"></password-stronger>
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码:" prop="password1">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.password1" placeholder="确认密码" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.email" placeholder="请输入邮箱"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.phone" placeholder="请输入手机号"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="积分:" prop="point">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.point" placeholder="请输入积分"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUserHandler('addUserForm')">取 消</el-button>
        <el-button type="primary" @click="addUserHandler('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PasswordStronger from "./passwordStronger";
export default {
  components: {
    PasswordStronger
  },
  data() {
    return {
      page: {
        total: 11,
        pageSize: 5
      },
      user: [
        {
          id: 1,
          name: "万涛1",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 2,
          name: "万涛2",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 3,
          name: "万涛3",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 4,
          name: "万涛4",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 5,
          name: "万涛5",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 6,
          name: "万涛6",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 7,
          name: "万涛7",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 8,
          name: "万涛8",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 9,
          name: "万涛9",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        },
        {
          id: 10,
          name: "万涛10",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          password: "123456",
          email: "wan.tao@cn.ricoh.com",
          phone: "18800269697",
          lastLoginTime: "2020-4-27 13:06",
          point: "500"
        }
      ],
      userForm: {
        id: "",
        name: "",
        avatar: "",
        password: "",
        password1: "",
        email: "",
        phone: "",
        lastLoginTime: "",
        point: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ["blur", "change"] }
        ],
        password1: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: ["blur", "change"]
          },
          {
            validator: (rule, value, cb) => {
              if (value === "") {
                cb(new Error("密码不能为空"));
              } else if (value !== this.userForm.password) {
                cb(new Error("两次密码输入不一致"));
              } else {
                cb();
              }
            },
            trigger: ["blur"]
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            type: "string",
            message: "请输入手机号",
            trigger: ["blur", "change"]
          }
        ],
        point: [
          {
            required: true,
            type: "string",
            message: "请输入积分值",
            trigger: ["blur", "change"]
          }
        ]
      },
      multipleSelection: [],
      showUpdateUserForm: false,
      showAddUserForm: false,
      load: false
    };
  },
  methods: {
    addUser() {
      //清空updateUserForm对象
      Object.keys(this.userForm).forEach(key => (this.userForm[key] = ""));
      //设置默认头像
      this.userForm.avatar =
        "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1587977821&di=0bc1822cd31bdf01ce63e17579d0c16b&src=http://img.qqzhi.com/uploads/2019-04-11/212617551.jpg";
      this.showAddUserForm = true;
    },
    addUserHandler(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验通过
          this.showAddUserForm = false;
          this.$refs[formName].resetFields();
          this.$message({
            message: "添加用户成功",
            type: "success"
          });
        } else {
          return;
        }
      });
    },
    cancelAddUserHandler(formName) {
      this.$refs[formName].resetFields();
      this.showAddUserForm = false;
    },
    updateUser(row) {
      //这里copy了row，不然有bug
      let user = Object.assign({}, row);
      this.userForm = user;
      this.showUpdateUserForm = true;
    },
    updateUserHandler(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验通过
          this.showUpdateUserForm = false;
          this.$refs[formName].resetFields();
          this.$message({
            message: "修改用户成功",
            type: "success"
          });
        } else {
          return;
        }
      });
    },
    cancelUpdateUserHandler(formName) {
      this.$refs[formName].resetFields();
      this.showUpdateUserForm = false;
    },
    deleteUser(row) {
      let flag = confirm("确认删除用户: " + row.name + "?");
      if (flag) {
        this.$message({
          message: "删除用户成功",
          type: "success"
        });
      }
    },
    batchDeleteUser() {
      let names = [];
      this.multipleSelection.forEach(item => {
        names.push(item.name);
      });
      console.log(names);
      if (names != null && names.length != 0) {
        let flag = confirm("确认批量删除选中用户:[" + names.toString() + "]?");
        if (flag) {
          this.$message({
            message: "批量删除用户成功",
            type: "success"
          });
        }
      }
    },
    handleSelectionChange(val) {
      //选择框
      this.multipleSelection = val;
    },
    refresh() {
      console.log("refresh");
      this.load = true;
      var self = this;
      setTimeout(() => {
        self.load = false;
      }, 1000);
    }
  }
};
</script>
<style>
.el-form-item__error {
  margin-left: 35px;
}
.el-form-item__label {
  color: #b3b5b9;
}
.el-dialog__title {
  font-weight: 700;
  margin-left: 220px;
}
</style>