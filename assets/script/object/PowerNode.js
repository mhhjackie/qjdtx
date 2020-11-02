const YouYou = require("../YouYou");
cc.Class({
    extends: cc.Component,
 
    properties: {
 
    },
 
    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
    },

    start() {
        this.schedule(function() {
            this.achievePower();  // 这里的 this 指向 component
        }, YouYou.anchievePowerTime);
    },

    achievePower() {
        if (YouYou.heroPower < 20) {
            YouYou.heroPower+=1;
            os.ls.setItem2("powerNum", YouYou.heroPower.toString());
        }
    }
});