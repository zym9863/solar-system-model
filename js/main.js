// 太阳系数据
const solarSystemData = {
    sun: {
        name: '太阳',
        radius: 20,  // 显示尺寸（非真实比例）
        color: 0xffff00,
        description: '太阳系的中心天体，一颗G型主序星。',
        rotationPeriod: 25.05, // 自转周期（地球日）
    },
    planets: [
        {
            name: '水星',
            radius: 2.4,
            distance: 40,  // 与太阳的距离（非真实比例）
            color: 0x8a8a8a,
            orbitColor: 0xffffff,
            orbitPeriod: 0.24,  // 公转周期（地球年）
            rotationPeriod: 58.6, // 自转周期（地球日）
            tilt: 0.03,  // 轨道倾角（弧度）
            description: '太阳系最内侧也是最小的行星，表面布满陨石坑。'
        },
        {
            name: '金星',
            radius: 6,
            distance: 70,
            color: 0xe39e1c,
            orbitColor: 0xffffff,
            orbitPeriod: 0.62,
            rotationPeriod: -243, // 负值表示逆向自转
            tilt: 0.03,
            description: '太阳系中最热的行星，被厚厚的二氧化碳大气层覆盖。'
        },
        {
            name: '地球',
            radius: 6.3,
            distance: 100,
            color: 0x2727e6,
            orbitColor: 0xffffff,
            orbitPeriod: 1,
            rotationPeriod: 1,
            tilt: 0.41,
            description: '我们的家园，是太阳系中唯一已知存在生命的行星。',
            moons: [
                {
                    name: '月球',
                    radius: 1.7,
                    distance: 10,
                    color: 0xcccccc,
                    orbitPeriod: 0.073  // 约27.3天
                }
            ]
        },
        {
            name: '火星',
            radius: 3.4,
            distance: 150,
            color: 0xc1440e,
            orbitColor: 0xffffff,
            orbitPeriod: 1.88,
            rotationPeriod: 1.03,
            tilt: 0.44,
            description: '被称为红色星球，表面有许多火山和峡谷。'
        },
        {
            name: '木星',
            radius: 14,
            distance: 250,
            color: 0xd8ca9d,
            orbitColor: 0xffffff,
            orbitPeriod: 11.86,
            rotationPeriod: 0.41,
            tilt: 0.05,
            description: '太阳系中最大的行星，是一个气态巨行星。'
        },
        {
            name: '土星',
            radius: 12,
            distance: 350,
            color: 0xead6b8,
            orbitColor: 0xffffff,
            orbitPeriod: 29.46,
            rotationPeriod: 0.44,
            tilt: 0.47,
            description: '以其壮观的环系统而闻名的气态巨行星。',
            rings: {
                innerRadius: 14,
                outerRadius: 22,
                color: 0xc6a780
            }
        },
        {
            name: '天王星',
            radius: 8,
            distance: 450,
            color: 0x82b3d1,
            orbitColor: 0xffffff,
            orbitPeriod: 84.01,
            rotationPeriod: -0.72, // 负值表示逆向自转
            tilt: 1.71, // 几乎垂直于轨道平面
            description: '一颗蓝绿色的冰巨行星，自转轴几乎平行于轨道平面。'
        },
        {
            name: '海王星',
            radius: 7.8,
            distance: 550,
            color: 0x3457eb,
            orbitColor: 0xffffff,
            orbitPeriod: 164.8,
            rotationPeriod: 0.67,
            tilt: 0.49,
            description: '太阳系最外层的行星，是一颗风暴活跃的蓝色冰巨行星。'
        }
    ]
};

// 初始化场景、相机和渲染器
let scene, camera, renderer, controls;
let planets = [];
let orbits = [];
let animationSpeed = 0.5; // 动画速度系数
let clock = new THREE.Clock();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selectedObject = null;
let infoPanel = document.getElementById('info-panel');

// 初始化函数
function init() {
    // 创建场景
    scene = new THREE.Scene();
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 200;
    camera.position.y = 100;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    // 添加环境光和平行光
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // 添加轨道控制器
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // 添加星空背景
    createStarBackground();
    
    // 创建太阳系
    createSolarSystem();
    
    // 添加窗口大小调整事件监听器
    window.addEventListener('resize', onWindowResize);
    
    // 添加鼠标点击事件监听器
    window.addEventListener('click', onMouseClick);
    
    // 开始动画循环
    animate();
}

// 创建星空背景
function createStarBackground() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: false
    });
    
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}

