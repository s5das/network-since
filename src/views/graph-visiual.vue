<template>
  <div class="head"></div>

  <div class="form">
    <div class="type">
      <div
        class="item"
        v-for="item in type"
        :key="item"
        :class="{ select: item == ruleForm.type }"
        @click="chose(item)"
      >
        {{ item }}
      </div>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <div class="data">
        <div v-show="ruleForm.type == 'input'">
          <div class="graph-data">
            <el-form-item label="Graph Type" prop="graph_type">
              <el-select v-model="ruleForm.graph_type" placeholder="graph_type">
                <el-option label="graph" value="graph" />
                <el-option label="digraph" value="digraph" />
                <el-option label="multigraph" value="multigraph" />
                <el-option label="multidigraph" value="multidigraph" />
              </el-select>
            </el-form-item>
            <el-form-item label="Weighted" prop="weighted">
              <el-switch v-model="ruleForm.weighted" />
            </el-form-item>

            <el-form-item label="Edge List" prop="edge_list">
              <el-input v-model="ruleForm.edge_list" type="textarea" rows="5" />
            </el-form-item>
          </div>
        </div>

        <div v-show="ruleForm.type == 'file'">
          <div class="graph-data">
            <el-form-item label="Graph Type" prop="graph_type">
              <el-select v-model="ruleForm.graph_type" placeholder="graph_type">
                <el-option label="graph" value="graph" />
                <el-option label="digraph" value="digraph" />
                <el-option label="multigraph" value="multigraph" />
                <el-option label="multidigraph" value="multidigraph" />
              </el-select>
            </el-form-item>
            <el-form-item label="Weighted" prop="weighted">
              <el-switch v-model="ruleForm.weighted" />
            </el-form-item>
            <el-upload
              class="upload-demo"
              drag
              :on-change="change_file"
              show-file-list
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :auto-upload="false"
              :limit="1"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
            </el-upload>
          </div>
        </div>

        <div v-show="ruleForm.type == 'example'">
          <div class="graph-data">
            <el-form-item label="Name" prop="name">
              <el-select v-model="ruleForm.name" placeholder="graph_type">
                <el-option label="les_miserables" value="les_miserables" />
                <el-option
                  label="davis_southern_women"
                  value="davis_southern_women"
                />
                <el-option
                  label="florentine_families"
                  value="florentine_families"
                />
                <el-option label="karate_club" value="karate_club" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div v-show="ruleForm.type == 'generate'">
          <div class="graph-data">
            <el-form-item label="n" prop="n">
              <el-input v-model="ruleForm.n" style="width: 10vw" />
            </el-form-item>
            <el-form-item label="k" prop="k">
              <el-input v-model="ruleForm.k" style="width: 10vw" />
            </el-form-item>
            <el-form-item label="p" prop="p">
              <el-input v-model="ruleForm.p" style="width: 10vw" />
            </el-form-item>
            <el-form-item label="seed" prop="seed">
              <el-input v-model="ruleForm.seed" style="width: 10vw" />
            </el-form-item>
          </div>
        </div>

        <div class="config">
          <el-form-item label="Layout" prop="layout">
            <el-select v-model="ruleForm.layout" placeholder="layout">
              <el-option label="spring" value="spring" />
              <el-option label="random" value="random" />
            </el-select>
          </el-form-item>
          <el-form-item label="Methods" prop="methods">
            <el-checkbox-group v-model="ruleForm.methods">
              <el-checkbox label="greedy_modularity_maximization" name="type" />
              <el-checkbox label="louvain_community_detection" name="type" />
              <el-checkbox label="label_propagation" name="type" />
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
      <div class="button">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Generate
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
  <div v-if="show" class="show-area">
    <div class="pic" v-for="(item, index) in url1" :key="item">
      <div class="content-des">
        <div class="content">coverage:{{ coverage[index] }}</div>
        <div class="content">method:{{ method[index] }}</div>
        <div class="content">modularity:{{ modularity[index] }}</div>
      </div>
      <img :src="url1[index]" class="pic_item" @click="download(url1[index])"/>
      <img :src="url2[index]" class="pic_item" @click="download(url2[index])"/>

    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { getgraph } from "../http/api/graph";
import  download from '../utils/download'
const chose = (item) => {
  ruleForm.type = item;
};



const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  type: "input",
  methods: [],
  layout: "",
  graph_type: "",
  weighted: false,
  edge_list: "",
  name: "",
  n: 10,
  k: 5,
  p: 0.2,
  seed: 123,
  file: "",
});

let type = reactive(["input", "file", "example", "generate"]);

let file = ''
const change_file = (res) => {
  file = res.raw
};

const get_url = (svgstr) => {
  var svg = new Blob([svgstr], {
    type: "image/svg+xml;charset=utf-8",
  });
  var DOMURL = self.URL || self.webkitURL || self;
  return DOMURL.createObjectURL(svg);
};

