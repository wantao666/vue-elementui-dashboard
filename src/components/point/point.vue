<template>
  <div>
    <el-row style="margin-bottom:20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>课金管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="margin-bottom:10px;">
      <el-col :span="3">
        <el-button size="small" type="danger" @click="batchDeletePointRule">
          <i class="el-icon-delete"></i>批量删除
        </el-button>
        <el-button size="small" type="primary" @click="addPointRule">
          <i class="el-icon-plus"></i>添加规则
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="pointRule"
        v-loading="false"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="300" sortable align="center"></el-table-column>
        <el-table-column label="调用次数" width="300" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.count.min}}
              <i class="el-icon-arrow-left"></i>
              <span>n</span>
              <i class="el-icon-arrow-left"></i>
              {{scope.row.count.max}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price" width="300" sortable align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="updatePointRule(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deletePointRule(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--修改积分规则-->
    <el-dialog width="30%" title="修改规则" :visible.sync="showUpdatePointRuleForm">
      <el-form :model="pointRuleForm" label-width="100px" ref="updatePointRuleForm" :rules="rules">
        <el-form-item label="调用次数:">
          <el-col :span="18" :offset="2">
            <el-input-number size="small" v-model="pointRuleForm.count.min"></el-input-number>
            <span>
              <i class="el-icon-arrow-left"></i>n
              <i class="el-icon-arrow-left"></i>
            </span>
            <el-input-number size="small" v-model="pointRuleForm.count.max"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="pointRuleForm.price"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdatePointRuleHandler('updatePointRuleForm')">取 消</el-button>
        <el-button type="primary" @click="updatePointRuleHandler('updatePointRuleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加积分规则-->
    <el-dialog width="30%" title="添加规则" :visible.sync="showAddPointRuleForm">
      <el-form :model="pointRuleForm" label-width="100px" ref="addPointRuleForm" :rules="rules">
        <el-form-item label="调用次数:">
          <el-col :span="18" :offset="2">
            <el-input-number size="small" v-model="pointRuleForm.count.min"></el-input-number>
            <span>
              <i class="el-icon-arrow-left"></i>n
              <i class="el-icon-arrow-left"></i>
            </span>
            <el-input-number size="small" v-model="pointRuleForm.count.max"></el-input-number>
          </el-col>
        </el-form-item>
        <el-form-item label="价格:" prop="price">
          <el-col :span="18" :offset="2">
            <el-input size="medium" v-model="pointRuleForm.price"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddPointRuleHandler('addPointRuleForm')">取 消</el-button>
        <el-button type="primary" @click="addPointRuleHandler('addPointRuleForm')">确 定</el-button>
      </div>
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
        id: 0,
        count: {
          min: 0,
          max: 0
        },
        price: 0
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
            message: "添加规则成功",
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
            message: "修改规则成功",
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
      let flag = confirm("确认删除id为: " + row.id + "的规则?");
      if (flag) {
        this.$message({
          message: "删除规则成功",
          type: "success"
        });
      }
    },
    batchDeletePointRule() {
      let ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item.id);
      });
      if (ids != null && ids.length != 0) {
        let flag = confirm(
          "确认批量删除选中规则:id为[" + ids.toString() + "]?"
        );
        if (flag) {
          this.$message({
            message: "批量删除规则成功",
            type: "success"
          });
        }
      }
    },
    handleSelectionChange(val) {
      //选择框
      this.multipleSelection = val;
    }
  },
  data() {
    return {
      pointRule: [
        {
          id: 1,
          count: {
            min: 1,
            max: 100
          },
          price: 100
        },
        {
          id: 2,
          count: {
            min: 100,
            max: 1000
          },
          price: 200
        },
        {
          id: 3,
          count: {
            min: 1000,
            max: 10000
          },
          price: 300
        }
      ],
      pointRuleForm: {
        id: 0,
        count: {
          min: 0,
          max: 0
        },
        price: 0
      },
      showUpdatePointRuleForm: false,
      showAddPointRuleForm: false,
      multipleSelection: [],
      rules: {
        price: [
          { required: true, message: "请输入价格", trigger: ["blur", "change"] }
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