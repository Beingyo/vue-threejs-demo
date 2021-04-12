<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import { axisChange } from '@/javaScript/axisChange'
  import geoJson from '../../../static/demo20/china.json'

  export default {
    mounted() {
      this.camera;
      this.scene;
      this.renderer;
      this.mesh;
      this.controls;
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
        this.geoMap()
        container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        window.addEventListener( 'resize', this.onWindowResize, false );
      },
      // 定义相机
      initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
        this.camera.position.x = 0
        this.camera.position.y = 0
        this.camera.position.z = 700
      },
      // 定义场景
      initScene() {
        this.scene = new THREE.Scene();
      },
      // 定义渲染器
      initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.setClearColor('#ffffff', 1);
      },
      // 定义灯光
      initLight() {
        // 环境光
        var light = new THREE.AmbientLight('#ffffff', 0.9);
        this.scene.add(light);
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
        this.renderer.render(this.scene, this.camera);
      },
      // 地理数据处理
      geoMap() {
        let data = []
        let allPointLon = []
        let allPointLat = []
        for(let i in geoJson.features){
          let obj = {
            name:geoJson.features[i].properties.name, // 地区名称
            cp:axisChange(geoJson.features[i].properties.cp), // 地区所在坐标
            data:[]
          }
          if(geoJson.features[i].geometry.type === 'Polygon'){  // 根据类型获取坐标点
            for(let j in geoJson.features[i].geometry.coordinates){
              let arr = []
              for(let k in geoJson.features[i].geometry.coordinates[j]){
                let point=axisChange(geoJson.features[i].geometry.coordinates[j][k])
                arr.push(point)
                allPointLon.push(point[0])
                allPointLat.push(point[1])
              }
              obj.data.push(arr)
            }
          }
          else if(geoJson.features[i].geometry.type === 'MultiPolygon'){  // 根据类型获取坐标点
            for(let j in geoJson.features[i].geometry.coordinates){
              let arr = []
              for(let k in geoJson.features[i].geometry.coordinates[j][0]){
                let point=axisChange(geoJson.features[i].geometry.coordinates[j][0][k])
                arr.push(point)
                allPointLon.push(point[0])
                allPointLat.push(point[1])
              }
              obj.data.push(arr)
            }
          }
          data.push(obj)
        }
        // 获取中心点
        let lonCenter=(Math.max.apply(Math.max,allPointLon)+Math.min.apply(Math.max,allPointLon))/2
        let latCenter=(Math.max.apply(Math.max,allPointLat)+Math.min.apply(Math.max,allPointLat))/2
        this.addMesh(data,lonCenter,latCenter)
      },
      // 创建地图区块
      async addMesh(data,lonCenter,latCenter) {

        const loader = new THREE.FontLoader()

        // 字体自行更换 在线转换地址https://gero3.github.io/facetype.js/
        const font = await new Promise((resolve, reject)=>{
          loader.load('../../../static/demo20/font.json',(font)=>{
            resolve(font)
          })
        })

        for(let i in data){
          let group = new THREE.Group()
          this.scene.add(group)
          group.name = data[i].name
          for(let j in data[i].data){
            let pointArr = []
            let extrudeSettings = {
              depth:10, // 板块厚度
              bevelEnabled:false  // 关闭斜面
            }
            for(let k in data[i].data[j]){
              let x = (data[i].data[j][k][0]-lonCenter)/10000 // 经度
              let y = (data[i].data[j][k][1]-latCenter)/10000 // 纬度
              pointArr.push(new THREE.Vector2(x, y))
            }
            let shape = new THREE.Shape(pointArr)
            let geometry = new THREE.ExtrudeGeometry(shape,extrudeSettings)
            geometry.computeBoundingSphere() // 计算中心
            let material = new THREE.MeshBasicMaterial( {color: 0x203A9A} )
            let mesh = new THREE.Mesh( geometry, material )
            // 添加边缘线
            let edges = new THREE.EdgesGeometry(geometry)
            let line = new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color: 0x000000}))
            mesh.add(line)
            let fontGeometry = new THREE.TextGeometry(data[i].name, {
              font: font,
              size: 5,
              height: 1,  // 字体厚度
              bevelEnabled: false // 关闭斜面
            })
            let fontMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
            let fontMesh = new THREE.Mesh( fontGeometry, fontMaterial )
            // 省份标示位置可自行校准 1.json中cp中心点定位偏差  2.文字坐标自身偏差
            fontMesh.position.set((data[i].cp[0]-lonCenter)/10000,(data[i].cp[1]-latCenter)/10000,10)
            group.add(fontMesh)
            group.add(mesh)
          }
        }
      }
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
