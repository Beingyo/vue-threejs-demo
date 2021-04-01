<template>
  <div style="width: 100%">
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

  export default {
    data() {
      return {}
    },
    methods: {
      init() {
        let container = document.getElementById('container');
        // 定义相机
        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.25, 100);
        this.camera.position.set(5, 5, 10);
        // 定义场景
        this.scene = new THREE.Scene();
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setClearColor('#b9d3ff', 1); // 设置背景颜色
        // 定义半球光
        var light = new THREE.HemisphereLight("#E9E9E9", "#505050");
        light.position.set(0, 20, -20);
        this.scene.add(light);
        // 加载stl模型
        const loader = new STLLoader()
        loader.load(
          '../../static/demo15/shoes.stl',
          geometry => {
            geometry.center();
            geometry.rotateX(-Math.PI / 2);
            // canvas画布对象作为CanvasTexture的参数重建一个纹理对象，canvas画布可以理解为一张图片
            var texture = new THREE.CanvasTexture(this.createCanvas(130,130));
            // 创建材质
            const material = new THREE.MeshPhongMaterial({
              map   : texture
            });
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.scale.set(0.04, 0.04, 0.04)
            this.scene.add(this.mesh)
          }
        )

        // 控制器
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      },
      animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
      },
      createCanvas(w, h) {
        w = w || 30;
        h = h || 30;

        // var cs = document.createElement('canvas')
        // var ctx = cs.getContext('2d');
        // cs.width = w;
        // cs.height = h;
        // ctx.fillStyle ="#fff";
        // ctx.fillRect(0,0,w,h);
        // ctx.strokeStyle = "#c00";
        // ctx.shadowBlur = 20;
        // ctx.shadowColor = "#c99";
        // ctx.strokeWidth = 30;
        // ctx.beginPath();
        // ctx.moveTo(w/2, 0);
        // ctx.lineTo(0,h);
        // ctx.lineTo(w, h);
        // ctx.closePath()
        // ctx.stroke();

        var cs = document.createElement("canvas");
        cs.width = 512;
        cs.height = 128;
        var c = cs.getContext('2d');
        // 矩形区域填充背景
        c.fillStyle = "#ff00ff";
        c.fillRect(0, 0, 512, 128);
        c.beginPath();
        // 文字
        c.beginPath();
        c.translate(256,64);
        c.fillStyle = "#000000"; //文本填充颜色
        c.font = "bold 48px 宋体"; //字体样式设置
        c.textBaseline = "middle"; //文本与fillText定义的纵坐标
        c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
        c.fillText("郭隆邦_技术博客", 0, 0);

        return cs;
      }
    },
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.mesh;
      this.controls;
      this.light;
      this.init();
      this.animate()
    },
    beforeDestroy() {
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.mesh = null;
      this.controls = null;
      this.light = null;
    }
  }
</script>
<style scoped>
  #container {
    margin: 0 auto 0 0;
    width: 600px;
    height: 400px;
  }
</style>
