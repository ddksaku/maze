var $maze = $("#maze");

 var $body = $("body");
//var $body = $(".cover-container");

var $container = $("#container");
var $overlay = $("#overlay");
var $window = $(window);
var mazeSize = { w: 4250, h: 4250 * (822.0 / 767.0) };

window.scale = 1.0;

updateScale();

$container.css("left", "-1550px");


$container.css("height", ((mazeSize.h + 660 + 800) | 0) + "px");

var extraW = 0.767;
var backW = mazeSize.w / extraW;
$maze.css("backgroundSize", backW + "px " + (backW * 0.822) + "px");
var backX = extraW * 0.16 * backW;

$maze.css("backgroundPosition", -backX + "px 0px");
$maze.css({ width: mazeSize.w + "px", height: mazeSize.h + "px" });

$overlay.css("width", mazeSize.w + "px");
$overlay.css("height", mazeSize.h + "px");

var $mazePath = $("#mazePath");
$mazePath.width(mazeSize.w);
$mazePath.height(mazeSize.h);

var paths = [];
var sections = [];
var fireFlies = [];
var $fireFlies = [];
paths.push({ x: 0.500, y: 0.000 });
paths.push({ x: 0.500, y: 0.036 });
paths.push({ x: 0.536, y: 0.036 });
sections.push({ cx: 0.395, cy: 0.064, x: 0.530 });
fireFlies.push({ x: 0.5456, y: 0.100, r: 180 });

paths.push({ x: 0.536, y: 0.125 });
paths.push({ x: 0.453, y: 0.125 });
sections.push({ cx: 0.435, cy: 0.207, x: 0.450 });
fireFlies.push({ x: 0.491, y: 0.207, r: 180 });


paths.push({ x: 0.453, y: 0.272 });
paths.push({ x: 0.480, y: 0.272 });
paths.push({ x: 0.480, y: 0.323 });
paths.push({ x: 0.515, y: 0.323 });
sections.push({ cx: 0.395, cy: 0.358, x: 0.532 });
fireFlies.push({ x: 0.560, y: 0.360, r: 225 });

paths.push({ x: 0.515, y: 0.417 });
paths.push({ x: 0.558, y: 0.417 });
paths.push({ x: 0.558, y: 0.476 });
paths.push({ x: 0.466, y: 0.476 });
sections.push({ cx: 0.435, cy: 0.510, x: 0.472 });
fireFlies.push({ x: 0.450, y: 0.510, r: 135 });

paths.push({ x: 0.466, y: 0.630 });
paths.push({ x: 0.530, y: 0.630 });
sections.push({ cx: 0.395, cy: 0.675, x: 0.553 });
fireFlies.push({ x: 0.530, y: 0.674, r: 135 });

paths.push({ x: 0.530, y: 0.750 });
paths.push({ x: 0.455, y: 0.750 });
sections.push({ cx: 0.440, cy: 0.830, x: 0.461 });
fireFlies.push({ x: 0.490, y: 0.859, r: 330 });

paths.push({ x: 0.455, y: 0.966 });
paths.push({ x: 0.500, y: 0.966 });
paths.push({ x: 0.500, y: 1.000 });

var offPaths = [];
var offSections = [];
offPaths.push({ y: 0.104, x0: 0.384, x1: 0.270 });
offSections.push({ cx: 0.099, cy: 0.063, x: 0.105 });
fireFlies.push({ x: 0.145, y: 0.052, r: 0 });

offPaths.push({ y: 0.250, x0: 0.610, x1: 0.765 });
offSections.push({ cx: 0.755, cy: 0.220, x: 0.776 });
fireFlies.push({ x: 0.810, y: 0.205, r: 210 });

offPaths.push({ y: 0.380, x0: 0.384, x1: 0.270 });
offSections.push({ cx: 0.087, cy: 0.346, x: 0.092 });
fireFlies.push({ x: 0.155, y: 0.344, r: -45 });

offPaths.push({ y: 0.538, x0: 0.610, x1: 0.765 });
offSections.push({ cx: 0.755, cy: 0.522, x: 0.895 });
fireFlies.push({ x: 0.900, y: 0.496, r: 140 });

offPaths.push({ y: 0.690, x0: 0.384, x1: 0.270 });
offSections.push({ cx: 0.087, cy: 0.669, x: 0.087 });
fireFlies.push({ x: 0.0998, y: 0.683, r: 0 });

