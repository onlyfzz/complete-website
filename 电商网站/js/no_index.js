/**
 *鼠标滑过商品列表右侧子菜单出现
 **/
(function() { 
	var $allClass = $('#allClass'),
	 	$shopClass = $('#shopClass'),
	 	$shopClassItem = $('#shopClass-item dl'),
	 	$itemSublist = $('#item-sub .item-sublist');
	/**
	 *鼠标滑过全部商品,列表出现
	 **/
	$allClass.hover(function() {
		$shopClass.show();
	},function() {
		$shopClass.hide();
	});
	/**
	 *shopClass鼠标滑过时的变化
	 **/
	$shopClassItem.hover(function() {
		$(this).addClass('item-active');
		$('#item-sub .item-sublist').eq($(this).index()).show();
	},function() {
		$(this).removeClass('item-active');
		$('#item-sub .item-sublist').eq($(this).index()).hide();
	});
	/**
	 *itemSublist鼠标滑过时的变化
	 **/
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
 **/
(function() {
	var $window = $(window);
	var $searchFixed = $('#search-fixed');
	$window.scroll(function() {
		if ($window.scrollTop() > $window.height()) {
			$searchFixed.slideDown();
		}else{
			$searchFixed.slideUp();
		}
	});
})();
/**
 *banner轮播图
 **/
(function() {
	var $banner = $('#imgBanner'),
		$imgs = $('#imgBox').find('img'),
		mark = 0,
		$bts = $('#btGroup').find('span'),
		timer = null;
	function render(index) {
		$imgs.css({'zIndex':'1'});		
		$imgs.animate({opacity:'0.3'},500);
		$imgs.eq(index).css('zIndex','2').animate({opacity:'1'},500);
	}
	function showBt() {
		$bts.eq(mark).addClass('on');
		$bts.eq(mark).siblings().removeClass('on');
	}
	function play() {
		timer = setInterval(function(){
			if (mark == 5) {
				mark = 0;
			}
			mark++;
			render(mark);
			showBt();
		},4000);
	}
	function stop() {
		clearInterval(timer);
	}
	$bts.click(function() {
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
 **/
 (function(){
 	var $rightSide = $('#rightSide-nav'),
 		$pointers = $rightSide.find('.anchor'),
 		$anchors = $('div[id^=anchor-]'),
 		mark = 0,
 		$back = $('#backTo-top');
 	$back.click(function() {
 		$('html,body').animate({'scrollTop':0}, 500);
 	});
 	$(window).scroll(function() {
 		var $winTop = $(window).scrollTop();
 		if ($winTop > $(window).height()) {
 			$rightSide.slideDown();
 			for(var i = 0;i < $pointers.length;i++){
 				var ancTop = $anchors.eq(i).offset().top-150;
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
 			$rightSide.slideUp();
 		}
 	});
 })();
/**
 *模拟登陆
 */
(function() {
	var json = '{"username":"519618744","password":"123456"}',
		$loginBt = $('#login-bt');
	$loginBt.click(function() {	
		$name = $('#username').val();
		$word = $('#password').val();
		var data = JSON.parse(json);
		if ($name == data.username && $word == data.password) {
			location.href = 'index.html';
		}
	});
})();
/**
 *地址选择点击出现
 **/
(function() {
	var $addSelect = $('#add-select'),
		$selectList = $('#select-list'),
		$addLists = $selectList.find('li'),
		$addCont = $addSelect.find('h3'),
		$main = $('#main-product');
	$addSelect.click(function(e) {
		$selectList.toggle();
		e.stopPropagation();
	});
	$addLists.click(function(e) {
		$addCont.text($(this).text());
		$(this).parent().hide();
		e.stopPropagation();
	});
	$main.click(function() {
		$selectList.hide();
	});
})();
/**
 *商品颜色、规格和数量选择
 */
(function() {
	var $chooseColor = $('#chooseColor a'),
		$chooseClass = $('#chooseClass a');
	$chooseColor.click(function() {
		$chooseColor.removeClass('choose-active');
		$(this).addClass('choose-active');
	});	
	$chooseClass.click(function() {
		$chooseClass.removeClass('choose-active');
		$(this).addClass('choose-active');
	});
	var $numReduce = $('#numReduce'),
		$numText = $('#numText'),
		$numAdd = $('#numAdd'),
		$limitNum = parseInt($('#limitNum').text(),10);
	$numReduce.click(function() {
		if ($numText.val() == 1) {
			return;
		}else {
			var num = parseInt($numText.val(),10);
			num--;
			$numText.val(num);
		}
	});
	$numAdd.click(function() {
		var num = parseInt($numText.val(),10);
		if (num == $limitNum) {
			return;
		}else {
			num++;
			$numText.val(num);
		}
	});
})();
/**
 *商品详细页中图片的切换和放大镜效果
 **/
 (function() {
 	var $bigPic = $('#bigPic'),
 		$smPics = $('#smPic').find('img'),
 		$smPicsWrap = $('#smPic').find('li');
 	//鼠标滑过为小图片添加样式以及更改大图
 	$smPics.mouseover(function() {
 		$smPicsWrap.removeClass('active');
 		$(this).parent().addClass('active');
 		$bigPic.attr('src', $(this).attr('mark'));
 	});
 	var bigImgBox = $('#bigImgBox'),
 		magnifier = $('#magnifier'),
 		bigPicWrap = $('#bigPic-wrap');
 	//实现放大镜效果
 	bigPicWrap.hover(function() {
 		magnifier.show();
 		bigImgBox.html('<img src="'+$bigPic.attr('src')+'" alt="大图">');
 		bigImgBox.show();
 	},function() {
 		magnifier.hide();
 		bigImgBox.hide();
 	});
 	bigPicWrap.mousemove(function(e) {
 		var x = e.pageX - $bigPic.offset().left - magnifier.width() / 2;
 		var y = e.pageY - $bigPic.offset().top - magnifier.height() / 2;
 		var max_x = $bigPic.width() - magnifier.width();
 		var max_y = $bigPic.height() - magnifier.height();
 		x = Math.min(max_x,Math.max(0,x));
 		y = Math.min(max_y,Math.max(0,y));
 		magnifier.css({
 			'left': x + 'px',
 			'top': y + 'px'
 		});
 		var bigImg = bigImgBox.find('img');
 		persentX = x / ($bigPic.width() - magnifier.width());
 		persenty = y / ($bigPic.height() - magnifier.height());
 		bigX = -persentX * (bigImg.width() - bigImgBox.width());
 		bigY = -persenty * (bigImg.height() - bigImgBox.height());
 		bigImg.css({
 			left: bigX + 'px',
 			top: bigY + 'px'
 		});
 	});
 })();
 /**
  *产品咨询和评论点击切换以及点赞的点击增加
  **/
 (function() {
 	var $commentBt = $('#commentBt'),
 		$proInroBt = $('#proInroBt'),
 		$proComment = $('#proComment'),
 		$proIntroduce = $('#proIntroduce'),
 		$praiseNum = $('#commentCont').find('.to-praise');
 	$commentBt.click(function() {
 		$proIntroduce.hide();
 	});
 	$proInroBt.click(function() {
 		$proIntroduce.show();
 	});
 	$praiseNum.on('click',function() {
 		if ($(this).attr('flag') == 1) {
 			return;
 		}
 		var num = parseInt($(this).children('span.praise-num').text(),10);
 		$(this).children('span.praise-num').text(++num);
 		$(this).attr('flag', '1');
 	});
 })();

