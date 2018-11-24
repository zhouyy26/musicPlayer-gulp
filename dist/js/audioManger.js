// 音频控制
(function ($, root) {
    var audioManager = {
        audio: new Audio(),
        status: 'pause',
        getAudio: function (src) {
            this.audio.src = src; // 设置路径
            this.audio.load(); // 加载
        },
        play: function () {
            this.audio.play();
        },
        pause: function () {
            this.audio.pause();
        }
    }
    root.audioManager = audioManager;
})(window.Zepto, window.player || (window.player = {}));