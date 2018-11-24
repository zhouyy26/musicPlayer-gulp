// 音频
(function ($, root) {
    var audio = {
        audio: new Audio(),
        status: 'pause', // 状态
        load: function (src) { // 加载音频
            this.audio.src = src; // 设置路径
            this.audio.load(); // 加载
        },
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        currentTime: function (time) { // 设置当前播放时长
            this.audio.currentTime = time;
        }
    }
    root.audio = audio;
})(window.Zepto, window.player || (window.player = {}));