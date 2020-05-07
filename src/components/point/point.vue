<template>
  <div>
    <el-row style="margin-bottom:20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">システム管理</el-breadcrumb-item>
        <el-breadcrumb-item>コース管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="margin-bottom:10px;">
      <el-col :span="4">
        <el-button size="small" type="danger" @click="batchDeletePointRule">
          <i class="el-icon-delete"></i>一括削除
        </el-button>
        <el-button size="small" type="primary" @click="addPointRule">
          <i class="el-icon-plus"></i>ルールを追加
        </el-button>
      </el-col>
      <el-col :span="1" :offset="18">
        <el-button type icon="el-icon-refresh" @click="refresh">リフレッシュ</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="pointRule"
        v-loading="load"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!--展开行-->
        <el-table-column type="expand" label="詳細なルール" width="180">
          <template slot-scope="scope">
            <el-form>
              <el-table :data="scope.row.rules" border style="width: 30%;margin-left:400px;">
                <el-table-column label="1か月あたりのリクエスト(n)" align="center">
                  <template slot-scope="scope">
                    <span>
                      {{scope.row.min}}
                      <i class="el-icon-arrow-left"></i>
                      <span>n</span>
                      <i class="el-icon-arrow-left"></i>
                      {{scope.row.max}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="単価" width="180" align="center"></el-table-column>
              </el-table>
            </el-form>
          </template>
        </el-table-column>
        <!--展开行-->
        <el-table-column prop="id" label="id" width="90" sortable align="center"></el-table-column>
        <el-table-column prop="name" label="ルール名" width="180" sortable align="center"></el-table-column>
        <el-table-column prop="createTime" label="作成時間" width="300" sortable align="center"></el-table-column>
        <el-table-column prop="status" label="ルールのステータス" width="300" sortable align="center">
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
        <el-table-column label="運営" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="updatePointRule(scope.row)">
              <i class="el-icon-edit"></i>編集する
            </el-button>
            <el-button size="mini" type="danger" @click="deletePointRule(scope.row)">
              <i class="el-icon-delete"></i>削除する
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--添加积分规则-->
    <el-dialog width="40%" title="ルールを追加" :visible.sync="showAddPointRuleForm">
      <el-form :model="pointRuleForm" ref="addPointRuleForm" :rules="rules">
        <el-form-item label="ルール名:">
          <el-col :span="17" :offset="1">
            <el-input size="medium" placeholder="ルール名を入力してください"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="1か月あたりのリクエスト:">
          <el-col :span="18">
            <el-col :span="4">
              <el-input size="medium" placeholder="min1"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <i class="el-icon-minus"></i>
            </el-col>
            <el-col :span="4">
              <el-input size="medium" placeholder="max1"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <span style="color: #b3b5b9;">単価:</span>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-input size="medium" placeholder="price"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" v-show="false">
              <el-button icon="el-icon-plus" circle></el-button>
            </el-col>
          </el-col>
        </el-form-item>
        <el-form-item label="1か月あたりのリクエスト:">
          <el-col :span="18">
            <el-col :span="4">
              <el-input size="medium" placeholder="max1"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <i class="el-icon-minus"></i>
            </el-col>
            <el-col :span="4">
              <el-input size="medium" placeholder="max2"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <span style="color: #b3b5b9;">単価:</span>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-input size="medium" placeholder="price"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" v-show="false">
              <el-button icon="el-icon-plus" circle></el-button>
            </el-col>
          </el-col>
        </el-form-item>
        <el-form-item label="1か月あたりのリクエスト:">
          <el-col :span="18">
            <el-col :span="4">
              <el-input size="medium" placeholder="max2"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <i class="el-icon-minus"></i>
            </el-col>
            <el-col :span="4">
              <el-input size="medium" placeholder="max3"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <span style="color: #b3b5b9;">単価:</span>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-input size="medium" placeholder="price"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button icon="el-icon-plus" circle></el-button>
            </el-col>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddPointRuleHandler('addPointRuleForm')">キャンセルする</el-button>
        <el-button type="primary" @click="addPointRuleHandler('addPointRuleForm')">確かに</el-button>
      </div>
    </el-dialog>

    <!--编辑积分规则-->
    <el-dialog width="40%" title="ルールを編集する" :visible.sync="showUpdatePointRuleForm">
      <el-form :model="pointRuleForm" ref="updatePointRuleForm">
        <el-form-item label="ルール名:">
          <el-col :span="17" :offset="1">
            <el-input size="medium" placeholder="ルール名を入力してください" v-model="pointRuleForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="1か月あたりのリクエスト:">
          <el-col :span="18">
            <el-col :span="4">
              <el-input size="medium" placeholder="min1" v-model="pointRuleForm.rules[0].min"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <i class="el-icon-minus"></i>
            </el-col>
            <el-col :span="4">
              <el-input size="medium" placeholder="max1" v-model="pointRuleForm.rules[0].max"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <span style="color: #b3b5b9;">単価:</span>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-input size="medium" placeholder="price" v-model="pointRuleForm.rules[0].price"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" v-show="false">
              <el-button icon="el-icon-plus" circle></el-button>
            </el-col>
          </el-col>
        </el-form-item>
        <el-form-item label="1か月あたりのリクエスト:">
          <el-col :span="18">
            <el-col :span="4">
              <el-input size="medium" placeholder="max1" v-model="pointRuleForm.rules[1].min"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <i class="el-icon-minus"></i>
            </el-col>
            <el-col :span="4">
              <el-input size="medium" placeholder="max2" v-model="pointRuleForm.rules[1].max"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <span style="color: #b3b5b9;">単価:</span>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-input size="medium" placeholder="price" v-model="pointRuleForm.rules[1].price"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" v-show="false">
              <el-button icon="el-icon-plus" circle></el-button>
            </el-col>
          </el-col>
        </el-form-item>
        <el-form-item label="1か月あたりのリクエスト:">
          <el-col :span="18">
            <el-col :span="4">
              <el-input size="medium" placeholder="max2" v-model="pointRuleForm.rules[2].min"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <i class="el-icon-minus"></i>
            </el-col>
            <el-col :span="4">
              <el-input size="medium" placeholder="max3" v-model="pointRuleForm.rules[2].max"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <span style="color: #b3b5b9;">単価:</span>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-input size="medium" placeholder="price" v-model="pointRuleForm.rules[2].price"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button icon="el-icon-plus" circle></el-button>
            </el-col>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdatePointRuleHandler('updatePointRuleForm')">キャンセルする</el-button>
        <el-button type="primary" @click="updatePointRuleHandler('updatePointRuleForm')">よし</el-button>
      </div>
    </el-dialog>
    <!--删除dialog-->
    <el-dialog title="プロンプト" :visible.sync="showDeleteDialog" width="30%">
      <span>{{deleteMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDeleteDialog = false">キャンセルする</el-button>
        <el-button type="primary" @click="deleteFinish">よし</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    addPointRule() {
      //清空updatePointRuleForm对象
      Object.keys(this.pointRuleForm).forEach(
        key => (this.pointRuleForm[key] = "")
      );
      this.pointRuleForm = {
        id: 2,
        name: "ルール2",
        status: false,
        createTime: "2020-4-27 13:06",
        rules: [
          {
            min: 1,
            max: 100,
            price: 100
          },
          {
            min: 100,
            max: 500,
            price: 50
          },
          {
            min: 500,
            max: 1000,
            price: 30
          }
        ]
      };
      this.showAddPointRuleForm = true;
    },
    addPointRuleHandler(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验通过
          this.showAddPointRuleForm = false;
          this.$refs[formName].resetFields();
          this.$message({
            message: "ルールを追加しました",
            type: "success"
          });
        } else {
          return;
        }
      });
    },
    cancelAddPointRuleHandler(formName) {
      this.$refs[formName].resetFields();
      this.showAddPointRuleForm = false;
    },
    updatePointRule(row) {
      let pointRule = Object.assign({}, row);
      this.pointRuleForm = pointRule;
      this.showUpdatePointRuleForm = true;
    },
    updatePointRuleHandler(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验通过
          this.showUpdatePointRuleForm = false;
          this.$refs[formName].resetFields();
          this.$message({
            message: "ルールの変更に成功しました",
            type: "success"
          });
        } else {
          return;
        }
      });
    },
    cancelUpdatePointRuleHandler(formName) {
      this.$refs[formName].resetFields();
      this.showUpdatePointRuleForm = false;
    },
    deletePointRule(row) {
      this.deleteMsg = "削除IDが: " + row.id + "のルール?";
      this.showDeleteDialog = true;
    },
    deleteFinish() {
      this.showDeleteDialog = false;
      this.$message({
        message: "ルールが正常に削除されました",
        type: "success"
      });
    },
    batchDeletePointRule() {
      let ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id);
      });
      if (ids != null && ids.length != 0) {
        this.deleteMsg = "一括削除IDが: [" + ids.toString() + "]のルール?";
        this.showDeleteDialog = true;
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
  },
  data() {
    return {
      pointRule: [
        {
          id: 1,
          name: "ルール1",
          status: true,
          createTime: "2020-4-27 13:06",
          rules: [
            {
              min: 1,
              max: 100,
              price: 100
            },
            {
              min: 100,
              max: 500,
              price: 50
            },
            {
              min: 500,
              max: 1000,
              price: 30
            }
          ]
        },
        {
          id: 2,
          name: "ルール2",
          status: false,
          createTime: "2020-4-27 13:06",
          rules: [
            {
              min: 1,
              max: 100,
              price: 100
            },
            {
              min: 100,
              max: 500,
              price: 50
            },
            {
              min: 500,
              max: 1000,
              price: 30
            }
          ]
        }
      ],
      pointRuleForm: {
        id: 2,
        name: "ルール2",
        status: false,
        createTime: "2020-4-27 13:06",
        rules: [
          {
            min: 1,
            max: 100,
            price: 100
          },
          {
            min: 100,
            max: 500,
            price: 50
          },
          {
            min: 500,
            max: 1000,
            price: 30
          }
        ]
      },
      deleteMsg: "",
      showDeleteDialog: false,
      load: false,
      showUpdatePointRuleForm: false,
      showAddPointRuleForm: false,
      multipleSelection: [],
      rules: {
        price: [
          { required: true, message: "単価を入力してください", trigger: ["blur", "change"] }
        ]
      }
    };
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
}
</style>