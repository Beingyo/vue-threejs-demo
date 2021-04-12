<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

  export default {
    data() {
      return {
        count: 0,
      }
    },
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.mesh;
      this.controls;
      this.points;
      this.init();
      this.animate()
    },
    methods: {
      init: function () {
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
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0,0,250);
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.setClearColor('#ffffff', 1);
      },
      // 定义灯光
      initLight() {
        // 环境光
        var light = new THREE.AmbientLight('#ffffff', 0.9);
        this.scene.add(light);
      },
      // 定义物体
      initMesh() {
        // 三维样条曲线CatmullRomCurve3创建一个曲线路径
        var curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-500, 200, 900),
          new THREE.Vector3(-100, 400, 400),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(600, -600, 0),
          new THREE.Vector3(900, -400, 600),
          new THREE.Vector3(1200, -200, 300),
        ]);
        // 从曲线上获得501个顶点，数量根据需要自己设置
        this.points = curve.getPoints(500);
        // 物体
        let geometry = new THREE.TubeGeometry(curve, 200, 30, 50);
        // 材质
        let material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
      },
      // 屏幕自适应
      onWindowResize() {
        console.log('onWindowResize')
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
      },
      animate: function () {
        requestAnimationFrame(this.animate);
        if (this.count <= this.points.length) {
          this.count ++
        } else {
          this.count = 0
        }
        this.camera.position.set(this.points[this.count].x, this.points[this.count].y, this.points[this.count].z);
        this.camera.lookAt(new THREE.Vector3(this.points[this.count + 1].x, this.points[this.count + 1].y, this.points[this.count + 1].z));
        this.renderer.render(this.scene, this.camera);
      }
    },
    beforeDestroy() {
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.mesh = null;
      this.controls = null;
      this.points = null;
    }
  }
</script>
<style scoped>
  #container {
    margin: 0 auto 0 0;
    width: 920px;
    height: 760px;
  }
</style>
