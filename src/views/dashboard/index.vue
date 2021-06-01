<template>
  <div>
      <el-button  class="filter-item" type="primary" icon="el-icon-download" @click="exportExcel"></el-button>
  <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  <el-table
    id="table"
    boder
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
     :default-sort = "{prop: 'date', order: 'descending'}"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
     prop="bindTime"
      label="日期"
      sortable
      width="120">
      <template slot-scope="scope" ><div  :data-id=scope.row.id >{{ scope.row.bindTime| dateformat('YYYY-MM-DD') }}</div></template>
    </el-table-column>
    <el-table-column
      prop="cardId"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopId"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNumbercs"
      :page-sizes="pageSizesList"
      :page-size="ajaxdata.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
        :total="totalDataNumber">
    </el-pagination>
  </div>
  </div>

</template>


<script>
import { indexsj, paging, del } from "@/api/api";
import FileSaver from 'file-saver'
// import store from '@/store/index'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      pageNumbercs: 0,
      pageSize: 10,
      pageSizesList: [10, 15, 20, 30, 50],
      totalDataNumber: 10,
      ajaxdata: {
        if: 0,
        pageSize: 10,
        pageNumber: 0
      },
      pagingdata: {
        if: 0
      },
      tableData3: [],
      multipleSelection: []
    };
  },

  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    exportExcel () {//到处exportExcel
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '猪八戒.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     },
    handleDelete(index, row) {
      // console.log(index, row);
      this.tableData3.splice(index, 1);
      let _json = {
        id: row.id,
      };
      del(_json)
        .then(response => {
          console.log(response);
          this.$message({
            message: "删除成功",
            type: "success"
          });
        })
        .catch(response => {
          console.log(response);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      console.log(this.$store.state.user);
      
      indexsj(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.data;
          console.log(response.data.data);
        })
        .catch(response => {
          console.log(response);
        });
      paging(this.pagingdata)
        .then(response => {
          console.log(response.data.data);
          this.totalDataNumber = response.data.data;
        })
        .catch(response => {
          console.log(response);

        });
    }
  },
  mounted: function() {
    this.table();
  }
};
</script>
