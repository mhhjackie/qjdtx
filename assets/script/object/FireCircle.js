const YouYou = require("../YouYou");

cc.Class({
    extends: cc.Component,

    properties: {
        // king:{
        //     default:null,
        //     type:cc.Node,
        // }
    },
    
    // //判断高空导弹来时，猴哥是否蹲下
    // judgeDown:function(){
    //     if(this.king.getComponent('King').state == 'down'){
    //         console.log("down---------------------");
    //     }else{
    //         cc.director.loadScene('Over');
    //     }
    // },  
    
    // //判断低空导弹来时，猴哥是否跳起
    // judgeJump:function(){
    //     if(this.king.getComponent('King').state == 'jump'){
    //         console.log("jump---------------------");
    //     }else{
    //         cc.director.loadScene('Over');
    //     }
    // },

    start() {
        this.schedule(function(){
            this.moveLeft();
        }, 1);
    },
    
    onLoad: function () {
        //let self = this;
        //每隔2秒随机发射高空和低空导弹
    },

    moveLeft: function() {
        //console.log("moveLeft ******");
        // this.node.x -= 150;
        // this.node.runAction();
        cc.tween(this.node).to(1, { position: cc.v2(this.node.x - YouYou.speedFire, this.node.y) }).call(() => {
            //this.canClick = true;
        }).start();
    }
});
