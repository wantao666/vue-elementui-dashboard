<template>
  <div style=" overflow-x:hidden">
    <el-row style="margin-bottom:20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">データ統計</el-breadcrumb-item>
        <el-breadcrumb-item>データレポート</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div style="margin-left:90px;width:100%;">
      <div style="height:400px;">
        <div class="echart" id="echart1" style="float:left;margin-right:20px;"></div>
        <div class="echart" id="echart2" style="float:left"></div>
      </div>
      <div style="height:400px;margin-top:40px;">
        <div style="position:absolute;width:100px;margin-left:600px;z-index:10">
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="echart" id="echart3" style="float:left;margin-right:20px;"></div>
        <div style="position:absolute;width:100px;margin-left:1320px;z-index:10">
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="echart" id="echart4" style="float:left"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      options: [
        {
          label: "日",
          value: "day"
        },
        {
          label: "月",
          value: "month"
        },
        {
          label: "年",
          value: "year"
        }
      ],
      value1: "day",
      value2: "day"
    };
  },
  mounted: function() {
    //====================================================Echart1====================================================
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById("echart1"));
    // 指定图表的配置项和数据
    var option1 = {
      title: {
        text: "大きな顧客",
        x: "center"
      },
      tooltip: {
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      yAxis: {
        name: "お客様",
        data: ["お客様1", "お客様2", "お客様3", "お客様4", "お客様5"]
      },
      xAxis: {
        name: "チャージポイント積算",
        nameGap: 25,
        nameLocation: "center"
      },
      series: [
        {
          name: "チャージポイント積算",
          type: "bar",
          data: [30, 50, 86, 100, 200]
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    //====================================================Echart2====================================================
    // 基于准备好的dom，初始化echarts实例
    var myChart2 = echarts.init(document.getElementById("echart2"));
    // 指定图表的配置项和数据
    var option2 = {
      title: {
        text: "通常の標準テンプレート",
        x: "center"
      },
      tooltip: {
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      yAxis: {
        name: "テンプレート",
        data: [
          "テンプレート1",
          "テンプレート2",
          "テンプレート3",
          "テンプレート4",
          "テンプレート5"
        ]
      },
      grid: {
        left: "100px"
      },
      xAxis: {
        name: "タイムズ",
        nameGap: 25,
        nameLocation: "center"
      },
      series: [
        {
          name: "タイムズ",
          type: "bar",
          data: [40, 100, 26, 170, 20]
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
    //====================================================Echart3====================================================
    // 基于准备好的dom，初始化echarts实例
    var myChart3 = echarts.init(document.getElementById("echart3"));
    // 指定图表的配置项和数据
    var option3 = {
      title: {
        text: "登録ユーザ数",
        x: "center"
      },
      tooltip: {
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        name: "時間",
        type: "category",
        data: [
          "2020/5/1",
          "2020/5/2",
          "2020/5/3",
          "2020/5/4",
          "2020/5/5",
          "2020/5/6",
          "2020/5/7"
        ]
      },
      yAxis: {
        name: "ユーザー",
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option3);
    //====================================================Echart4====================================================
    // 基于准备好的dom，初始化echarts实例
    var myChart4 = echarts.init(document.getElementById("echart4"));
    // 指定图表的配置项和数据
    var option4 = {
      title: {
        text: "アクセス数",
        x: "center"
      },
      tooltip: {
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: {
        name: "時間",
        type: "category",
        data: [
          "2020/5/1",
          "2020/5/2",
          "2020/5/3",
          "2020/5/4",
          "2020/5/5",
          "2020/5/6",
          "2020/5/7"
        ]
      },
      yAxis: {
        name: "タイムズ",
        type: "value"
      },
      series: [
        {
          data: [220, 232, 821, 934, 780, 1330, 1120],
          type: "line"
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart4.setOption(option4);
  }
};
</script>

<style>
.echart {
  width: 700px;
  height: 400px;
  background-color: #eeeeee;
}
</style>