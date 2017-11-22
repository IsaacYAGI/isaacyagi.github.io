$(document).ready(function() {

	var language = "";
  var idiomasDisponibles = ["es","en","it"];

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
        if (id != undefined){
      		$('html, body').animate({
      			scrollTop: $(id).offset().top - 75
      		}, 500);
      	  return false;
        }
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

	// use plugins and options as needed, for options, detail see
  // http://i18next.com/docs/
	i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    //debug: true,
    fallbackLng: 'en',
    //load: 'languageOnly',
    lng: window.navigator.userLanguage || window.navigator.language || 'en-US',
    //lng: 'es', // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
    resources: { // evtl. load via xhr https://github.com/i18next/i18next-xhr-backend
      es: {
        translation: i18nEs
      },
      en: {
        translation: i18nEn
      }, 
      it: {
        translation: i18nIt
      }
    }
  }, function(err, t) {
    // for options see
    // https://github.com/i18next/jquery-i18next#initialize-the-plugin
    jqueryI18next.init(i18next, $);

    language = ((idiomasDisponibles.indexOf(i18next.language.substr(0, 2)) != -1) ? i18next.language.substr(0, 2) : "en");

    //console.log("LANGUAGE CONFIGURED=" + language);

    actualizarImagenIdioma(language);
    actualizarIdiomaModal(language);

    $('body').localize();
    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
  });

  i18next.on('languageChanged', () => {
    $('body').localize();
  });

  function cambiarIdioma(lang){
    i18next.changeLanguage(lang);
    //console.log("i18next changed " + i18next.language);
  }

  $("#slcIdioma").on('change',function(){
    language = $('select[id=slcIdioma]').val();
    //console.log("SELECTED LANGUAGE MODAL=" + language);
  });

  $("#btnGuardarIdioma").on('click',function(){
    if (language == ""){
      language = "es";
    }
    //$("#imgIdioma").attr('src',('images/' + language + '.svg'));
    actualizarImagenIdioma(language);
    cambiarIdioma(language);
  });

  function actualizarIdiomaModal(lang){
    $("#slcIdioma").val(lang);
  }

  function actualizarImagenIdioma(lang){
    $("#imgIdioma").attr('src',('images/' + lang + '.svg'));

  }
  //console.log(i18next.language);

});