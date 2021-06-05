<template >
    <div class="cdlbox index">
        <el-row :gutter="40">
            <el-col :span="12">
                <!-- 首页轮播 -->
                <div class="grid-content bg-purple indextopleft">
                    <el-carousel :interval="3500" height="250px">
                        <el-carousel-item v-for="item in imgitems" :key="item">
                            <img class="indexbanner" :src="item" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 首页快速入口 -->
                <div class="indextopleftcen">
                    <el-row class="indexcentre" :gutter="30">
                        <el-col :span="12">
                            <router-link to="/card">
                                <div class="grid-content indexcjbnr">
                                    <el-col :span="10" style="margin-top: 25px;border-right: 1px solid #e8f2f3;">
                                        <img src="../../img/iconindex4.png" alt="">
                                    </el-col>
                                    <el-col :span="14">
                                        <div class="indexztitle">台卡管理</div>
                                        <div class="indexztitle1">查看台卡达标记录</div>
                                    </el-col>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content indexcjbnr">
                                <router-link to="/shop/">
                                    <el-col :span="10" style="margin-top: 25px;border-right: 1px solid #e8f2f3;">
                                        <img src="../../img/iconindex3.png" alt="">
                                    </el-col>
                                    <el-col :span="14">
                                        <div class="indexztitle">邀请商户</div>
                                        <div class="indexztitle1">点击立即邀请商户</div>
                                    </el-col>
                                </router-link>
                            </div>

                        </el-col>
                    </el-row>
                </div>
                <!-- 台卡总览 -->
                <div class="taikazonglna">
                    <div class="listboxtop">
                        台卡总览
                    </div>
                    <el-row class="listboxcon">
                        <el-col :span="6" v-for="(item,key) in carditem" :key=key>
                            <div class="grid-content ">
                                <div class="inxajaxsj">
                                    <count-to :startVal='0' :endVal=item.sj :duration=4000></count-to>
                                </div>
                                <div class="ajaxsjbt">
                                    {{item.name}}
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content ">
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!-- 待办事件 -->
                <div class="taikazonglna">
                    <div class="listboxtop">
                        待办事件
                    </div>
                    <el-row class="listboxcon">
                        <el-col :span="6" v-for="(item,key) in waiting" :key=key>
                            <div class="grid-content ">
                                <div class="inxajaxsj">
                                    <count-to :startVal='0' :endVal=item.sj :duration=4000></count-to>
                                </div>
                                <div class="ajaxsjbt">
                                    {{item.name}}
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content ">
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12" class="indextop-right">
                <div class="grid-content bg-purple-light">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <div class="bg-purpledix">
                                    <div class="index-nuwstop">
                                        公告
                                    </div>
                                    <div class="gonggaotext">
                                        {{indexnews}}
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <div class="bg-purple-lightdiv">
                                    <div class="index-nuwstop">
                                        客服
                                    </div>
                                    <div class="gonggaotext">
                                        <el-row>
                                            <el-col :span="10" style="text-align: center;">
                                                <div class="grid-content bg-purple">
                                                    <img class="indexkefu" src="../../img/inconkefu.png" alt="">
                                                    <div class="" style="margin-top: 20px;">联系客服</div>
                                                </div>
                                            </el-col>
                                            <el-col :span="14">
                                                <div class="grid-content bg-purple-light" style="text-align: center;">
                                                    <div title="周一至周五早9：00 - 晚18:00" class="cjbindex-right1">联系电话:8768999</div>
                                                    <div class="cjbindex-right1">客服微信:deeryzcs</div>
                                                    <div style="text-align:right;margin-top:15px;">
                                                        <span class="cjbindex-right2">加微信联系我呦</span>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>

                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="indextopleftcen">
                    <el-row class="indexcentre" :gutter="30">
                        <el-col :span="12">
                            <router-link to="/shop/table">
                                <div class="grid-content indexcjbnr">
                                    <el-col :span="10" style="margin-top: 25px;border-right: 1px solid #e8f2f3;">
                                        <img src="../../img/iconindex2.png" alt="">
                                    </el-col>
                                    <el-col :span="14">
                                        <div class="indexztitle">商户管理</div>
                                        <div class="indexztitle1">查看商户信息</div>
                                    </el-col>
                                </div>
                            </router-link>
                        </el-col>
                        <el-col :span="12">
                            <router-link to="/">
                                <div class="grid-content indexcjbnr">
                                    <el-col :span="10" style="margin-top: 25px;border-right: 1px solid #e8f2f3;">
                                        <img src="../../img/iconindex1.png" alt="">
                                    </el-col>
                                    <el-col :span="14">
                                        <div class="indexztitle">业务员管理</div>
                                        <div class="indexztitle1">查看业务员业绩</div>
                                    </el-col>
                                </div>
                            </router-link>
                        </el-col>
                    </el-row>
                </div>
                <div class="indextable">
                    <div class="listboxtop">
                        台卡离线超时报警
                    </div>
                    <div class="listtable">
                        <el-table id="table" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                            <el-table-column prop="shopName" label="门店名称">
                                <template slot-scope="scope">
                                    <div>
                                        {{ scope.row.shopName }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="offAlertNumber" label="离线超48小时">
                                <template slot-scope="scope">
                                    <div>
                                        <count-to :startVal='0' :endVal=scope.row.offAlertNumber :duration=4000></count-to>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cardNumber" label="已绑定台数">
                                <template slot-scope="scope">
                                    <div>
                                        <count-to :startVal='0' :endVal=scope.row.cardNumber :duration=4000></count-to>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="block" style="margin-top: 30px;">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumbercs" :page-sizes="pageSizesList" :page-size="ajaxdata.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { indexdata, indextable } from "@/api/api";
import countTo from "vue-count-to";

export default {
  data() {
    return {
      pageNumbercs: 0, //初始页码
      pageSize: 5, //初始分页数量
      pageSizesList: [5], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: "",
        pageSize: 5,
        pageNumber: 0
      },
      tableData3: [],
      multipleSelection: [],
      imgitems: [
        "../../src/img/banner1.jpg",
        "../../src/img/banner2.jpg",
        "../../src/img/banner3.jpg"
      ],
      carditem: [
        {
          sj: 0,
          name: "台卡"
        },
        {
          sj: 0,
          name: "在线"
        },
        {
          sj: 0,
          name: "离线"
        },
        {
          sj: 0,
          name: "未绑定(库存)"
        }
      ],
      waiting: [
        {
          sj: 0,
          name: "待审核门店"
        },
        {
          sj: 0,
          name: "待安装工单"
        },
        {
          sj: 0,
          name: "待维护工单"
        },
        {
          sj: 0,
          name: "申请回收台卡"
        }
      ],
      indexnews: "2018/8/1 : 小鹿有哲有哲创业版代理上线了"
    };
  },
  components: { countTo }, //数字滚动组件
  methods: {
    handleSizeChange(val) {
      // this.$message('这是一条消息提示');
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.ajaxdata.pageSize = val;
      this.table();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.ajaxdata.pageNumber = (val - 1) * this.pageSize;
      this.table();
    },
    table() {
      console.log(this.$store.state.user);
      indextable(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
          console.log(response.data.total);
        })
        .catch(response => {
          console.log(response);
        });
    }
    //方法
  },
  mounted: function() {
    console.log(this.$route.query.id);

    this.ajaxdata.proxyId = this.$store.state.user.proxyId;
    this.table();
    //挂载结束状态
    let _json = {
      proxyId: 150
    };
    indexdata()
      .then(response => {
        console.log(response);
        let data = response.data.data;
        this.carditem[0].sj = data.allNumber; //台卡总数
        this.carditem[1].sj = data.oneHourOnlineCount; //在线
        this.carditem[2].sj = data.oneHourOfflineCount; //离线
        this.carditem[3].sj = data.unbindNumber; //未绑定
        this.waiting[0].sj = data.shopReviewCount; //待审核门店
        this.waiting[1].sj = data.installWaitCount; //待安装工单
        this.waiting[2].sj = data.maintainWaitCount; //待维护工单
        this.waiting[3].sj = data.cardRecoveryReviewCount; //待回收台卡
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.index {
  font-family: "微软雅黑";
  .indexbanner {
    width: 100%;
    height: 100%;
  }
  .el-carousel__container {
    border-radius: 6px;
    overflow: hidden;
  }
  .indextopleftcen {
    .indexcentre {
      margin-top: 35px;
      .grid-content {
        background: #fff;
        border-radius: 6px;
        height: 150px;
        padding: 10px;
        transition: All 0.4s;
        text-align: center;
        .el-col-10 {
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
      }
      .indexcjbnr:hover {
        transform: scale(1.1);
        background-color: #4be2e1;
      }
    }
  }
  .indextop-right {
    .bg-purpledix {
      background-color: #fff;
      height: 250px;
      overflow: hidden;
      border-radius: 6px;

      .index-nuwstop {
        height: 50px;
        border-bottom: 1px solid #e8f2f3;
        line-height: 50px;
        padding: 0px 0px 0px 20px;
        font-size: 16px;
      }

      .gonggaotext {
        padding: 25px;
        line-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        font-size: 14px;
        color: #676a6c;
      }
    }
    .bg-purple-lightdiv {
      background-color: #fff;
      height: 250px;
      overflow: hidden;
      border-radius: 6px;
      .index-nuwstop {
        height: 50px;
        border-bottom: 1px solid #e8f2f3;
        line-height: 50px;
        padding: 0px 0px 0px 20px;
        font-size: 16px;
      }
      .gonggaotext {
        padding: 25px;
        line-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        font-size: 14px;
        color: #676a6c;
        .indexkefu {
          width: 80px;
          margin-top: 10px;
        }
        .cjbindex-right1 {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .cjbindex-right2 {
          font-size: 12px;
          padding: 5px;
          background-color: #00cccb;
          margin-right: 10px;
          color: #fff;
          border-radius: 6px;
        }
      }
    }
  }
  .indexztitle {
    text-align: center;
    margin-top: 40px;
    font-size: 20px;
    font-weight: bold;
    color: #000;
  }
  .indexztitle1 {
    text-align: center;
    margin-top: 15px;
    font-size: 12px;
    color: #676a6c;
  }
  .taikazonglna {
    background: #fff;
    height: 200px;
    border-radius: 6px;
    margin-top: 40px;
  }
  .listboxtop {
    height: 50px;
    border-bottom: 1px solid #e8f2f3;
    line-height: 50px;
    padding: 0px 0px 0px 20px;
    font-size: 16px;
  }
  .listboxcon {
    color: #676a6c;
    padding-top: 35px;
    text-align: center;
    .inxajaxsj {
      font-size: 28px;
      font-weight: bold;
      color: #000;
    }
    .ajaxsjbt {
      margin-top: 20px;
      font-size: 14px;
    }
  }
  .indextable {
    margin-top: 40px;
    border-radius: 6px;
    overflow: hidden;
    height: 440px;
    background-color: #fff;
    .listtable {
      padding: 5px 15px 0px 15px;
      text-align: center;
      .cell {
        text-align: center;
      }
    }
  }
}
</style>
