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