offPaths.push({ y: 0.870, x0: 0.610, x1: 0.765 });
offSections.push({ cx: 0.766, cy: 0.843, x: 0.766 });
fireFlies.push({ x: 0.786, y: 0.823, r: -150 });

var $paths = [];
// Calculate the scroll length of each path
var i;
var path0 = paths[0];
for (i=0; i<paths.length; i++)
	paths[i].x += 0.03;

var pathWidth = 2;
var pathHeight = (pathWidth / 3) * 200;
for (i=1; i<paths.length; i++) {
	var dy = paths[i].y - paths[i-1].y;
	var dx = paths[i].x - paths[i-1].x;
	var vert = dx == 0;
	
	var px = paths[i-1].x;
	var py = paths[i-1].y;

	if (dx < 0) {
		dx = -dx;
		px = paths[i].x;
	}

	var dashw = (Math.max(pathWidth, dx * mazeSize.w)) | 0;
	var dashh = (Math.max(pathWidth, dy * mazeSize.h)) | 0;
	var dashx = (px * mazeSize.w) | 0;
	var dashy = (py * mazeSize.h) | 0;

	var repeat = vert ? "repeat-y" : "repeat-x";

	var $path = $("<div style='position: absolute; background-size: " + (vert ? (pathWidth + "px " + pathHeight + "px") : (pathHeight + "px " + pathWidth + "px")) + "; top: " + dashy + "px; left: " + dashx + "px; width: " + dashw + "px; height: " + dashh + "px; background-repeat: " + repeat + "; background-image: url(pics/dash_" + (vert ? "v" : "h") + ".svg)'></div>");
	$path.appendTo($overlay);
	$paths.push($path);
}

var $offPaths = [];
for (i=0; i<offPaths.length; i++) {
	var lr = offPaths[i].x1 > offPaths[i].x0;
	var dx = Math.abs(offPaths[i].x1 - offPaths[i].x0);

	var dashw = (dx * mazeSize.w) | 0;
	var dashh = pathWidth | 0;
	var dashx0 = (offPaths[i].x0 * mazeSize.w) | 0;
	var dashx1 = (offPaths[i].x1 * mazeSize.w) | 0;
	var dashy = (offPaths[i].y * mazeSize.h) | 0;

	var repeat = vert ? "repeat-y" : "repeat-x";

	var $offPath = $("<div class='offPath' style='position: absolute; background-size: " + pathHeight + "px " + pathWidth + "px; top: " + dashy + "px; " +
		"left: " + (lr ? dashx0 : dashx1) + "px; width: " + dashw + "px; height: " + dashh + "px; background-repeat: repeat-x; background-image: url(pics/dash_h.svg)'></div>");
	$offPath.appendTo($overlay);
	$offPaths.push($offPath);
	$offPath.hide();
}

for (i=0; i<sections.length; i++) {
	var sx = sections[i].x * mazeSize.w;
	var scx = sections[i].cx * mazeSize.w;
	var scy = sections[i].cy * mazeSize.h;

	//section
	var $section = $("#section" + i);
	$section.css("width", "916px");
	$section.css("top", scy + "px");
	$section.css("left", scx + "px");
	var pos = sx - scx;
	$section.css("backgroundPosition", pos + "px 0px");

	//section text
	var $sectiontext = $("#section" + i + "text");
	// $sectiontext.css("width", "916px");
	$sectiontext.css("top", scy + "px");
	var l0 = parseInt($sectiontext.css("left"), 10);	
	if(!isNaN(l0))
	{
		$sectiontext.css("left", l0 + scx + "px");
	}
	else
	{
		$sectiontext.css("left", scx + "px");
	}

	// learn more button
	var buttondir = $sectiontext.attr("buttondir");
	var buttonL = $sectiontext.attr("buttonL");
	var buttonB = $sectiontext.attr("buttonB");
	var btnx = buttondir == "left" ? 18 : 10;
	var $learnMoreButton = $("<div id='learnMore" + i + "' data-index='" + i + "' style=\"position: absolute; bottom: "+buttonB+"px; left: "+buttonL+"px; width: 120px; height: 60px; cursor: pointer; font-family: 'Roboto Slab'; font-size: 18px; font-weight: bold; color: rgb(118, 91, 6); " +
		"text-decoration: none; word-wrap: break-word; text-align: left; white-space: nowrap; background: 0 0 url(pics/arrow_" + buttondir + ".svg); background-repeat: no-repeat;\"><span style=\"position: absolute; top: 17px; left: "+btnx+"px;\">Learn More</span></div>");
	$learnMoreButton.appendTo($section);

	$learnMoreButton.click(function() {
		window.offSection = parseInt($(this).attr("data-index"));
		render();
	});

	// Fireflies
	var fx = fireFlies[i].x * mazeSize.w;
	var fy = fireFlies[i].y * mazeSize.h;
	var $fireFly = $("<img src='pics/fireflyglow.png' class='fireFly' style='position: absolute; width: " + (0.028 * mazeSize.w) + "px; height: " + (0.028 * mazeSize.w) + "px; top: " + (fy - scy) + "px; left: " + (fx - scx) + "px; transform: rotate(" + fireFlies[i].r + "deg);' />");
	$fireFly.appendTo($section);
	$fireFlies.push($fireFly);
}

