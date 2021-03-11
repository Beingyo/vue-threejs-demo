
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
        this.camera.position.set(0.7, 0.5, 0.7);
        // 定义场景
        this.scene = new THREE.Scene();
        // 定义物体
        let geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        // 定义材质
        let material = new THREE.MeshLambertMaterial({ color: '#9aebff' })
        // 加载物体与材质
        this.mesh = new THREE.Mesh(geometry, material);
        // 允许物体阴影
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        // 渲染大小
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        // 渲染器允许阴影
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor('#f3ffe2', 1); //设置背景颜色
        // 平行光
        var light = new THREE.DirectionalLight("#ffffff", 1);
        light.position.set(-4, 7, -4);
        // 允许灯光阴影
        light.castShadow = true;
        // 设置阴影分辨率
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        this.scene.add(light);
        // 创建平面
        var planeGeometry = new THREE.PlaneGeometry(2, 2);
        var planeMaterial = new THREE.MeshLambertMaterial({color: '#f4faff'});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // 使平面接收物体投掷过来的阴影
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2; //旋转网格模型
        plane.position.set(0, -0.5, 0)
        this.scene.add(plane);
        // 建立坐标系
        var axisHelper = new THREE.AxisHelper(1);
        this.scene.add(axisHelper);


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
