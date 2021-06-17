<template>
  <div>
    <div id="container"></div>
    <div style="position: absolute;top: 10px;left: 10px;">
      <canvas style="height: 200px;width: 200px;" id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
  import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'

  export default {
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
    methods: {
      init() {
        let container = document.getElementById('container');
        this.initCamera()
        this.initScene()
        this.initRenderer()
        this.initLight()
        this.initMesh()
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        window.addEventListener( 'resize', this.onWindowResize, false );
      },
      // 定义相机
      initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
        this.camera.position.set(11, 3, -10);
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor('#b9d3ff', 1); // 设置背景颜色
      },
      // 定义灯光
      initLight() {
        //半球光
        var light = new THREE.HemisphereLight("#E9E9E9", "#505050");
        light.position.set(0, 200, -200);
        this.scene.add(light);
      },
      // 定义物体
      initMesh() {
        // 加载obj模型
        new OBJLoader().load('../../static/demo17/shoes.obj' , obj => {
          obj.rotateX(-Math.PI / 2);
          obj.scale.set(0.3, 0.3, 0.3)
          // 加载贴图
          obj.children[0].material.map = new THREE.CanvasTexture(this.createCanvas());
          obj.children[0].material.needsUpdate=true;
          this.scene.add(obj)
        })
      },
      // 屏幕自适应
      onWindowResize() {
        console.log('onWindowResize')
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
      },
      animate() {
        requestAnimationFrame(this.animate);
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
        // c.translate(60,240); //x=20, y=90
        c.translate(220,300); //x=20, y=90
        c.fillStyle = "#000000"; //文本填充颜色
        c.font = "bold 24px 宋体"; //字体样式设置
        // c.textBaseline = "middle"; //文本与fillText定义的纵坐标
        // c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
        c.rotate(- Math.PI/2);
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
        c.translate(220,300); //x=20, y=90
        c.fillStyle = "#000000"; //文本填充颜色
        c.font = "bold 24px 宋体"; //字体样式设置
        // c.textBaseline = "middle"; //文本与fillText定义的纵坐标
        // c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
        c.rotate(- Math.PI/2);
        c.fillText("文字贴图", 0, 0);
        // document.body.appendChild(canvas)
      }
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
