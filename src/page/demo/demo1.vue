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
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        window.addEventListener('resize', this.onWindowResize, false);
      },
      // 定义相机
      initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.camera.position.set(0, 0, 250);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#B0E2FF");
        this.scene.fog = new THREE.Fog(this.scene.background, 1, 5000);
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 渲染器颜色和透明度
        this.renderer.setClearColor("#EEEEEE", 1.0);
        // 允许阴影
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      },
      // 定义灯光
      initLight() {
        // 环境光
        let light = new THREE.AmbientLight("#FFFFFF");
        this.scene.add(light);
        // 平行光
        light = new THREE.DirectionalLight("#FFFFFF", 0.2);
        light.position.set(-50, 50, 10);
        light.castShadow = true;
        // 设置阴影分辨率
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        // 为光线设置阴影属性
        light.shadow.camera.left = -50;
        light.shadow.camera.right = 50;
        light.shadow.camera.top = 50;
        light.shadow.camera.bottom = -50;
        light.shadow.camera.far = 3500;
        // 偏差率
        light.shadow.bias = -0.001;
        this.scene.add(light);
        // 定义灯光辅助对象
        let lightHelper = new THREE.DirectionalLightHelper(light, 10);
        this.scene.add(lightHelper);
      },
      // 定义物体
      initMesh() {
        // 定义球体
        let sphereGeometry = new THREE.SphereGeometry(30, 50, 50);
        let sphereMaterial = new THREE.MeshPhongMaterial({color: '#836FFF'});
        sphereMaterial.shininess = 100;
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;
        this.scene.add(sphere);
        // 平面接收阴影
        let groundGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
        let groundMaterial = new THREE.MeshLambertMaterial({color: 0x6C7B8B});
        let ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        ground.position.y = -80;
        ground.receiveShadow = true;
        this.scene.add(ground);
      },
      // 屏幕自适应
      onWindowResize() {
        console.log('onWindowResize')
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      animate: function () {
        requestAnimationFrame(this.animate);
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
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