let url1 = reactive([]);
let url2 = reactive([]);
let coverage = reactive([]);
let method = reactive([]);
let modularity = reactive([]);
let show = ref(false);
const submitForm = () => {
  // ElNotification({
  //   title: "上传成功",
  // });
  let graph_data = {};
  let config = {};
  console.log(ruleForm.type);
  if (ruleForm.type == "input") {
    graph_data.graph_type = ruleForm.graph_type;
    graph_data.weighted = ruleForm.weighted;
    graph_data.edge_list = [];
    let temp = ruleForm.edge_list.split("\n");
    temp.forEach((element) => {
      let a = element.split(" ");
      for (let i = 0; i < a.length; i++) {
        a[i] = parseInt(a[i]);
      }
      graph_data.edge_list.push(a);
    });
    config.methods = ruleForm.methods;
    config.layout = ruleForm.layout;
    let formData = new FormData();
    formData.append("config", JSON.stringify(config) );
    formData.append("type", ruleForm.type);
    formData.append("graph_data",JSON.stringify(graph_data));
    getgraph(formData).then((res) => {
      console.log(res);
      url1.splice(0, url1.length);
      url2.splice(0, url2.length);
      coverage.splice(0, coverage.length);
      method.splice(0, method.length);
      modularity.splice(0, modularity.length);
      for (let i = 0; i < res.data.results.length; i++) {
        url1.push(get_url(res.data.results[i].graph_viz));
        url2.push(get_url(res.data.results[i].size_distribution));
        coverage.push(res.data.results[i].coverage);
        method.push(res.data.results[i].method);
        modularity.push(res.data.results[i].modularity);
      }
      show.value = true;
    });
  } else if (ruleForm.type == "file") {
    graph_data.graph_type = ruleForm.graph_type;
    graph_data.weighted = ruleForm.weighted;

    config.methods = ruleForm.methods;
    config.layout = ruleForm.layout;
    let formData = new FormData();
    formData.append("config", JSON.stringify(config) );
    formData.append("type", ruleForm.type);
    formData.append("graph_data",JSON.stringify(graph_data));
    formData.append("edge_list",file)
    getgraph(formData).then((res) => {

      url1.splice(0, url1.length);
      url2.splice(0, url2.length);
      coverage.splice(0, coverage.length);
      method.splice(0, method.length);
      modularity.splice(0, modularity.length);
      for (let i = 0; i < res.data.results.length; i++) {
        url1.push(get_url(res.data.results[i].graph_viz));
        url2.push(get_url(res.data.results[i].size_distribution));
        coverage.push(res.data.results[i].coverage);
        method.push(res.data.results[i].method);
        modularity.push(res.data.results[i].modularity);
      }
      show.value = true;
    });

  } else if (ruleForm.type == "example") {
    graph_data.name = ruleForm.name;
    config.methods = ruleForm.methods;
    config.layout = ruleForm.layout;
    let formData = new FormData();
    formData.append("config", JSON.stringify(config) );
    formData.append("type", ruleForm.type);
    formData.append("graph_data",JSON.stringify(graph_data));
    getgraph(formData).then((res) => {
      url1.splice(0, url1.length);
      url2.splice(0, url2.length);
      coverage.splice(0, coverage.length);
      method.splice(0, method.length);
      modularity.splice(0, modularity.length);
      for (let i = 0; i < res.data.results.length; i++) {
        url1.push(get_url(res.data.results[i].graph_viz));
        url2.push(get_url(res.data.results[i].size_distribution));
        coverage.push(res.data.results[i].coverage);
        method.push(res.data.results[i].method);
        modularity.push(res.data.results[i].modularity);
      }
      show.value = true;
    });
  } else if (ruleForm.type == "generate") {
    graph_data.n= ruleForm.n;
    graph_data.k= ruleForm.k;
    graph_data.p= ruleForm.p;
    graph_data.seed= ruleForm.seed;
    config.methods = ruleForm.methods;
    config.layout = ruleForm.layout;
    let formData = new FormData();
    formData.append("config", JSON.stringify(config) );
    formData.append("type", ruleForm.type);
    formData.append("graph_data",JSON.stringify(graph_data));
    getgraph(formData).then((res) => {
      url1.splice(0, url1.length);
      url2.splice(0, url2.length);
      coverage.splice(0, coverage.length);
      method.splice(0, method.length);
      modularity.splice(0, modularity.length);
      for (let i = 0; i < res.data.results.length; i++) {
        url1.push(get_url(res.data.results[i].graph_viz));
        url2.push(get_url(res.data.results[i].size_distribution));
        coverage.push(res.data.results[i].coverage);
        method.push(res.data.results[i].method);
        modularity.push(res.data.results[i].modularity);
      }
      show.value = true;
    });
  }
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

const select_edge = () => {};

const select_methods = () => {};
</script>

<style lang="less" scoped>
.head {
  height: 8vh;
}
.type {
  display: flex;
  .item {
    background-color: #2bb4d0;
    height: 4vh;
    width: 5vw;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-right: 1vw;
  }
  .item:hover {
    background-color: #02cdc9 !important ;
  }
  .select {
    background: #02cdc9 !important;
  }
}
.form {
  width: 80vw;
  margin: 5vh auto;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 2vh;
  box-shadow: 5px 5px 5px 5px #bbb;
  .type {
    height: 8vh;
  }
  .data {
    height: 35vh;
    display: flex;
    justify-content: space-around;
    .config {
      width: 25vw;
    }
    .graph-data {
      width: 45vw;
    }
  }
  .button {
    margin-top: 5vh;
    display: flex;
    justify-content: center;
  }
}
.pic {
  width: 80vw;
  margin: 0 auto;
  .pic_item {
    width: 35vw;
    height: 80vh;
    margin-right: 5vw;
    transition: 1s;
  }
  .pic_item:hover{
    transform: scale(1.1);
  }
  .content-des {

    font-weight: 600;
    width: 80vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .content{
      width: 20vw;
      height: 5vh;
      background-color: #02cdc9;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
