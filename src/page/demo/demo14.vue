<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

  export default {
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.meshA;
      this.meshB;
      this.controls;
      this.light;
      this.init();
      this.animate()
    },
    methods: {
      init() {
        let container = document.getElementById('container');
        this.initCamera()
        this.initScene()
        this.initRenderer()
        this.initLight()
        this.initMesh()
        // 控制器
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        window.addEventListener( 'resize', this.onWindowResize, false );
      },
      // 定义相机
      initCamera() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.set(0.5, 0.5, 1);
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
        //环境光
        var light = new THREE.AmbientLight('#ffffff', 0.9);
        this.scene.add(light);
      },
      // 定义物体
      initMesh() {
        // 定义物体A
        let geometryA = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        var textureA = new THREE.CanvasTexture(this.createCanvasA(130,130));
        var materialA = new THREE.MeshPhongMaterial({
          map: textureA, // 设置纹理贴图
        });
        // 加载物体与材质
        this.meshA = new THREE.Mesh(geometryA, materialA);
        this.meshA.position.set(0.35, 0, 0);
        this.scene.add(this.meshA);

        // 定义物体B
        let geometryB = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        var textureB = new THREE.CanvasTexture(this.createCanvasB(130,130));
        var materialB = new THREE.MeshPhongMaterial({
          map: textureB, // 设置纹理贴图
        });
        // 加载物体与材质
        this.meshB = new THREE.Mesh(geometryB, materialB);
        this.meshB.position.set(-0.35, 0, 0);
        this.scene.add(this.meshB);

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
        // this.meshA.rotation.x += 0.01;
        // this.meshA.rotation.y += 0.02;
        // this.meshB.rotation.z += 0.02;
        // this.meshB.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
      },
      createCanvasA(w, h) {
        w = w || 30;
        h = h || 30;
        var cs = document.createElement('canvas')
        var ctx = cs.getContext('2d');
        cs.width = w;
        cs.height = h;
        ctx.fillStyle ="#fff";
        ctx.fillRect(0,0,w,h);
        ctx.strokeStyle = "#c00";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#c99";
        ctx.strokeWidth = 30;
        ctx.beginPath();
        ctx.moveTo(w/2, 0);
        ctx.lineTo(0,h);
        ctx.lineTo(w, h);
        ctx.closePath()
        ctx.stroke();
        return cs;
      },
      createCanvasB(w, h) {
        w = w || 30;
        h = h || 30;
        var cs = document.createElement("canvas");
        cs.width = w;
        cs.height = h;
        var c = cs.getContext('2d');
        // 矩形区域填充背景
        c.fillStyle = "#ff00ff";
        c.fillRect(0, 0, w, h);
        c.beginPath();
        // 文字
        c.beginPath();
        c.translate(w/2,h/2);
        c.fillStyle = "#000000"; //文本填充颜色
        c.font = "bold 30px 宋体"; //字体样式设置
        c.textBaseline = "middle"; //文本与fillText定义的纵坐标
        c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
        c.fillText("文字贴图", 0, 0);
        return cs;
      }
    },
    beforeDestroy() {
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.meshA = null;
      this.meshB = null;
      this.controls = null;
      this.light = null;
    }
  }
</script>
