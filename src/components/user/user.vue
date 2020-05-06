<template>
  <div>
    <el-row style="margin-bottom:20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">システム管理</el-breadcrumb-item>
        <el-breadcrumb-item>ユーザー管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="margin-bottom:10px;" :gutter="5">
      <el-col :span="3">
        <el-button size="small" type="primary" @click="addUser">
          <i class="el-icon-plus"></i>ユーザーを追加
        </el-button>
      </el-col>
      <el-col :span="4" :offset="15">
        <el-input placeholder="ユーザーを検索">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type icon="el-icon-refresh" @click="refresh">リフレッシュ</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table ref="userTable" v-loading="load" :data="user" border style="width: 100%">
        <el-table-column prop="id" label="id" width="90" sortable align="center"></el-table-column>
        <el-table-column prop="email" label="口座番号" width="180" align="center"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最終ログイン時間" width="180" sortable align="center"></el-table-column>
        <el-table-column
          prop="lastRequestTime"
          label="最終リクエスト時間"
          width="180"
          sortable
          align="center"
        ></el-table-column>
        <el-table-column prop="point" label="残りのポイント" width="180" sortable align="center"></el-table-column>
        <el-table-column prop="status" label="ユーザーのステータス" width="300" sortable align="center">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="有効にする"
              inactive-text="無効にする"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="運営" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="addPoint(scope.row)">
              <i class="el-icon-coin"></i>補充する
            </el-button>
            <el-button size="mini" @click="updateUser(scope.row)">
              <i class="el-icon-edit"></i>編集する
            </el-button>
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
    <el-dialog width="40%" title="ユーザーを変更" :visible.sync="showUpdateUserForm">
      <el-form
        :model="userForm"
        label-width="200px"
        ref="updateUserForm"
        :rules="rules"
        label-position="left"
      >
        <el-form-item label="口座番号:" prop="email">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="パスワードを変更する:" prop="password">
          <el-col :span="18" :offset="2">
            <el-input
              size="medium"
              v-model="userForm.password"
              show-password
              placeholder="パスワードを変更する"
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateUserHandler('updateUserForm')">取キャンセルする</el-button>
        <el-button type="primary" @click="updateUserHandler('updateUserForm')">よし</el-button>
      </div>
    </el-dialog>

    <!--添加用户-->
    <el-dialog width="40%" title="ユーザーを追加" :visible.sync="showAddUserForm">
      <el-form :model="userForm" label-width="200px" ref="addUserForm" :rules="rules" status-icon>
        <el-form-item label="口座番号:" prop="email">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="userForm.email" placeholder="アカウントを入力してください"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="パスワード:" prop="password">
          <el-col :span="18" :offset="2">
            <el-input
              size="medium"
              v-model="userForm.password"
              placeholder="パスワードを入力してください"
              show-password
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="パスワードを確認:" prop="password1">
          <el-col :span="18" :offset="2">
            <el-input
              size="medium"
              v-model="userForm.password1"
              placeholder="パスワードを確認"
              show-password
            ></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUserHandler('addUserForm')">取キャンセルする</el-button>
        <el-button type="primary" @click="addUserHandler('addUserForm')">確認する</el-button>
      </div>
    </el-dialog>

    <!--充值-->
    <el-dialog width="40%" title="補充する" :visible.sync="showAddPointForm">
      <el-form
        :model="userForm"
        label-width="120px"
        ref="addPointForm"
        :rules="rules"
        status-icon
        label-position="left"
      >
        <el-form-item label="残りのポイント:">
          <el-col :span="18" :offset="2">
            <span style="color:red">500</span>
          </el-col>
        </el-form-item>
        <el-form-item label="充電ポイント:">
          <el-radio-group v-model="userForm.point" size="30">
            <el-radio label="100" border>200</el-radio>
            <el-radio label="500" border>500</el-radio>
            <el-radio label="1000" border>1000</el-radio>
            <el-radio label="2000" border>2000</el-radio>
            <el-radio label="5000" border>5000</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-col :span="4">
            <el-input placeholder="その他の値"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddPointHandler('addPointForm')">キャンセルする</el-button>
        <el-button type="primary" @click="AddPointHandler('addPointForm')">確認する</el-button>
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
          email: "wan.tao@cn.ricoh.com",
          lastLoginTime: "2020-4-27 13:06",
          lastRequestTime: "2020-4-27 13:06",
          point: "500",
          status: true
        },
        {
          id: 2,
          email: "wan.tao@cn.ricoh.com",
          lastLoginTime: "2020-4-27 13:06",
          lastRequestTime: "2020-4-27 13:06",
          point: "500",
          status: false
        },
        {
          id: 3,
          email: "wan.tao@cn.ricoh.com",
          lastLoginTime: "2020-4-27 13:06",
          lastRequestTime: "2020-4-27 13:06",
          point: "500",
          status: true
        },
        {
          id: 4,
          email: "wan.tao@cn.ricoh.com",
          lastLoginTime: "2020-4-27 13:06",
          lastRequestTime: "2020-4-27 13:06",
          point: "500",
          status: true
        },
        {
          id: 5,
          email: "wan.tao@cn.ricoh.com",
          lastLoginTime: "2020-4-27 13:06",
          lastRequestTime: "2020-4-27 13:06",
          point: "500",
          status: true
        },
        {
          id: 6,
          email: "wan.tao@cn.ricoh.com",
          lastLoginTime: "2020-4-27 13:06",
          lastRequestTime: "2020-4-27 13:06",
          point: "500",
          status: true
        }
      ],
      userForm: {
        id: "",
        password: "",
        password1: "",
        email: "",
        point: ""
      },
      rules: {
        password: [
          { required: true, message: "パスワードを入力してください", trigger: ["blur", "change"] }
        ],
        password1: [
          {
            required: true,
            message: "確認パスワードを入力してください",
            trigger: ["blur", "change"]
          },
          {
            validator: (rule, value, cb) => {
              if (value === "") {
                cb(new Error("パスワードは空にできません"));
              } else if (value !== this.userForm.password) {
                cb(new Error("2つのパスワードに矛盾があります"));
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
            message: "アカウントを入力してください",
            trigger: ["blur", "change"]
          }
        ]
      },
      multipleSelection: [],
      showUpdateUserForm: false,
      showAddUserForm: false,
      showAddPointForm: false,
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
            message: "ユーザーが正常に追加されました",
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
            message: "ユーザーの変更に成功しました",
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
    addPoint(row) {
      //这里copy了row，不然有bug
      let user = Object.assign({}, row);
      this.userForm = user;
      this.showAddPointForm = true;
    },
    cancelAddPointHandler(formName) {
      this.$refs[formName].resetFields();
      this.showAddPointForm = false;
    },
    addPointHandler(formName) {
      this.showAddPointForm = false;
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