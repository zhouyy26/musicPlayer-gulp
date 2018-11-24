var gulp = require('gulp'),
    newer = require('gulp-newer'), // 针对更新的文件
    imagemin = require('gulp-imagemin'), // 压缩css
    htmlclean = require('gulp-htmlclean'), // 压缩html
    uglify = require('gulp-uglify'), // 压缩js
    stripDebug = require('gulp-strip-debug'), // 去掉调试语句
    concat = require('gulp-concat'), // 拼接js
    less = require('gulp-less'), // 把less转成css
    postcss = require('gulp-postcss'), // 添加前缀并压缩css
    autoprefixer = require('autoprefixer'), // 添加前缀
    cssnano = require('cssnano'), // 压缩css
    connect = require('gulp-connect'); // 模拟服务器

// 文件夹位置
var folder = {
    src: './src/',
    dist: './dist/'
}

// 判断当前环境 development/production
var devMode = process.env.NODE_ENV == 'production'; // 获取环境变量 并判断

// 注册img任务
gulp.task('img', function () {
    gulp.src(folder.src + 'img/*') // 读取文件
        .pipe(newer(folder.dist + 'img')) // 监听该文件夹下的文件是否为最新文件
        .pipe(imagemin()) // 压缩文件
        .pipe(gulp.dest(folder.dist + 'img')); // 生成文件
});

// html
gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*');
    if (devMode) { // 当前为生产环境时 才压缩代码  避免压缩后所有错误都报在第一行   
        page.pipe(htmlclean());
    }
    page.pipe(gulp.dest(folder.dist + 'html'));
});

// css
gulp.task('css', function () {
    var options = [autoprefixer(), cssnano()]; // 配置
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less());
    if (devMode) {
        page.pipe(postcss(options));
    }
    page.pipe(gulp.dest(folder.dist + 'css'));
});

// js
gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*');
    if (devMode) {
        page.pipe(stripDebug())
            .pipe(concat('main.js'))
            .pipe(uglify());
    }
    page.pipe(gulp.dest(folder.dist + 'js'));
});

// 模拟服务器
gulp.task('server', function () {
    connect.server({
        port: 8082, // 端口号
        livereload: true // 自动刷新页面
    });
});

// 监听
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']); // 当该文件夹下的文件改变时，自动执行该任务
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'img/*', ['img']);
})

// 注册默认任务 该任务依赖数组里的任务
gulp.task('default', ['img', 'html', 'js', 'css', 'watch', 'server']);