// 创建太阳系
function createSolarSystem() {
    // 创建太阳
    const sunGeometry = new THREE.SphereGeometry(solarSystemData.sun.radius, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: solarSystemData.sun.color,
        emissive: solarSystemData.sun.color,
        emissiveIntensity: 1
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData = { name: solarSystemData.sun.name, description: solarSystemData.sun.description };
    scene.add(sun);
    
    // 添加太阳光晕
    const sunGlow = createGlow(solarSystemData.sun.radius * 1.2, 0xffff00, 0.5);
    sun.add(sunGlow);
    
    // 创建行星和轨道
    solarSystemData.planets.forEach(planetData => {
        // 创建轨道
        const orbit = createOrbit(planetData.distance, planetData.tilt, planetData.orbitColor);
        scene.add(orbit);
        orbits.push(orbit);
        
        // 创建行星
        const planet = createPlanet(planetData);
        scene.add(planet);
        planets.push({
            mesh: planet,
            data: planetData,
            angle: Math.random() * Math.PI * 2 // 随机初始角度
        });
        
        // 如果行星有卫星，创建卫星
        if (planetData.moons) {
            planetData.moons.forEach(moonData => {
                const moon = createMoon(moonData, planet);
                planet.add(moon);
            });
        }
        
        // 如果行星有环，创建行星环
        if (planetData.rings) {
            const rings = createRings(planetData.rings, planetData.radius);
            planet.add(rings);
        }
    });
}

// 创建行星
function createPlanet(planetData) {
    const planetGeometry = new THREE.SphereGeometry(planetData.radius, 32, 32);
    const planetMaterial = new THREE.MeshLambertMaterial({ color: planetData.color });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.userData = { name: planetData.name, description: planetData.description };
    
    // 设置行星的初始位置
    planet.position.x = planetData.distance;
    
    return planet;
}

// 创建卫星
function createMoon(moonData, planet) {
    const moonGeometry = new THREE.SphereGeometry(moonData.radius, 16, 16);
    const moonMaterial = new THREE.MeshLambertMaterial({ color: moonData.color });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.userData = { name: moonData.name };
    
    // 创建卫星轨道
    const moonOrbit = createOrbit(moonData.distance, 0, 0xaaaaaa);
    planet.add(moonOrbit);
    
    // 设置卫星的初始位置
    moon.position.x = moonData.distance;
    
    // 创建卫星的父对象，用于旋转
    const moonPivot = new THREE.Object3D();
    moonPivot.add(moon);
    moonPivot.userData = { orbitPeriod: moonData.orbitPeriod, angle: Math.random() * Math.PI * 2 };
    
    return moonPivot;
}

// 创建行星环
function createRings(ringsData, planetRadius) {
    const ringGeometry = new THREE.RingGeometry(
        ringsData.innerRadius,
        ringsData.outerRadius,
        64
    );
    
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: ringsData.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    
    return ring;
}

// 创建轨道
function createOrbit(radius, tilt, color) {
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitMaterial = new THREE.LineBasicMaterial({ color: color || 0xffffff, transparent: true, opacity: 0.3 });
    
    const vertices = [];
    const segments = 128;
    
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        vertices.push(x, 0, z);
    }
    
    orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    
    // 应用轨道倾角
    if (tilt) {
        orbit.rotation.x = tilt;
    }
    
    return orbit;
}

// 创建发光效果
function createGlow(radius, color, intensity) {
    const glowGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: intensity,
        side: THREE.BackSide
    });
    return new THREE.Mesh(glowGeometry, glowMaterial);
}

// 更新行星位置
function updatePlanets(deltaTime) {
    planets.forEach((planet, index) => {
        // 更新行星角度
        planet.angle += (deltaTime * animationSpeed) / (planet.data.orbitPeriod * 10);
        
        // 计算行星位置
        const x = Math.cos(planet.angle) * planet.data.distance;
        const z = Math.sin(planet.angle) * planet.data.distance;
        planet.mesh.position.set(x, 0, z);
        
        // 更新行星自转
        const rotationSpeed = planet.data.rotationPeriod !== 0 ? 1 / Math.abs(planet.data.rotationPeriod) : 0;
        const rotationDirection = planet.data.rotationPeriod >= 0 ? 1 : -1;
        planet.mesh.rotation.y += rotationDirection * rotationSpeed * deltaTime * animationSpeed * 0.5;
        
        // 更新卫星位置
        if (planet.data.moons) {
            planet.mesh.children.forEach(child => {
                if (child.userData && child.userData.orbitPeriod) {
                    child.userData.angle += (deltaTime * animationSpeed) / (child.userData.orbitPeriod * 10);
                    child.rotation.y = child.userData.angle;
                }
            });
        }
    });
}

// 动画循环函数
function animate() {
    requestAnimationFrame(animate);
    
    // 更新控制器
    controls.update();
    
    // 获取时间增量
    const deltaTime = clock.getDelta();
    
    // 更新行星位置
    updatePlanets(deltaTime);
    
    // 渲染场景
    renderer.render(scene, camera);
}

// 窗口大小调整函数
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 鼠标点击事件处理函数
function onMouseClick(event) {
    // 计算鼠标位置的标准化设备坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // 从相机发射射线
    raycaster.setFromCamera(mouse, camera);
    
    // 计算与射线相交的对象
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    // 重置选中对象
    selectedObject = null;
    
    // 查找第一个有效的交点
    for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.userData && object.userData.name) {
            selectedObject = object;
            break;
        }
    }
    
    // 更新信息面板
    if (selectedObject) {
        infoPanel.innerHTML = `<h3>${selectedObject.userData.name}</h3>`;
        if (selectedObject.userData.description) {
            infoPanel.innerHTML += `<p>${selectedObject.userData.description}</p>`;
        }
    } else {
        infoPanel.innerHTML = '点击行星可查看详情';
    }
}

// 页面加载完成后初始化
window.onload = init;