// 获取数据
// 渲染页面
// 绑定事件

// 切换模式  随机时把dataList里的对象随机排列randomList  列表/单曲dataList不变


// 切歌方式
// 随机播放：自动/手动切换 --> 按randomList切换
// 列表循环：自动/手动切换 --> 按dataList切换
// 单曲循环：自动切换 --> 单曲切换，上下切换 --> 按dataList切换
// 播放列表切换 --> 按dataList切换


var root = window.player,
    render = root.render,
    getIndex = root.getIndex,
    audio = root.audio,
    progress = root.progress,
    playMode = root.playMode;
var songList, // 全局data
    randomList, // 随机data
    song, // 单曲信息
    len, // 歌曲数量
    curIndex = 0, // 当前index
    newIndex = 0, // 下个index
    duration; // 单曲总时长
var $scope = $('.wrap'),
    $slider = $scope.find('.slider-point'),
    $offset = $scope.find('.tot-bar').offset(),
    left = $offset.left,
    width = $offset.width;

// 绑定事件
function bindEvent() {
    // 自定义事件
    $scope.on('playChange', function () {
        // 保存全局变量
        song = playMode.status !== 'random' ? songList[newIndex] : randomList[newIndex];
        duration = song.duration;
        // 初始化
        render.singleInfo(song); // 渲染单曲信息
        audio.load(song.audio); // 加载音频
        progress.init(duration); // 进度条初始化
        if (playMode.status === 'random') { // 改变播放列表高亮
            var songListIndex = getIndex.getCurIndex(songList, song.song);
            $('.play-cont li').removeClass('active').eq(songListIndex).addClass('active');
        } else {
            $('.play-cont li').removeClass('active').eq(newIndex).addClass('active');
        }
        // 播放音频
        if (audio.status === 'play') { // 当前状态为播放时，播放音频
            audio.play();
            progress.start();
            $('.play-btn').addClass('pause');
        }
        // 更新index
        curIndex = newIndex; // 更新curIndex
        if (playMode.status !== 'single') { // 播放模式不为单曲循环，则更新newIndex
            newIndex = getIndex.next(curIndex);
        }
    });

    // 切换播放播放模式
    $scope.on('click', '.mode-btn', function () {
        playMode.changeMode(); // 改变播放模式
        if (playMode.status === 'sequential') { // 播放模式为列表循环时  改变newIndex
            newIndex = getIndex.next(curIndex);
        } else if (playMode.status === 'single') { // 单曲循环  改变newIndex
            newIndex = curIndex;
        } else { // 随机播放  改变randomList和index
            randomList = playMode.randomList(songList);
            curIndex = getIndex.getCurIndex(randomList, song.song);
            newIndex = getIndex.next(curIndex);
        }
    });

    // 点击切歌
    $scope.on('click', '.prev-btn', function () {
        newIndex = getIndex.prev(curIndex);
        audio.status = 'play';
        $scope.trigger('playChange');
    });
    $scope.on('click', '.next-btn', function () {
        newIndex = getIndex.next(curIndex);
        audio.status = 'play';
        $scope.trigger('playChange');
    });
    $scope.on('click', '.play-cont li', function () {
        newIndex = $(this).index();
        if (playMode.status === 'random') { // 播放模式为随机时，处理newIndex
            newIndex = getIndex.getCurIndex(randomList, songList[newIndex].song);
        }
        audio.status = 'play';
        $scope.trigger('playChange');
        $('.play-list').removeClass('show');
    });

    // 开始/暂停
    $scope.on('click', '.play-btn', function () {
        if (audio.status === 'pause') { // 开始
            audio.play();
            progress.start();
            $(this).addClass('pause');
        } else if (audio.status === 'play') { // 暂停
            console.log(111)
            audio.pause();
            progress.stop();
            $(this).removeClass('pause');
        }
    });

    // 显示/隐藏播放列表
    $scope.on('click', '.list-btn', function () {
        $('.play-list').addClass('show');
    });
    $scope.on('click', '.play-foot', function () {
        $('.play-list').removeClass('show');
    });

    // 拖拽
    $slider.on('touchstart', function () {
        audio.pause(); // 暂停播放
        progress.stop(); // 进度条暂停
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX,
            per = (x - left) / width; // 百分比
        if (per >= 0 && per <= 1) {
            var curTime = duration * per;
            progress.update(curTime); // 更新进度
        } else if (per > 1) {
            progress.update(duration - 1); // 更新进度
        } else {
            progress.update(0); // 更新进度
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX,
            per = (x - left) / width;
        if (per > 0 && per < 1) {
            var curTime = duration * per;
        } else if (per >= 1) {
            curTime = duration - 1;
        } else {
            curTime = 0;
        }
        audio.currentTime(curTime); // 设置当前时长
        progress.start(curTime); // 进度开始
        audio.play(); // 开始播放
        $('.play-btn').addClass('pause'); // 添加class
    });
}

// 获取数据
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            songList = data; // 保存data
            len = data.length; // 保存length
            render.playList(data); // 渲染播放列表
            bindEvent(); // 绑定事件
            $scope.trigger('playChange'); // 触发playChange事件
        },
        error: function () {
            console.log('error');
        }
    });
}

getData('../mock/data.json');