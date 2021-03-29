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
        camera: null,
        scene: null,
        renderer: null,
        mesh: null,
        controls: null,
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
        let geometry = new THREE.PlaneGeometry(0.25, 1);
        // 获取图片
        var light = new THREE.TextureLoader().load('../../static/demo6/light.png');
        // 定义材质
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
        // 加载环境光
        var light = new THREE.AmbientLight('#ffffff', 1);
        this.scene.add(light)
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        // this.renderer.setClearColor('#b9d3ff', 1); //设置背景颜色

        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      },
      animate: function () {
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
    margin: 0 auto 0 0;
    width: 600px;
    height: 400px;
  }
</style>
