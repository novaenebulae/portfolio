export function webglrender() {

    // Helmet Model

    const canvas = document.getElementById("webgl-1")
    fitToContainer(canvas);
    
    const scene = new THREE.Scene()
    const textureLoader = new THREE.TextureLoader()
    const sizes = {
        width: canvas.width,
        height: canvas.height
    }


    // Base camera
    const camera = new THREE.PerspectiveCamera(3, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = -10
    camera.position.y = 5
    camera.position.z = -10
    scene.add(camera)
    // camera.lookAt(new THREE.Vector3(0,0,0));

    // Directional light

    const light1 = new THREE.DirectionalLight('#ffffff', 1)
    scene.add(light1)
    light1.position.set(0, 0.75, 4)

    const light2 = new THREE.DirectionalLight('#ffffff', 1)
    scene.add(light2)
    light2.position.set(0, 0, -4)

    // Ambient light

    const ambient = new THREE.AmbientLight(0xFFFFFF);
    ambient.intensity = 2
    scene.add(ambient)


    //Controls
    const controls = new THREE.OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.enableZoom = true
    controls.enablePan = true
    controls.minDistance = 20
    controls.maxDistance = 20
    controls.minPolarAngle = Math.PI / 10
    controls.maxPolarAngle = Math.PI / 2
    controls.autoRotate = true
    controls.autoRotateSpeed = 3.8
    controls.update()

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    })

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding

scene.add(new THREE.GridHelper(9, 9));

    //Loader
    const loader = new THREE.GLTFLoader()
    loader.load('./3D Models/retro_computer.glb',
        (gltf) => {
            const model = gltf.scene
            scene.add(model)
            scene.position.set(0, 0, 0)
            model.position.set(0, 0, 0);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        }
    )

    // Animation

    var minPan = new THREE.Vector3(-2, -.5, -2)
    var maxPan = new THREE.Vector3(2, .5, 2)

    const tick = () => {
        controls.update()
        controls.target.clamp(minPan, maxPan)
        renderer.render(scene, camera)
        window.requestAnimationFrame(tick)
    }

    tick()

    // Human Ear Model

    const canvas2 = document.getElementById("webgl-2")
    const scene2 = new THREE.Scene()
    const textureLoader2 = new THREE.TextureLoader()
    const sizes2 = {
        width: canvas2.width,
        height: canvas2.height
    }

    fitToContainer2(canvas2);

    // Base camera

    const camera2 = new THREE.PerspectiveCamera(2.2, sizes2.width / sizes2.height, 0.1, 100)
    camera2.position.x = 30
    camera2.position.y = 5
    camera2.position.z = 10
    scene2.add(camera2)

    // Directional light

    //top-right
    const light1b = new THREE.DirectionalLight('#ffffff', .8)
    scene2.add(light1b)
    light1b.position.set(4, 4, 0)

    const light2b = new THREE.DirectionalLight('#ffffff', .2)
    scene2.add(light2b)
    light2b.position.set(0, 4, -2)

    const ambient2 = new THREE.AmbientLight(0xFFFFFF);
    ambient2.intensity = .35
    scene2.add(ambient2)


    //Controls
    const controls2 = new THREE.OrbitControls(camera2, canvas2)
    controls2.enableDamping = true
    controls.dampingFactor = 0.01
    controls2.enableZoom = true
    controls2.enablePan = true
    controls2.minDistance = 4.2
    controls2.maxDistance = 8
    controls2.minPolarAngle = Math.PI / 12
    controls2.maxPolarAngle = Math.PI / 2
    controls2.autoRotate = true
    controls2.autoRotateSpeed = 4

    // controls.minAzimuthAngle = - Math.PI / 2.2
    // controls.maxAzimuthAngle = Math.PI / 2.5

    // Renderer
    const renderer2 = new THREE.WebGLRenderer({
        canvas: canvas2,
        antialias: true,
        alpha: true
    })

    renderer2.setSize(sizes2.width, sizes2.height)
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer2.outputEncoding = THREE.sRGBEncoding


    //Loader
    const loader2 = new THREE.GLTFLoader()
    loader2.load('./3D Models/racks.glb',
        (gltf) => {
            const model2 = gltf.scene
            scene2.add(model2)
            model2.scale.set(0.3, 0.3, 0.3)
            scene2.position.set(0, 0, 0)

        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        }
    )

    // Animation

    var minPan = new THREE.Vector3(-2, -.5, -2)
    var maxPan = new THREE.Vector3(2, .5, 2)

    const tick2 = () => {
        controls2.update()
        controls2.target.clamp(minPan, maxPan)
        renderer2.render(scene2, camera2)
        window.requestAnimationFrame(tick2)
    }

    tick2()

    function fitToContainer(canvas) {
    
    var parent = document.getElementById("webgl-1__container");
    canvas.style.width = parent.clientWidth;
    canvas.style.height= parent.clientHeight;
    canvas.width  = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
}

    function fitToContainer2(canvas2) {
    
    var parent2 = document.getElementById("webgl-2__container");
    canvas2.style.width = parent2.innerWidth;
    canvas2.style.height= parent2.innerHeight;
    canvas2.width  = parent2.offsetWidth;
    canvas2.height = parent2.offsetHeight;
}

window.addEventListener('resize', onWindowResize, false)
    
function onWindowResize() {
    fitToContainer2(canvas2);
    fitToContainer(canvas);

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)

    camera2.aspect = sizes2.width / sizes2.height
    camera2.updateProjectionMatrix()
    renderer2.setSize(sizes2.width, sizes2.height)
    renderer2.render(scene2, camera2)
}
}