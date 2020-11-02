/*
 * WebSocket通讯类
 */

let hostList = [
    '47.100.137.37',
];
let port = 20030;
let socket = null;
let hostIndex = 0;

export default class {
    constructor() {
        cc.log('os.server init');

        this.isInit = false;
        this.isWaiting = false;
        this.isServer = false;
        this.serverCount = 0;
        this.sendMid = 0;
        this.sendData = {};
        this.userInfo = {};
        this.loginCallback = null;
        this._init();
    }

    init() {

    }

    _init() {
        if (this.isInit) {
            cc.log('已连接上 ==>' + hostList[hostIndex]);
            return;
        }
        if (hostIndex >= hostList.length) {
            hostIndex = 0;
        }
        let url = hostList[hostIndex] + ':' + port;
        cc.log('url ' + url);
        socket = new WebSocket('ws://' + url);
        // {
        //     protocolVersion: 8,
        //     origin: 'https://' + url,
        //     rejectUnauthorized: false //重要，自签名证书只能这样设了。CA颁发的受信任证书就不需要了
        // }
        if (socket) {
            socket.onopen = this._onOpen.bind(this);
            socket.onclose = this._onClose.bind(this);
            socket.onerror = this._onError.bind(this);
            socket.onmessage = this._onMessage.bind(this);
        }
    }

    _onOpen() {
        cc.log('==> 连接上<' + hostList[hostIndex] + '>');
        hostIndex = 0;
        this.isInit = true;
    }

    _onClose() {
        cc.log('onClose 断线重连...');
        this.isInit = false;
        this._init();
        // setTimeout(() => {
        //     this.init();
        // }, 3000);
    }

    _onError() {
        cc.log('onError');
        hostIndex += 1;
    }

    _onMessage(msg) {
        let backdata = JSON.parse(msg.data);
        if (!!backdata.cb) {
            this.broadcastMessage(backdata);
            return;
        }
        if (this.isWaiting) { this.serverCount = 0; this.setWaiting(); }
        if (!!backdata.msg) {
            os.event.emit('miniMessage', { content: backdata.msg });
            return;
        }
        if (backdata.code === 500) {
            cc.log('error', this.sendMid);
            return;
        }
        if (!!this.sendCallback && typeof this.sendCallback === 'function') {
            cc.log('接收数据=>' + this.sendMid, backdata);
            this.sendCallback(backdata.data);
        }
    }

    send(data, cb = function () { }, isWaiting = true) {
        this.isWaiting = isWaiting;
        if (isWaiting) { this.serverCount += 1; this.setWaiting(); }
        let mid = data.mid;
        let route = os.net.getNetData(mid);
        let uid = this.userInfo.uid;
        delete data.mid;
        cc.log('发送数据=>' + mid, data);
        if (!this.isInit) {
            cc.log('没有连接网络');
        } else if (socket.readyState === WebSocket.OPEN) {
            this.sendMid = mid;
            this.sendCallback = cb;
            // cc.log(JSON.stringify({ mid, route, uid, data }));
            socket.send(JSON.stringify({ mid, route, uid, data }));
        } else {
            cc.log('readyState:' + socket.readyState);
        }
    }

    close() {
        if (socket) {
            socket.close();
            socket = null;
        }
    }

    broadcastMessage(backdata) {
        cc.log('收到广播消息', backdata);
        if (backdata.cb === 'zeroUpdate') {

        }
    }

    setWaiting() {
        if (this.serverCount < 0) {
            this.serverCount = 0;
        }
        os.waiting({ isWaiting: this.serverCount });
    }

    login(userInfo, cb) {
        if (this.isServer) {
            // os.changeScene({ name: 'main' });
            typeof cb === 'function' && cb();
        } else {
            this.loginCallback = cb;
            this._startLogin(userInfo);
        }
    }

    _startLogin(userInfo) {
        let mid = 100;
        let sys = cc.sys.browserType;
        if (cc.sys.browserType === 'wechatgame') {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        let code = res.code;
                        wx.getUserInfo({
                            success: (res) => {
                                let avatarUrl = res.userInfo.avatarUrl;
                                let nickName = res.userInfo.nickName;
                                this.send({ sys, code, avatarUrl, nickName, mid }, this._loginSucc);
                            },
                            fail: () => {
                                cc.log('wx.getUserInfo fail');
                            }
                        });
                    } else {
                        cc.log('获取用户登录态失败！' + res);
                    }
                },
                fail: () => {
                    cc.log('wx.login fail');
                }
            });
        } else {
            let account = userInfo.account;
            let password = userInfo.password;
            if (CC_BUILD && cc.sys.browserType !== 'wechatgame') {
                if (account === '') { os.event.emit('miniMessage', { content: '账号不能为空' }); return; }
                if (password === '') { os.event.emit('miniMessage', { content: '密码不能为空' }); return; }
                if (account === password) { os.event.emit('miniMessage', { content: '账号密码不能相同' }); return; }
                // let reg = /^[A-Za-z0-9]+$/;
                // if (!reg.test(account)) { os.event.emit('miniMessage', { content: '账号必须由字母、数字组成' }); return; }
                // if (!reg.test(password)) { os.event.emit('miniMessage', { content: '密码必须由字母、数字组成' }); return; }
                if (account.length < 4) { os.event.emit('miniMessage', { content: '账号长度不能小于4位' }); return; }
                if (password.length < 4) { os.event.emit('miniMessage', { content: '密码长度不能小于4位' }); return; }
                if (os.util.checkWord(account)) { os.event.emit('miniMessage', { content: '账号包含非法字符' }); return; }
                if (os.util.checkWord(password)) { os.event.emit('miniMessage', { content: '密码包含非法字符' }); return; }
                cc.log('检测账号密码完毕');
            }
            this.send({ sys, account, password, mid }, this._loginSucc);
        }
    }

    _loginSucc(backdata) {
        this.userInfo = backdata.user;
        os.user.setUserData(this.userInfo);
        cc.log('登陆成功', this.userInfo);
        this._changeScene();
    }

    _changeScene() {
        if (!!os.data.getJsonData()) {
            this.isServer = true;
            this.serverCount = 0;
            this.setWaiting();
            this.loginCallback && this.loginCallback();
        } else {
            setTimeout(this._changeScene.bind(this), 500);
        }
    }
}