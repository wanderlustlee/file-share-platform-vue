<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>复杂操作表格</span>
      </div>
      <div class="searchDiv">
        <el-input
          type="text"
          placeholder="请输入文件名"
          class="width1"
          v-model="sch_order"
        ></el-input>

        <el-date-picker
          class="width1"
          v-model="sch_date"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="searchTab()"
          >搜索</el-button
        >
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="序号" width="60"></el-table-column>
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column prop="userId" label="上传人"></el-table-column>
        <el-table-column prop="createTime" label="上传时间"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="download(scope.fileName)"
              >下载</el-button
            >
            <el-button
              type="warning"
              @click="preview(scope.fileName)"
              >预览</el-button
            >
            <el-button
              type="danger"
              @click="toDelete(scope.fileName)"
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
        :current-page="currentPage"
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
import { getPageTab2 } from '@/api/table'
import API from '@/api'
export default {
  data() {
    return {
      tableData: [],
      allList: [],
      schArr: [],
      sch_order: '',
      sch_status: null,
      sch_date: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      formData: {},
      editType: '',
      options: [
        { label: '待审核', value: 1 },
        { label: '配送中', value: 2 },
        { label: '已完成', value: 0 },
        { label: '已取消', value: 3 }
      ],
      rowIndex: 0,
    }
  },
  created() {
  },
  filters: {
    statusText(val) {
      if (val === undefined) return
      if (val === 0) {
        return '已完成'
      } else if (val === 1) {
        return '待审核'
      } else if (val === 2) {
        return '配送中'
      } else {
        return '已取消'
      }
    },
    tagClass(val) {
      if (val === undefined) return
      if (val === 0) {
        return 'success'
      } else if (val === 1) {
        return 'info'
      } else if (val === 2) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  mounted() {
    this.getFileData()
  },
  methods: {
    async getFileData() {
      let response = await API.file.getFileList()
      if (response.status === 200) {
        this.tableData = response.data
      }
    },
    async download(fileName) {
      let response = await API.file.getDownloadUrl({ fileName: fileName })
      if (response.status === 200) {
        let downloadUrl = process.env.VUE_APP_BASE_API + response.data
        window.open(downloadUrl)
      }

    },
    async preview() {

    },
    handleSize(val) {
      this.pageSize = val
      this.getPageData()
    },
    handlePage(val) {
      this.currentPage = val
      this.getPageData()
    },
    getPageData() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = start + this.pageSize
      this.tableData = this.schArr.slice(start, end)
    },
    // 查找
    searchTab() {
      let arrList = []
      for (let item of this.allList) {
        if (
          this.sch_order.trim() === '' &&
          this.sch_status === null &&
          this.sch_date === null
        ) {
          arrList = this.allList
          break
        } else if (
          item.order.startsWith(this.sch_order) &&
          (this.sch_status !== null ? item.status === this.sch_status : true) &&
          (this.sch_date !== null ? item.time.startsWith(this.sch_date) : true)
        ) {
          let obj = Object.assign({}, item)
          arrList.push(obj)
        }
      }
      this.schArr = arrList
      this.total = arrList.length
      this.currentPage = 1
      this.pageSize = 10
      this.getPageData()
    },
    // 取消
    toDelete(row) {
      row.status = 3
      this.$notify({
        title: '成功',
        message: '已取消该订单',
        type: 'success'
      })
    },
    changeTab(form, type) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (type === 'update') {
            // 改变整个表格数据
            let start = (this.currentPage - 1) * this.pageSize
            this.allList[start + this.rowIndex] = Object.assign(
              {},
              this.formData
            )
            // 解决数组不能通过索引响应数据变化
            this.$set(
              this.tableData,
              this.rowIndex,
              Object.assign({}, this.formData)
            )
            this.$notify({
              title: '成功',
              message: '订单已修改成功',
              type: 'success'
            })
          } else {
            this.tableData.unshift(Object.assign({}, this.formData))
            this.allList.push(Object.assign({}, this.formData))
          }
          this.diaIsShow = false
        } else {
          return
        }
      })
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
  width: 180px;
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
