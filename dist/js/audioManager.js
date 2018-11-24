// 音频
(function ($, root) {
    var audioManager = {
        audio: new Audio(),
        status: 'pause',
        loadAudio: function (src) { // 加载音频
            this.audio.src = src; // 设置路径
            this.audio.load(); // 加载
        },
        play: function () { // 开始
            this.audio.play();
            this.status = 'play';
        },
        pause: function () { // 暂停
            this.audio.pause();
            this.status = 'pause';
        },
        currentTime: function (time) {
            this.audio.currentTime = time;
        }
    }
    root.audioManager = audioManager;
})(window.Zepto, window.player || (window.player = {}));