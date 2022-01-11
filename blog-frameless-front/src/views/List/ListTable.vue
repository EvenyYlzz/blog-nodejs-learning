<template>
  <el-table
    stripe
    border
    fit
    :data="blogList"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="博客ID"
      width="90">
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
      prop="createtime"
      label="创建日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="updatetime"
      label="更新日期"
      width="180">
    </el-table-column>
    <el-table-column
      label="编辑"
      width="180">
      <template #default="scope">
        <el-button
          type="primary"
          @click="$emit('edit', scope.$index, scope.row)"
        >
          编辑
        </el-button>
        <el-popconfirm
          confirm-button-text="是"
          cancel-button-text="否"
          @confirm="$emit('delete', scope.$index, scope.row)"
          title="确认要删除该条博客吗？"
        >
          <template #reference>
            <el-button type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name: 'list-table',
  props: {
    blogList: Array
  },
}

</script>

<style>

</style>