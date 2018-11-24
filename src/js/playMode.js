// 切换播放模式
(function ($, root) {
    var playMode = { // 切换播放模式
        status: 'sequential', // sequential single random
        changeMode: function () {
            if (this.status === 'sequential') {
                this.status = 'single';
                $('.mode-btn').removeClass().addClass('mode-btn single');
            } else if (this.status === 'single') {
                this.status = 'random';
                $('.mode-btn').removeClass().addClass('mode-btn random');

            } else {
                this.status = 'sequential';
                $('.mode-btn').removeClass().addClass('mode-btn');
            }
        },
        randomList: function (songList) { // 重排data顺序
            var arr = [];
            var len = songList.length;
            songList.forEach(function (ele) {
                var random = Math.floor(Math.random() * len);
                function randomHandle() {
                    random = Math.floor(Math.random() * len);
                    if (!arr[random]) {
                        arr[random] = ele;
                    } else {
                        randomHandle();
                    }
                }
                randomHandle();
            });
            return arr;
        }
    }
    root.playMode = playMode;
})(window.Zepto, window.player || (window.player = {}));