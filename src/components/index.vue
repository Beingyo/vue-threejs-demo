<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="3":offset="2"><div class="grid-content bg-purple"><span id="demo" @click="routeLink">demo</span></div></el-col>
      <el-col :span="3":offset="1"><div class="grid-content bg-purple"><span id="test" @click="routeLink">test</span></div></el-col>
      <el-col :span="3":offset="1"><div class="grid-content bg-purple"><span id="" @click="routeLink">0</span></div></el-col>
      <el-col :span="3":offset="1"><div class="grid-content bg-purple"><span id="" @click="routeLink">0</span></div></el-col>
      <el-col :span="3":offset="1"><div class="grid-content bg-purple"><span id="" @click="routeLink">0</span></div></el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods: {
    routeLink(e) {
      this.$router.push({path:'/' + e.currentTarget.id})
    }
  },
  created() {
    this.$router.push({path:'/test' })
  }
}
</script>


<style lang="scss" scoped>
  span {
    line-height: 36px;
    cursor:pointer;
    color: #3a97fa;
  }
.el-row {
  margin: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #eaf0f5;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
