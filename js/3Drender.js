export function webglrender() {

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

    function fitToContainer(canvas) {
    
    var parent = document.getElementById("webgl-1__container");
    canvas.style.width = parent.clientWidth;
    canvas.style.height= parent.clientHeight;
    canvas.width  = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
}

window.addEventListener('resize', onWindowResize, false)
    
function onWindowResize() {
    fitToContainer(canvas);

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera)
}
}
