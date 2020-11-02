/**
 * 全局变量
 */

class YOUYOU {

    constructor() {
        cc.log('YOUYOU init');
        this.anchievePowerTime = 180; //赠送体力值间隔时间
        this.selectLevel = 1; //关卡类型  
        this.heroPower = 0, //角色体力值
        this.reviveTime = 2; //每关有两次复活机会
        this.costPower = 3; //每次复活消耗体力值
        this.enterCamp = 3; //进入关卡需消耗体力值
        this.gameTime = 60; //游戏时长
        this.sFireDis = 300; //单火圈间距
        this.dFireDis = 600; //双火圈间距
        this.dSelfDis = 50; //双火圈间距
        this.speedFire = 150; //火圈移动速度
        this.firePCnt = 6; //火盘个数
        this.firePDis = 300; //火盘间距
        this.jumpDis = 60; //跳跃距离
        this.jumpHeight = 60; //跳跃高度
        this.hurtByFire = 1; //碰火圈(盘)掉体力值
        this.openEggCnt = 5; //本关卡单日开启彩蛋次数
        this.arrAwardPower = [1, 2, 5]; //体力值对应奖励体力值
        this.arrStar = [1, 3, 5]; //体力值对应星星数
        this.arrFloatTile = []; //漂浮地块
    }

    initStorage() {
        let name = 'pubg' + '_';
        if (!this.getItem(name + '0.0.1')) {
            console.log("no item 0.0.1");
            this.addItem(name + '0.0.1', true);
            this.addItem(name + 'max_level', 1);
            this.addItem(name + 'gold', 3000);
            this.addItem(name + 'power', 5);
        }else{
            console.log("has item 0.0.1");
        }
    }
}
window.yy = module.exports = new YOUYOU();
