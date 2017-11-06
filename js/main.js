$(document).ready(function() {

	var language = "";

	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});

	// Fancybox
	$('.work-box').fancybox();

	// Flexslider
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
	});

	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		if ($(this).attr('id') == "intro"){
	      			nav.find('a[href="#banner"]').addClass('active');	
	      		}else{
	      			nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');	      			
	      		}
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});	
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});

	$("#slcIdioma").on('change',function(){
		language = $('select[id=slcIdioma]').val();
		console.log(language);
	});

	$("#btnGuardarIdioma").on('click',function(){
		if (language == ""){
			language = "es";
		}
		$("#imgIdioma").attr('src',('images/' + language + '.svg'));
		cambiarIdioma(language);
	});

	// use plugins and options as needed, for options, detail see
  // http://i18next.com/docs/
	i18next.init({
    lng: 'es', // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
    resources: { // evtl. load via xhr https://github.com/i18next/i18next-xhr-backend
      es: {
        translation: i18nEs
      },
      en: {
        translation: i18nEn
      }
    }
  }, function(err, t) {
    // for options see
    // https://github.com/i18next/jquery-i18next#initialize-the-plugin
    jqueryI18next.init(i18next, $);
    $('body').localize();
    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  });


  i18next.on('languageChanged', () => {
    $('body').localize();
  });

  function cambiarIdioma(lang){
    i18next.changeLanguage(lang);
  }

});