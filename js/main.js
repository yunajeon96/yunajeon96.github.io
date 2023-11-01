//js/profile slide.js--------------------------------------------------------->

function pro() {
	{
		$('.left').animate({ marginTop: -200 }, function () {
			$('.left li:first').appendTo('.left');
			$('.left').css({ marginTop: 0 });
			$('.left li:nth-of-type(2)').css({ opacity: 1 });
			$('.left li:nth-of-type(2)').siblings().css({ opacity: 0.1 })
		})
		$('.right').animate({ marginTop: -200 }, function () {
			$('.right li:first').appendTo('.right');
			$('.right').css({ marginTop: 0 });
			$('.right li:nth-of-type(2)').css({ opacity: 1 });
			$('.right li:nth-of-type(2)').siblings().css({ opacity: 0.1 })
		})
	}
}
setInterval(pro, 5000);



//js/cursor event.js--------------------------------------------------------->
$(window).mousemove(function (e) {
	$(".ring").css(
		"transform",
		`translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
	);
});



//js/portfolio slide move.js--------------------------------------------------------->

$(function port() {
	$(window).scroll(function () {
		let ws = $(this).scrollTop();
		let a = $("#portfolio").offset().top;
		let b = $("#about").offset().top;
		console.log(b)
		console.log(a)

		if ( ws > a && ws < b) {
			$("#portfolio").css("height", "175vh");
			$(".top").css("position", "fixed");
			$(".slider-section").css("position","fixed")
			// $(".slider-section").css({"position":"fixed","left":"30%"})
		}
		else if(ws > b){
			$("#portfolio").css("height", "100vh")
			$("#portfolio").css("position", "relative")
			$(".top").css("position", "absolute")
			$(".slider-section").css("position", "absolute")
		}
		else if(ws < a-1){
			$("#portfolio").css("height", "100vh")
			$("#portfolio").css("position", "relative")
			$(".top").css("position", "absolute")
			$(".slider-section").css("position", "absolute")
		}
	})
}
)


console.clear();

gsap.registerPlugin("ScrollTrigger");

let wheel = document.querySelector(".wheel");
let images = gsap.utils.toArray(".wheel__card");

gsap.to(".arrow", { y: 5, ease: "power1.inOut", repeat: -1, yoyo: true });

function setup() {
	let radius = wheel.offsetWidth / 2;
	let center = wheel.offsetWidth / 2;
	let total = images.length;
	let slice = (2 * Math.PI) / total;

	images.forEach((item, i) => {
		let angle = i * slice;

		let x = center + radius * Math.sin(angle);
		let y = center - radius * Math.cos(angle);

		gsap.set(item, {
			rotation: angle + "_rad",
			xPercent: -50,
			yPercent: -50,
			x: x,
			y: y
		});
	});
}

setup();

window.addEventListener("resize", setup);

gsap.to(".wheel", {
	rotate: () => -360,
	ease: "none",
	duration: images.length,
	scrollTrigger: {
		start: 1930,
		end: "max",
		scrub: 1,
		snap: 1 / images.length,
		invalidateOnRefresh: true
	}
});

let cards = gsap.utils.toArray(".wheel__card");
let header = document.querySelector(".top");
let body = document.querySelector(".top");

let isFullScreen = false;

// keep track of last clicked card so we can put it back
let lastClickedCard;

cards.forEach((card) => {
	card.addEventListener("click", (e) => {
		if (lastClickedCard) {
			putBack(e);
		}
		flip(e);
	});
});

header.addEventListener("click", (e) => {
	if (!lastClickedCard) return;
	putBack(e);
});

function putBack(e) {
	let image = header.querySelector("img");

	let state = Flip.getState(image);

	lastClickedCard.appendChild(image);

	Flip.from(state, {
		duration: 0.5,
		ease: "sine.out",
		absolute: true
	});

	lastClickedCard = null;
}

function flip(e) {
	let image = e.target.querySelector("img");

	let state = Flip.getState(image);

	header.appendChild(image);

	Flip.from(state, {
		duration: 0.6,
		ease: "sine.out",
		absolute: true
	});
	lastClickedCard = e.target;
}





//js/mousewheel.js--------------------------------------------------------->

$(function () {
	var win_h = $(window).height();
	$('.page').each(function (index) {
		$(this).attr("data-index", win_h * index);
	});
	$('마지막페이지 클래스').attr("data-index", 마지막페이지높이값);


	$('.page','마지막페이지 클래스').on("mousewheel", function (e) {

		var pagePos = parseInt($(this).attr("data-index"));
		console.log(pagePos)
        
		if (e.originalEvent.wheelDelta >= 0) {
			$("html,body").stop().animate({ scrollTop: pagePos - win_h });
			return false;
		} else if (e.originalEvent.wheelDelta < 0) {
			$("html,body").stop().animate({ scrollTop: pagePos + win_h });
			return false;
		}
	});
});






// --마지막슬라이드-------------------------------------------
var swiper2 = new Swiper(".swiper", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	coverflowEffect: {
	  rotate: 0,
	  stretch: 0,
	  depth: 100,
	  modifier: 3,
	  slideShadows: true
	},
	keyboard: {
	  enabled: true
	},
	mousewheel: {
	  thresholdDelta: 70
	},
	loop: true,
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true
	}


  });
/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor1')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animat = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animat()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animat()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel1 = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animat()
}

const handleMouseMove1 = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animat()
}

const handleMouseDown1 = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp1 = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel1)
document.addEventListener('mousedown', handleMouseDown1)
document.addEventListener('mousemove', handleMouseMove1)
document.addEventListener('mouseup', handleMouseUp1)
document.addEventListener('touchstart', handleMouseDown1)
document.addEventListener('touchmove', handleMouseMove1)
document.addEventListener('touchend', handleMouseUp1)