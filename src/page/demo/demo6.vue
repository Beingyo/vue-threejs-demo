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
        // this.renderer.setClearColor('#b9d3ff', 1); //设置背景颜色
      },
      // 定义灯光
      initLight() {
        var light = new THREE.AmbientLight('#ffffff', 1);
        this.scene.add(light)
      },
      // 定义物体
      initMesh() {
        // 物体
        let geometry = new THREE.PlaneGeometry(0.25, 1);
        // 获取图片
        var light = new THREE.TextureLoader().load('../../static/demo6/light.png');
        // 材质
        let material = new THREE.MeshPhongMaterial({
          map: light,
          // 双面显示
          side: THREE.DoubleSide,
          // 开启透明效果，否则颜色贴图map的透明不起作用
          transparent: true,
        });
        // 加载物体与材质
        var materialA = new THREE.Mesh(geometry, material);
        var materialB = materialA.clone().rotateY(Math.PI / 2)
        // var groupMesh= new THREE.Group()
        // groupMesh.add(materialA,materialB)
        this.scene.add(materialA)
        this.scene.add(materialB)
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
