<template>
  <div style="width: 100%">
    <!-- <div v-for="(data, index) in blogList" :key="index">
      <p>标题：{{data.title}}</p>
      <p>内容：{{data.content}}</p>
    </div> -->
    <el-table
      stripe
      border
      fit
      :data="blogList"
      style="width: 100%">
      <el-table-column
        prop="createtime"
        label="创建日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
      >
      </el-table-column>
      <el-table-column
        label="编辑"
        width="180">
        <template #default="scope">
          <el-button
            size="default"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="请编辑该条博客"
      width="30%"
    >
      <el-input
        v-model="editTitle"
        :rows="1"
        type="textarea"
        placeholder="请输入博客标题"
      />
      <el-input
        v-model="editContent"
        :rows="3"
        type="textarea"
        placeholder="请输入博客内容"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="sumBit"
          >
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import {  ref } from 'vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import {  ElMessage } from 'element-plus'

export default {
  setup() {
    const blogList = ref([])
    const dialogVisible = ref(false)
    const editContent = ref('')
    const editTitle = ref('')
    const editId = ref('')

    const store = useStore()

    const getHMS = (timestamp) => {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '/';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    
      var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
      var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
      return Y + M + D + h + m + s;
    }

    const handleEdit = (index, row) => {
      editContent.value = row.content
      editTitle.value = row.title
      dialogVisible.value = true
      editId.value = row.id
    }

    const sumBit = () => {
      axios.post(`http://localhost:8000/api/blog/update?id=${editId.value}`, {
        title: editTitle.value,
        content: editContent.value,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(json => {
        return json.data
      }).then(resObj => {
        if (resObj.errno === 0) {
          ElMessage({
            message: '编辑更新成功',
            type: 'success',
          })
          getList()
        } else {
          ElMessage({
            message: resObj.message,
            type: 'warning',
          })
        }
      })
      dialogVisible.value = false
    }

    // 获取列表数据
    const getList = () => {
      if (store.state.username) {
        let query = {
          author: store.state.username,
        }
        axios.get(`http://localhost:8000/api/blog/list?author=${query.author}`).then(json => {
          return json.data
        }).then(res => {
          if (res.errno === 0) {
            blogList.value = res.data.map(n => {
              return {
                ...n,
                createtime: getHMS(n.createtime)
              }
            }
            )
          }
        })
      }
    }

    onMounted(() => {
      getList()
    });

    return {
      blogList,
      handleEdit,
      dialogVisible,
      editContent,
      sumBit,
      editTitle,
    }
  }
}
</script>

<style>

</style>