<template>
    <div class="cdlbox cardindex">
        <div class="cardbut">
            <el-button size="medium" @click="urlgo(1)">台卡达标记录</el-button>
            <el-button size="medium" @click="urlgo(2)">台卡状态详情</el-button>
        </div>
        <div class="cardindexcon">
            <!-- 后续因改为v-for 循环这块数据展示 -->
            <el-row :gutter="20">
                <el-col :span="12" style="padding-left:0px">
                    <div class="grid-content bg-purple">
                        <div class="cardindextopsj">
                            <el-col :span="12">
                                <div class="grid-content bg-purple cardindextopfb">
                                    <div class="shujutopboxtext">
                                        <div class="shujutopboxtext1">
                                            达标台卡次数
                                        </div>
                                        <div class="shujutopboxtext2">
                                            最近7天
                                        </div>
                                    </div>
                                    <div class="text-center dabiaotaikacs ">
                                        <count-to :startVal='0' :endVal="cardindexdata.weekReachCount" :duration=4000></count-to>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple-light cardindextopfb">
                                    <div class="shujutopboxtext">
                                        <div class="shujutopboxtext1">
                                            台卡总数
                                        </div>
                                        <div class="shujutopboxtext2">
                                            总数量
                                        </div>
                                    </div>
                                    <div class="text-center dabiaotaikacs ">
                                        <count-to :startVal='0' :endVal="cardindexdata.allNumber" :duration=4000></count-to>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </div>
                    <div class="grid-content bg-purple">
                        <div class="cardindextopsj">
                            <el-col :span="12">
                                <div class="grid-content bg-purple cardindextopfb">
                                    <div class="shujutopboxtext">
                                        <div class="shujutopboxtext1">
                                            达标台卡次数
                                        </div>
                                        <div class="shujutopboxtext2">
                                            本月
                                        </div>
                                    </div>
                                    <div class="text-center dabiaotaikacs ">
                                        <count-to :startVal='0' :endVal="cardindexdata.monthReachCount" :duration=4000></count-to>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple-light cardindextopfb">
                                    <div class="shujutopboxtext">
                                        <div class="shujutopboxtext1">
                                            库存数量(台)
                                        </div>
                                        <div class="shujutopboxtext2">
                                            未绑定
                                        </div>
                                    </div>
                                    <div class="text-center dabiaotaikacs ">
                                        <count-to :startVal='0' :endVal="cardindexdata.unbindNumber" :duration=4000></count-to>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="12">
                            <div class="grid-content bg-purple cardindextopfb magbomcss">
                                <div class="shujutopboxtext">
                                    <div class="shujutopboxtext1">
                                        台卡状态
                                    </div>
                                    <div class="shujutopboxtext2">
                                        离线
                                    </div>
                                </div>
                                <div class="text-center dabiaotaikacs ">
                                    <count-to :startVal='0' :endVal="cardindexdata.oneHourOfflineCount" :duration=4000></count-to>
                                </div>
                            </div>
                            <div class="grid-content bg-purple cardindextopfb">
                                <div class="shujutopboxtext">
                                    <div class="shujutopboxtext1">
                                        绑定数量(台)
                                    </div>
                                    <div class="shujutopboxtext2">
                                        已绑定
                                    </div>
                                </div>
                                <div class="text-center dabiaotaikacs ">
                                    <count-to :startVal='0' :endVal="cardindexdata.bindNumber" :duration=4000></count-to>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="dabaosjright">
                                <div class="shujutopboxtext">
                                    <div class="shujutopboxtext1">
                                        台卡状态(台)
                                    </div>
                                    <div class="shujutopboxtext2">
                                        在线
                                    </div>
                                </div>
                                <div id="main">

                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="cradindexecharts">
            <el-row :gutter="40">
                <el-col :span="12">
                    <div class="grid-content bg-purple cradindexechartsbox">
                        <div class="cradindexechartsinput">
                            <el-date-picker value-format="yyyy-MM-dd" @change="timexz()" v-model="myChartdatas1.date" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                        <div id="chatr1">

                        </div>

                    </div>
                </el-col>
                <el-col :span="12" style="padding-right: 30px;">
                    <div class="grid-content bg-purple-light cradindexechartsbox">
                        <div class="cradindexechartsinput">
                            <el-date-picker value-format="yyyy" @change="timexz2(myChartdatas2.inYear)" v-model="myChartdatas2.inYear" type="year" placeholder="选择年">
                            </el-date-picker>
                        </div>
                        <div id="chatr2">

                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
var echarts = require("echarts");
let moment = require("moment");
// import echarts from "echarts";

