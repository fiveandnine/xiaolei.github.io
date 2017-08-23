(function() {
    var canvas = {},
        image = {};
    var particles = [];
    //获取canvas元素
    canvas.obj = document.getElementById('myCanvas');
    // 浏览器支持canvas
    if (canvas.obj.getContext) {
        //获取渲染上下文
        canvas.ctx = canvas.obj.getContext('2d');
        //设置画布大小为屏幕宽高
        canvas.w = canvas.obj.width = document.body.clientWidth;
        canvas.h = canvas.obj.height = 750;
        //新建一个image对象
        var img = new Image();
        img.src = 'images/dd.png';
        //图像加载完后
        img.onload = function() {
            //把图像信息保存在image里面
            image.obj = img;
            image.w = img.width;
            image.h = img.height;
            image.x = parseInt((canvas.w - image.w) / 2);
            image.y = 100;
            //把图像绘制到画布坐标为(100,100)的地方
            // canvas.ctx.drawImage(image.obj,0,0,600,400);
            canvas.ctx.drawImage(image.obj, image.x, image.y, image.w, image.h);
            image.imageData = canvas.ctx.getImageData(image.x, image.y, image.w, image.h);
            //计算出符合要求的像素
            calculate();
            //计算后绘到画布上
            draw();
            //设置image的source
        }

    }

    function rgbToHex(r, g, b) { return ((r << 16) | (g << 8) | b).toString(16); }

    function calculate() {
        //只保存150行，100列的像素值
        var cols = image.w,
            rows = image.h;
        // console.log(rows);	
        //设成150行，100列后每个单元的宽高
        // var s_width = parseInt(image.w/cols),   
        var s_width = 1,
            s_height = 1;
        // s_height = parseInt(image.h/rows);
        var pos = 0; //数组中的位置
        var par_x, par_y; //粒子的x,y坐标
        var data = image.imageData.data; //像素值数组
        // console.log(data);
        var now = new Date().getTime(); //获取当前时间毫秒值
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                //计算(i,j)在数组中的R的坐标值
                pos = (j * s_height * image.w + i * s_width) * 4;
                //判断像素透明度值是否符合要求
                // if(data[pos+3] > 100){
                var particle = {
                    //x,y值都随机一下
                    x: image.x + i * s_width + (Math.random() - 0.5) * 20,
                    y: image.y + j * s_height + (Math.random() - 0.5) * 20,
                    flotage: false,
                    xstart: 0,
                    ystart: 0
                }
                particle.fillStyle = "#" + rgbToHex(data[pos + 0], data[pos + 1], data[pos + 2]);
                particle.flotage = true;
                //保存开始坐标
                particle.startX = particle.x;
                particle.startY = particle.y;
                // particle.x = parseInt((canvas.w - image.w) / 2);;
                // particle.y = 0;
                //动画执行时间和结束时间
                particle.startTime = now + Math.random() * 5 * 1000;
                particle.killTime = now + Math.random() * 5 * 1000;
                //x,y方向的移动速度
                particle.speedX = (Math.random()) * 19;
                particle.speedY = (Math.random() - 0.5) * 9;
                particle.ratio = (j * s_height + (Math.random() - 0.5) * 20) / (i * s_width + (Math.random() - 0.5) * 20);
                // }

                //符合要求的粒子保存到数组里
                particles.push(particle);
                // }
            }
        }
    }

    function draw() {
        //清空画布					
        canvas.ctx.clearRect(0, 0, canvas.w, canvas.h);

        var len = particles.length;

        var curr_particle = null;
        //当前时间毫秒值
        var time = new Date().getTime();
        for (var i = 0; i < len; i++) {

            curr_particle = particles[i];
            //开始漂浮
            if (curr_particle.flotage && curr_particle.startTime < time) {
                //改变粒子位置
                curr_particle.x += curr_particle.speedX;
                curr_particle.y += curr_particle.speedY;
            }
            //结束时间到了
            if (curr_particle.killTime < time) {
                //粒子位置复原
                curr_particle.x = curr_particle.startX;
                curr_particle.y = curr_particle.startY;
                //重新计算开始时间和结束时间
                curr_particle.startTime = time + parseInt(Math.random() * 20) * 1000;
                curr_particle.killTime = time + parseInt(Math.random() * 35) * 1000;
            }
            //设置填充颜色
            canvas.ctx.fillStyle = curr_particle.fillStyle;
            //绘粒子到画布上
            canvas.ctx.fillRect(curr_particle.x, curr_particle.y, 1, 1);
        }

        //重复绘制
        requestAnimationFrame(draw);
    }


}())