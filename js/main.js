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
		// console.log(a)

		if (ws > a) {
			$("#portfolio").css("height", "150vh");
			$(".top").css("position", "fixed");
			$(".slider-section").css("position","fixed")
			// $(".slider-section").css({"position":"fixed","left":"30%"})
		}
		else {
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


	$('.page').on("mousewheel", function (e) {

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
