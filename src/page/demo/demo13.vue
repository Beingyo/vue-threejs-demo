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
        // 创建场景
        this.scene = new THREE.Scene();
        // 创建相机(设置相机位置，设置相机朝向)
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(10, 50, 50);
        this.camera.lookAt(this.scene.position);
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor('#EEEEEE');
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 创建辅助轴线
        var axis = new THREE.AxisHelper(100);
        this.scene.add(axis);
        // 添加图形---圆柱体
        let _radius = 5;
        var cylinderGeometry = new THREE.CylinderGeometry(_radius, _radius, 20, 40, 40);
        var cylinderMaterial = new THREE.MeshBasicMaterial({color: '#765432'});
        var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        this.scene.add(cylinder);
        // 添加浏览器窗口大小监听事件(画布自适应方法onResize)
        window.addEventListener('resize', this.onResize, false);
        // 鼠标点击拾取
        document.addEventListener('click', this.initRay, false);
        // 渲染
        container.appendChild(this.renderer.domElement);
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      },
      animate() {
        requestAnimationFrame(this.animate);
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
      },
      // 画布自适应
      onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      },
      // 射线拾取
      initRay(event) {
        // 获取画布
        let mainCanvas = document.querySelector("#container canvas");
        // 将屏幕坐标转为标准设备坐标(支持画布非全屏的情况)
        let x = ((event.clientX - mainCanvas.getBoundingClientRect().left) / mainCanvas.offsetWidth) * 2 - 1;   // 设备横坐标
        let y = -((event.clientY - mainCanvas.getBoundingClientRect().top) / mainCanvas.offsetHeight) * 2 + 1;  // 设备纵坐标
        let standardVector = new THREE.Vector3(x, y, 1);                                                        // 设备坐标
        // 标准设备坐标转为世界坐标
        let worldVector = standardVector.unproject(this.camera);
        // 射线投射方向单位向量(worldVector坐标减相机位置坐标)
        let ray = worldVector.sub(this.camera.position).normalize();
        // 绘制射线
        this.drawRay(this.scene, this.camera.position, ray);
        // 创建射线投射器对象
        let rayCaster = new THREE.Raycaster(this.camera.position, ray);
        // 返回射线选中的对象数组(第二个参数默认值是false，意为是否遍历图形内部的所有子图形)
        let intersects = rayCaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0) {
          // 射线拾取的首个对象
          let currObj = intersects[0];
          console.log(currObj);
          // 改变被拾取对象的材质颜色(随机)
          let currcolor = `rgb(${Math.floor(Math.random() * 256).toString()},${Math.floor(Math.random() * 256).toString()},${Math.floor(Math.random() * 256).toString()})`
          currObj.object.material.color.set(currcolor);
        }
      },
      drawRay(scene, start, dir) {
        let prevRay = scene.getObjectByName("customRay");
        if (prevRay) {
          scene.remove(prevRay);
        }
        let arrow = new THREE.ArrowHelper(dir, start, 1000, '#0000ff');
        arrow.name = "customRay";
        scene.add(arrow);
      }
    },
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
<style scoped>
  #container {
    margin: 0 auto 0 0;
    width: 600px;
    height: 400px;
  }
</style>
