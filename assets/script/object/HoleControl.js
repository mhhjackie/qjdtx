cc.Class({
    extends: cc.Component,

    properties: {
        // bulletPrefab:{
        //     default: null,
        //     type: cc.Prefab
        // },
        _shootDir: 0,
    },

    onLoad: function () {
        switch(this._shootDir) {
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
                break;
            default: break;
        }
    },

    start: function () {
    },

    onCollisionEnter: function (other, self) {
        
    }
});
