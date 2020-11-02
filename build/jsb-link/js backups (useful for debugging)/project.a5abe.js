window.__require = function e(t, n, i) {
function o(a, r) {
if (!n[a]) {
if (!t[a]) {
var c = a.split("/");
c = c[c.length - 1];
if (!t[c]) {
var l = "function" == typeof __require && __require;
if (!r && l) return l(c, !0);
if (s) return s(c, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = c;
}
var u = n[a] = {
exports: {}
};
t[a][0].call(u.exports, function(e) {
return o(t[a][1][e] || e);
}, u, u.exports, e, t, n, i);
}
return n[a].exports;
}
for (var s = "function" == typeof __require && __require, a = 0; a < i.length; a++) o(i[a]);
return o;
}({
Banzhuan: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "759650Xo39HOZWNzcM89lcV", "Banzhuan");
cc.Class({
extends: cc.Component,
properties: {
fly: !1,
v_x: 0,
v_y: 0
},
update: function(e) {
if (this.fly) {
var t = this.node.parent.getChildByName("Player");
this.node.x += this.v_x * e;
this.v_y -= 500 * e;
this.node.y += this.v_y * e;
this.node.y < t.y - t.height && this.node.destroy();
}
}
});
cc._RF.pop();
}, {} ],
Base: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "02bdc/gjnZCAqxKC8TmM+Pb", "Base");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.className = this.name.match(/<(\S*)>/)[1];
this.node.className = this.className;
rpc[this.className] = this;
this.startOpenPrefab = !1;
},
onDestroy: function() {},
start: function() {},
onEnable: function() {},
onDisable: function() {},
changeScene: function(e) {
os.changeScene({
name: e
});
},
waiting: function(e) {
os.waiting({
isWaiting: e
});
},
miniMessage: function(e, t, n) {
os.event.emit("miniMessage", {
content: e,
cb: t,
pos: n
});
},
showPanel: function(e, t) {
if (e) {
e.data = t;
e.active = !0;
e.emit("onShow", t);
} else cc.log("error showPanel", e, t);
},
showPrefab: function(e, t, n) {
var i = this, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
if (!this.startOpenPrefab) {
var s = (n = n || cc.director.getScene().gn("Canvas")).gn(e);
if (s) {
s.data = t;
s.active = !0;
s.emit("onShow", t);
} else os.loader.loadPrefab("prefab/" + e, function(e) {
i.startOpenPrefab = !1;
e.zIndex = o;
e.data = t;
e.active = !0;
e.parent = n;
e.emit("onShow", t);
});
}
},
showBgPrefab: function(e, t, n) {
var i = this, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
if (!this.startOpenPrefab) {
var s = (n = n || cc.director.getScene().gn("Canvas")).gn(e);
if (s) {
s.data = t;
s.active = !0;
s.emit("onShow", t);
} else os.loader.loadPrefab("prefab/bg_layer/" + e, function(e) {
i.startOpenPrefab = !1;
e.zIndex = o;
e.data = t;
e.active = !0;
e.parent = n;
e.emit("onShow", t);
});
}
}
});
cc._RF.pop();
}, {} ],
BoneBase: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c7d99y49JBFnbRnks1rYLiH", "BoneBase");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("Base"));
cc.Class({
extends: i.default,
properties: {},
onLoad: function(e) {
e && this._super();
this.aramature = this.$(dragonBones.ArmatureDisplay);
this.aramature.addEventListener(dragonBones.EventObject.COMPLETE, this.animationEventHandler, this);
this.defaultAnimName = "newAnimation";
},
onDestroy: function() {},
onEnable: function() {
this.aramature.playAnimation(this.defaultAnimName);
},
animationEventHandler: function(e) {
var t = (e.detail || e).animationState.name;
e.type === dragonBones.EventObject.COMPLETE && t === this.defaultAnimName && (this.node.active = !1);
}
});
cc._RF.pop();
}, {
Base: "Base"
} ],
Config: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "66640mHoUxM+6KXhQs4D4Jw", "Config");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.localStorageConfig = n.localStorageInit = n.preloadSceneList = n.startSceneName = n.debugConfig = n.osGameName = n.osVersion = void 0;
n.osVersion = "1.0.0";
n.osGameName = "pubg";
n.debugConfig = function() {
this.gameName = "";
};
n.startSceneName = "Home";
n.preloadSceneList = [ "Home" ];
n.localStorageInit = function() {
if (!this.getItem2("pubg")) {
this.setItem2("pubg", !0);
this.setItem2("bgm", !0);
this.setItem2("sfx", !0);
this.setItem2("keyList", []);
}
};
n.localStorageConfig = function() {
yy.initStorage.call(this);
};
cc._RF.pop();
}, {} ],
FireCircle: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "617e2Vl18NC9L0Y8B8ogtsw", "FireCircle");
var i = e("../YouYou");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
this.schedule(function() {
this.moveLeft();
}, 1);
},
onLoad: function() {},
moveLeft: function() {
cc.tween(this.node).to(1, {
position: cc.v2(this.node.x - i.speedFire, this.node.y)
}).call(function() {}).start();
}
});
cc._RF.pop();
}, {
"../YouYou": "YouYou"
} ],
FloatTile: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2287cpAgXNIB68/NjuT7cmX", "FloatTile");
cc.Class({
extends: cc.Component,
properties: {
_bCanMove: 0
},
onLoad: function() {},
start: function() {
if (this._bCanMove) {
var e = cc.repeatForever(cc.sequence(cc.moveBy(2, 200, 0), cc.moveBy(2, -200, 0)));
this.node.runAction(e);
}
},
onCollisionEnter: function(e, t) {}
});
cc._RF.pop();
}, {} ],
Game: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "70b61800pdKNJ20fYoSVK4f", "Game");
var i = s(e("SceneBase")), o = s(e("./YouYou"));
function s(e) {
return e && e.__esModule ? e : {
default: e
};
}
cc.Class({
extends: i.default,
properties: {
Player: {
type: cc.Node,
default: null
},
lblTime: {
type: cc.Label,
default: null
},
left: {
type: cc.Node,
default: null
},
right: {
type: cc.Node,
default: null
},
up: {
type: cc.Node,
default: null
},
camera: {
type: cc.Node,
default: null
},
circleFire: {
type: cc.Prefab,
default: null
},
floorPrefab: {
type: cc.Prefab,
default: null
},
firePlate: {
type: cc.Prefab,
default: null
},
fireHole: {
type: cc.Prefab,
default: null
},
floatTile: {
type: cc.Prefab,
default: null
},
monkeyObj: {
type: cc.Prefab,
default: null
},
flowerObj: {
type: cc.Prefab,
default: null
},
stoneObj: {
type: cc.Prefab,
default: null
},
ground: {
type: cc.Node,
default: null
},
arrBackground: {
default: [],
type: [ cc.Node ]
},
destination: {
type: cc.Node,
default: null
},
_targetFire: null,
nearCamera: cc.Camera,
farCamera: cc.Camera,
bg01: cc.Sprite,
bg02: cc.Sprite,
nearbg01: cc.Sprite,
nearbg02: cc.Sprite,
_count: 0,
_farCount: 0,
_nearCount: 0,
_farSpeed: 0,
_nearSpeed: 0,
_initFireX: 300,
_arrStonePos: null,
_arrXkPos: null,
_arrXkAtrPos: null,
_arrHqPos: null,
_arrHpPos: null,
_arrHkPos: null,
_arrHkDir: null,
_arrMonkeyPos: null,
_arrMonkeyAtr: null,
_arrFlowerPos: null
},
playerJS: null,
onLoad: function() {
this._super();
os.init();
cc.director.getCollisionManager().enabled = !0;
this._farCount = this._nearCount = 1;
this._farSpeed = this._nearSpeed = 0;
this.playerJS = this.Player.getComponent("Player");
this.Player.getComponent(cc.BoxCollider).tag = 5;
this.left.on(cc.Node.EventType.TOUCH_START, this.leftPress, this);
this.left.on(cc.Node.EventType.TOUCH_END, this.leftRelease, this);
this.right.on(cc.Node.EventType.TOUCH_START, this.rightPress, this);
this.right.on(cc.Node.EventType.TOUCH_END, this.rightRelease, this);
this.up.on(cc.Node.EventType.TOUCH_START, this.upPress, this);
this.up.on(cc.Node.EventType.TOUCH_END, this.upRelease, this);
this.Player.zIndex = this.camera.zIndex - 1;
this.destination.zIndex = this.Player.zIndex - 1;
this.destination.getComponent(cc.BoxCollider).tag = 7;
},
start: function() {
this.changeUISkin();
this.createMapNode();
this.parseJsonData();
this.createStone();
this.createFloatTile();
this.createMonkey();
},
changeUISkin: function() {
for (var e = 0; e < this.arrBackground.length; e++) {
var t = this.arrBackground[e], n = 2 == o.default.selectLevel ? "bgxuedi" : "background";
cc.loader.loadRes(n, cc.SpriteFrame, function(e, n) {
t.getComponent(cc.Sprite).spriteFrame = n;
});
}
},
createMapNode: function() {
for (var e = 0; e < 30; e++) {
var t = cc.instantiate(this.floorPrefab);
t.zIndex = this.camera.zIndex - 1;
2 == o.default.selectLevel ? t.getChildByName("btmtile1").active = !0 : t.getChildByName("btmtile1").active = !1;
t.parent = this.node;
t.x = -cc.winSize.width / 2 + t.width / 2 + t.width * e;
t.y = -cc.winSize.height / 2 + 2 * t.height - 3;
}
},
parseJsonData: function() {
var e = os.data.getDataForName("guanqia");
console.log("allData is:   ");
var t = e[0];
console.log(t);
if (t.gametime > 0) {
this._count = t.gametime;
this.schedule(function() {
this.calculateTime();
}, 1, t.gametime, 0);
} else this.lblTime.string = "";
this._arrStonePos = os.util.splitToArray(t.shikuai);
this._arrXkPos = os.util.splitToArray(t.xkpos);
this._arrXkAtrPos = os.util.splitToArray(t.xkattr);
this._arrHqPos = os.util.splitToArray(t.hqpos);
this._arrHpPos = os.util.splitToArray(t.hppos);
this._arrHkPos = os.util.splitToArray(t.hkpos);
this._arrMonkeyPos = os.util.splitToArray(t.mkpos);
this._arrMonkeyAtr = os.util.splitToSingleArray(t.mkattr);
this._arrHkDir = os.util.splitToSingleArray(t.hkdirect);
this._arrFlowerPos = os.util.splitToArray(t.flowerpos);
},
createStone: function() {
for (var e = 0; e < this._arrStonePos.length; e++) {
var t = this._arrStonePos[e];
if (0 != t.x || 0 != t.y) {
var n = cc.instantiate(this.stoneObj);
n.x = t.x;
n.y = this.ground.y + t.y;
n.zIndex = this.Player.zIndex;
n.parent = this.node;
}
}
},
createFloatTile: function() {
for (var e = 0; e < this._arrXkPos.length; ++e) {
var t = this._arrXkPos[e];
if (0 != t.x || 0 != t.y) {
var n = this._arrXkAtrPos[e].x, i = this._arrXkAtrPos[e].y;
for (e = 0; e < n; ++e) {
var o = cc.instantiate(this.floatTile);
if (0 == e) {
var s = o.getChildByName("lefttile"), a = o.getChildByName("righttile"), r = o.addComponent(cc.BoxCollider);
s.active = !0;
a.active = !0;
var c = n > 1 ? 30 + 30 * (n - 2) : 0;
a.x += 60 * (n - 1);
r.offset = cc.v2(c, -3);
r.size = cc.size(60 * n, 50);
}
o.getComponent("FloatTile")._bCanMove = i;
o.parent = this.node;
o.x = t.x + 60 * e;
o.y = this.ground.y + 200 + o.height / 2;
}
}
}
},
createFirePlate: function() {
for (var e = 0; e < this._arrHpPos.length; e++) if (0 != this._arrHpPos[e].x || 0 != this._arrHpPos[e].y) {
var t = cc.instantiate(this.firePlate);
t.zIndex = this.camera.zIndex - 1;
t.parent = this.node;
t.x = this._arrHpPos[e].x;
t.y = this.ground.y + this._arrHpPos[e].y;
}
},
createFireHole: function() {
for (var e = 0; e < this._arrHkPos.length; e++) if (0 != this._arrHkPos[e].x || 0 != this._arrHkPos[e].y) {
var t = Number(this._arrHkDir[e]), n = cc.instantiate(this.fireHole);
n.getComponent(cc.BoxCollider).tag = 4;
n.getComponent("HoleControl")._shootDir = t;
n.zIndex = this.camera.zIndex - 1;
n.parent = this.node;
n.x = this._arrHkPos[e].x;
n.y = this.ground.y + this._arrHkPos[e].y;
}
},
createFlower: function() {
for (var e = 0; e < this._arrFlowerPos; ++e) {
var t = cc.instantiate(this.flowerObj);
t.getComponent(cc.BoxCollider).tag = 2;
t.zIndex = this.camera.zIndex - 1;
t.parent = this.node;
t.scale = .4;
t.x = 60;
t.y = this.ground.y + t.height / 4;
}
},
createFloatFire: function() {
for (var e = this, t = this, n = function(n) {
if (0 === t._arrHqPos[n].x && 0 === t._arrHqPos[n].y) return "continue";
e.schedule(function() {
t._targetFire = cc.instantiate(t.circleFire);
if (t._targetFire) {
t._targetFire.getComponent(cc.PolygonCollider).tag = 1;
t._targetFire.x = t._arrHqPos[n].x;
t._targetFire.y = t.ground.y + t._arrHqPos[n].y - 36;
t._targetFire.zIndex = t.Player.zIndex - 1;
t._targetFire.parent = t.node;
}
}, 2, cc.macro.REPEAT_FOREVER, 2);
}, i = 0; i < this._arrHqPos.length; i++) n(i);
},
createMonkey: function() {
for (var e = this, t = this, n = function(n) {
if (0 == t._arrMonkeyPos[n].x && 0 == t._arrMonkeyPos[n].y) return "continue";
o = Number(t._arrMonkeyAtr[n]);
e.scheduleOnce(function() {
var e = cc.instantiate(t.monkeyObj);
e.getComponent(cc.BoxCollider).tag = 3;
e.getComponent("Monkey")._monkeyType = Number(o) - 1;
e.x = this._arrMonkeyPos[n].x;
e.y = t.ground.y + this._arrMonkeyPos[n].y;
e.zIndex = t.Player.zIndex;
e.parent = t.node;
}, 10);
}, i = 0; i < this._arrMonkeyPos.length; i++) {
var o;
n(i);
}
},
calculateTime: function() {
this.lblTime.string = this._count.toString();
0 != this._count ? this._count-- : this.unschedule(this.calculateTime);
},
onDestroy: function() {
this.left.off(cc.Node.EventType.TOUCH_START, this.leftPress, this);
this.left.off(cc.Node.EventType.TOUCH_END, this.leftRelease, this);
this.right.off(cc.Node.EventType.TOUCH_START, this.rightPress, this);
this.right.off(cc.Node.EventType.TOUCH_END, this.rightRelease, this);
this.up.off(cc.Node.EventType.TOUCH_START, this.upPress, this);
this.up.off(cc.Node.EventType.TOUCH_END, this.upRelease, this);
},
leftPress: function() {
this._farSpeed = -30;
this._nearSpeed = -300;
this.playerJS.playerLeft();
},
rightPress: function() {
this._farSpeed = 60;
this._nearSpeed = 600;
this.playerJS.playerRight();
},
leftRelease: function() {
this._farSpeed = this._nearSpeed = 0;
this.playerJS.noLRControlPlayer();
},
rightRelease: function() {
this._farSpeed = this._nearSpeed = 0;
this.playerJS.noLRControlPlayer();
},
upPress: function() {
this.playerJS.playerUp();
},
upRelease: function() {
this.playerJS.noUpControlPlayer();
},
backToMainMenu: function() {
this.changeScene("Home");
},
winNodeTouch: function(e, t) {
switch (t) {
case "1":
this.changeScene("Home");
break;

case "2":
case "3":
this.changeScene("Game");
break;

case "4":
this.changeScene("Level");
}
},
loseNodeTouch: function(e, t) {
switch (t) {
case "1":
this.changeScene("Home");
break;

case "2":
this.changeScene("Game");
break;

case "4":
this.changeScene("Level");
}
},
lateUpdate: function(e) {
0 != this.Player.active && this.updateFarCamera(e);
},
updateFarCamera: function(e) {
if (!(this.Player.x <= -cc.winSize.width / 2 + this.node.width / 4 - 10 || this.Player.x >= cc.winSize.width + cc.winSize.width / 2 - this.node.width / 4 + cc.winSize.width + 10)) {
this.farCamera.node.x += e * this._farSpeed;
if (1 == this._farCount % 2) {
if (this.farCamera.node.x > this._farCount * this.bg01.node.width) {
this.bg01.node.x = (this._farCount + 1) * this.bg01.node.width;
this._farCount++;
}
} else if (this.farCamera.node.x > this._farCount * this.bg02.node.width) {
this.bg02.node.x = (this._farCount + 1) * this.bg02.node.width;
this._farCount++;
}
}
},
updateNearCamera: function(e) {
if (!(this.Player.x <= -cc.winSize.width / 2 + this.Player.width + 100 || this.Player.x >= cc.winSize.width + cc.winSize.width / 2 - this.Player.width - 50)) {
this.nearCamera.node.x += e * this._nearSpeed;
if (1 == this._nearCount % 2) {
if (this.nearCamera.node.x > this._nearCount * this.nearbg01.node.width) {
this.nearbg01.node.x = (this._nearCount + 1) * this.nearbg01.node.width;
this._nearCount++;
}
} else if (this.nearCamera.node.x > this._nearCount * this.nearbg02.node.width) {
this.nearbg02.node.x = (this._nearCount + 1) * this.nearbg02.node.width;
this._nearCount++;
}
}
}
});
cc._RF.pop();
}, {
"./YouYou": "YouYou",
SceneBase: "SceneBase"
} ],
HoleControl: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "56c50oNMEhMU7gXin6FoHVj", "HoleControl");
cc.Class({
extends: cc.Component,
properties: {
_shootDir: 0
},
onLoad: function() {
switch (this._shootDir) {
case 1:
this.node.rotation = 0;
break;

case 2:
this.node.rotation = 180;
break;

case 3:
this.node.rotation = 270;
break;

case 4:
this.node.rotation = 90;
}
},
start: function() {},
onCollisionEnter: function(e, t) {}
});
cc._RF.pop();
}, {} ],
Home: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "85a1azURq5OgZZ/FIpkZyjI", "Home");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("SceneBase"));
function o(e) {
"@babel/helpers - typeof";
return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
})(e);
}
cc.Class({
extends: i.default,
properties: {},
onLoad: function() {},
start: function() {},
touchBtn: function(e, t) {
console.log("event target name:  " + e.currentTarget.name);
console.log(o(t));
console.log(t);
switch (t) {
case "1":
case "2":
this.changeScene("Level");
break;

case "3":
console.log("turntable");
break;

case "4":
console.log("sign");
break;

case "5":
console.log("pifu");
}
}
});
cc._RF.pop();
}, {
SceneBase: "SceneBase"
} ],
Level: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ba205R9CTBJuJCDMaID0BT0", "Level");
var i = s(e("SceneBase")), o = s(e("./YouYou"));
function s(e) {
return e && e.__esModule ? e : {
default: e
};
}
cc.Class({
extends: i.default,
properties: {
btnPrefab: {
type: cc.Prefab,
default: null
},
_initX: 0,
_initY: 0,
_unlockPos: 0
},
onLoad: function() {
console.log("YYYYYYYYYYYYYYYYY");
this._super();
this._initX = -cc.winSize.width / 4;
this._initY = 0;
this._unlockPos = 5;
},
start: function() {
var e = this, t = this;
console.log("zzzzzzzzzzzzzzzz");
console.log(t._initX);
console.log(t._initY);
for (var n = function(n) {
var i = cc.instantiate(t.btnPrefab);
if (i) if (n < e._unlockPos) {
i.touchEnabled = !0;
cc.loader.loadRes("jiesuo", cc.SpriteFrame, function(e, o) {
var s = i.getChildByName("Background");
s.getComponent(cc.Sprite).spriteFrame = o;
i.x = t._initX + (i.width + 50) * Math.floor(n % 5);
i.y = t._initY - (i.height + 70) * Math.floor(n / 5);
s.getChildByName("Label").getComponent(cc.Label).string = (n + 1).toString();
i.parent = t.node;
});
i.on(cc.Node.EventType.TOUCH_END, t.touchLv, t);
} else {
i.touchEnabled = !1;
cc.loader.loadRes("weijiesuo2", cc.SpriteFrame, function(e, o) {
var s = i.getChildByName("Background");
s.getComponent(cc.Sprite).spriteFrame = o;
s.getChildByName("Label").getComponent(cc.Label).string = "";
i.x = t._initX + (i.width + 50) * Math.floor(n % 5);
i.y = t._initY - (i.height + 50) * Math.floor(n / 5) + 50;
i.parent = t.node;
});
}
}, i = 0; i < 10; i++) n(i);
},
touchLv: function(e) {
var t = e.currentTarget.name, n = t.substr(t.length - 1, 1);
o.default.selectLevel = n;
this.changeScene("Game");
},
backHome: function() {
this.changeScene("Home");
}
});
cc._RF.pop();
}, {
"./YouYou": "YouYou",
SceneBase: "SceneBase"
} ],
Loading: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0c306waQAZEG4hvtMEIArGO", "Loading");
var i = e("Config"), o = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("SceneBase"));
cc.Class({
extends: o.default,
properties: {
lbProgress: cc.Label,
pro: cc.Node,
backGround: cc.Node
},
onLoad: function() {
this._super();
this.count = 0;
this.prefabCount = 0;
this.completedCount = 0;
this.totalCount = 0;
this.loadAudioList = [];
this.loadAudioListLen = 0;
this.audioIdx = 0;
this.loadPrefabList = [];
this.loadPrefabListLen = 0;
this.prefabIdx = 0;
this.loadResList = [];
this.loadResListLen = 0;
this.resIdx = 0;
if (os.isInitLoading) this.changeScene(!0); else {
os.init();
os.isInitLoading = !0;
this.preloadScene();
this.loadOtherRes();
}
},
onEnable: function() {
this.lbProgress.string = "";
this.pro.fillRange = 0;
},
changeScene: function(e) {
cc.loader.onProgress = e ? this.onProgress.bind(this) : function() {};
os.ls.isLoad && os.isLoadJson && os.isLoadTxt ? this.runScene() : this.schedule(this.startGame, 1 / 60);
},
startGame: function() {
if (os.ls.isLoad && os.isLoadJson) {
this.unschedule(this.startGame);
this.runScene();
}
},
runScene: function() {
os.util.changeSceneForRootNode();
cc.log("os.sceneName [" + os.sceneName + "]");
cc.director.loadScene(os.sceneName);
},
preloadScene: function() {
var e = i.preloadSceneList[this.count];
if (e) {
var t = cc.ENGINE_VERSION.split(".")[0];
if ("1" === t || "Cocos2d-x-lite v1" === t) {
cc.loader.onProgress = this.onProgress.bind(this);
cc.director.preloadScene(e, this.onLoaded.bind(this));
} else cc.director.preloadScene(e, this.onProgress.bind(this), this.onLoaded.bind(this));
}
},
onProgress: function(e, t) {
this.completedCount = e;
this.totalCount = t;
this.flushPro();
},
flushPro: function() {
var e = this.completedCount + this.audioIdx + this.prefabIdx + this.resIdx, t = this.totalCount + this.loadAudioListLen + this.loadPrefabListLen + this.loadResListLen;
if (this.lbProgress) {
var n = (100 * e / t).toFixed(2);
this.lbProgress.string = n + "%";
this.pro && (this.pro.fillRange = n / 100);
}
e >= t && this.changeScene(!1);
},
onLoaded: function() {
var e = i.preloadSceneList[this.count];
this.count += 1;
cc.log(e + "场景加载完成");
this.count >= i.preloadSceneList.length ? cc.log("全部场景加载完成") : this.preloadScene();
},
loadOtherRes: function() {},
loadRes: function() {
var e = this;
!this.loadPrefabListLen || this.resIdx >= this.loadPrefabListLen || os.loader.loadSpriteAtlas(this.loadResList[this.resIdx], null, function() {
e.resIdx += 1;
e.loadRes();
e.flushPro();
});
}
});
cc._RF.pop();
}, {
Config: "Config",
SceneBase: "SceneBase"
} ],
Monkey: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "97f08t2SXJPjqjkEMjaa9wk", "Monkey");
e("../YouYou");
cc.Class({
extends: cc.Component,
properties: {
speed: cc.v2(0, 0),
maxSpeed: cc.v2(1300, 1300),
drag: 1e3,
direction: 0,
bone: {
type: cc.Prefab,
default: null
},
_monkeyType: 0,
_bDead: !1
},
onLoad: function() {
this.collisionX = 0;
this.direction = -1;
this.prePosition = cc.v2();
this.preStep = cc.v2();
this.touchingNumber = 0;
this.drag = 1e3;
this._bDead = !1;
var e = "";
switch (this._monkeyType) {
case 0:
e = "wmonkey";
break;

case 1:
e = "ymonkey";
break;

case 2:
e = "rmonkey";
}
var t = this;
cc.loader.loadRes(e, cc.SpriteFrame, function(e, n) {
t.node.getComponent(cc.Sprite).spriteFrame = n;
});
},
start: function() {},
instanceAndThrowBones: function() {
var e = this.node.parent.getChildByName("Player"), t = e.x - this.node.x, n = e.y + 250 - this.node.y;
this.hudu = Math.atan2(n, t);
this.lidu = cc.v2(e.x, e.y + 250).sub(cc.v2(this.node.x, this.node.y)).mag();
var i = cc.instantiate(this.bone);
i.parent = this.node.parent;
i.x = this.node.x;
i.y = this.node.y;
var o = i.getComponent("Banzhuan");
o.v_x = this.lidu * Math.cos(this.hudu);
o.v_y = this.lidu * Math.sin(this.hudu);
o.fly = !0;
},
onCollisionEnter: function(e, t) {
console.log("other name***************:    " + e.node.name);
console.log("other tag***************:    " + e.tag);
switch (e.tag) {
case 0:
this.collisionStoneEnter(e, t);
break;

case 5:
this.collisionPlayerEnter(e, t);
}
},
collisionStoneEnter: function(e, t) {
console.log("猴子碰到石头了!!!!");
var n = e.world.aabb, i = e.world.preAabb.clone(), o = t.world.aabb, s = t.world.preAabb.clone();
s.x = o.x;
i.x = n.x;
if (cc.Intersection.rectRect(s, i)) {
if (this.speed.x < 0 && s.xMax > i.xMax) {
this.node.x += Math.floor(Math.abs(n.xMax - o.xMin));
this.collisionX = -1;
this.direction = 1;
this.node.scaleX = .35;
} else if (this.speed.x > 0 && s.xMin < i.xMin) {
this.node.x -= Math.floor(Math.abs(n.xMin - o.xMax));
this.collisionX = 1;
this.direction = -1;
this.node.scaleX = -.35;
} else 0 == this.speed.x && s.xMax == i.xMin && (this.fallDown = !0);
this.speed.x = 0;
} else ;
},
collisionPlayerEnter: function(e, t) {
var n = this, i = t.world.aabb;
if (e.world.aabb.yMin + 15 >= i.yMin + i.height) {
this.speed.x = 0;
this.speed.y = 0;
this._bDead = !0;
cc.tween(this.node).to(.5, {
anchorY: 1,
scaleX: this.node.scaleX / 2,
scaleY: Math.abs(this.node.scaleX) / 2
}, {
easing: "easeSineIn"
}).to(.5, {
anchorY: 1,
scaleX: this.node.scaleX / 6,
scaleY: Math.abs(this.node.scaleX) / 6,
y: this.node.y - 30
}, {
easing: "easeSineIn"
}).call(function() {
n.node && n.node.destroy();
}).start();
}
},
lateUpdate: function(e) {
if (!this._bDead) {
this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * e;
Math.abs(this.speed.x) > this.maxSpeed.x && (this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x);
this.speed.x * this.collisionX > 0 && (this.direction = 1);
this.node.x += this.speed.x * e * 1;
}
}
});
cc._RF.pop();
}, {
"../YouYou": "YouYou"
} ],
OS: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f76aetEyQlNPoHhehhZD6Xn", "OS");
var i = l(e("OsUtil")), o = l(e("OsJsonData")), s = l(e("OsLoader")), a = l(e("OsLocalStorage")), r = l(e("OsAudio")), c = e("Config");
function l(e) {
return e && e.__esModule ? e : {
default: e
};
}
function u(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function f(e, t, n) {
t && h(e.prototype, t);
n && h(e, n);
return e;
}
var d = function() {
function e() {
u(this, e);
console.log("os v" + c.osVersion);
this.cocosVersion = cc.ENGINE_VERSION.split(".");
this.event = new cc.EventTarget();
this.firstInit = !1;
this.isInitLoading = !1;
this.isInitRootNode = !1;
this.sceneCount = 0;
this.sceneName = c.startSceneName;
this.shieldedFontLibrary = [];
this.gameHideTime = 0;
this.shareTime = 0;
this.firstLogin = !0;
this.serverData = {};
this.util = new i.default();
this.data = new o.default();
this.loader = new s.default();
this.audio = new r.default();
this.ls = new a.default();
cc.game.on(cc.game.EVENT_SHOW, this._gameOnShow, this);
cc.game.on(cc.game.EVENT_HIDE, this._gameOnHide, this);
}
f(e, [ {
key: "init",
value: function() {
console.log("OS init **************");
c.debugConfig.call(this);
this.s2 = {
x: cc.winSize.width / 2,
y: cc.winSize.height / 2,
width: cc.winSize.width / 2,
height: cc.winSize.height / 2
};
this.util.init();
this.data.init();
this.loader.init();
this.audio.init();
this.isLoadJson = !0;
this.isLoadTxt = !0;
this.isLoadImgage = !0;
this._loadJson();
}
}, {
key: "changeScene",
value: function(e) {
this.util.changeSceneForRootNode();
this.sceneName = e.name;
cc.director.loadScene("Loading");
}
}, {
key: "waiting",
value: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
cc.director.getScene() && (cc.director.getScene().gn("waiting_layer").active = e.isWaiting);
}
}, {
key: "restart",
value: function() {
this.isInitLoading = !1;
this.isInitRootNode = !1;
this.shieldedFontLibrary = [];
this.gameName = "";
this.ls.isLoad = !1;
this.ls.clear();
cc.game.restart();
}
}, {
key: "_gameOnShow",
value: function() {
cc.game.resume();
this.ls.getItem2("bgm") ? cc.audioEngine.resumeAll() : cc.audioEngine.pauseAll();
this.shareTime = this.util.getCurrentTimestamp() - this.gameHideTime;
}
}, {
key: "_gameOnHide",
value: function() {
cc.audioEngine.pauseAll();
cc.game.pause();
this.gameHideTime = this.util.getCurrentTimestamp();
}
}, {
key: "_beforeSceneLoading",
value: function() {
cc.log("beforeSceneLoading");
}
}, {
key: "_afterSceneLaunch",
value: function() {
cc.log("afterSceneLaunch");
}
}, {
key: "_loadJson",
value: function() {
var e = this;
console.log("_loadJSon ******");
this.isLoadJson = !1;
this.loader.loadJson("json/osjson", function(t) {
var n = e.data.parseAllData(t);
e.data.setJsonData(n);
window.osjson = e.data.parseAllData(t, !0);
cc.log("allData", n);
cc.log("osjson", osjson);
cc.log(cc.sys.localStorage);
e.isLoadJson = !0;
e.ls.init();
});
}
}, {
key: "_loadServerJson",
value: function() {
var e = this;
this.isLoadServerJson = !1;
var t = c.wechatConfig.serverPath;
cc.loader.load(t, function(n, i) {
if (n) console.log("error url " + t); else {
e.isLoadServerJson = !0;
e.serverData = i;
console.log("this.serverData = ", i, e.serverData);
cc.loader.release(t);
}
});
}
}, {
key: "_loadTxt",
value: function() {
var e = this;
this.isLoadTxt = !1;
this.loader.loadTxt("txt/shielded_font_library", function(t) {
e.shieldedFontLibrary = t.split(",");
e.isLoadTxt = !0;
});
}
}, {
key: "_isLoadImgage",
value: function() {
var e = this;
this.isLoadImgage = !1;
var t = c.checkUrl;
cc.loader.load({
url: t,
type: "png"
}, function(t) {
if (t) cc.log("图片加载失败"); else {
e.isLoadImgage = !0;
cc.log("图片加载成功");
}
});
}
}, {
key: "_serverNeedJson",
value: function() {
for (var e = [], t = {}, n = this.data.getJsonData(), i = Object.keys(n), o = 0, s = i.length; o < s; o += 1) {
var a = i[o];
-1 !== e.indexOf(a) && (t[a] = n[a]);
}
cc.log(JSON.stringify(t));
}
} ]);
return e;
}();
window.os = t.exports = new d();
window.rpc = {};
cc._RF.pop();
}, {
Config: "Config",
OsAudio: "OsAudio",
OsJsonData: "OsJsonData",
OsLoader: "OsLoader",
OsLocalStorage: "OsLocalStorage",
OsUtil: "OsUtil"
} ],
OsAudio: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ccfafu4qqZHcJ7ZSxBdv+ko", "OsAudio");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = void 0;
function i(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function s(e, t, n) {
t && o(e.prototype, t);
n && o(e, n);
return e;
}
var a = 0, r = {}, c = function() {
function e() {
i(this, e);
cc.log("os.audio init");
this.musicScale = 1;
this.sxfScale = 1;
this.musicName = "";
}
s(e, [ {
key: "init",
value: function() {}
}, {
key: "playMusic",
value: function(e) {
var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .3, i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], o = arguments.length > 3 ? arguments[3] : void 0;
if (os.ls.getItem2("bgm") && this.musicName !== e) {
this.musicName = e;
cc.audioEngine.stop(a);
os.loader.loadAudio(e, function(s, r) {
if (s) cc.log("error music url [" + e + "]"); else {
n *= t.musicScale;
a = cc.audioEngine.play(r, i, n);
cc.audioEngine.setFinishCallback(a, function() {
t.musicName = "";
o && o();
});
}
});
}
}
}, {
key: "stopMusic",
value: function() {
this.musicName = "";
cc.audioEngine.stop(a);
}
}, {
key: "getMusicName",
value: function() {
return this.musicName;
}
}, {
key: "pauseMusic",
value: function() {
cc.audioEngine.pause(a);
}
}, {
key: "resumeMusic",
value: function() {
cc.audioEngine.resume(a);
}
}, {
key: "setMusicScale",
value: function(e) {
this.musicScale = e / 100;
cc.log(a);
0 !== a && cc.audioEngine.setVolume(a, this.musicScale);
}
}, {
key: "setSxfScale",
value: function(e) {
this.sxfScale = e / 100;
for (var t in r) cc.audioEngine.setVolume(r[t], this.sxfScale);
}
}, {
key: "play",
value: function(e) {
var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, i = arguments.length > 2 ? arguments[2] : void 0;
try {
if (!os.ls.getItem2("sfx")) return;
if (r[e]) return;
os.loader.loadAudio(e, function(o, s) {
if (o) cc.log("error sxf url [" + e + "]"); else {
n *= t.sxfScale;
var a = cc.audioEngine.play(s, !1, n);
r[e] = a;
cc.audioEngine.setFinishCallback(a, function() {
i && i();
delete r[e];
});
}
});
} catch (e) {
cc.log("播放音效失败");
}
}
}, {
key: "play2",
value: function(e) {
var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
try {
if (!os.ls.getItem2("sfx")) return;
if (r[e]) return;
os.loader.loadAudio(e, function(o, s) {
if (o) cc.log("error sfx2 url [" + e + "]"); else {
n *= t.sxfScale;
var a = cc.audioEngine.play(s, i, n);
r[e] = a;
}
});
} catch (e) {
cc.log("播放音效失败");
}
}
}, {
key: "stop",
value: function(e) {
try {
if ("undefined" != typeof r[e]) {
cc.audioEngine.stop(r[e]);
delete r[e];
}
} catch (e) {
cc.log("停止音效失败");
}
}
}, {
key: "stopAllSfx",
value: function() {
for (var e in r) this.stop(e);
}
} ]);
return e;
}();
n.default = c;
t.exports = n.default;
cc._RF.pop();
}, {} ],
OsJsonData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c4b64K+QgtI5qGAjhfEnOYj", "OsJsonData");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = void 0;
function i(e) {
if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
if (Array.isArray(e) || (e = o(e))) {
var t = 0, n = function() {};
return {
s: n,
n: function() {
return t >= e.length ? {
done: !0
} : {
done: !1,
value: e[t++]
};
},
e: function(e) {
throw e;
},
f: n
};
}
throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var i, s, a = !0, r = !1;
return {
s: function() {
i = e[Symbol.iterator]();
},
n: function() {
var e = i.next();
a = e.done;
return e;
},
e: function(e) {
r = !0;
s = e;
},
f: function() {
try {
a || null == i.return || i.return();
} finally {
if (r) throw s;
}
}
};
}
function o(e, t) {
if (e) {
if ("string" == typeof e) return s(e, t);
var n = Object.prototype.toString.call(e).slice(8, -1);
"Object" === n && e.constructor && (n = e.constructor.name);
return "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0;
}
}
function s(e, t) {
(null == t || t > e.length) && (t = e.length);
for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
return i;
}
function a(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function r(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function c(e, t, n) {
t && r(e.prototype, t);
n && r(e, n);
return e;
}
var l = {}, u = function() {
function e() {
a(this, e);
cc.log("os.data init");
}
c(e, [ {
key: "init",
value: function() {}
}, {
key: "setJsonData",
value: function(e) {
l = e;
}
}, {
key: "getJsonData",
value: function() {
return os.util.cloneData(l);
}
}, {
key: "parseAllData",
value: function(e, t) {
for (var n = {}, i = Object.keys(e), o = 0, s = i.length; o < s; o += 1) {
var a = i[o];
n[a] = this.parseData(t, e[a]);
}
return n;
}
}, {
key: "parseData",
value: function(e, t) {
for (var n = e ? {} : [], i = t[0], o = 1; o < t.length; o += 1) {
for (var s = {}, a = t[o], r = 0, c = a.length; r < c; r += 1) {
s[i[r]] = a[r];
}
n[e ? o : o - 1] = s;
}
return n;
}
}, {
key: "print",
value: function(e) {
if ((e = os.gameName ? os.gameName + "_" + e : e) && l[e]) {
var t = this.getDataForName(e);
if (!(arguments.length <= 1) && arguments.length - 1) for (var n = 0, i = t.length; n < i; n += 1) for (var o = t[n], s = 0, a = arguments.length <= 1 ? 0 : arguments.length - 1; s < a; s += 1) {
delete o[s + 1 < 1 || arguments.length <= s + 1 ? void 0 : arguments[s + 1]];
}
var r = JSON.stringify(t);
r = (r = (r = r.replace(/\[{/, "[\n{")).replace(/}]/, "}\n]")).replace(/},{/g, "},\n{");
cc.log(r);
}
}
}, {
key: "getData",
value: function(e, t) {
var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "id", o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
e = os.gameName ? os.gameName + "_" + e : e;
var s = l[e];
if (s) {
s = os.util.cloneArray(s);
if ("id" === n || o) for (var a = 0, r = s.length - 1; a <= r; ) {
var c = a + (r - a >> 1), u = s[c][n];
if (t === u) return s[c];
t > u ? a = c + 1 : r = c - 1;
} else {
var h, f = i(s);
try {
for (f.s(); !(h = f.n()).done; ) {
var d = h.value;
if (d[n] === t) return d;
}
} catch (e) {
f.e(e);
} finally {
f.f();
}
}
}
cc.log("error getData " + e);
return null;
}
}, {
key: "getDataForName",
value: function(e) {
e = os.gameName ? os.gameName + "_" + e : e;
var t = l[e];
if (t) return os.util.cloneData(t);
cc.log("error getDataForName " + e);
return null;
}
}, {
key: "setDataForName",
value: function(e, t) {
e = os.gameName ? os.gameName + "_" + e : e;
l[e] && (l[e] = t);
}
}, {
key: "getDataForObject",
value: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "id";
e = os.gameName ? os.gameName + "_" + e : e;
var n = l[e], i = {};
if (n) for (var o = 0, s = (n = os.util.cloneData(n)).length; o < s; o += 1) {
var a = n[o];
i[a[t]] = a;
}
return i;
}
} ]);
return e;
}();
n.default = u;
t.exports = n.default;
cc._RF.pop();
}, {} ],
OsLoader: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ec0cbd8pfJG1bVNrORgjCQ7", "OsLoader");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = void 0;
var i = e("Config");
function o(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function s(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function a(e, t, n) {
t && s(e.prototype, t);
n && s(e, n);
return e;
}
var r = [], c = function() {
function e() {
o(this, e);
cc.log("os.loader init");
}
a(e, [ {
key: "init",
value: function() {}
}, {
key: "release",
value: function() {
cc.log("release", r);
}
}, {
key: "releaseResource",
value: function(e, t) {}
}, {
key: "loadSpriteFrame",
value: function(e, t) {
if (os.util.isObject(e)) cc.loader.load(e, function(n, i) {
n ? cc.log("error url [" + e + "]") : "function" == typeof t && t(new cc.SpriteFrame(i));
}); else {
e = os.gameName ? os.gameName + "/" + e : e;
var n = cc.SpriteFrame;
cc.loader.loadRes(e, n, function(n, i) {
n ? cc.log("error url [" + e + "]") : "function" == typeof t && t(i);
});
}
}
}, {
key: "loadSpriteAtlas",
value: function(e, t, n) {
var i = cc.SpriteAtlas;
cc.loader.loadRes(e, i, function(i, o) {
if (i) cc.log("error url [" + e + "]"); else if (t) {
var s = o.getSpriteFrame(t);
"function" == typeof n && n(s);
} else "function" == typeof n && n(i, o);
});
}
}, {
key: "loadJson",
value: function(e, t) {
e = os.gameName ? os.gameName + "/" + e : e;
var n = cc.JsonAsset;
cc.loader.loadRes(e, n, function(n, i) {
n ? cc.log("error url [" + e + "]") : "function" == typeof t && t(i.json || i);
});
}
}, {
key: "loadTiledMap",
value: function(e, t) {
e = os.gameName ? os.gameName + "/" + e : e;
var n = cc.TiledMapAsset;
cc.loader.loadRes(e, n, function(n, i) {
n ? cc.log("error url [" + e + "]") : "function" == typeof t && t(i);
});
}
}, {
key: "loadPrefab",
value: function(e, t) {
e = os.gameName ? os.gameName + "/" + e : e;
var n = cc.Prefab;
cc.loader.loadRes(e, n, function(n, i) {
n ? cc.log("error url [" + e + "]") : "function" == typeof t && t(cc.instantiate(i));
});
}
}, {
key: "loadTxt",
value: function(e, t) {
e = os.gameName ? os.gameName + "/" + e : e;
var n = cc.TextAsset;
cc.loader.loadRes(e, n, function(n, i) {
n ? cc.log("error url [" + e + "]") : "function" == typeof t && t(i.text || i);
});
}
}, {
key: "loadDragonBones",
value: function(e, t) {
e = os.gameName ? os.gameName + "/" + e : e;
var n, i;
cc.loader.loadResDir(e, function(o, s) {
if (o || s.length <= 0) cc.log("error url [" + e + "]"); else {
s.forEach(function(e) {
e instanceof dragonBones.DragonBonesAsset && (n = e);
e instanceof dragonBones.DragonBonesAtlasAsset && (i = e);
});
"function" == typeof t && t({
dragonAsset: n,
dragonAtlasAsset: i,
armatureName: "Sprite"
});
}
});
}
}, {
key: "loadDragonBones2",
value: function(e, t) {
var n = i.yyUrl + "/" + i.osGameName + "/" + e + "_tex.png", o = i.yyUrl + "/" + i.osGameName + "/" + e + "_ske.json", s = i.yyUrl + "/" + i.osGameName + "/" + e + "_tex.json";
cc.loader.load(n, function(e, n) {
cc.loader.load({
url: s,
type: "txt"
}, function(e, i) {
cc.loader.load({
url: o,
type: "txt"
}, function(e, o) {
var s = new dragonBones.DragonBonesAtlasAsset();
s.atlasJson = i;
s.texture = n;
var a = new dragonBones.DragonBonesAsset();
a.dragonBonesJson = o;
"function" == typeof t && t({
dragonAsset: a,
dragonAtlasAsset: s,
armatureName: "armatureName"
});
});
});
});
}
}, {
key: "loadParticle",
value: function(e, t) {
e = os.gameName ? os.gameName + "/" + e : e;
var n = cc.ParticleAsset;
cc.loader.loadRes(e, n, function(n, i) {
n ? cc.log("error url [" + e + "]") : "function" == typeof t && t(i);
});
}
}, {
key: "loadSubpackage",
value: function(e, t) {
cc.loader.downloader.loadSubpackage(e, function(e) {
if (e) return console.error(e);
console.log("load subpackage successfully.");
"function" == typeof t && t();
});
}
}, {
key: "loadAudio",
value: function(e, t) {
var n = "audio/" + e, i = cc.AudioClip;
cc.loader.loadRes(n, i, function(e, n) {
"function" == typeof t && t(e, n);
});
}
} ]);
return e;
}();
n.default = c;
t.exports = n.default;
cc._RF.pop();
}, {
Config: "Config"
} ],
OsLocalStorage: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a9f1aIQyIND4Ysl5YybNIRU", "OsLocalStorage");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = void 0;
var i = e("Config");
function o(e) {
"@babel/helpers - typeof";
return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
})(e);
}
function s(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function a(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function r(e, t, n) {
t && a(e.prototype, t);
n && a(e, n);
return e;
}
var c = function() {
function e() {
s(this, e);
cc.log("os.ls init");
i.localStorageInit.call(this);
this.isLoad = !1;
this.dataArr = [];
this.keyList = [];
}
r(e, [ {
key: "init",
value: function() {
var e = this;
i.localStorageConfig.call(this);
this.keyList = this.getItem2("keyList");
var t = 0, n = this.dataArr.length - 1;
if (cc.sys.isBrowser) {
for (t = 0; t <= n; t += 1) this.initItem(t);
this.setItem2("keyList", this.keyList);
this.isLoad = !0;
} else var o = setInterval(function() {
for (var i = 0; i < 10; i += 1) {
e.initItem(t);
t += 1;
}
if (t >= n) {
clearInterval(o);
e.setItem2("keyList", e.keyList);
e.isLoad = !0;
}
}, 50);
}
}, {
key: "addItem",
value: function(e, t) {
this.dataArr.push({
key: e,
value: t
});
}
}, {
key: "initItem",
value: function(e) {
var t = this.dataArr[e];
if (t && -1 === this.keyList.indexOf(t.key)) {
this.keyList.push(t.key);
this.setItem(t.key, t.value, !0);
}
}
}, {
key: "setItem",
value: function(e, t, n) {
if (e && "string" == typeof e && "undefined" != typeof e) if ("undefined" != typeof t && "function" != typeof t) {
this._isObject(t) || this._isArray(t) ? t = JSON.stringify(t) : t += "";
var o = n ? e : i.osGameName ? i.osGameName + "_" + e : e;
cc.sys.localStorage.setItem(o, t);
} else cc.log("setItem param error value", e, t); else cc.log("setItem param error key", e, t);
}
}, {
key: "getItem",
value: function(e) {
if (!e || "string" != typeof e || "undefined" == typeof e) {
cc.log("getItem param error key", e);
return null;
}
var t = i.osGameName ? i.osGameName + "_" + e : e, n = cc.sys.localStorage.getItem(t);
if ("true" === n) return !0;
if ("false" === n) return !1;
if (this._isNumber(n)) return parseFloat(n, 10);
try {
return JSON.parse(n);
} catch (e) {
cc.log("no parse", t, n);
return n;
}
}
}, {
key: "removeItem",
value: function(e) {
if (e && "string" == typeof e && "undefined" != typeof e) {
var t = i.osGameName ? i.osGameName + "_" + e : e;
cc.sys.localStorage.removeItem(t);
} else cc.log("removeItem param error key", e);
}
}, {
key: "clear",
value: function() {
cc.sys.localStorage.clear();
}
}, {
key: "setItem2",
value: function(e, t) {
if (e && "string" == typeof e && "undefined" != typeof e) if ("undefined" != typeof t && "function" != typeof t) {
this._isObject(t) || this._isArray(t) ? t = JSON.stringify(t) : t += "";
var n = i.osGameName + "#" + e;
cc.sys.localStorage.setItem(n, t);
} else cc.log("setItem param error value", e, t); else cc.log("setItem param error key", e, t);
}
}, {
key: "getItem2",
value: function(e) {
if (!e || "string" != typeof e || "undefined" == typeof e) {
cc.log("getItem param error key", e);
return null;
}
var t = i.osGameName + "#" + e, n = cc.sys.localStorage.getItem(t);
if ("true" === n) return !0;
if ("false" === n) return !1;
if (this._isNumber(n)) return parseFloat(n, 10);
try {
return JSON.parse(n);
} catch (e) {
cc.log("no parse", t, n);
return n;
}
}
}, {
key: "removeItem2",
value: function(e) {
if (e && "string" == typeof e && "undefined" != typeof e) {
var t = i.osGameName + "#" + e;
cc.sys.localStorage.removeItem(t);
} else cc.log("removeItem param error key", e);
}
}, {
key: "_isObject",
value: function(e) {
return "object" === o(e);
}
}, {
key: "_isArray",
value: function(e) {
return "[object Array]" === Object.prototype.toString.apply(e);
}
}, {
key: "_isNumber",
value: function(e) {
return null !== /^(-)?\d+(\.\d+)?$/.exec(e) && "" !== e;
}
} ]);
return e;
}();
n.default = c;
t.exports = n.default;
cc._RF.pop();
}, {
Config: "Config"
} ],
OsServer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ea704gHlipA744voxGaGytb", "OsServer");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = void 0;
function i(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function s(e, t, n) {
t && o(e.prototype, t);
n && o(e, n);
return e;
}
var a = [ "47.100.137.37" ], r = null, c = 0, l = function() {
function e() {
i(this, e);
cc.log("os.server init");
this.isInit = !1;
this.isWaiting = !1;
this.isServer = !1;
this.serverCount = 0;
this.sendMid = 0;
this.sendData = {};
this.userInfo = {};
this.loginCallback = null;
this._init();
}
s(e, [ {
key: "init",
value: function() {}
}, {
key: "_init",
value: function() {
if (this.isInit) cc.log("已连接上 ==>" + a[c]); else {
c >= a.length && (c = 0);
var e = a[c] + ":20030";
cc.log("url " + e);
if (r = new WebSocket("ws://" + e)) {
r.onopen = this._onOpen.bind(this);
r.onclose = this._onClose.bind(this);
r.onerror = this._onError.bind(this);
r.onmessage = this._onMessage.bind(this);
}
}
}
}, {
key: "_onOpen",
value: function() {
cc.log("==> 连接上<" + a[c] + ">");
c = 0;
this.isInit = !0;
}
}, {
key: "_onClose",
value: function() {
cc.log("onClose 断线重连...");
this.isInit = !1;
this._init();
}
}, {
key: "_onError",
value: function() {
cc.log("onError");
c += 1;
}
}, {
key: "_onMessage",
value: function(e) {
var t = JSON.parse(e.data);
if (t.cb) this.broadcastMessage(t); else {
if (this.isWaiting) {
this.serverCount = 0;
this.setWaiting();
}
if (t.msg) os.event.emit("miniMessage", {
content: t.msg
}); else if (500 !== t.code) {
if (this.sendCallback && "function" == typeof this.sendCallback) {
cc.log("接收数据=>" + this.sendMid, t);
this.sendCallback(t.data);
}
} else cc.log("error", this.sendMid);
}
}
}, {
key: "send",
value: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {}, n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
this.isWaiting = n;
if (n) {
this.serverCount += 1;
this.setWaiting();
}
var i = e.mid, o = os.net.getNetData(i), s = this.userInfo.uid;
delete e.mid;
cc.log("发送数据=>" + i, e);
if (this.isInit) if (r.readyState === WebSocket.OPEN) {
this.sendMid = i;
this.sendCallback = t;
r.send(JSON.stringify({
mid: i,
route: o,
uid: s,
data: e
}));
} else cc.log("readyState:" + r.readyState); else cc.log("没有连接网络");
}
}, {
key: "close",
value: function() {
if (r) {
r.close();
r = null;
}
}
}, {
key: "broadcastMessage",
value: function(e) {
cc.log("收到广播消息", e);
e.cb;
}
}, {
key: "setWaiting",
value: function() {
this.serverCount < 0 && (this.serverCount = 0);
os.waiting({
isWaiting: this.serverCount
});
}
}, {
key: "login",
value: function(e, t) {
if (this.isServer) "function" == typeof t && t(); else {
this.loginCallback = t;
this._startLogin(e);
}
}
}, {
key: "_startLogin",
value: function(e) {
var t = this, n = cc.sys.browserType;
if ("wechatgame" === cc.sys.browserType) wx.login({
success: function(e) {
if (e.code) {
var i = e.code;
wx.getUserInfo({
success: function(e) {
var o = e.userInfo.avatarUrl, s = e.userInfo.nickName;
t.send({
sys: n,
code: i,
avatarUrl: o,
nickName: s,
mid: 100
}, t._loginSucc);
},
fail: function() {
cc.log("wx.getUserInfo fail");
}
});
} else cc.log("获取用户登录态失败！" + e);
},
fail: function() {
cc.log("wx.login fail");
}
}); else {
var i = e.account, o = e.password;
if ("wechatgame" !== cc.sys.browserType) {
if ("" === i) {
os.event.emit("miniMessage", {
content: "账号不能为空"
});
return;
}
if ("" === o) {
os.event.emit("miniMessage", {
content: "密码不能为空"
});
return;
}
if (i === o) {
os.event.emit("miniMessage", {
content: "账号密码不能相同"
});
return;
}
if (i.length < 4) {
os.event.emit("miniMessage", {
content: "账号长度不能小于4位"
});
return;
}
if (o.length < 4) {
os.event.emit("miniMessage", {
content: "密码长度不能小于4位"
});
return;
}
if (os.util.checkWord(i)) {
os.event.emit("miniMessage", {
content: "账号包含非法字符"
});
return;
}
if (os.util.checkWord(o)) {
os.event.emit("miniMessage", {
content: "密码包含非法字符"
});
return;
}
cc.log("检测账号密码完毕");
}
this.send({
sys: n,
account: i,
password: o,
mid: 100
}, this._loginSucc);
}
}
}, {
key: "_loginSucc",
value: function(e) {
this.userInfo = e.user;
os.user.setUserData(this.userInfo);
cc.log("登陆成功", this.userInfo);
this._changeScene();
}
}, {
key: "_changeScene",
value: function() {
if (os.data.getJsonData()) {
this.isServer = !0;
this.serverCount = 0;
this.setWaiting();
this.loginCallback && this.loginCallback();
} else setTimeout(this._changeScene.bind(this), 500);
}
} ]);
return e;
}();
n.default = l;
t.exports = n.default;
cc._RF.pop();
}, {} ],
OsUtil: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "30e4cmdpj5N05od5FXNapbs", "OsUtil");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = void 0;
function i(e) {
"@babel/helpers - typeof";
return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
})(e);
}
function o(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function s(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function a(e, t, n) {
t && s(e.prototype, t);
n && s(e, n);
return e;
}
var r = function() {
function e() {
o(this, e);
cc.log("os.util init");
this.persistRootNodeList = [];
}
a(e, [ {
key: "init",
value: function() {
this.printEnv();
}
}, {
key: "printEnv",
value: function() {
cc.log("isBrowser", cc.sys.isBrowser);
cc.log("isMobile", cc.sys.isMobile);
cc.log("isNative", cc.sys.isNative);
cc.log("CC_BUILD", !0);
cc.log("CC_DEBUG", !1);
cc.log("CC_DEV", !1);
cc.log("CC_EDITOR", !1);
cc.log("CC_JSB", !0);
cc.log("CC_PREVIEW", !1);
"undefined" != typeof CC_QQPLAY && cc.log("CC_QQPLAY", CC_QQPLAY);
cc.log("CC_RUNTIME", !1);
cc.log("CC_SUPPORT_JIT", !0);
cc.log("CC_TEST", !1);
"undefined" != typeof CC_WECHATGAME && cc.log("CC_WECHATGAME", CC_WECHATGAME);
"undefined" != typeof CC_WECHATGAMESUB && cc.log("CC_WECHATGAMESUB", CC_WECHATGAMESUB);
}
}, {
key: "getRandomInt",
value: function(e, t) {
return Math.floor(Math.random() * (t - e + 1) + e);
}
}, {
key: "getRandomFloat",
value: function(e, t) {
return Math.random() * (t - e + 1) + e;
}
}, {
key: "getRandomNumber",
value: function(e, t) {
var n = Math.abs(e) + Math.abs(t);
return t - Math.random() * n;
}
}, {
key: "dedupe",
value: function(e) {
return Array.from ? Array.from(new Set(e)) : this.filter(e);
}
}, {
key: "isObject",
value: function(e) {
return "object" === i(e);
}
}, {
key: "isArray",
value: function(e) {
return "[object Array]" === Object.prototype.toString.apply(e);
}
}, {
key: "isNumber",
value: function(e) {
return null !== /^(-)?\d+(\.\d+)?$/.exec(e) && "" !== e;
}
}, {
key: "cloneObject",
value: function(e) {
if (this.isObject(e)) return JSON.parse(JSON.stringify(e));
cc.warn("clone object fail", e);
return e;
}
}, {
key: "cloneArray",
value: function(e) {
if (this.isArray(e)) return JSON.parse(JSON.stringify(e));
cc.warn("clone array fail", e);
return e;
}
}, {
key: "cloneData",
value: function(e) {
if (this.isArray(e) || this.isObject(e)) return JSON.parse(JSON.stringify(e));
cc.warn("clone data fail", e);
return e;
}
}, {
key: "parseFloatArray",
value: function(e) {
if (this.isArray(e) && e.length) for (var t = e.length - 1; t >= 0; t -= 1) e[t] = parseFloat(e[t]);
return e;
}
}, {
key: "parseColor",
value: function(e) {
var t = this.parseFloatArray(e.split(","));
return cc.color(t[0], t[1], t[2]);
}
}, {
key: "getStrLength",
value: function(e) {
return e.replace(/[\u0391-\uFFE5]/g, "aa").length;
}
}, {
key: "addMethod",
value: function(e, t, n) {
var i = e[t];
e[t] = function() {
var e = i;
return n.length === arguments.length ? n.apply(this, arguments) : "function" == typeof e ? e.apply(this, arguments) : void 0;
};
}
}, {
key: "memoizer",
value: function(e, t) {
return function n(i) {
var o = e[i];
if ("number" != typeof o) {
o = t(n, i);
e[i] = o;
}
return o;
};
}
}, {
key: "matrix",
value: function(e, t) {
for (var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, i = [], o = 0; o < e; o += 1) {
for (var s = [], a = 0; a < t; a += 1) s[a] = n;
i[o] = s;
}
return i;
}
}, {
key: "by1",
value: function(e, t) {
return function(n, o) {
if (n && o && "object" === i(n) && "object" === i(o)) {
var s = n[e], a = o[e];
if (s === a) return "function" == typeof t ? t(n, o) : 0;
if (i(s) === i(a)) return s < a ? -1 : 1;
} else cc.log("Expected an object when sorting by " + e);
};
}
}, {
key: "by2",
value: function(e, t) {
return function(n, o) {
if (n && o && "object" === i(n) && "object" === i(o)) {
var s = n[e], a = o[e];
if (s === a) return "function" == typeof t ? t(n, o) : 0;
if (i(s) === i(a)) return s < a ? 1 : -1;
} else cc.log("Expected an object when sorting by " + e);
};
}
}, {
key: "trim",
value: function(e) {
return e.replace(/[\s]/g, "");
}
}, {
key: "match",
value: function(e) {
return e.match(/\d+/g);
}
}, {
key: "splitToArray",
value: function(e) {
for (var t = [], n = e.split("|"), i = 0; i < n.length; ++i) for (var o = os.util.match(n[i]), s = 0; s < o.length; s++) s > 0 && s % 2 != 0 && t.push(cc.v2(Number(o[s - 1]), Number(o[s])));
return t;
}
}, {
key: "splitToSingleArray",
value: function(e) {
return e.split("|");
}
}, {
key: "distance",
value: function(e, t) {
var n = cc.ENGINE_VERSION.split(".")[0];
return "1" === n || "Cocos2d-x-lite v1" === n ? cc.pDistance(e, t) : e.sub(t).mag();
}
}, {
key: "getCurrentTimestamp",
value: function() {
return Math.round(new Date() / 1e3);
}
}, {
key: "getBeforeDawnTimestamp",
value: function(e) {
return e ? new Date(new Date(parseInt(e)).setHours(0, 0, 0, 0)) / 1e3 : new Date(new Date().setHours(0, 0, 0, 0)) / 1e3;
}
}, {
key: "getTime",
value: function(e) {
var t = Math.floor(e % 86400 / 3600) + "", n = Math.floor(e % 3600 / 60) + "", i = Math.floor(e % 60) + "";
return {
hours: t = 1 === t.length ? "0" + t : t,
minutes: n = 1 === n.length ? "0" + n : n,
seconds: i = 1 === i.length ? "0" + i : i
};
}
}, {
key: "getTime2",
value: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3, n = (Math.floor(e % 86400 / 3600) < 10 ? "0" : "") + Math.floor(e % 86400 / 3600), i = (Math.floor(e % 3600 / 60) < 10 ? "0" : "") + Math.floor(e % 3600 / 60), o = (Math.floor(e % 60) < 10 ? "0" : "") + Math.floor(e % 60);
switch (t) {
case 1:
return o;

case 2:
return i + ":" + o;

case 3:
return n + ":" + i + ":" + o;
}
}
}, {
key: "getTime3",
value: function(e) {
return (Math.floor(e / 60) < 10 ? "0" : "") + Math.floor(e / 60) + "分" + ((Math.floor(e % 60) < 10 ? "0" : "") + Math.floor(e % 60)) + "秒";
}
}, {
key: "setState",
value: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
if (e.getComponent(cc.Button)) {
var n = e.getComponent(cc.Button);
n.enableAutoGrayEffect = !0;
n.interactable = 1 !== t;
} else if (e.getComponent(cc.Sprite)) {
e.getComponent(cc.Sprite)._sgNode ? e.getComponent(cc.Sprite)._sgNode.setState(t) : e.getComponent(cc.Sprite).setState(t);
} else cc.warn("置灰失败", e);
}
}, {
key: "toChinese",
value: function(e) {
var t, n = [ "零", "一", "二", "三", "四", "五", "六", "七", "八", "九" ], i = [ "", "十", "百", "千" ], o = [ "", "万", "亿", "兆" ], s = "";
if ("" === e) return "";
if ((e = parseFloat(e)) >= 1e15) {
cc.log("超出最大处理数字");
return "";
}
if (0 === e) return "";
t = e.toString();
if (parseInt(t, 10) > 0) for (var a = 0, r = t.length, c = 0; c < r; c += 1) {
var l = t.substr(c, 1), u = r - c - 1, h = u / 4, f = u % 4;
if ("0" === l) a += 1; else {
a = 0;
s += n[parseInt(l)] + i[f];
}
0 === f && a < 4 && (s += o[h]);
}
0 === s.indexOf("一十") && (s = s.substr(1));
return s;
}
}, {
key: "addPersistRootNode",
value: function(e) {
var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
if (e && e.name) {
var n = cc.director.getScene();
if (!n.getChildByName(e.name)) {
var i = e.parent.convertToWorldSpaceAR(e.position);
e.parent = n;
e.position = i;
e.zIndex = t;
cc.game.addPersistRootNode(e);
for (var o = !0, s = 0, a = this.persistRootNodeList.length; s < a; s += 1) {
if (this.persistRootNodeList[s].name === e.name) {
o = !1;
this.persistRootNodeList[s] = {
name: e.name,
zIndex: t
};
break;
}
}
o && this.persistRootNodeList.push({
name: e.name,
zIndex: t
});
}
}
}
}, {
key: "loadSceneForRootNode",
value: function() {
if (os.util.persistRootNodeList.length) for (var e = cc.find("Canvas"), t = os.util.persistRootNodeList, n = 0, i = t.length; n < i; n += 1) {
var o = t[n], s = cc.find(o.name);
if (s) {
var a = s.position.sub(os.s2);
s.parent = e;
s.position = a;
}
}
}
}, {
key: "changeSceneForRootNode",
value: function() {
if (os.util.persistRootNodeList.length) for (var e = os.util.persistRootNodeList, t = 0, n = e.length; t < n; t += 1) {
var i = e[t], o = cc.find("Canvas/" + i.name);
o && os.util.addPersistRootNode(o, i.zIndex);
}
}
}, {
key: "convertToWorldSpaceAR",
value: function(e) {
return e.parent.convertToWorldSpaceAR(e.position);
}
}, {
key: "convertToCanvasPosition",
value: function(e) {
return this.convertToWorldSpaceAR(e).sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
}
}, {
key: "tok",
value: function(e) {
if ((e = parseFloat(e)) >= 1e4) {
e /= 1e4;
return Math.floor(100 * e) / 100 + "K";
}
return e + "";
}
}, {
key: "getDegree",
value: function(e, t) {
var n = t.x - e.x, i = t.y - e.y, o = 180 * Math.atan(n / i) / Math.PI;
i < 0 && (o = n < 0 ? 180 + Math.abs(o) : 180 - Math.abs(o));
return o;
}
}, {
key: "weightRand",
value: function(e) {
for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "weight", n = 0, i = 0, o = null, s = 0, a = e.length; s < a; s += 1) {
n += e[s][t];
}
for (var r = 0, c = e.length; r < c; r += 1) {
var l = e[r];
i = Math.floor(Math.random() * n + 1);
if (l[t] >= i) {
o = l;
break;
}
n -= l[t];
}
return o;
}
}, {
key: "checkWord",
value: function(e) {
if ((e += "").match(/^\s*$/)) return !0;
var t = function(e) {
return os.shieldedFontLibrary.indexOf(e);
}, n = this.trim(e), i = [];
i.push(t(e));
i.push(t(n));
i.push(t(this.getChineseCharacters(n)));
i.push(t(this.getChineseCharactersAndNumber(n)));
for (var o = 0, s = i.length; o < s; o += 1) {
if (i[o] >= 0) return !0;
}
return !1;
}
}, {
key: "getChineseCharacters",
value: function(e) {
var t = e.match(/[\u4e00-\u9fa5]/g);
return t ? t.join("") : "1";
}
}, {
key: "getChineseCharactersAndNumber",
value: function(e) {
var t = e.match(/[0-9\u4e00-\u9fa5]/g);
return t ? t.join("") : "1";
}
}, {
key: "showJsonData",
value: function(e, t) {
var n = JSON.stringify(t);
n = n.replace(/:0,/g, ':"0",');
cc.log(e, n);
}
}, {
key: "showArrayData",
value: function(e) {
var t = JSON.stringify(e);
t = (t = (t = t.replace(/\[{/, "[\n{")).replace(/}]/, "}\n]")).replace(/},{/g, "},\n{");
cc.log(t);
}
}, {
key: "filter",
value: function() {
var e = {};
(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(t) {
e[t] = 1;
});
for (var t = [], n = Object.keys(e), i = 0, o = n.length; i < o; i += 1) t.push(n[i]);
return t;
}
} ]);
return e;
}();
n.default = r;
t.exports = n.default;
cc._RF.pop();
}, {} ],
PanelBase: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "52326IqMgFGr7j5knOncnBi", "PanelBase");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("Base"));
cc.Class({
extends: i.default,
properties: {
close: cc.Node
},
onLoad: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
this._super();
this.node.on("onShow", this.onShow, this);
this.close && this.close.on("touchend", this.onClose, this);
this.node.isClose = !0;
e && (this.getComponent(cc.BlockInputEvents) || this.addComponent(cc.BlockInputEvents));
if (t) {
var i = this.node.gn("black");
i && i.on("touchend", this.callBlack, this);
}
if (n) {
var o = this.node.gn("panel");
o && o.addComponent(cc.BlockInputEvents);
}
},
onDestroy: function() {
this._super();
},
start: function() {
this._super();
},
onEnable: function() {
this._super();
},
onDisable: function() {
this._super();
this.node.data = null;
},
onShow: function(e) {},
onClose: function() {
this.node.active = !1;
},
callBlack: function() {
this.node.isClose && (this.node.active = !1);
}
});
cc._RF.pop();
}, {
Base: "Base"
} ],
Player: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "cf2474bCFlKArbLWr0Ginjd", "Player");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("PanelBase"));
cc.Class({
extends: i.default,
properties: {
speed: cc.v2(0, 0),
maxSpeed: cc.v2(2e3, 2e3),
gravity: -1e3,
drag: 1e3,
direction: 0,
jumpSpeed: 300,
jumpCount: 0,
hunker: !1,
isWallCollisionCount: 0,
getScore: 0,
isDied: !1,
fallDown: !1,
life: 1,
buttonIsPressed: !1,
camera: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.collisionX = 0;
this.collisionY = 0;
this.prePosition = cc.v2();
this.preStep = cc.v2();
this.touchingNumber = 0;
},
reStart: function() {},
onDestroy: function() {},
noDownControlPlayer: function() {
if (0 !== this.touchingNumber && !this.isDied) {
0 !== this.direction ? this.player_walk() : this.player_idle();
this.hunker = !1;
}
},
noLRControlPlayer: function() {
this.direction = 0;
console.log("this jumpCount:  " + this.jumpCount);
this.isDied || 0 != this.jumpCount || this.player_idle();
this.buttonIsPressed = !1;
},
noUpControlPlayer: function() {
console.log("noUpControlPlayer*******:   " + this.touchingNumber);
0 == this.touchingNumber && this.player_idle();
},
playerLeft: function() {
-1 === this.direction || 0 != this.jumpCount || this.isDied || this.player_walk();
this.buttonIsPressed = !0;
this.turnLeft();
this.direction = -1;
},
playerRight: function() {
1 === this.direction || 0 != this.jumpCount || this.isDied || this.player_walk();
this.buttonIsPressed = !0;
this.turnRight();
this.direction = 1;
},
playerUp: function() {
console.log("this.jumping: " + this.jumping);
console.log("this.jumpCount: " + this.jumpCount);
this.jumpCount++;
if (!this.jumping && this.jumpCount <= 2 && !this.isDied) {
this.player_jump();
this.speed && (this.speed.y = this.jumpSpeed);
}
},
playerDown: function() {
if (0 !== this.touchingNumber && !this.hunker && !this.isDied) {
this.player_hunker();
this.hunker = !0;
}
},
player_idle: function() {
console.log("speed x:  " + this.speed.x);
if (this.speed.x < 0) {
console.log("player idle left");
this.node.getComponent(cc.Animation).play("leftstand");
} else if (this.speed.x > 0) {
console.log("Player idle right");
this.node.getComponent(cc.Animation).play("rightstand");
}
},
player_walk: function() {
this.speed.x < 0 ? this.node.getComponent(cc.Animation).play("leftrun") : this.speed.x > 0 && this.node.getComponent(cc.Animation).play("rightrun");
},
player_jump: function() {
this.speed.x < 0 ? this.node.getComponent(cc.Animation).play("leftrun") : this.speed.x > 0 && this.node.getComponent(cc.Animation).play("rightrun");
},
player_hunker: function() {},
rabbitJump: function() {
this.speed.y = .5 * this.jumpSpeed;
},
rabbitDieJump: function() {
this.speed.y = this.jumpSpeed;
cc.director.getCollisionManager().enabled = !1;
this.touchingNumber = 0;
this.isDied = !0;
this.life = 0;
},
OverNodeLoad: function() {},
onCollisionEnter: function(e, t) {
0 == this.touchingNumber && (this.buttonIsPressed ? this.player_walk() : this.player_idle());
switch (e.tag) {
case 1:
this.collisionFireEnter(e, t);
break;

case 2:
this.collisionFlowerEnter(e, t);
break;

case 3:
this.collisionMonkeyEnter(e, t);
break;

case 7:
this.collisionDestinationEnter(e, t);
break;

case 4:
this.collisionHoleEnter(e, t);
break;

case 0:
this.collisionPlatformEnter(e, t);
}
},
collisionDestinationEnter: function(e, t) {
console.log("碰到终点牌!!!");
this.camera.getChildByName("touchLyt").getComponent(cc.BlockInputEvents).enabled = !0;
this.camera.getChildByName("winpanel").active = !0;
},
collisionMonkeyEnter: function(e, t) {
if (0 == this.speed.y) {
this.node.destroy();
this.camera.getChildByName("touchLyt").getComponent(cc.BlockInputEvents).enabled = !0;
this.camera.getChildByName("losepanel").active = !0;
}
},
collisionFlowerEnter: function(e, t) {},
collisionFireEnter: function(e, t) {},
collisionHoleEnter: function(e, t) {
this.node.active = !1;
},
collisionPlatformEnter: function(e, t) {
this.touchingNumber++;
this.jumpCount = 0;
var n = e.world.aabb, i = e.world.preAabb.clone(), o = t.world.aabb, s = t.world.preAabb.clone();
s.x = o.x;
i.x = n.x;
if (cc.Intersection.rectRect(s, i)) {
if (this.speed.x < 0 && s.xMax > i.xMax) {
this.node.x += Math.floor(Math.abs(n.xMax - o.xMin));
this.collisionX = -1;
} else if (this.speed.x > 0 && s.xMin < i.xMin) {
this.node.x -= Math.floor(Math.abs(n.xMin - o.xMax));
this.collisionX = 1;
} else 0 == this.speed.x && s.xMax == i.xMin && (this.fallDown = !0);
this.speed.x = 0;
e.touchingX = !0;
} else {
s.y = o.y;
i.y = n.y;
if (cc.Intersection.rectRect(s, i)) {
if (this.speed.y < 0 && s.yMax > i.yMax) {
this.node.y = i.yMax - this.node.parent.y;
this.jumping = !1;
this.collisionY = -1;
} else if (this.speed.y > 0 && s.yMin < i.yMin) {
this.node.y = i.yMin - s.height - this.node.parent.y;
this.collisionY = 1;
}
this.speed.y = 0;
e.touchingY = !0;
}
this.isWallCollisionCount++;
}
},
onCollisionStay: function(e, t) {
this.jumpCount = 0;
-1 === this.collisionY && e.node.group;
},
onCollisionExit: function(e) {
this.fallDown = !1;
"stone" != e.node.group && "Ground" != e.node.group && "Platform" != e.node.group && "fireplate" != e.node.group || this.touchingNumber--;
0 !== this.jumpCount && this.touchingNumber;
this.touchingNumber;
if (e.touchingX) {
this.collisionX = 0;
e.touchingX = !1;
} else if (e.touchingY) {
this.collisionY = 0;
e.touchingY = !1;
}
this.isWallCollisionCount--;
},
update: function(e) {
this.node.x > 0 && this.node.x < 2 * cc.winSize.width ? this.node.x > this.camera.x ? this.camera.x = this.node.x : this.node.x < this.camera.x && (this.camera.x = this.node.x) : this.node.x <= -cc.winSize.width / 2 + this.node.width / 4 - 10 ? this.node.x = -cc.winSize.width / 2 + this.node.width / 4 - 10 : this.node.x >= cc.winSize.width + cc.winSize.width / 2 - this.node.width / 4 + cc.winSize.width + 10 && (this.node.x = cc.winSize.width + cc.winSize.width / 2 - this.node.width / 4 + cc.winSize.width + 10);
if (0 === this.touchingNumber || this.fallDown || -1 === this.touchingNumber) {
this.speed.y += this.gravity * e;
Math.abs(this.speed.y) > this.maxSpeed.y && (this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y);
}
this.node.y > 600 && (this.touchingNumber = 0);
if (0 === this.direction) {
if (this.speed.x > 0) {
this.speed.x -= this.drag * e;
this.speed.x <= 0 && (this.speed.x = 0);
} else if (this.speed.x < 0) {
this.speed.x += this.drag * e;
this.speed.x >= 0 && (this.speed.x = 0);
}
} else {
this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * e;
Math.abs(this.speed.x) > this.maxSpeed.x && (this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x);
}
this.speed.x * this.collisionX > 0 && (this.speed.x = 0);
this.prePosition.x = this.node.x;
this.prePosition.y = this.node.y;
this.preStep.x = this.speed.x * e;
this.preStep.y = this.speed.y * e;
this.node.x += this.speed.x * e * 1;
this.node.y += this.speed.y * e;
},
turnLeft: function() {
this.node.getComponent(cc.Animation).play("leftrun");
},
turnRight: function() {
this.node.getComponent(cc.Animation).play("rightrun");
}
});
cc._RF.pop();
}, {
PanelBase: "PanelBase"
} ],
SceneBase: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4a1441j6nxEBZLLlc/O1Nre", "SceneBase");
var i = function(e) {
return e && e.__esModule ? e : {
default: e
};
}(e("Base"));
cc.Class({
extends: i.default,
properties: {},
onLoad: function(e) {
this._super();
os.gameName = e || "";
cc.log("%cSceneBase [" + this.className + "]", "color:#f00;");
os.sceneCount += 1;
os.sceneCount >= 2 && cc.warn("一个场景只需要一个脚本继承SceneBase");
os.util.loadSceneForRootNode();
},
onDestroy: function() {
this._super();
window.rpc = {};
os.sceneCount = 0;
},
start: function() {
this._super();
},
onEnable: function() {
this._super();
},
onDisable: function() {
this._super();
}
});
cc._RF.pop();
}, {
Base: "Base"
} ],
YouYou: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0583279WbBMMoJbowvHc5/W", "YouYou");
function i(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
function s(e, t, n) {
t && o(e.prototype, t);
n && o(e, n);
return e;
}
var a = function() {
function e() {
i(this, e);
cc.log("YOUYOU init");
this.selectLevel = 1;
this.reviveTime = 2;
this.costPower = 3;
this.enterCamp = 3;
this.gameTime = 60;
this.sFireDis = 300;
this.dFireDis = 600;
this.dSelfDis = 50;
this.speedFire = 150;
this.firePCnt = 6;
this.firePDis = 300;
this.jumpDis = 60;
this.jumpHeight = 60;
this.hurtByFire = 1;
this.openEggCnt = 5;
this.arrAwardPower = [ 1, 2, 5 ];
this.arrStar = [ 1, 3, 5 ];
}
s(e, [ {
key: "initStorage",
value: function() {
if (!this.getItem("pubg_0.0.1")) {
this.addItem("pubg_0.0.1", !0);
this.addItem("pubg_max_level", 1);
this.addItem("pubg_gold", 3e3);
this.addItem("pubg_power", 5);
}
}
} ]);
return e;
}();
window.yy = t.exports = new a();
cc._RF.pop();
}, {} ]
}, {}, [ "Config", "Base", "BoneBase", "PanelBase", "SceneBase", "OS", "OsAudio", "OsJsonData", "OsLoader", "OsLocalStorage", "OsServer", "OsUtil", "Game", "Home", "Level", "Loading", "Player", "YouYou", "Banzhuan", "FireCircle", "FloatTile", "HoleControl", "Monkey" ]);