// Position the off sections
for (i=0; i<offSections.length; i++) {
	var sx = offSections[i].x * mazeSize.w;
	var scx = offSections[i].cx * mazeSize.w;
	var scy = offSections[i].cy * mazeSize.h;

	//offsection
	var $offSection = $("#offSection" + i);
	$offSection.css("width", "900px");
	$offSection.css("top", scy +"px");

	$offSection.css("left", scx + "px");

	var pos = sx - scx;
	$offSection.css("backgroundPosition", pos + "px 0px");

	//offsection text
	var $offSectionText = $("#offSection" + i + "text");
	// $offSectionText.css("width", "900px");
	$offSectionText.css("top", scy + "px");
	var l0 = parseInt($offSectionText.css("left"), 10);	
	if(!isNaN(l0))
	{
		$offSectionText.css("left", l0 + scx + "px");
	}
	else
	{
		$offSectionText.css("left", scx + "px");
	}

	//go back button
	var buttondir = $offSectionText.attr("buttondir");
	var buttonL = $offSectionText.attr("buttonL");
	var buttonB = $offSectionText.attr("buttonB");
	var btnx = buttondir == "left" ? 35 : 10;
	var $goBackButton = $("<div id='goBack" + i + "' style=\"position: absolute; bottom: "+buttonB+"px; left: "+buttonL+"px; width: 120px; height: 60px; cursor: pointer; font-family: 'Roboto Slab', serif; font-size: 18px; font-weight: bold; color: rgb(118, 91, 6); " +
		"text-decoration: none; word-wrap: break-word; text-align: left; white-space: nowrap; background: 0 0 url(pics/arrow_" + buttondir + ".svg); background-repeat: no-repeat;\"><span style=\"position: absolute; top: 17px; left: "+btnx+"px;\">Go Back</span></div>");
	$goBackButton.appendTo($offSection);

	$goBackButton.click(function() { offSection = -1; render(); });
	
	// Fireflies
	var j = i + sections.length;
	var fx = fireFlies[j].x * mazeSize.w;
	var fy = fireFlies[j].y * mazeSize.h;
	var $fireFly = $("<img src='pics/fireflyglow.png' class='fireFly' style='position: absolute; width: " + (0.028 * mazeSize.w) + "px; height: " + (0.028 * mazeSize.w) + "px; top: " + (fy - scy) + "px; left: " + (fx - scx) + "px; transform: rotate(" + fireFlies[j].r + "deg);' />");
	$fireFly.appendTo($offSection);
	$fireFlies.push($fireFly);
}

