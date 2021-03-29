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
        let geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        // 加载图片
        var map = new THREE.TextureLoader().load('../../static/demo8/map.jpg');
        var emissiveMap = new THREE.TextureLoader().load('../../static/demo8/emissiveMap.jpg');
        var normalMap = new THREE.TextureLoader().load('../../static/demo8/normalMap.jpg');
        var roughnessMap = new THREE.TextureLoader().load('../../static/demo8/roughnessMap.jpg');
        var metalnessMap = new THREE.TextureLoader().load('../../static/demo8/normalMap.jpg');
        var envMap = new THREE.TextureLoader().load('../../static/demo8/envMap.jpg');

        // 定义材质
        let material = new THREE.MeshPhongMaterial({
          // 物体颜色
          // color:'#ff0000',
          // 颜色贴图
          map: map,
          // 发光贴图
          emissiveMap: emissiveMap,
          // 如果设置了emissiveMap，自发光贴图，请务必将发光颜色设置为黑色以外的其他颜色，emissive默认黑色，设置为白色
          emissive: '#ffffff',
          // // 法线贴图
          // normalMap: normalMap,
          // // 粗糙度贴图
          // roughnessMap: roughnessMap,
          // // 材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射
          // roughness: 0.5,
          // // 金属度贴图
          // metalnessMap: metalnessMap,
          // // 材质与金属的相似度,0.0到1.0之间的值可用于生锈金属的外观
          // metalness: 1.0,
          // // 环境贴图
          // envMap: envMap,
          // // 环境贴图影响程度
          // envMapIntensity: 0.9,
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
        //设置背景颜色
        // this.renderer.setClearColor('#b9d3ff', 1);

        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      },
      animate: function () {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
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
