<template>
  <el-dialog
    v-model="dialogShow"
    title="请编辑该条博客"
    width="450px"
  >
    <div style="display: flex">
      <span>
        标题：
      </span>
      <span>
        <el-input
          v-model="editTitle1"
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
        v-model="editContent1"
        :rows="3"
        type="textarea"
        placeholder="请输入博客内容"
        input-style="display: inline-block; width: 360px"
      />
    </span>
  </div>
  <template #footer>
    <span class="dialog-footer">
      <!-- @click="dialogVisible = false" -->
      <el-button @click="$emit('cancel')">取消</el-button>
      <!-- @click="sumBit" -->
      <el-button
        type="primary"
        @click="$emit('sumBit')"
      >
        提交
      </el-button>
    </span>
  </template>
  </el-dialog>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'list-modal',
  props: {
    dialogVisible: Boolean,
    editTitle: String,
    editContent: String,
  },
  data() {
    return {
      dialogVisible1: this.dialogVisible,
      editTitle1: this.editTitle,
      editContent1: this.editContent
    }
  },
  setup() {
    const dialogShow = computed({
        get: () => this.dialogVisible,
        set: val => $emit('update:dialogVisible', val)
    })

    return {
      dialogShow
    }
  }
  // updated() {
  //   console.log('this.dialogVisible', this.dialogVisible)
  //   console.log('dialogVisible1', this.dialogVisible1)
  // }
}
</script>

<style>

</style>