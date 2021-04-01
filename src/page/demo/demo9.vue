<template>
  <div style="width: 100%">
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

  export default {
    data() {
      return {
        // camera: null,
        // scene: null,
        // renderer: null,
        // mesh: null,
        // controls: null,
      }
    },
    methods: {
      init: function () {
        let container = document.getElementById('container');


        // 定义相机
        this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
        this.camera.position.set(0.5, 0.5, 1);
        // 定义场景
        this.scene = new THREE.Scene();
        // 定义物体
        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        // 加载图片
        var textureCube = new THREE.CubeTextureLoader()
          .setPath('../../static/demo9/')
          .load(['metalnessMap.jpg', 'metalnessMap.jpg', 'metalnessMap.jpg', 'metalnessMap.jpg', 'metalnessMap.jpg', 'metalnessMap.jpg']);
        // 定义材质
        let material = new THREE.MeshPhongMaterial({
          // 设置环境贴图
          envMap: textureCube,
          // 反射程度, 从 0.0 到1.0.默认0.5，这模拟了非金属材料的反射率。 当metalness为1.0时无效
          reflectivity: 0.7,
        });
        // 加载物体与材质
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        // 加载环境光
        var light = new THREE.AmbientLight('#ffffff', 0.9);
        this.scene.add(light);
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        // 设置背景颜色
        // this.renderer.setClearColor('#b9d3ff', 1);


        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      },
      animate: function () {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
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
<style scoped>
  #container {
    margin: 0 auto 0 0;
    width: 600px;
    height: 400px;
  }
</style>
