<template>
  <div class="head">
    <div class="title">网络可视化</div>
  </div>
  <div class="form">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Layout" prop="layout">
        <el-select v-model="ruleForm.layout" placeholder="layout">
          <el-option label="spring" value="spring" />
          <el-option label="random" value="random" />
        </el-select>
      </el-form-item>

      <el-form-item label="Graph Type" prop="graph_type">
        <el-select v-model="ruleForm.graph_type" placeholder="graph_type">
          <el-option label="graph" value="spring" />
          <el-option label="digraph" value="random" />
          <el-option label="multigraph" value="random" />
          <el-option label="multidigraph" value="random" />
        </el-select>
      </el-form-item>

      <el-form-item label="Methods" prop="methods">
        <el-checkbox-group v-model="ruleForm.methods">
          <el-checkbox label="greedy_modularity_maximization" name="type" />
          <el-checkbox label="louvain_community_detection" name="type" />
          <el-checkbox label="label_propagation" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Weighted" prop="weighted">
        <el-switch v-model="ruleForm.weighted" />
      </el-form-item>

      <el-form-item label="Edge List" prop="edge_list">
        <el-input v-model="ruleForm.edge_list" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Generate
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  methods: [],
  layout: "",
  graph_type: "",
  weighted: false,
  edge_list: "",
});

const rules = reactive({
  methods: [
    {
      type: "array",
      required: true,
      message: "Please select methods",
      trigger: "change",
    },
  ],
  layout: [
    {
      required: true,
      message: "Please select layout",
      trigger: "change",
    },
  ],
  graph_type: [
    {
      required: true,
      message: "Please select graph_type",
      trigger: "change",
    },
  ],
  edge_list: [
    {
      required: true,
      message: "Please select edge_list",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm);
      ElNotification({
        title: "上传成功",
        message: h("i", { style: "color: teal" }, "图片生成接口尚未完善"),
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>

<style lang="less" scoped>
.head {
  height: 7vh;
  background-color: #2f5496;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 1vw;
  .title {
    font-size: 4vh;
  }
}

.form {
  width: 80vw;
  margin: 5vh auto;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2vh;
  box-shadow: 5px 5px 5px 5px #bbb;
}
</style>
