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
        var width = window.innerWidth; // 窗口宽度
        var height = window.innerHeight; // 窗口高度
        var k = width / height; // 窗口宽高比
        var s = 200; // 三维场景显示范围控制系数，系数越大，显示的范围越大
        this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        this.camera.position.set(200, 300, 200);
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);// 设置渲染区域尺寸
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
        // 多面体体
        let geometryDode = new THREE.DodecahedronGeometry(50,0);
        // 材质
        let materialDode = new THREE.MeshLambertMaterial({
          color: '#e0f2fd',
          transparent: true,
          opacity: 0.7
        })
        this.mesh = new THREE.Mesh(geometryDode, materialDode);
        this.scene.add(this.mesh);

        // 正方体
        let geometryBox = new THREE.BoxGeometry(150, 150, 150);
        // 材质
        let materialBox = new THREE.MeshLambertMaterial({
          color: '#ffd5d5',
          transparent: true,
          opacity: 0.2
        })
        this.mesh = new THREE.Mesh(geometryBox, materialBox);
        this.scene.add(this.mesh);
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
      this.light = null;
    }
  }
</script>
