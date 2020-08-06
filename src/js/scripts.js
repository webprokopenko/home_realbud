$('document').ready(function(){
	
	//настройки Fancybox
	
	$(".fancybox").fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		},
		openEffect	: 'none',
		closeEffect	: 'none',
		padding: 0
	});

	$(".fancy-video").fancybox({
		'width'				: '90%',
		'height'			: '90%',
        'autoScale'     	: false,
        'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		padding: 0,
		'type'				: 'iframe'
	});
	
	// настройки попапов
	
	$('.modal-show-btn').fancybox({
        autoSize: true,
        type: 'inline',
        closeBtn: false,
        padding: 0,
        scrolling: 'visible',
        fixed: false,
        autoCenter: false,
        beforeShow: function() {
            $('input').removeClass('error');
            $('input[type="text"]').val('');
            $('textarea').val('');
            $(".fancybox-skin").css("background-color", "transparent");

            if(this.element.hasClass('order-link')){
                $('#order-modal .send-btn').text(this.element.data('btn'));
                $('#order-modal .custom-modal-title').html(this.element.data('title'));
                $('#order-modal .custom-modal-subtitle').html(this.element.data('subtitle'));
                $('#order-modal [name="type"]').val(this.element.data('type'));
                $('#order-modal [name="from"]').val(this.element.data('from'));
            }


        },
        afterShow: function(){

        },
        beforeClose: function(){

        },
        afterClose: function() {

        }
    }).click(function() {
        if (typeof($(this).data('from')) !== 'undefined') {

        }
    });
	
	//кнопка закрытия попапов
	
	$('.modal-close').click(function() {
        $.fancybox.close();
        return false;
    });
	
	//кнопка отправки формы
  	
	$('body').on('click', '.send-btn', function(){
        $(this).parents('form').submit();
    });
	
	//валидация формы
	
	$('form').submit(function() {
        $(this).isCorrectRequest();
        return false;
    });

    $('.order-form__conf').click(function(){
		$(this).toggleClass('active');
	});
	
	(function($) {
		$.fn.isCorrectRequest = function() {
			this.find('input[type=text]').removeClass('correct error');

			var nameInput = $(this).find('[name = "name"]');
			var phoneInput = $(this).find('[name = "phone"]');
			var emailInput = $(this).find('[name = "email"]');
			var confCheck = $(this).find('.order-form__conf');

			nameInput.val($.trim(nameInput.val()));
			phoneInput.val($.trim(phoneInput.val()));
			emailInput.val($.trim(emailInput.val()));

			if(nameInput.val() != undefined){
				if(nameInput.val().length === 0)
				{
					nameInput.addClass('error');
					nameInput.focus();
					return false;
				}
			}

			if(phoneInput.val() != undefined){
				if(phoneInput.val().length === 0)
				{
					phoneInput.addClass('error');
					phoneInput.focus();
					return false;
				}
			}

			if(emailInput.val() != undefined){
				var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(emailInput.val().length === 0 || reg.test(emailInput.val()) == false)
				{
					emailInput.addClass('error');
					emailInput.focus();
					return false;
				}
			}

			if($(confCheck).hasClass('active')){
				
            } else {
            	return false;
            }			

			var form = $(this);
			var formData = new FormData($(this)[0]);
			var url = form.attr('action');
			$.ajax({
				type: 'POST',
				url: url,
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				async: false,
				success: function(data)
				{
					$('input').removeClass('error');
					$('input[type="text"]').val('');
					$.fancybox({
					 'autoScale': true,
					 'transitionIn': 'elastic',
					 'transitionOut': 'elastic',
					 'speedIn': 500,
					 'speedOut': 300,
					 'autoDimensions': true,
					 'centerOnScroll': true,
					 'href' : '#thanks-modal'
					});
				},
				error: function(answer)
				{
					$('input').removeClass('error');
					$('input[type="text"]').val('');
					$.fancybox({
					 'autoScale': true,
					 'transitionIn': 'elastic',
					 'transitionOut': 'elastic',
					 'speedIn': 500,
					 'speedOut': 300,
					 'autoDimensions': true,
					 'centerOnScroll': true,
					 'href' : '#thanks-modal'
					});
				}
			});
		};
	})(jQuery);

	//input mask

	$(function(){
		$('input[name="phone"]').inputmask("+38 (099) 999-9999");
	});


	// настройки скрола по якорям	

	$('.go_to').click( function(){
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top - 0 }, 800);
		}
    return false;
	});

	//настройки слайдера

	$('.works-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		dots: false,		
		nextArrow: '.works-slider-next',
	    prevArrow: '.works-slider-prev',
		fade: true,
		cssEase: 'linear',
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: false,
				autoplay: false,
			}
		}]
	});

	$(".works-slider").on('afterChange', function (event, slick, currentSlide) {
		$(".works-slider-current").text(currentSlide+1)
	});

	$('.works-slider-total').html($('.works-slide').length);
	
	$('.stocks-slider-total').html($('.stocks-slide').length);
	
	$('.stocks-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		dots: false,		
		nextArrow: '.stocks-slider-next',
	    prevArrow: '.stocks-slider-prev',
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				dots: false,
				autoplay: false,
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				autoplay: false,
				adaptiveHeight: true,
			}
		}]
	});

	$(".stocks-slider").on('afterChange', function (event, slick, currentSlide) {
		$(".stocks-slider-current").text(currentSlide+1)
	});

	$('.brands-slider-total').html($('.brands-slide').length);
	
	$('.brands-slider').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		dots: false,		
		nextArrow: '.brands-slider-next',
	    prevArrow: '.brands-slider-prev',
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: false,
				autoplay: false,
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				dots: false,
				autoplay: false,
				adaptiveHeight: true,
			}
		}]
	});

	$(".brands-slider").on('afterChange', function (event, slick, currentSlide) {
		$(".brands-slider-current").text(currentSlide+1)
	});

	$('.objects-slider-total').html($('.objects-slide').length);
	
	$('.objects-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		dots: false,		
		nextArrow: '.objects-slider-next',
	    prevArrow: '.objects-slider-prev',
		adaptiveHeight: true,
		infinite: true,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				autoplay: false,
			}
		}]
	});

	$(".objects-slider").on('afterChange', function (event, slick, currentSlide) {
		$(".objects-slider-current").text(currentSlide+1)
	});

	$('.reviews-slider-total').html($('.reviews-slide').length);
	
	$('.reviews-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		autoplay: false,
		dots: false,		
		nextArrow: '.reviews-slider-next',
	    prevArrow: '.reviews-slider-prev',
		adaptiveHeight: true,
		infinite: true,
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				autoplay: false,
			}
		}]
	});

	$(".reviews-slider").on('afterChange', function (event, slick, currentSlide) {
		$(".reviews-slider-current").text(currentSlide+1)
	});

	
  	// настройки мобильного меню

	$('.menu-toggle').click(function(){
		$('.header-right').toggleClass('active');
		$('.menu-toggle').toggleClass('active');
		$('body').toggleClass('fixed');
	});
	
	if($(window).width() < 768){
		$('.go_to').click( function(){
			$('.menu-toggle').removeClass('active');
			$('.header-right').removeClass('active');
			$('body').removeClass('fixed');
		});
	};
	
	$('.header-phone-wrapper').click(function(){
		$(this).addClass('active');;
	});

	$('.contacts-item__phone').click(function(){
		$(this).addClass('active');;
	});
	// настройки WOW	

	var wow = new WOW({
		mobile:       false,
		live:         true,
		offset: 100,
	});
	wow.init();


});
