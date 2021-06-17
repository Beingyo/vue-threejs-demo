<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

  export default {
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
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        this.camera.position.set(200, 300, 200);
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
        // 建立坐标系
        var axisHelper = new THREE.AxisHelper(250);
        this.scene.add(axisHelper);
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
        this.renderer.setClearColor('#b9d3ff', 1); //设置背景颜色
      },
      // 定义灯光
      initLight() {
        //点光源
        this.light = new THREE.PointLight('#ffffff');
        this.light.position.set(400, 200, 300); //点光源位置
        this.scene.add(this.light); //点光源添加到场景中
        this.light = new THREE.PointLight('#ffffff');
        this.light.position.set(-400, -200, -300); //点光源位置
        this.scene.add(this.light); //点光源添加到场景中
        //环境光
        this.light = new THREE.AmbientLight('#959595');
        this.scene.add(this.light);
      },
      // 定义物体
      initMesh() {
        let geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array([
          0, 0, 0, //顶点1坐标
          50, 0, 0, //顶点2坐标
          0, 100, 0, //顶点3坐标
          0, 0, 10, //顶点4坐标
          0, 0, 100, //顶点5坐标
          50, 0, 10, //顶点6坐标
          50, 50, 50, //顶点7坐标
          0, 50, 100, //顶点8坐标
          0, 100, 10, //顶点9坐标
        ]);
        // 创建属性缓冲区对象
        var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
        // 设置几何体attributes属性的位置属性
        geometry.attributes.position = attribue;
        // 物体材质
        let material = new THREE.MeshBasicMaterial({
          color: 0x0000ff, //三角面颜色
          side: THREE.DoubleSide //两面可见
        });
        // 网格模型
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
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
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
      }
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
