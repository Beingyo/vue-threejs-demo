
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
        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 5000);
        this.camera.position.set(0, 0, 250);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        // 定义场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#B0E2FF");
        this.scene.fog = new THREE.Fog(this.scene.background, 1, 5000);
        // 定义环境光
        let light = new THREE.AmbientLight("#FFFFFF");
        this.scene.add(light);
        // 定义平行光
        light = new THREE.DirectionalLight("#FFFFFF", 0.2);
        light.position.set(-50, 50, 10);
        light.castShadow = true;
        // 设置阴影分辨率
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        // 为光线设置阴影属性
        light.shadow.camera.left = -50;
        light.shadow.camera.right = 50;
        light.shadow.camera.top = 50;
        light.shadow.camera.bottom = -50;
        light.shadow.camera.far = 3500;
        // 偏差率
        light.shadow.bias = -0.001;
        this.scene.add(light);
        // 定义灯光辅助对象
        let lightHelper = new THREE.DirectionalLightHelper(light, 10);
        this.scene.add(lightHelper);
        // 定义球体
        let sphereGeometry = new THREE.SphereGeometry(30, 50, 50);
        let sphereMaterial = new THREE.MeshPhongMaterial({color: '#836FFF'});
        sphereMaterial.shininess = 100;
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;
        this.scene.add(sphere);
        // 定义平面接收阴影
        let groundGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
        let groundMaterial = new THREE.MeshLambertMaterial({color: 0x6C7B8B});
        let ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        ground.position.y = -80;
        ground.receiveShadow = true;
        this.scene.add(ground);
        // 定义渲染器
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        // 渲染器颜色和透明度
        this.renderer.setClearColor("#EEEEEE", 1.0);
        // 允许阴影
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        container.appendChild(this.renderer.domElement);
        // 控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      },
      animate: function() {
        requestAnimationFrame(this.animate);
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
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
