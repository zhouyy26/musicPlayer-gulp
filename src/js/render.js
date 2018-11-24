// 渲染页面
(function ($, root) {
    var $scope = $('.wrap');

    // 图片
    function renderImg(img) {
        var oImg = new Image();
        oImg.src = img;
        oImg.onload = function () {
            root.blurImg(oImg, $scope); // 高斯模糊背景图
            $scope.find('.cover-img').html(oImg);
        }
    }

    // 信息
    function renderInfo(data) {
        var dom = '<div class="song-name"><h1>' + data.song + '</h1></div>\
                    <div class="singer-name"><span>' + data.singer + '</span></div>\
                    <div class="album-name"><span>' + data.album + '</span></div>';
        $scope.find('.song-info').html(dom);
    }

    // 是否喜欢
    function renderLike(isLike) {
        if (isLike) {
            $scope.find('.like-btn').addClass('liking');
        } else {
            $scope.find('.like-btn').removeClass('liking');
        }
    }

    // 渲染单曲信息
    function renderSingleInfo(data) {
        renderImg(data.image);
        renderInfo(data);
        renderLike(data.isLike);
    }

    // 渲染播放列表
    function renderPlayList(data) {
        var str = '';
        data.forEach(function (ele) {
            str += '<li><h2>' + ele.song + '</h2><span>-' + ele.singer + '</span></li>';
        })
        $scope.find('.play-cont ul').html(str);
    }

    // 暴露接口
    root.render = {
        singleInfo: renderSingleInfo,
        playList: renderPlayList
    };
})(window.Zepto, window.player || (window.player = {}));