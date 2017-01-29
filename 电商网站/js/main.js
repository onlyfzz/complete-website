/**
 *鼠标滑过商品列表右侧子菜单出现
 */
(function() {
    var $shopClassItem = $('#shopClass-item dl');
    var $itemSublist = $('#item-sub .item-sublist');

    /**
     *shopClass鼠标滑过时的变化
     */
    $shopClassItem.hover(function() {
        $(this).addClass('item-active');
        $itemSublist.eq($(this).index()).show();
    },function() {
        $(this).removeClass('item-active');
        $itemSublist.eq($(this).index()).hide();
    });
    /**
     *itemSublist鼠标滑过时的变化
     */
    $itemSublist.hover(function() {
        $shopClassItem.eq($(this).index()).addClass('item-active');
        $(this).show();
    },function() {
        $shopClassItem.eq($(this).index()).removeClass('item-active');
        $(this).hide();
    });
})();
/**
 *窗口滚动超过一屏时searchFixed出现
 */
(function() {
    var $window = $(window);
    var $searchFixed = $('#search-fixed');
    $window.scroll(function() {
        if ($window.scrollTop() > $window.height()) {
            $searchFixed.slideDown();
        }else{
            $searchFixed.stop();
            $searchFixed.slideUp();
        }
    });
})();
/**
 *banner轮播图
 */
(function() {
    var $banner = $('#imgBanner'),
        $imgs = $('#imgBox').find('img'),
        mark = 0,
        $bts = $('#btGroup').find('span'),
        timer = null;
    /**
     *对img进行渲染,改变透明度和z-index
     *@param{number} index 传入当前需要被显示图片的索引
     */
    function render(index) {
        $imgs.css({'zIndex':'1'});      
        $imgs.animate({opacity:'0.3'});
        $imgs.eq(index).css('zIndex','2').animate({opacity:'1'},300);
    }
    /**
     *渲染按钮,使按钮的样式随图片的轮播而变化
     */
    function showBt() {
        $bts.eq(mark).addClass('on');
        $bts.eq(mark).siblings().removeClass('on');
    }
    /**
     *使img自动轮播
     */
    function play() {
        timer = setInterval(function(){
            if (mark == 5) {
                mark = 0;
            }else{
                mark++;
            }
            render(mark);
            showBt();
        },4000);
    }
    //停止自动轮播
    function stop() {
        clearInterval(timer);
    }
    //添加事件监听
    $bts.mouseover(function() {
        $imgs.stop();
        mark = $(this).attr('index');
        render(mark);
        showBt();
    });
    $banner.hover(function() {
        stop();
    },function() {
        play();
    });
    play();
})();
/**
 *侧边定位导航
 */
 (function() {
    /*
     *$rightSide    右侧导航
     *$pointers     右侧导航的子菜单
     *$anchors      被设置了锚点的各个div
     *$mark{number} 用来标记当前锚点的索引
     *$back         回到顶部按钮
     */
    var $rightSide = $('#rightSide-nav'),
        $pointers = $rightSide.find('.anchor'),
        $anchors = $('div[id^=anchor-]'),
        mark = 0,
        $back = $('#backTo-top');
        
     //点击回到顶部
    $back.click(function() {
        $('html,body').animate({'scrollTop':0}, 500);
    });
    //当屏幕滚动时,右侧导航样式随之变化
    function scrollListen() {
        var $winTop = $(window).scrollTop();
        if ($winTop > $(window).height()) {
            $rightSide.slideDown();
            for(var i = 0;i < $pointers.length;i++){
                var ancTop = $anchors.eq(i).offset().top - 150;
                if ($winTop > ancTop) {
                    mark = i;
                }else {
                    break;
                }
            }
            $pointers.each(function() {
                $(this).removeClass('active');
            });
            $pointers.eq(mark).addClass('active');
        }else {
            $rightSide.stop();
            $rightSide.slideUp();
        }
    }
    $(window).scroll(scrollListen);
 })();
/**
 *模拟登陆
 */
(function() {
    var json = '{"username":"519618744","password":"123456"}';
    var $loginBt = $('#login-bt');
    $loginBt.click(function(){  
        $name = $('#username').val();
        $word = $('#password').val();
        var data = JSON.parse(json);
        if ($name == data.username && $word == data.password) {
            location.href = 'index.html';
        }else{
            alert('账号密码错误');
        }
    });
})();
