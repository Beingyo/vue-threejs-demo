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
      return {}
    },
    methods: {
      init() {
        let container = document.getElementById('container');
        // 定义相机
        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 5000);
        this.camera.position.set(0, 1000, 2500);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        // 定义场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#050505');
        this.scene.fog = new THREE.Fog('#050505', 2000, 3500);
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        // this.renderer.setClearColor('#b9d3ff', 1); // 设置背景颜色
        // 定义半球光
        var light = new THREE.HemisphereLight("#E9E9E9", "#505050");
        light.position.set(0, 200, -200);
        this.scene.add(light);

        // 加载物体
        this.initGeometry()

        // 控制器
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        // 添加惯性
        this.controls.enableDamping = true;
      },
      initGeometry() {
        /* 50000个点 */
        let particles = 50000;
        /* 存放粒子数据的网格 */
        let geometry = new THREE.BufferGeometry();
        let positions = [];
        let colors = [];
        // let texture = new THREE.TextureLoader().load('../../textures/particles/rn.png');

        let color = new THREE.Color();

        /* 使粒子在立方体范围内扩散 */
        let n = 1000, n2 = n / 2;

        for (let i = 0; i < particles; i++) {

          // 点
          let x = Math.random() * n - n2;
          let y = Math.random() * n - n2;
          let z = Math.random() * n - n2;

          positions.push(x, y, z);

          // 颜色
          let vx = (x / n) + 0.5;
          let vy = (y / n) + 0.5;
          let vz = (z / n) + 0.5;

          color.setRGB(vx, vy, vz);

          colors.push(color.r, color.g, color.b);
        }
        // 添加点和颜色
        geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        let material = new THREE.PointsMaterial({
          size: 1,
          sizeAttenuation: true,
          vertexColors: THREE.VertexColors,
          transparent: true,
          opacity: 0.7
        });
        /* 批量管理点 */
        this.points = new THREE.Points(geometry, material);

        this.scene.add(this.points);
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
      }
    },
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.mesh;
      this.controls;
      this.light;
      this.line;
      this.points;
      this.init();
      this.animate()
    },
    beforeDestroy() {
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.mesh = null;
      this.controls = null;
      this.light = null;
      this.line = null;
      this.points = null;
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
