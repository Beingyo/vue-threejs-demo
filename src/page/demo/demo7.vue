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
        angle: 0,
      }
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
      },
      // 定义灯光
      initLight() {
        // 环境光
        var light = new THREE.AmbientLight('#ffffff', 0.9);
        this.scene.add(light);
      },
      // 定义物体
      initMesh() {
        // 物体
        let geometry = new THREE.SphereGeometry(0.15, 50, 50);
        // 获取图片
        var solid = new THREE.TextureLoader().load('../../static/demo7/solid.jpg');
        // 材质
        let material = new THREE.MeshLambertMaterial({map: solid});
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
      animate() {
        requestAnimationFrame(this.animate);
        // 自转
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        // 圆周运动速度
        this.angle += 0.02;
        // 圆周运动网格模型x坐标计算
        var x = 0.4 * Math.sin(this.angle)
        // 圆周运动网格模型z坐标计算
        var z = 0.4 * Math.cos(this.angle)
        this.mesh.position.set(x, 0, z);
        this.renderer.render(this.scene, this.camera);
      }
    },
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.mesh;
      this.controls;
      this.init();
      this.animate()
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
