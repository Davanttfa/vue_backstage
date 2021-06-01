<template>
  <div class="cdlbox shopindex">
    <div class="shopindexbanner">
      <img :src="shopbanner" alt="">
    </div>
    <div class="shopindexewm">
      <el-row style="width:900px;margin: auto;">
        <el-col :span="10">
          <div class="grid-content bg-purple grid-content1">
            <div class="qrcode">
              <div id="qrcode"></div>
            </div>
            <div class='buttonbox'>
              <button class="dowerweima" @click="savePic()">下载二维码</button>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple-light copyljboxtight">
            <div class="copyljbox">
              <div id="yonghuname">
                业务员:{{$store.state.user.account}}
              </div>
              <div style="font-size: 16px;">我的二维码及邀请链接</div>
              <input id="copyurl" class="inputerweima" type="text" :value="qdcodeurl">
            </div>
            <div class='buttonbox2' style="margin-top:20px">
              <button class="dowerweima" v-clipboard:copy="qdcodeurl" v-clipboard:success="onCopy" v-clipboard:error="onError">
                复制链接
              </button>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="shopindextablebox">
      <div class="ADOrdDet_head">
        <img style="width: 20px;margin-right: 10px;vertical-align: middle;" :src="tableicon" alt="">
             邀请列表
             <div class="zglht1-but lyzg2-btn" style="float: right;">
             </div>
      </div>
      <div class="shopindextable">
        <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column type="index" label="序号" width="50px">
          </el-table-column>
          <el-table-column prop="shopId" label="门店ID" width="70">
          </el-table-column>
          <el-table-column prop="name" label="登录账号">
          </el-table-column>
          <el-table-column prop="operateUserName" label="邀请人">
          </el-table-column>
          <el-table-column prop="enterTime" label="入驻时间">
            <template slot-scope="scope">
              <div :data-id=scope.row.enterTime>{{ scope.row.enterTime| dateformat('YYYY-MM-DD') }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="reviewStatus" label="审核状态">
          </el-table-column>
          <el-table-column prop="contact" label="联系人">
          </el-table-column>
          <el-table-column prop="address" label="门店地址">
          </el-table-column>
          <el-table-column prop="phone" label="电话">
          </el-table-column>
          <el-table-column prop="cardNumber" label="申请台卡书">
          </el-table-column>
          <el-table-column prop="bindCardNumber" label="已绑定数量">
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <div>
                <span class="caozuo" @click="shopurlClick(scope.row.shopId)">补充门店信息</span>
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
  </div>
</template>

<script>
import { indextable, shopindextable } from "@/api/api";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
       pageNumbercs: 0,//初始页码
      pageSize: 10,//初始分页数量
      pageSizesList: [10, 15, 20, 30, 50],//一页多少数据
      totalDataNumber: 0,//总数据
      ajaxdata: {// 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0
      },
      tableData3: [],
      shopbanner: "../../src/img/shopbanner.png",
      tableicon: "../../src/img/yaoqing.png",
      usename: "",
      qdcodeurl:
        "http://service.deeryz.com/rster/inviting-partners.html?proxyId=" +
        this.$store.state.user.proxyId +
        "&type=2"
    };
  },
  components: {
    QRCode: QRCode
  },
  methods: {
    //方法
    shopurlClick(id) {
      console.log("zglht2-ckxx.html?id=" + id);
      this.$router.push("/?id=" + id);
    },
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
      shopindextable(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(response => {
          console.log(response);
        });
    },
    savePic() {
      //找到canvas标签
      let myCanvas = document
        .getElementById("qrcode")
        .getElementsByTagName("canvas");
      //创建一个a标签节点
      let a = document.createElement("a");
      //设置a标签的href属性（将canvas变成png图片）
      a.href = myCanvas[0]
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      //设置下载文件的名字
      a.download = "邀请二维码.png";
      //点击
      a.click();
      //弹出提示
      this.$notify({
        title: "成功",
        message: "成功进行下载保存",
        type: "success"
      });
    },
    onCopy: function(e) {
      this.$notify({
        title: "成功",
        message: "复制成功",
        type: "success"
      });
    },
    onError: function(e) {
      this.$notify.error({
        title: "错误",
        message: "当前不支持复制功能"
      });
    },
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 180,
        height: 180, // 高度
        text: this.qdcodeurl // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
      console.log(qrcode);
    }
  },
  mounted: function() {
    //挂载结束状态
    this.qrcode();
    this.table();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.shopindex {
  .shopindexbanner {
    background: #fff;
    img {
      width: 100%;
    }
  }
  .shopindexewm {
    height: 330px;
    background: #fff;
  }
}
.qrcode {
  height: 230px;
}
.copyljbox {
  height: 230px;
  padding-top: 20px;
}
.buttonbox {
  text-align: center;
}
.buttonbox2 {
  text-align: left;
}
.copyljboxtight {
  text-align: left;
  padding-left: 20px;
}
.dowerweima {
  display: inline-block;
  line-height: 40px;
  width: 130px;
  height: 40px;
  border-radius: 22px;
  color: #fff;
  border: none;
  font-size: 14px;
  background: -webkit-linear-gradient(100deg, #49e6be, #00cccb);
  background: -o-linear-gradient(100deg, #49e6be, #00cccb);
  background: -moz-linear-gradient(100deg, #49e6be, #00cccb);
  background: linear-gradient(100deg, #49e6be, #00cccb);
  box-shadow: 0 5px 15px rgba(117, 205, 205, 0.7);
  margin: 20px auto 0px;
}
#yonghuname {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 70px;
  font-size: 26px;
  font-weight: bold;
  padding-top: 35px;
  margin-bottom: 35px;
}
.inputerweima {
  height: 35px;
  width: 320px;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #e8f2f3;
  margin-top: 5px;
  padding-left: 5px;
  font-size: 14px;
  margin-bottom: 0;
  outline: 0;
  margin-top: 40px;
  margin-bottom: 58px;
  font-weight: 700;
}
button {
  outline: none;
  cursor: pointer;
}
.qrcode {
  padding: 20px;
  border-radius: 22px;
  border: 2px #e8f2f3 solid;
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 230px;
  height: 225px;
  margin: 20px auto 0px;
}
.grid-content1 {
  text-align: center;
}
#qrcode {
  text-align: center;
  img {
    margin: auto;
  }
}
.shopindextablebox {
  // text-align: center;
  margin-top: 20px;
  background: #fff;
  min-height: 300px;
  padding: 0px 15px 10px 15px;
  .ADOrdDet_head {
    height: 50px;
    line-height: 50px;
  }
  .cell {
    text-align: center;
  }
}
</style>
