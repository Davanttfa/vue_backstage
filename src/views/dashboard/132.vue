<template> 
  <div>
  <el-upload  
    list-type="picture-card"  
    :show-file-list="false"
      action="''" 
    :http-request="upload" 
      > 
      <img  :src="imageUrl" class="avatar">
        <i class="el-icon-plus"></i> 
        </el-upload>   
        <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
       format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
       @change=add
      :picker-options="pickerOptions1">
    </el-date-picker>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  </el-form>
  </div>
  <el-progress type="circle" :percentage="80" color="#8e71c7"></el-progress>
  
  </div>
</template> 


<script>
import OSS from "ali-oss";
let client = new OSS({
  region: "oss-cn-shenzhen",
  accessKeyId: "LTAIfjM2dpD75eWK",
  accessKeySecret: "FO9SoLj70c3IdOXpAakczkqBoY08uU",
  bucket: "sjwladverttest"
});
export default {
  name: "imgUpload",
  data() {
    return {
       ruleForm: {
          name: ''
          },
       rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
          },
      pickerOptions1: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
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
      value2: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      upimgurl: "",
      imageUrl: ""
    };
  },
  methods: {
    // 上传图片成功
    // upload(item) {
    //   var client = new OSS({
    //     region: "http://oss-cn-shenzhen.aliyuncs.com",
    //     accessKeyId: "LTAIfjM2dpD75eWK",
    //     accessKeySecret: "FO9SoLj70c3IdOXpAakczkqBoY08uU",
    //     bucket: "sjwladverttest"
    //   });
    //   const storeAs = "your_routte" + item.file.name;
    //   console.log(item.file.name);

    //   client
    //     .multipartUpload(storeAs, item.file, {})
    //     .then(results => {
    //       //console.log(results)
    //       if (results.res.requestUrls[0].indexOf("?") != -1) {
    //         this.url = results.res.requestUrls[0].split("?")[0];
    //       } else {
    //         //console.log('图片100k以内')
    //         this.url = results.res.requestUrls[0];
    //       }
    //       Toast("头像上传成功");
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
    add() {
      alert(this.value2);
    },
    imgupG(url) {
      this.upimgurl = url;
      this.imageUrl = url;
    },
    upload(file) {
      const isJPG = file.file.type === "image/jpeg" || "image/png";
      // console.log(file.file.type);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return;
      } else {
        var fileName = file.file.name;
        client
          .put("shop1/" + fileName, file.file) //文件名需要修改路径
          .then(result => {
            if (result.res.status == 200) {
              this.imgupG(result.url);
              console.log(this.imageUrl);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
img {
  width: 100%;
}
</style>
