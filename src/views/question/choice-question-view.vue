<template>
  <div class="className">
    <el-card class="anoCard">
      <div slot="header">
        <span>查看选择题</span>
      </div>
      <div class="searchDiv">
        <el-input
          type="text"
          placeholder="请输入题干"
          class="width1"
          v-model="searchDescription"
        ></el-input>

        <el-date-picker
          class="width1"
          v-model="searchDate"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addTab">添加</el-button
        >
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="序号" align="center" width="65" :index="indexMethod"></el-table-column>
        <el-table-column prop="userName" label="上传人"></el-table-column>
        <el-table-column prop="description" label="题干" width="300"></el-table-column>
        <el-table-column prop="optionA" label="选项A"></el-table-column>
        <el-table-column prop="optionB" label="选项B"></el-table-column>
        <el-table-column prop="optionC" label="选项C"></el-table-column>
        <el-table-column prop="optionD" label="选项D"></el-table-column>
        <el-table-column prop="answer" label="答案"></el-table-column>
        <el-table-column prop="point" label="分值"></el-table-column>
        <el-table-column prop="createTime" label="上传时间" width="100"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="edit(scope.$index, scope.row)"
              >编辑</el-button
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

    <el-dialog :title="dialogTitle" :visible="diaIsShow" class="diaForm">
      <el-form
          ref="diaForm"
          :model="choiceQuestionData"
          label-width="140px"
      >
        <el-form-item label="题干">
          <el-input
              type="text"
              v-model="choiceQuestionData.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项A">
          <el-input
              type="text"
              v-model="choiceQuestionData.optionA"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项B">
          <el-input
              type="text"
              v-model="choiceQuestionData.optionB"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input
              type="text"
              v-model="choiceQuestionData.optionC"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input
              type="text"
              v-model="choiceQuestionData.optionD"
          ></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="status">
          <el-select v-model="choiceQuestionData.answer" placeholde="请选择选项">
            <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value"
                :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分值">
          <el-input
              type="text"
              placeholder="请输入分值（1-100）"
              v-model="choiceQuestionData.point"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addOrEdit()"
          >确认</el-button
          >
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import API from '@/api'
export default {
  data() {
    return {
      tableData: [],
      allList: [],
      searchDescription: '',
      searchDate: '',
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      diaIsShow: false,
      choiceQuestionData: {},
      editType: '',
      rowIndex: 0,
      options: [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'D', value: 'D' }
      ],
      dialogTitle: ''
    }
  },
  created() {
  },
  mounted() {
    this.getAllChoiceQuestionData()
  },
  methods: {
    async getAllChoiceQuestionData() {
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      let response = await API.question.getChoiceQuestionList(params)
      if (response.status === 200) {
        this.tableData = response.data
        this.total = response.data.count
      }
    },

    async search() {
      if (this.searchDescription) {
        let response = await API.question.queryChoiceQuestionByDescription({ description: this.searchDescription });
        if (response.status === 200) {
          this.tableData = response.data;
        }
      } else {
        this.getAllChoiceQuestionData()
      }
    },
    addOrEdit() {
      if (this.dialogTitle === '新增试题') {
        this.addChoiceQuestion()
      } else {
        this.editChoiceQuestion()
      }
    },
    async addChoiceQuestion() {
      Object.keys(this.choiceQuestionData).forEach((key) => {
        if (typeof(this.choiceQuestionData[key]) == "undefined") {
          this.$message.error('请填写完整')
          return
        }
      })
      let response = await API.question.addChoiceQuestion({choiceQuestionData: JSON.stringify(this.choiceQuestionData)})
      if (response.status === 200) {
        this.diaIsShow = false
        this.$message.success('添加成功')
        this.getAllChoiceQuestionData()
      } else {
        this.$message.error(response.msg)
      }
    },

    async editChoiceQuestion() {
      Object.keys(this.choiceQuestionData).forEach((key) => {
        if (typeof(this.choiceQuestionData[key]) == "undefined") {
          this.$message.error('请填写完整')
          return
        }
      })
      let response = await API.question.editChoiceQuestion({choiceQuestionData: JSON.stringify(this.choiceQuestionData)})
      if (response.status === 200) {
        this.$message.success('编辑成功')
        this.getAllChoiceQuestionData()
        this.diaIsShow = false
      } else {
        this.$message.error(response.msg)
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
    },

    // add
    addTab() {
      this.dialogTitle = '新增试题'
      this.choiceQuestionData = {}
      this.diaIsShow = true
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
      })
    },
    edit(index, data) {
      this.dialogTitle = '编辑试题'
      this.choiceQuestionData = data
      this.diaIsShow = true
      this.$nextTick(() => {
        this.$refs.diaForm.clearValidate()
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
