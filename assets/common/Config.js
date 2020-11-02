/*
 * 配置
 */

export const osVersion = '1.0.0';
export const osGameName = 'pubg';

export const debugConfig = function () {
    this.gameName = '';

    // cc.debug.setDisplayStats(false);
    // cc.director.setDisplayStats(false);

    // let manager = cc.director.getCollisionManager();
    // manager.enabled = true;
    // manager.enabledDebugDraw = true;
    // manager.enabledDrawBoundingBox = true;

    // let manager = cc.director.getPhysicsManager();
    // manager.enabled = true;
    // manager.gravity = cc.v2(0, 0);
    // manager.debugDrawFlags = 0;
    // manager.enabledAccumulator = true;// 开启物理步长的设置
    // manager.FIXED_TIME_STEP = 1 / 30;// 物理步长，默认 FIXED_TIME_STEP 是 1/60
    // manager.VELOCITY_ITERATIONS = 8;// 每次更新物理系统处理速度的迭代次数，默认为 10
    // manager.POSITION_ITERATIONS = 8;// 每次更新物理系统处理位置的迭代次数，默认为 10
    // manager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
    //     cc.PhysicsManager.DrawBits.e_pairBit |
    //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    //     cc.PhysicsManager.DrawBits.e_jointBit |
    //     cc.PhysicsManager.DrawBits.e_shapeBit;
};

export const startSceneName = 'Home';
export const preloadSceneList = [
    'Home'
];

export const localStorageInit = function () {
    if (!this.getItem2(osGameName)) {
        this.setItem2(osGameName, true);
        this.setItem2('bgm', true);                                          		//音乐
        this.setItem2('sfx', true);                                          		//音效
        this.setItem2('keyList', []);                                               //本地存储的所有KEY
    }
};

export const localStorageConfig = function () {
    yy.initStorage.call(this);
};