import {
  cardindexdata,
  cardcountdata,
  myChartdata1,
  myChartdata2
} from "@/api/api";
import countTo from "vue-count-to";

export default {
  data() {
    return {
      cardindexdata: {
        allNumber: 0, //台卡总数
        bindNumber: 0, //绑定台卡
        monthReachCount: 0, //月达标
        unbindNumber: 0, //未绑定
        weekReachCount: 0, //周达标
        oneHourOfflineCount: 0, //离线
        oneHourOnlineCount: 0 //在线
      },
      proxyId: this.$store.state.user.proxyId,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      myChartdatas1: {
        proxyId: this.$store.state.user.proxyId,
        date: ""
      },
      myChartdatas2: {
        proxyId: this.$store.state.user.proxyId,
        inYear: ""
      },
      echartsinput: "", //日期选择val
      echartsinputn: "", //年选择器
      chatr1: {
        seriesdata: [], //第一个图标数据1
        seriesdata2: [], //第一个图标数据2
        seriesdata3: [], //第一个图标数据3
        xAxis: [] //第一个图标X轴数据
      },
      chatr2: {
        seriesdata: [], //第一个图标数据1
        seriesdata2: [], //第一个图标数据2
        seriesdata3: [], //第一个图标数据3
        xAxis: [] //第一个图标X轴数据
      }
    };
  },
  components: { countTo }, //数字滚动组件
  methods: {
    timexz() {
      this.chatr1.xAxis = [];
      this.chatr1.seriesdata = [];
      this.chatr1.seriesdata2 = [];
      this.chatr1.seriesdata3 = [];
      this.chatrfun();
    },
    timexz2(val) {
      console.log(val);

      this.chatr2.xAxis = [];
      this.chatr2.seriesdata = [];
      this.chatr2.seriesdata2 = [];
      this.chatr2.seriesdata3 = [];
      this.chatrfun2();
    },
    urlgo(id) {
      if (id == 1) {
        this.$router.push("/card/standard/standardtable1");
      } else if (id == 2) {
        this.$router.push("/card/cardmanage");
      }
    },
    chatrfun() {
      //第一个图标
      myChartdata1(this.myChartdatas1)
        .then(response => {
          console.log(response);
          let datas = response.data.data;
          for (let x in datas) {
            this.chatr1.xAxis.push(datas[x].day + "号");
            this.chatr1.seriesdata.push(datas[x].reachCount);
            this.chatr1.seriesdata2.push(datas[x].unReachCount);
            this.chatr1.seriesdata3.push(datas[x].offNumber);
          }
          let option = {
            title: {
              text: "达标汇总"
            },
            tooltip: {},
            legend: {
              data: ["达标数", "未达标数", "未开机"]
            },
            xAxis: {
              data: this.chatr1.xAxis
            },
            yAxis: {},
            series: [
              {
                name: "达标数",
                type: "line",
                label: {
                  normal: {
                    show: true,
                    position: "top"
                  }
                },
                data: this.chatr1.seriesdata,
                symbolSize: 10, //拐点圆的大小
                color: ["#00cccb"], //折线条的颜色
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 5,
                      color: "#00cccb"
                    }
                  }
                }
              },
              {
                name: "未达标数",
                type: "line",
                label: {
                  normal: {
                    show: true,
                    position: "top"
                  }
                },
                data: this.chatr1.seriesdata2,
                symbolSize: 10, //拐点圆的大小
                color: ["red"], //折线条的颜色
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 5,
                      color: "red"
                    }
                  }
                }
              },
              {
                name: "未开机",
                type: "line",
                label: {
                  normal: {
                    show: true,
                    position: "top"
                  }
                },
                data: this.chatr1.seriesdata3,
                symbolSize: 10, //拐点圆的大小
                color: ["#23b7e5"], //折线条的颜色
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 5,
                      color: "#23b7e5"
                    }
                  }
                }
              }
            ]
          };
          let myChart = echarts.init(document.getElementById("chatr1"));

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    chatrfun2() {
      //第2个图标
      myChartdata2(this.myChartdatas2)
        .then(response => {
          console.log(response);
          let datas = response.data.data;
          for (let x in datas) {
            this.chatr2.xAxis.push(datas[x].month + "月");
            this.chatr2.seriesdata.push(datas[x].reachCount);
            this.chatr2.seriesdata2.push(datas[x].unReachCount);
            this.chatr2.seriesdata3.push(datas[x].baiduTotalNum);
          }
          let option1 = {
            title: {
              text: "月份统计"
            },
            tooltip: {},
            legend: {
              data: ["达标数", "未达标数", "广告播放数"],
              selected: {
                达标数: true,
                未达标数: true,
                广告播放数: false
              }
            },
            xAxis: {
              data: this.chatr2.xAxis
            },
            yAxis: {},
            series: [
              {
                name: "达标数",
                type: "line",
                label: {
                  normal: {
                    show: true,
                    position: "top"
                  }
                },
                data: this.chatr2.seriesdata,
                symbolSize: 10, //拐点圆的大小
                color: ["#00cccb"], //折线条的颜色
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 5,
                      color: "#00cccb"
                    }
                  }
                }
              },
              {
                name: "未达标数",
                type: "line",
                label: {
                  normal: {
                    show: true,
                    position: "top"
                  }
                },
                data: this.chatr2.seriesdata2,
                symbolSize: 10, //拐点圆的大小
                color: ["red"], //折线条的颜色
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 5,
                      color: "red"
                    }
                  }
                }
              },
              {
                name: "广告播放数",
                type: "line",
                label: {
                  normal: {
                    show: true,
                    position: "top"
                  }
                },
                data: this.chatr2.seriesdata3,
                symbolSize: 10, //拐点圆的大小
                color: ["#23b7e5"], //折线条的颜色
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 5,
                      color: "#23b7e5"
                    }
                  }
                }
              }
            ]
          };
          let myChart = echarts.init(document.getElementById("chatr2"));

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option1);
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    }
  },
  mounted: function() {
    //挂载结束后
    this.chatrfun();
    this.chatrfun2();

    // 绘制图表

    // 指定图表的配置项和数据;
    var carde = this.cardindexdata.oneHourOnlineCount;
    var Chart4 = echarts.init(document.getElementById("main")); //获取ID
    var option = {
      title: {
        show: true,
        text: carde + "台",
        x: "center",
        y: "center",
        textStyle: {
          fontSize: "22",
          color: "#00cccb",
          fontWeight: "normal"
        }
      },
      series: {
        name: "",
        type: "pie",
        radius: ["65%", "85%"],
        color: "#00cccb ",
        avoidLabelOverlap: true,
        hoverAnimation: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: false
          }
        },
        data: [{ value: 100, name: "" }]
      }
    };
    Chart4.setOption(option);

    //挂载结束状态
    console.log(this.proxyId);
    cardindexdata(this.proxyId)
      .then(r => {
        console.log(r);
        let data = r.data.data;
        this.cardindexdata.allNumber = data.allNumber;
        this.cardindexdata.bindNumber = data.bindNumber;
        this.cardindexdata.monthReachCount = data.monthReachCount;
        this.cardindexdata.weekReachCount = data.weekReachCount;
        this.cardindexdata.unbindNumber = data.unbindNumber;
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
    cardcountdata(this.proxyId)
      .then(r => {
        console.log(r);
        let data = r.data.data;
        this.cardindexdata.oneHourOfflineCount = data.oneHourOfflineCount;
        this.cardindexdata.oneHourOnlineCount = data.oneHourOnlineCount;
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });

    let currentdate = moment().format(" YYYY-MM-DD"); //获取当前时间
    let year = moment().format("YYYY"); //获取当前时间

    console.log(year);

    this.myChartdatas1.date = currentdate;
    this.myChartdatas2.inYear = year;
  }
};
</script>


