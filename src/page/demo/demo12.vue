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
      this.light;
      this.group;
      this.selectedObject;
      this.raycaster = new THREE.Raycaster();
      this.mouseVector = new THREE.Vector3();
      this.init();
      this.animate()
    },
    methods: {
      init() {
        let container = document.getElementById('container');
        this.initCamera()
        this.initScene()
        this.initRenderer()
        this.initMesh()
        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener("mousemove", this.onDocumentMouseMove, false);
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      },
      // 定义相机
      initCamera() {
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(15, 15, 15);
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#ffe0e0');
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      initMesh() {
        this.group = new THREE.Group();
        this.scene.add(this.group);

        var geometryP = new THREE.BoxGeometry(10, 10, 10);
        var materialP = new THREE.MeshBasicMaterial({color: '#0000ff', side: THREE.DoubleSide});
        var circleP = new THREE.Mesh(geometryP, materialP);
        circleP.position.set(-10, 0, 0);
        //geometryP.rotateY(Math.PI/2);
        var group1 = new THREE.Group();
        this.group.add(group1);
        group1.add(circleP);


        var geometryP1 = new THREE.BoxGeometry(-10, -10, 10);
        var materialP1 = new THREE.MeshBasicMaterial({color: '#00ff00', side: THREE.DoubleSide});
        var circleP1 = new THREE.Mesh(geometryP1, materialP1);
        circleP1.position.set(10, 0, 0);
        var group2 = new THREE.Group();
        this.group.add(group2);
        group2.add(circleP1);
      },
      // 屏幕自适应
      onWindowResize() {
        console.log('onWindowResize')
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
      },
      // 鼠标点击事件
      onDocumentMouseMove(event) {
        event.preventDefault();
        if (this.selectedObject) {
          this.selectedObject.material.color.set('#69f');
          this.selectedObject = null;
        }
        var intersects = this.getIntersects(event.layerX, event.layerY);
        if (intersects.length > 0 && this.selectedObject != intersects[0].object) {
          var res = intersects.filter(function (res) {
            return res && res.object;
          })[0];
          if (res && res.object) {
            this.selectedObject = res.object;
            this.selectedObject.material.color.set('#f00');
          }
        }
      },
      animate() {
        requestAnimationFrame(this.animate);
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
      },
      getIntersects(x, y) {
        x = (x / window.innerWidth) * 2 - 1;
        y = -(y / window.innerHeight) * 2 + 1;
        this.mouseVector.set(x, y, 0.5);
        this.raycaster.setFromCamera(this.mouseVector, this.camera);
        return this.raycaster.intersectObject(this.group, true);
      }
    },
    beforeDestroy() {
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.mesh = null;
      this.controls = null;
      this.light = null;
      this.group = null;
      this.selectedObject = null;
      this.raycaster = null;
      this.mouseVector = null;
    }
  }
</script>
