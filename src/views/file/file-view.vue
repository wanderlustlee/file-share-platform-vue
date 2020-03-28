<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>查看文件</span>
      </div>
      <div class="searchDiv">
        <el-input
          type="text"
          placeholder="请输入文件名（支持模糊查询）"
          class="width1"
          v-model="searchFileName"
        ></el-input>

        <el-date-picker
          class="width1"
          v-model="searchDate"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="序号" align="center" width="65" :index="indexMethod"></el-table-column>
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column prop="userName" label="上传人"></el-table-column>
        <el-table-column prop="createTime" label="上传时间" width="200"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-download"
              @click="download(scope.row.fileName)"
              >下载</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-s-order"
              @click="preview(scope.row.fileName)"
              >预览</el-button
            >
            <el-button
              type="danger"
              @click="toDelete(scope.row.fileName)"
              :disabled="scope.row.status !== 3 ? false : true"
              >取消</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page="pageIndex"
        :total="total"
        class="fyDiv"
        @size-change="handleSize"
        @current-change="handlePage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import API from '@/api'
export default {
  data() {
    return {
      tableData: [],
      allList: [],
      searchFileName: '',
      searchDate: '',
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      rowIndex: 0,
    }
  },
  created() {
  },
  mounted() {
    this.getFileData()
  },
  methods: {
    async getFileData() {
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      let response = await API.file.getFileList(params)
      if (response.status === 200) {
        this.tableData = response.data.fileVoList
        this.total = response.data.count
      }
    },
    async download(fileName) {
      let params = {
        fileName: fileName,
        type: 'file'
      }
      let response = await API.file.getDownloadUrl(params);
      if (response.status === 200) {
        let downloadUrl = process.env.VUE_APP_BASE_API + response.data + '?type=file'
        window.open(downloadUrl)
      }

    },
    preview(fileName) {
      let kkPreviewUrl = 'http://127.0.0.1:8012/onlinePreview?url='
      let previewUrl = 'http://10.12.65.93:8888/file/preview/' + fileName + '?type=file'
      window.open(kkPreviewUrl + encodeURIComponent(previewUrl));

    },
    async search() {
      if (this.searchFileName) {
        let response = await API.file.queryByFileName({ fileName: this.searchFileName });
        if (response.status === 200) {
          this.tableData = response.data;
        }
      } else {
        this.getFileData()
      }
    },
    // 自增序列号
    indexMethod (val) {
      return val + 1 + (this.pageSize * (this.pageIndex - 1))
    },
    handleSize(val) {
      this.pageSize = val
      this.getFileData()
    },
    handlePage(val) {
      this.pageIndex = val
      this.getFileData()
    }
  }
}
</script>
<style lang="scss" scoped>
.fyDiv {
  float: right;
  margin-top: 30px;
  padding-bottom: 20px;
}
.anoCard .el-table .el-button {
  padding: 8px 18px;
  font-size: 12px;
}
.searchDiv {
  margin-bottom: 20px;
  .el-button {
    padding: 11px 20px;
  }
}
.width1 {
  width: 300px;
  margin-right: 10px;
}
.diaForm {
  .el-input {
    width: 350px;
  }
}
</style>
<style lang="scss">
.anoCard {
  .el-card__body:after {
    content: '';
    clear: both;
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
  }
}
.diaForm .el-form-item__label {
  padding-right: 20px;
}
.searchDiv [class^='el-icon'] {
  color: #fff;
}
</style>
