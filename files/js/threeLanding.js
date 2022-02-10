/**
 * Created by JNEP on 11/6/17.
 */
let scene, camera, mesh, renderer, material;
let heroHeight = jQuery('#hero').height();
const init = () => {
    // Get container id
    const container = document.getElementById('threeContainer');
    // create webgl renderer with no background color
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(window.innerWidth, heroHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const screenRatio = screenW / heroHeight;
    // set up the view frustum for camera view // this time will set the perceptive camera
    camera = new THREE.PerspectiveCamera(50, screenRatio, 1, 10000);
    // set up the position of the camera
    camera.position.z = 140;
    camera.position.x = -40;
    camera.position.y = 5;
//        controls = new THREE.OrbitControls(camera, renderer.domElement);

    //////////////////
    //** Light **//
    let light = new THREE.PointLight(0xffffff);
    light.position.set(20, 130, 20);

//         need to add an ambient light
//          for ambient colors to be visible
//         make the ambient light darker so that
//          it doesn't overwhelm (like emmisive light)
    let light2 = new THREE.AmbientLight(0x333333);
    light2.position.set(light.position);
    scene.add(light2);

    let lightbulbGeometry = new THREE.SphereGeometry(30, 16, 8);
    let lightbulbMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    let wireMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
    let materialArray = [lightbulbMaterial, wireMaterial];
    let lightbulb = THREE.SceneUtils.createMultiMaterialObject(lightbulbGeometry, materialArray);
    lightbulb.position = light.position;
//        scene.add(lightbulb);
    scene.add(light);


    // SphereGeometry(radius, widthSegments, heightSegments)
    let geometry = new THREE.SphereGeometry(50, 10, 10,);

    // regular surface
    mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        color: new THREE.Color("rgb(42,245,152)"),  //Diffuse color of the material
        emissive: new THREE.Color("rgb(0,158,253)"),
        specular: new THREE.Color("rgb(93,195,255)"),
        shading: THREE.FlatShading,
        wireframe: true//How the triangles of a curved surface are rendered: THREE.SmoothShading, THREE.FlatShading, THREE.NoShading

    }));

    // creating colors for particle vertices on sphere
    material2 = new THREE.ParticleBasicMaterial({
        size: 8,
        transparent: true,
        opacity: 0.5,
        color: 'white'
    });
    scene.add(mesh);
    let geometry2 = new THREE.Geometry();
    let vertices = mesh.geometry.vertices;
    for (let i = 0; i < vertices.length; i++) {
        let particle = new THREE.Vector3(vertices[i].x, vertices[i].y, vertices[i].z);
        particle.origin = new THREE.Vector3(vertices[i].x, vertices[i].y, vertices[i].z);
        geometry2.vertices.push(particle);
    }

    // mesh2 = new THREE.ParticleSystem(geometry2, material2);
    // mesh2.sortParticles = true;
    // scene.add(mesh2);
    // renderer.render(scene, camera);
    // const tweenReduc = new TWEEN.Tween(mesh2.scale).to({y: 0.05, x: 0.05, z: 0.05}, 5000).easing(TWEEN.Easing.Exponential.InOut).onStart(function () {
    //     new TWEEN.Tween(mesh2.material.color.getHSL()).to({h: 0.42, s: 91, l: 0.56}, 5000).onUpdate(
    //         function()
    //         {
    //             mesh2.material.color.setHSL(this.h, this.s, this.l);
    //         }
    //     ).start();
    // });
    // const tweenUp = new TWEEN.Tween(mesh2.scale).to({y: 3, x: 3, z: 3}, 400).onStart(function () {
    //     new TWEEN.Tween(mesh2.material.color.getHSL()).to({h: 0.58, s: 0.01, l: 0.58}, 400).onUpdate(
    //         function()
    //         {
    //             mesh2.material.color.setHSL(this.h, this.s, this.l);
    //         }
    //     ).start();
    // });
    // tweenReduc.chain(tweenUp);
    // tweenUp.chain(tweenReduc);
    // tweenReduc.start();
};
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    // Animation
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;

//        mesh2.rotation.x += 0.005;
    // mesh2.rotation.y += 0.005;
    // mesh2.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);

}
init();
animate();