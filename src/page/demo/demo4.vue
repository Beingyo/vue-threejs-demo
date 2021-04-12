<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

  export default {
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.mesh;
      this.controls;
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
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        window.addEventListener( 'resize', this.onWindowResize, false );
      },
      // 定义相机
      initCamera() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.set(0.7, 0.5, 0.7);
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
        // 建立坐标系
        var axisHelper = new THREE.AxisHelper(1);
        this.scene.add(axisHelper);
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 渲染器允许阴影
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor('#f3ffe2', 1); //设置背景颜色
      },
      // 定义灯光
      initLight() {
        // 平行光
        var light = new THREE.DirectionalLight("#ffffff", 1);
        light.position.set(-4, 7, -4);
        // 允许灯光阴影
        light.castShadow = true;
        // 设置阴影分辨率
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        this.scene.add(light);
      },
      // 定义物体
      initMesh() {
        // 物体
        let geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        // 材质
        let material = new THREE.MeshLambertMaterial({ color: '#9aebff' })
        this.mesh = new THREE.Mesh(geometry, material);
        // 允许物体阴影
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
        // 创建平面
        var planeGeometry = new THREE.PlaneGeometry(2, 2);
        var planeMaterial = new THREE.MeshLambertMaterial({color: '#f4faff'});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // 使平面接收物体投掷过来的阴影
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2; //旋转网格模型
        plane.position.set(0, -0.5, 0)
        this.scene.add(plane);
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
      }
    },
    beforeDestroy() {
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.mesh = null;
      this.controls = null;
    }
  }
</script>
