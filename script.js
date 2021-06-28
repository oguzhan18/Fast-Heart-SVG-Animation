let select = s => document.querySelector(s),
  selectAll = s =>  document.querySelectorAll(s),
		mainSVG = select('#mainSVG'),
		heartContainer = select('#heartContainer'),
		defaultPath = select('.defaultPath'),
		mainHeart = select('.mainHeart'),
		smallHeart = select('.smallHeart'),
		whiteHeart = select('#whiteHeart'),
		curviness = 0.84,
		rawPath,
		clickCount = 0

gsap.set('svg', {
	visibility: 'visible'
})
gsap.set(smallHeart, {
	transformOrigin: '50% 50%'
})
gsap.set(whiteHeart, {
	transformOrigin: '20% 80%'
})

function destroy (heart, path) {
		heartContainer.removeChild(heart);
		heartContainer.removeChild(path);
}

function bounceHeart () {

gsap.fromTo(whiteHeart, {
		scale: 0.18,
	rotation: 45
	},{
		duration: 2,
	rotation: 0,
		scale: 1,
		ease: 'elastic(0.83, 0.38)'
	})


}
function createPath () {
	
	let myPath = defaultPath.cloneNode(true);
	let mySmallHeart = smallHeart.cloneNode(true);
	heartContainer.appendChild(myPath);
	heartContainer.appendChild(mySmallHeart);
	let point1 = {x: 400, y: 550};
	let point2 = {x: gsap.utils.random(350, 450), y: gsap.utils.random(300, 400)};
	let point3 = {x: gsap.utils.random(200, 600), y: gsap.utils.random(150, 250)};
	let point4 = {x: gsap.utils.random(100, 700), y: gsap.utils.random(-100, 150)};
	let points = [point1.x, point1.y, point2.x, point2.y, point4.x, point4.y];
	rawPath = [MotionPathPlugin.pointsToSegment(points, curviness)];				
	myPath.setAttribute("d", MotionPathPlugin.rawPathToString(rawPath));
	gsap.set(myPath, {
		drawSVG: '0% 0%',
		autoAlpha: 0
	})

	
	let drawPos1 = gsap.utils.random(16, 45)
	let drawPos2 = gsap.utils.random(34, 66)
	let tl = gsap.timeline({onComplete: destroy, onCompleteParams: [mySmallHeart, myPath],paused: true, defaults: {
		ease: 'linear'
	}});
	tl.set([myPath, mySmallHeart], {
		autoAlpha: 1
	})
		.to(myPath, {
		drawSVG:'0% 33%'		
	})
	.to(myPath, {
		drawSVG:`${drawPos1}% 66%`		
	})
	.to(myPath, {
		drawSVG:'100% 100%'		
	})
	.to(mySmallHeart, {
		duration: 1.5,
		transformOrigin: '50% 50%',
		motionPath: {
			path: myPath,
			autoRotate: 90,
			offsetX: -31,
			offsetY: -31
		}
	}, 0)
	.to(mySmallHeart, {
		duration: 1.5,
		ease: 'expo.in',
		autoAlpha: 0
	}, 0)
	.to(myPath, {
		stroke: '#E8485C',
		ease: 'expo',
		duration: 1.5
	}, 0)
	let mainTl = gsap.timeline()
	mainTl.to(tl, {
		duration: 'random(0.7, 2)',
		time: tl.duration(),
		ease: 'sine.inOut'
	})
	
	if(clickCount % 10 === 0 || clickCount === 0) {
		bounceHeart()
	}
	clickCount++;
	
}

mainHeart.addEventListener('click', createPath);