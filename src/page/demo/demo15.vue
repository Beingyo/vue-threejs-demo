<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

  export default {
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
        this.camera.position.set(5, 5, 10);
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
        light.position.set(0, 20, -20);
        this.scene.add(light);
      },
      // 定义物体
      initMesh() {
        // 加载stl模型
        const loader = new STLLoader()
        loader.load(
          '../../static/demo15/shoes.stl',
          geometry => {
            geometry.center();
            geometry.rotateX(-Math.PI / 2);
            // 创建材质
            const material = new THREE.MeshPhongMaterial({
              color: "#E9E9E9",
              specular: "#E9E9E9",
              // 光滑度
              shininess: 100,
            });
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.scale.set(0.04, 0.04, 0.04)
            this.scene.add(this.mesh)
          }
        )
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
      this.light = null;
    }
  }
</script>
