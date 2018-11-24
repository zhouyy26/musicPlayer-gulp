// 切歌
(function ($, root) {
    var controlManger = {
        changeIndex: function (val) {
            var curIndex = (index + len + val) % len; // 通过算法获取index
            return curIndex;
        },
        prev: function () {
            return this.changeIndex(-1);
        },
        next: function () {
            return this.changeIndex(1);
        }
    }
    root.controlManger = controlManger;
})(window.Zepto, window.player || (window.player = {}));