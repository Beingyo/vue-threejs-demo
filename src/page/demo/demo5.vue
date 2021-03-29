
<template>
  <div style="width: 100%">
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

  export default {
    data() {
      return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null,
        controls: null,
      }
    },
    methods: {
      init: function() {
        let container = document.getElementById('container');


        // 定义相机
        this.camera = new THREE.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
        this.camera.position.set(0.5, 0.5, 1);
        // 定义场景
        this.scene = new THREE.Scene();
        // 加载背景图片
        this.scene.background = new THREE.TextureLoader().load('../../static/demo5/bg.jpg');
        // 定义物体
        let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        // 获取图片
        var solid = new THREE.TextureLoader().load('../../static/demo5/solid.jpg');
        // 定义材质
        let material = new THREE.MeshLambertMaterial({ map: solid });
        // 加载物体与材质
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh)
        // 加载环境光
        var light = new THREE.AmbientLight('#ffffff', 0.9);
        this.scene.add(light);
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);

        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      },
      animate: function() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
      }
    },
    mounted() {
      this.init();
      this.animate()
    }
  }
</script>
<style scoped>
  #container {
    margin: 0 auto 0 0 ;
    width: 600px;
    height: 400px;
  }
</style>
