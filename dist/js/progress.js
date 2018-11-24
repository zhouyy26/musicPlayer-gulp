// 进度
(function ($, root) {
    $scope = $('.wrap');
    var totTime; // 总时长
    var startTime; // 开始时间
    var stopTime = 0; // 暂停前的时长
    var timer;

    // 初始化  现在时长 + 总时长 + 进度条
    function init(time) {
        cancelAnimationFrame(timer); // 清除timer，避免开启多个
        totTime = time; // 保存总时长
        startTime = 0;
        stopTime = 0;
        $scope.find('.cur-bar').width('0%');
        $scope.find('.cur-time time').html('00:00');
        $scope.find('.tot-time time').html(formetTime(time));
    }

    // 开始计时
    function start(time) {
        stopTime = time != undefined ? time : stopTime; // 有time时，把time赋给stopTime
        startTime = new Date().getTime(); // 开始时间
        function animationFrame() {
            var nowTime = new Date().getTime(); // 现在时间
            var curTime = stopTime + (nowTime - startTime) / 1000; // 更新当前时长
            if (curTime <= totTime) { // 歌曲没播完
                update(curTime); // 更新当前时间
                timer = requestAnimationFrame(animationFrame); // 开启计时器
            } else { // 歌曲已播完
                cancelAnimationFrame(timer); // 清除计时器
                $scope.trigger('playChange'); // 触发playChange事件  播放下一首
            }
        }
        animationFrame();
    }

    // 停止计时
    function stop() {
        cancelAnimationFrame(timer); // 清除计时器
        var stopTime = new Date().getTime(); // 暂停时间
        stopTime += (stopTime - startTime) / 1000;
    }

    // 更新  现在时长 + 进度条
    function update(time) {
        $scope.find('.cur-time time').html(formetTime(time));
        var percent = (time / totTime) * 100 + '%';
        $scope.find('.cur-bar').css('width', percent);
    }

    // 转换时间格式  253 --> 4:13
    function formetTime(time) {
        time = Math.round(time); // 四舍五入
        var min = Math.floor(time / 60); // 分
        var sec = time % 60; // 秒
        min = min < 10 ? '0' + min : min; // 补零
        sec = sec < 10 ? '0' + sec : sec;
        return min + ':' + sec;
    }

    root.progress = {
        init: init,
        update: update,
        start: start,
        stop: stop
    }
})(window.Zepto, window.player || (window.player = {}));