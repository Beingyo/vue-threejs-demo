<template>
  <div style="width: 100%">
    <div id="container"></div>
    <div style="float: left">
      <img src="../../../static/demo16/Cat_diffuse.jpg" alt="" style="width: 360px;height: 360px"/>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
  import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'

  export default {
    data() {
      return {}
    },
    methods: {
      init() {
        let container = document.getElementById('container');
        // 定义相机
        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.25, 100);
        this.camera.position.set(11, 3, 5);
        // 定义场景
        this.scene = new THREE.Scene();
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setClearColor('#b9d3ff', 1); // 设置背景颜色
        // 定义半球光
        var light = new THREE.HemisphereLight("#E9E9E9", "#505050");
        light.position.set(0, 200, -200);
        this.scene.add(light);
        // 加载obj模型(有皮)
        new OBJLoader().load('../../static/demo16/Cat_v1_l3.obj' , obj => {
          obj.position.set(-4, -2.5, 2)
          obj.rotateX(-Math.PI / 2);
          obj.scale.set(0.12, 0.12, 0.12)
          // 加载皮肤
          obj.children[0].material.map = new THREE.TextureLoader().load('../../static/demo16/Cat_diffuse.jpg');
          obj.children[0].material.needsUpdate = true;
          this.scene.add(obj)
        })

        // 加载obj模型
        new OBJLoader().load('../../static/demo16/Cat_v1_l3.obj' , obj => {
          obj.position.set(2, -2.5, -2)
          obj.rotateX(-Math.PI / 2);
          obj.scale.set(0.12, 0.12, 0.12)
          // 加载贴图
          obj.children[0].material.map = new THREE.CanvasTexture(this.createCanvas());
          obj.children[0].material.needsUpdate=true;
          this.scene.add(obj)
        })

        // 控制器
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      },
      animate() {
        requestAnimationFrame(this.animate);
        // this.line.rotation.x += 0.01;
        // this.line.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
      },
      createCanvas() {
        var canvas = document.createElement("canvas");
        canvas.width = 360;
        canvas.height = 360;
        var c = canvas.getContext('2d');
        // 矩形区域填充背景
        c.fillStyle = "#d7d7d7";
        c.fillRect(0, 0, 360, 360);
        c.beginPath();
        // 文字
        c.beginPath();
        c.translate(250,210); //x=20, y=90
        c.fillStyle = "#000000"; //文本填充颜色
        c.font = "bold 20px 宋体"; //字体样式设置
        // c.textBaseline = "middle"; //文本与fillText定义的纵坐标
        // c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
        c.rotate(- Math.PI/2 - 0.1);
        c.fillText("文字贴图", 0, 0);

        return canvas;
      },
      // 绘制canvas并显示
      draw() {
        // var canvas = document.createElement("canvas");
        var canvas = document.getElementById("canvas");
        canvas.width = 360;
        canvas.height = 360;
        var c = canvas.getContext('2d');
        // 矩形区域填充背景
        c.fillStyle = "#efefef";
        c.fillRect(0, 0, 360, 360);
        c.beginPath();
        // 文字
        c.beginPath();
        c.translate(250,210); //x=20, y=90
        c.fillStyle = "#000000"; //文本填充颜色
        c.font = "bold 20px 宋体"; //字体样式设置
        // c.textBaseline = "middle"; //文本与fillText定义的纵坐标
        // c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
        c.rotate(- Math.PI/2 - 0.1);
        c.fillText("文字贴图", 0, 0);
        // document.body.appendChild(canvas)
      }
    },
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.mesh;
      this.controls;
      this.light;
      this.line;
      this.init();
      this.animate()
      this.draw()
    },
    beforeDestroy() {
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.mesh = null;
      this.controls = null;
      this.light = null;
      this.line = null;
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