<style rel="stylesheet/scss" lang="scss">
.cardindex {
  .cardbut {
    button {
      background-color: #00cccb;
      color: #fff;
    }
  }
  .cardindexcon {
    margin-top: 20px;
  }
  .cardindextopsj {
    margin-bottom: 20px;
    height: 150px;
  }
  .cardindextopfb {
    background: #fff;
    height: 150px;
    border-radius: 10px;
  }
  .magbomcss {
    margin-bottom: 20px;
  }
  .dabaosjright {
    height: 320px;
    background: #fff;
    border-radius: 10px;
  }
  .shujutopboxtext {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #e8f2f3;
    font-size: 14px;
  }
  .shujutopboxtext1 {
    float: left;
  }
  .shujutopboxtext2 {
    float: right;
  }
  .dabiaotaikacs {
    font-size: 35px;
    font-weight: bold;
    line-height: 100px;
    color: #000;
    text-align: center;
  }
}
#main {
  width: 70%;
  height: 70%;
  margin: 25px auto;
}
.cradindexecharts {
  margin-top: 0px;
}
.cradindexechartsbox {
  height: 440px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
.cradindexechartsinput {
  height: 50px;
}
#chatr1 {
  height: 380px;
  margin-top: 20px;
}
#chatr2 {
  height: 380px;
  margin-top: 20px;
}
</style>
