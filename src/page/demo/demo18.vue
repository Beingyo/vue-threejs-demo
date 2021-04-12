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
      this.light;
      this.line;
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
        this.camera.position.set(1.5, 1.5, 3);
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor('#000000', 1); // 设置背景颜色
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
        // 物体
        const geometry = new THREE.DodecahedronGeometry(1,0);
        // let geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        var material = new THREE.MeshPhongMaterial({
          color: '#f57e7e',
          transparent: true,
          opacity: 0.9
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.scale.set(0.8, 0.8, 0.8)
        this.scene.add(this.mesh);
        var edges = new THREE.EdgesGeometry( geometry );
        this.line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: '#ffffff' } ) );
        this.scene.add(this.line);
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
        this.mesh.rotation.x += 0.005;
        this.mesh.rotation.y += 0.01;
        this.line.rotation.x += 0.01;
        this.line.rotation.y += 0.02;
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
      this.line = null;
    }
  }
</script>
