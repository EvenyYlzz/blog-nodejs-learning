<template>
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
</template>

<script>
export default {
  name: 'list-modal',
  props: {
    dialogVisible: Boolean,
    editTitle: String,
    editContent: String,
  },
}
</script>

<style>

</style>