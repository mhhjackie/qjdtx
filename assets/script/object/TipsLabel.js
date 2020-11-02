cc.Class({
    extends: cc.Component,

    properties: {
        _yDelta: 100,
    }, 

    onLoad() {
        this._yDelta = 150;
    },

    start() {
        cc.tween(this.node)
        .to(1, {y: this.node.y + this._yDelta})
        .to(1, {opacity: 0})
        .call(() => {
            if (this.node) {
                this.node.destroy();
            }
        })
        .start();
    },  
});
