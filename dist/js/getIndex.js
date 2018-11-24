// 处理index
(function ($, root) {
    var getIndex = {
        changeIndex: function (index, val) { // 改变Index
            var newIndex = (index + len + val) % len; // 通过算法获取index
            return newIndex;
        },
        prev: function (index) {
            return this.changeIndex(index, -1);
        },
        next: function (index) {
            return this.changeIndex(index, 1);
        },
        getCurIndex: function(list, songName) {
            var newIndex;
            list.forEach(function (ele, index) { // 循环list，当前歌名与List的歌名相等时，返回index
                if (ele.song === songName) {
                    newIndex = index;
                    return;
                }
            });
            return newIndex;
        }
    }
    root.getIndex = getIndex;
})(window.Zepto, window.player || (window.player = {}));