var offPathTime = 10;
window.offSection = -1;
function render() {
	// var top = ($window.scrollTop() + (0.4 * $window.height())) / window.scale;
	var top = ($('.parent-div').scrollTop() + (0.4 * $('.parent-div').height())) / window.scale;
	top -= 660;
	top /= mazeSize.h;

	if (window.offSection != -1) {
		$body.addClass("blockScroll");
		$('.parent-div').addClass("blockScroll");
		// var wtop = $window.scrollTop() / window.scale;
		var wtop = $('.parent-div').scrollTop() / window.scale;
		wtop -= 660;
		wtop /= mazeSize.h;

		var $offSection = $("#offSection" + window.offSection);
		var $section = $("#section" + window.offSection);

		$(".section").removeClass("sectionActive");
		$offSection.addClass("sectionActive");
		$section.addClass("sectionActive");

		var sTop = 200 -(mazeSize.h * (window.offSections[window.offSection].cy - wtop));
		$container.animate({
			left: 290 -(mazeSize.w * window.offSections[window.offSection].cx) + "px",
			top: sTop + "px"
		}, offPathTime);

		// Path
		var lr = offPaths[window.offSection].x1 > offPaths[window.offSection].x0;
		var dx = Math.abs(offPaths[window.offSection].x1 - offPaths[window.offSection].x0);
		var dashw = (dx * mazeSize.w) | 0;
		
		$offPaths[window.offSection].css("width", "0px");
		$offPaths[window.offSection].show();
		if (lr) {
			$offPaths[window.offSection].animate({
				width: dashw + "px"
			}, offPathTime);
		} else {
			var x0 = offPaths[window.offSection].x0 * mazeSize.w;
			var x1 = offPaths[window.offSection].x1 * mazeSize.w;
			$offPaths[window.offSection].css("left", x0 + "px");
			$offPaths[window.offSection].animate({
				width: dashw + "px",
				left: x1 + "px"
			}, offPathTime);
		}

		return;
	}
	$body.removeClass("blockScroll");
	$('.parent-div').removeClass("blockScroll");
	$(".offPath").hide();
	if ($container.css("top") != "0px") {
		$container.animate({
				left: "-1550px",
				top: "0px"
			}, 10);
	}

	var pathIdx = -1;
	var path0 = paths[0];
	var path1;
	var inPath = 0;
	var i;
	var curTop = 0;
	var found = false;
	for (i=0; i<paths.length; i++) {
		var top0 = (i == 0) ? 0 : paths[i-1].y;
		var top1 = paths[i].y;

		if (top >= top0 && top < top1) {
			pathIdx = i;
			path1 = paths[i];
			inPath = (top - top0) / (top1 - top0);
			found = true;
			if (i > 0) {
				var dy = paths[i].y - paths[i-1].y;
				var dx = paths[i].x - paths[i-1].x;
				var vert = dx == 0;

				if (vert)
					$paths[i-1].css("height", (dy * mazeSize.h * inPath) + "px");
				$paths[i-1].show();
			}
		} else if (top >= top0) {
			path0 = paths[i];
			var dy = paths[i].y - top0;
			var vert = dy != 0;

			if (i > 0) {
				if (vert)
					$paths[i-1].css("height", (dy * mazeSize.h) + "px");
				$paths[i-1].show();
			}
		} else {
			if (i > 0) {
				$paths[i-1].hide();
			}
		}

		curTop = top1;
	}

	// Check for an active section
	$(".section").removeClass("sectionActive");
	var section;
	for (i=0; i<sections.length; i++) {
		var d = Math.abs(sections[i].cy - (top - 0.05));
		if (d < 0.07) {
			var $section = $("#section" + i);
			$section.addClass("sectionActive");
			return;
		}
	}
}

function updateScale() {
	//alert($window.width());
	// window.scale = ($window.width() * 3) / 4250.0;
	window.scale = ($window.width() * 3) / 4250.0;
	//window.scale = ($window.width() * 3) / 5120.0;
	//alert(window.scale);
	//alert($("#container").css("transform-origin"));
	
	//$("body").css({ "transform-origin": "top left", "transform": "scale(" + window.scale + ")" });
	$(".cover-container").css({
		"transform-origin": "top left",
		"-webkit-transform-origin": "top left",
		"transform": "scale(" + window.scale + ")",
		"-webkit-transform": "scale(" + window.scale + ")"
	});
	

	//$("#container").css({ "transform-origin": "top left", "transform": "scale(" + window.scale + ")" });

	//$("#container").css({ "transform-origin": "0 0", "transform": "scale(" + 1.115 + ")" });

	//alert("width=" + $("#container").css("width"));
	//alert("height=" + $("#container").css("height"));
	//alert("top=" + $("#container").css("top"));
	//alert("left=" + $("#container").css("left"));
	//alert("transform-origin=" + $("#container").css("transform-origin"));
	//alert("transform=" + $("#container").css("transform"));
	//alert("scale=" + $("#container").css("scale"));
	
}

$(function(){
	$window.resize(function() {
		updateScale();
	});

	// $window.scroll(function() {
	// 	render(); 
	// });

	// $('.parent-div').scroll(function() {
	// 	render(); 
	// });

	// $window.scroll($.debounce(250, function() {
 //    	render();
	// }));

	// $('.parent-div').scroll($.debounce(250, function() {
 //    	render();
	// }));

	$window.scroll($.debounce(250, true, function() {
    	render();
	}));

	$('.parent-div').scroll($.debounce(250, true, function() {
    	render();
	}));

	render();
});