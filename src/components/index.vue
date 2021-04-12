<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="3" :offset="2"><div class="grid-content bg-purple"><span id="demo" @click="routeLink">示例</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo1" @click="routeLink">阴影效果</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo2" @click="routeLink">线条绘制</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo3" @click="routeLink">坐标绘制</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo4" @click="routeLink">阴影效果</span></div></el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="3" :offset="2"><div class="grid-content bg-purple"><span id="demo5" @click="routeLink">图片材质</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo6" @click="routeLink">demo6</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo7" @click="routeLink">球体环绕</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo8" @click="routeLink">贴图类型</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo9" @click="routeLink">环境贴图</span></div></el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="3" :offset="2"><div class="grid-content bg-purple"><span id="demo10" @click="routeLink">伪虫洞</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo11" @click="routeLink">物体嵌套</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo12" @click="routeLink">触摸变色</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo13" @click="routeLink">射线点击</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo14" @click="routeLink">canvas贴图</span></div></el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="3" :offset="2"><div class="grid-content bg-purple"><span id="demo15" @click="routeLink">STL模型</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo16" @click="routeLink">OBJ模型</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo17" @click="routeLink">UV贴图</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo18" @click="routeLink">边缘显示</span></div></el-col>
      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo19" @click="routeLink">粒子效果</span></div></el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="3" :offset="2"><div class="grid-content bg-purple"><span id="demo20" @click="routeLink">绘制地图</span></div></el-col>
<!--      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo21" @click="routeLink">demo21</span></div></el-col>-->
<!--      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo22" @click="routeLink">demo22</span></div></el-col>-->
<!--      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo23" @click="routeLink">demo23</span></div></el-col>-->
<!--      <el-col :span="3" :offset="1"><div class="grid-content bg-purple"><span id="demo24" @click="routeLink">demo24</span></div></el-col>-->
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
    // this.$router.push({path:'/test' })
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
