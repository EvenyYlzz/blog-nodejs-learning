<template>
  <div style="width: 100%">
    <div style="position: absolute; right: 40px; top: 70px">
      <el-button
        size="default"
        @click="handleNew"
      >
        新建博客
      </el-button>
    </div>
    <list-table
      :blogList="blogList"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <el-dialog
      v-model="dialogVisible"
      title="请编辑该条博客"
      width="450px"
    >
      <div style="display: flex">
        <span>
          标题：
        </span>
        <span>
          <el-input
            v-model="editTitle"
            :rows="1"
            type="textarea"
            placeholder="请输入博客标题"
            input-style="display: inline-block; width: 360px"
          />
        </span>
      </div>
      <div style="display: flex">
      <span>
        内容：
      </span>
      <span>
        <el-input
        v-model="editContent"
        :rows="3"
        type="textarea"
        placeholder="请输入博客内容"
        input-style="display: inline-block; width: 360px"
      />
      </span>
    </div>
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
import { getHMS } from '../../utils/getHMS'
import {  ElMessage } from 'element-plus'
import ListTable from './ListTable'

export default {
  components: {
    ListTable,
  },
  setup() {
    const blogList = ref([])
    const dialogVisible = ref(false)
    const editContent = ref('')
    const editTitle = ref('')
    const editId = ref('')

    const store = useStore()

    // 点击新建打开
    const handleNew = () => {
      editContent.value = ''
      editTitle.value = ''
      editId.value = ''
      dialogVisible.value = true
    }

    // 点击编辑打开
    const handleEdit = (index, row) => {
      editContent.value = row.content
      editTitle.value = row.title
      editId.value = row.id
      dialogVisible.value = true
    }

    // 点击删除
    const handleDelete = (index, row) => {
      deleteBlog(row.id)
    }

    // 新建博客接口提交
    const newBlog = () => {
      axios.post('http://127.0.0.1:8000/api/blog/new', {
        title: editTitle.value,
        content: editContent.value,
        author: store.state.username,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(json => {
        return json.data
      }).then(resObj => {
        if (resObj.errno === 0) {
          ElMessage({
            message: '新建博客成功',
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
    }

    // 编辑博客接口提交
    const editBlog = () => {
      axios.post(`http://127.0.0.1:8000/api/blog/update?id=${editId.value}`, {
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
    }

    // 删除博客接口提交
    const deleteBlog = (delId) => {
      axios.post(`http://127.0.0.1:8000/api/blog/del?id=${delId}`, {
        author: store.state.username,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(json => {
        return json.data
      }).then(resObj => {
        if (resObj.errno === 0) {
          ElMessage({
            message: '删除成功',
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
    }

     // 获取列表数据
    const getList = () => {
      if (store.state.username) {
        let query = {
          author: store.state.username,
        }
        axios.get(`http://127.0.0.1:8000/api/blog/list?author=${query.author}`).then(json => {
          return json.data
        }).then(res => {
          if (res.errno === 0) {
            blogList.value = res.data.map(n => {
              return {
                ...n,
                createtime: getHMS(n.createtime),
                updatetime: getHMS(n.updatetime)
              }
            }
            )
          }
        })
      }
    }

    // 提交新建或编辑的博客
    const sumBit = () => {
      if (editId.value) {
        editBlog()
      } else {
        newBlog()
      }
      dialogVisible.value = false
    }

    onMounted(() => {
      getList()
    });

    return {
      blogList,
      dialogVisible,
      editTitle,
      editContent,
      handleNew,
      handleEdit,
      handleDelete,
      sumBit,
    }
  }
}
</script>

<style>

</style>