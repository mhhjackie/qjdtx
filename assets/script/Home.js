import SceneBase from 'SceneBase';
import YouYou from './YouYou';

cc.Class({
    extends: SceneBase,
    properties: {
        lblPower: {
            type: cc.Label,
            default: null,
        },
    },

    onLoad () {
        YouYou.heroPower += 5;
        if (os.ls.getItem2("powerNum")) {
            console.log("体力已经有赠送过的");
            YouYou.heroPower = os.ls.getItem2("powerNum");
        }else{
            console.log('初始赋值给体力5');
            YouYou.heroPower = 5;
        }
    },
    
    start () {
        this.lblPower.string = YouYou.heroPower.toString();
    },

    touchBtn(evt, customData) {
        console.log("event target name:  " + evt.currentTarget.name);
        console.log(typeof customData);
        console.log(customData);
        switch(customData) {
            case "1":
                this.changeScene('Level');
                break;
            case "2":
                this.changeScene('Level');
                break;
            case "3":
                console.log("turntable");
                break;
            case "4":
                console.log("sign");
                break;
            case "5":
                console.log("pifu");
                break;
        }
    }
    // update (dt) {},
});
