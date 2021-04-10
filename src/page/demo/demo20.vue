<template>
  <div style="width: 100%">
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
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

        // 定义物体
        const geometry = new THREE.DodecahedronGeometry(1,0);
        // let geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        var material = new THREE.MeshPhongMaterial({
          color: '#f57e7e',
          transparent: true,
          opacity: 0.9
        });
        this.line = new THREE.Mesh(geometry, material);
        this.line.scale.set(0.8, 0.8, 0.8)
        this.line.position.set(0, -0.7, 0);
        this.scene.add(this.line);

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
              transparent: true,
              opacity: 0.5,
            });
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.scale.set(0.04, 0.04, 0.04)
            this.scene.add(this.mesh)
          }
        )

        // 加载obj模型
        const loaderA = new OBJLoader()
        loaderA.load('../../static/demo20/shoes.obj' , obj => {
          obj.rotateX(-Math.PI / 2);
          obj.scale.set(0.3, 0.3, 0.3)
          obj.children[0].material.transparent = true;
          obj.children[0].material.opacity = 0.4;
          this.scene.add(obj)
        })



        // 控制器
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.line.rotation.x += 0.01;
        this.line.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
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
