/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
var Clock = THREE.Clock;
var FirstPersonControls = THREE.FirstPersonControls;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    var scene = new Scene();
    var renderer;
    var camera;
    var axes;
    var plane;
    var sun;
    var raedon;
    var blueBall;
    var redDevil;
    var moonLike;
    var icing;
    var eco;
    var sphereGeometry;
    var sphereMaterial;
    var ambientLight;
    var spotLight;
    var control;
    var gui;
    var stats;
    var step = 0;
    var clock;
    var emptyRaedon;
    var emptyBlueBall;
    var emptyRedDevil;
    var emptyMoonLike;
    var emptyIcing;
    var emptyEco;
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        // setup a THREE.js Clock object
        clock = new Clock();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera        
        //Add a Plane to the Scene
        plane = new gameObject(new PlaneGeometry(20, 20, 1, 1), new LambertMaterial({ color: 0xf4a460 }), 0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        plane.name = "ground";
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        // Add a Sun to the Scene
        sphereGeometry = new SphereGeometry(2.0, 25, 25);
        sphereMaterial = new LambertMaterial({ color: 0xD78415 });
        sun = new gameObject(sphereGeometry, sphereMaterial, 0, 2.5, 0);
        sun.name = "The Sun";
        scene.add(sun);
        console.log("Added Sun (Sphere Primitive) to the Scene");
        // Add an Empty Raedon to the scene
        emptyRaedon = new Object3D();
        emptyRaedon.position.set(0, 0, 0);
        sun.add(emptyRaedon);
        console.log("Added Empty Raedon to the sun object...");
        // Add planet Raedon to the scene
        raedon = new gameObject(new SphereGeometry(0.2, 22, 22), new LambertMaterial({ color: 0x4C0700 }), 5, 0, 0);
        emptyRaedon.add(raedon);
        console.log("Added Raedon to empty Raedon...");
        // Add an Empty Blue Ball to the scene
        emptyBlueBall = new Object3D();
        emptyBlueBall.position.set(0, 0, 0);
        sun.add(emptyBlueBall);
        console.log("Added emptyBlueBall to the sun object...");
        // Add planet Blue Ball to the scene
        blueBall = new gameObject(new SphereGeometry(0.3, 22, 22), new LambertMaterial({ color: 0x2E8195 }), 7, 0, 0);
        emptyBlueBall.add(blueBall);
        console.log("Added Blue Ball to emptyBlueBall...");
        // Add an Empty Red Devil to the scene
        emptyRedDevil = new Object3D();
        emptyRedDevil.position.set(0, 0, 0);
        sun.add(emptyRedDevil);
        console.log("Added emptyRedDevil to the sun object...");
        // Add planet redDevil to the scene
        redDevil = new gameObject(new SphereGeometry(0.7, 22, 22), new LambertMaterial({ color: 0xF14545 }), 10, 0, 0);
        emptyRedDevil.add(redDevil);
        console.log("Added redDevil to emptyRedDevil...");
        // Add an Empty Moon Like to the scene
        emptyMoonLike = new Object3D();
        emptyMoonLike.position.set(0, 0, 0);
        sun.add(emptyMoonLike);
        console.log("Added emptyMoonLike to the sun object...");
        // Add planet moonLike to the scene
        moonLike = new gameObject(new SphereGeometry(0.55, 18, 18), new LambertMaterial({ color: 0x908D8D }), 13, 0, 0);
        emptyMoonLike.add(moonLike);
        console.log("Added moonLike to emptyMoonLike...");
        // Add an Empty Icing to the scene
        emptyIcing = new Object3D();
        emptyIcing.position.set(0, 0, 0);
        sun.add(emptyIcing);
        console.log("Added emptyIcing to the sun object...");
        // Add planet icing to the scene
        icing = new gameObject(new SphereGeometry(0.35, 18, 18), new LambertMaterial({ color: 0xA156CB }), 15, 0, 0);
        emptyIcing.add(icing);
        console.log("Added icing to emptyIcing...");
        // Add an Empty Eco to the scene
        emptyEco = new Object3D();
        emptyEco.position.set(0, 0, 0);
        sun.add(emptyEco);
        console.log("Added emptyEco to the sun object...");
        // Add planet icing to the scene
        eco = new gameObject(new SphereGeometry(0.3, 18, 18), new LambertMaterial({ color: 0x2DCD49 }), 17, 0, 0);
        emptyEco.add(eco);
        console.log("Added eco to emptyEco...");
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(5.6, 23.1, 5.4);
        spotLight.rotation.set(-0.8, 42.7, 19.5);
        spotLight.intensity = 2;
        spotLight.shadowCameraNear = 1;
        spotLight.shadowMapHeight = 2048;
        spotLight.shadowMapWidth = 2048;
        spotLight.angle = 60 * (Math.PI / 180);
        spotLight.distance = 200;
        spotLight.castShadow = true;
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
        // add controls
        gui = new GUI();
        control = new Control(0.001);
        addControl(control);
        // add an axis helper to the scene
        axes = new AxisHelper(20);
        eco.add(axes);
        console.log("Added Axis Helper to scene...");
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        gui.add(controlObject, 'rotationSpeed', -0.05, 0.20);
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        var delta = clock.getDelta();
        if (control.rotationSpeed != 0) {
            sun.rotation.y += control.rotationSpeed;
            emptyRaedon.rotation.y += control.rotationSpeed + 0.065;
            emptyBlueBall.rotation.y += control.rotationSpeed + 0.05;
            emptyRedDevil.rotation.y += control.rotationSpeed + 0.015;
            emptyMoonLike.rotation.y += control.rotationSpeed + 0.005;
            emptyIcing.rotation.y += control.rotationSpeed + 0.002;
            emptyEco.rotation.y += control.rotationSpeed + 0.0005;
        }
        //firstPersonControls.update(delta);
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer({ alpha: true });
        renderer.setClearColor(0xffffff, 0.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
        //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 0.6;
        camera.position.y = 16;
        camera.position.z = -20.5;
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();

//# sourceMappingURL=game.js.map
