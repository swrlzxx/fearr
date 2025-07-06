(function() {
	var DISPLAY_WIDTH = window.innerWidth,
		DISPLAY_HEIGHT = window.innerHeight,
		DISPLAY_DURATION = 10;

	var mouse = { x: DISPLAY_WIDTH / 2, y: DISPLAY_HEIGHT / 2 },
		eyesCanvas,
		eyesContext,
		startTime,
		eyes,
		particles = [],
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
		           window.matchMedia("(max-width: 768px)").matches;

	function Particle(ctx) {
		this.context = ctx;
		this.x = Math.random() * DISPLAY_WIDTH;
		this.y = Math.random() * DISPLAY_HEIGHT;
		this.size = Math.random() * 1 + 0.5;
		this.speedX = (Math.random() - 0.5) * 1.0;
		this.speedY = (Math.random() - 0.5) * 0.5;
		this.life = Math.random() * 200 + 100;
		this.isEmber = Math.random() > 0.5;
		this.alpha = this.isEmber ? 0.8 : 0.4;
	}

	Particle.prototype.update = function() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.life -= 1;
		if (this.isEmber) {
			this.alpha = Math.max(0, this.alpha - 0.005);
		}
		if (this.x < 0 || this.x > DISPLAY_WIDTH || this.y < 0 || this.y > DISPLAY_HEIGHT || this.life <= 0) {
			this.reset();
		}
	};

	Particle.prototype.reset = function() {
		this.x = Math.random() * DISPLAY_WIDTH;
		this.y = Math.random() * DISPLAY_HEIGHT;
		this.speedX = (Math.random() - 0.5) * 1.0;
		this.speedY = (Math.random() - 0.5) * 0.5;
		this.life = Math.random() * 200 + 100;
		this.alpha = this.isEmber ? 0.8 : 0.4;
	};

	Particle.prototype.render = function() {
		if (this.context) {
			this.context.save();
			if (this.isEmber) {
				this.context.shadowColor = 'rgba(255, 120, 50, 0.6)';
				this.context.shadowBlur = 6;
				this.context.fillStyle = `rgba(255, 80, 0, ${this.alpha})`;
				this.context.beginPath();
				this.context.ellipse(this.x, this.y, this.size * 1.8, this.size * 0.8, 0, 0, Math.PI * 2);
				this.context.fill();
			} else {
				this.context.shadowColor = 'rgba(255, 255, 255, 0.6)';
				this.context.shadowBlur = 4;
				this.context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
				this.context.beginPath();
				this.context.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
				this.context.fill();
			}
			this.context.restore();
		}
	};

	function updateCanvasSize() {
		if (eyesCanvas) {
			DISPLAY_WIDTH = window.innerWidth;
			DISPLAY_HEIGHT = window.innerHeight;
			eyesCanvas.width = DISPLAY_WIDTH;
			eyesCanvas.height = DISPLAY_HEIGHT;
			mouse.x = DISPLAY_WIDTH / 2;
			mouse.y = DISPLAY_HEIGHT / 2;
			console.log('Canvas size updated:', DISPLAY_WIDTH, DISPLAY_HEIGHT);
			if (eyes) {
				eyes.forEach(eye => {
					eye.x = eye.initialX * DISPLAY_WIDTH;
					eye.y = eye.initialY * DISPLAY_HEIGHT + (eye.size * 0.15);
					eye.iris.x = eye.x;
					eye.iris.y = eye.y - (eye.size * 0.1);
					eye.resting.x = eye.x;
					eye.resting.y = eye.y - (eye.size * 0.1);
					console.log('Eye position updated:', eye.initialX, eye.initialY, eye.x, eye.y);
				});
			}
			particles = [];
			for (let i = 0; i < 50; i++) {
				particles.push(new Particle(eyesContext));
			}
		} else {
			console.error('Canvas not found during size update!');
		}
	}

	function initialize() {
		if (document.readyState === 'complete' || document.readyState === 'interactive') {
			setTimeout(setupCanvas, 100);
		} else {
			document.addEventListener('DOMContentLoaded', () => {
				setTimeout(setupCanvas, 100);
			});
		}
	}

	function setupCanvas() {
		eyesCanvas = document.querySelector('#eyes-canvas');
		if (eyesCanvas) {
			updateCanvasSize();
			window.addEventListener('resize', updateCanvasSize);

			eyesContext = eyesCanvas.getContext('2d');
			if (!eyesContext) {
				console.error('Failed to get canvas context!');
				return;
			}

			if (!isMobile) {
				window.addEventListener('mousemove', function(event) {
					mouse.x = event.clientX;
					mouse.y = event.clientY;
				}, false);
			}

			window.addEventListener('touchstart', function() {
				isMobile = true;
			}, { passive: true });

			const eyePositions = [
				{ x: 0.19, y: 0.80, scale: 0.88, time: 0.31 },
				{ x: 0.10, y: 0.54, scale: 0.84, time: 0.32 },
				{ x: 0.81, y: 0.13, scale: 0.63, time: 0.33 },
				{ x: 0.89, y: 0.19, scale: 0.58, time: 0.34 },
				{ x: 0.40, y: 0.08, scale: 0.97, time: 0.35 },
				{ x: 0.64, y: 0.74, scale: 0.57, time: 0.36 },
				{ x: 0.41, y: 0.89, scale: 0.56, time: 0.37 },
				{ x: 0.92, y: 0.89, scale: 0.75, time: 0.38 },
				{ x: 0.27, y: 0.20, scale: 0.87, time: 0.39 },
				{ x: 0.17, y: 0.46, scale: 0.68, time: 0.41 },
				{ x: 0.71, y: 0.29, scale: 0.93, time: 0.42 },
				{ x: 0.84, y: 0.46, scale: 0.54, time: 0.43 },
				{ x: 0.93, y: 0.35, scale: 0.63, time: 0.44 },
				{ x: 0.77, y: 0.82, scale: 0.85, time: 0.45 },
				{ x: 0.36, y: 0.74, scale: 0.90, time: 0.46 },
				{ x: 0.13, y: 0.24, scale: 0.85, time: 0.47 },
				{ x: 0.58, y: 0.20, scale: 0.77, time: 0.48 },
				{ x: 0.55, y: 0.84, scale: 0.87, time: 0.50 },
				{ x: 0.50, y: 0.50, scale: 5.00, time: 0.10 },
			];
			eyes = eyePositions.map((pos, index) => {
				const eye = new Eye(eyesCanvas, pos.x, pos.y, pos.scale, pos.time);
				eye.initialX = pos.x;
				eye.initialY = pos.y;
				if (index === 18) { // Center eye
					eye.isCenterEye = true;
				}
				return eye;
			});

			for (let i = 0; i < 50; i++) {
				particles.push(new Particle(eyesContext));
			}

			startTime = Date.now();
			animate();
		} else {
			console.error('Canvas not found!');
		}
	}

	function animate() {
		var seconds = (Date.now() - startTime) / 1000;

		if (eyesContext) {
			eyesContext.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
			particles.forEach(particle => {
				particle.update();
				particle.render();
			});
			for (var i = 0, len = eyes.length; i < len; i++) {
				var eye = eyes[i];
				if (seconds > eye.activationTime * DISPLAY_DURATION) {
					eye.activate();
				}
				eye.update(mouse);
			}
		}

		requestAnimFrame(animate);
	}

	initialize();
})();

function Eye(canvas, x, y, scale, time) {
    this.canvas = canvas;
    this.context = canvas ? canvas.getContext('2d') : null;
    this.activationTime = time;
    this.isCenterEye = false;
    this.irisSpeed = this.isCenterEye ? 0.012 : (0.005 + (Math.random() * 0.1) / scale);
    this.blinkSpeed = 0.15 + (Math.random() * 0.1);
    this.blinkInterval = 7000 + 3000 * (Math.random());
    this.blinkTime = Date.now();
    this.scale = Math.min(scale, 1.5);
    this.size = 70 * this.scale;
    this.baseSize = this.size;
    this.x = x * canvas.width;
    this.y = y * canvas.height + (this.size * 0.15);
    this.initialX = x;
    this.initialY = y;
    this.driftTime = Math.random() * 10;
    this.glowIntensity = 0.3 + Math.sin(this.driftTime * 0.01) * 0.2; // Increased base intensity and range
    this.glowSpeed = 0.01 + Math.random() * 0.005;

    this.iris = {
        x: this.x,
        y: this.y - (this.size * 0.1),
        size: this.size * 0.2
    };
    this.pupil = {
        width: 2 * this.scale,
        height: this.iris.size * 0.75,
        baseWidth: 2 * this.scale,
        baseHeight: this.iris.size * 0.75
    };
    this.exposure = {
        top: 0.1 + (Math.random() * 0.3),
        bottom: 0.5 + (Math.random() * 0.3),
        current: 0,
        target: 1
    };
    this.tiredness = (0.5 - this.exposure.top) + 0.1;
    this.isActive = false;
    this.resting = { x: this.x, y: this.y - (this.size * 0.1) };
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                    window.matchMedia("(max-width: 768px)").matches;

    window.addEventListener('touchstart', () => {
        this.isMobile = true;
    }, { passive: true });

    this.activate = function() {
        this.isActive = true;
    }
    this.update = function(mouse) {
        if (this.isActive === true && this.context) {
            this.render(mouse);
        }
    }
    this.render = function(mouse) {
        if (!this.context) {
            console.error('No context for rendering eye!');
            return;
        }
        var time = Date.now();
        if (this.exposure.current < 0.012) {
            this.exposure.target = 1;
        } else if (time - this.blinkTime > this.blinkInterval) {
            this.exposure.target = 0;
            this.blinkTime = time;
        }
        this.exposure.current += (this.exposure.target - this.exposure.current) * this.blinkSpeed;

        this.glowIntensity = 0.3 + Math.sin(this.driftTime * this.glowSpeed) * 0.2;

        var el = { x: this.x - (this.size * 0.8), y: this.y - (this.size * 0.1) };
        var er = { x: this.x + (this.size * 0.8), y: this.y - (this.size * 0.1) };
        var et = { x: this.x, y: this.y - (this.size * (0.5 + (this.exposure.top * this.exposure.current))) };
        var eb = { x: this.x, y: this.y - (this.size * (0.5 - (this.exposure.bottom * this.exposure.current))) };
        var eit = { x: this.x, y: this.y - (this.size * (0.5 + ((0.5 - this.tiredness) * this.exposure.current))) };
        var ei = { x: this.x, y: this.y - (this.iris.size) };
        var eio = { x: (mouse.x - ei.x) / (window.innerWidth - ei.x), y: (mouse.y) / (window.innerHeight) };

        this.driftTime += 0.01;

        const distance = Math.sqrt(Math.pow(mouse.x - this.x, 2) + Math.pow(mouse.y - this.y, 2));
        const maxDistance = 200;
        const growthFactor = Math.max(0, 1 - distance / maxDistance);

        this.size = this.baseSize * (1 + growthFactor * 0.3);
        this.iris.size = this.size * 0.2;
        this.pupil.width = this.pupil.baseWidth * (1 + growthFactor * 0.5);
        this.pupil.height = this.pupil.baseHeight * (1 + growthFactor * 0.5);

        if (this.isMobile) {
            var driftX = Math.sin(this.driftTime) * 3 * Math.max(1, this.scale * 0.2);
            var driftY = Math.cos(this.driftTime) * 1.5 * Math.max(1, this.scale * 0.2);
            this.iris.x = this.x + driftX;
            this.iris.y = this.y - (this.size * 0.1) + driftY;
        } else {
            eio.x = Math.max(-1, Math.min(eio.x, 1));
            eio.y = Math.max(-1, Math.min(eio.y, 1));
            const trackingMultiplier = this.isCenterEye ? 16 : 8;
            const verticalMultiplier = this.isCenterEye ? 10 : 5;
            ei.x += eio.x * trackingMultiplier * Math.max(1, this.scale * 0.2);
            ei.y += eio.y * verticalMultiplier * Math.max(1, this.scale * 0.2);
            this.iris.x += (ei.x - this.iris.x) * (this.irisSpeed * 0.8) + (Math.random() - 0.5) * 0.05;
            this.iris.y += (ei.y - this.iris.y) * (this.irisSpeed * 0.8) + (Math.random() - 0.5) * 0.025;
            if (Math.abs(mouse.x - this.x) < 10 && Math.abs(mouse.y - this.y) < 10) {
                this.iris.x += (this.resting.x - this.iris.x) * this.irisSpeed * 0.5;
                this.iris.y += (this.resting.y - this.iris.y) * this.irisSpeed * 0.5;
            }
        }

        this.context.fillStyle = 'rgba(255,255,255,1.0)';
        this.context.strokeStyle = 'rgba(100,100,100,1.0)';
        this.context.beginPath();
        this.context.lineWidth = 3;
        this.context.lineJoin = 'round';
        this.context.shadowColor = `rgba(255, 255, 255, ${this.glowIntensity})`; // Restored glow with higher intensity
        this.context.shadowBlur = 15 * this.scale; // Increased blur for a wider glow
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.moveTo(el.x, el.y);
        this.context.quadraticCurveTo(et.x, et.y, er.x, er.y);
        this.context.quadraticCurveTo(eb.x, eb.y, el.x, el.y);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
        this.context.shadowColor = 'rgba(0,0,0,0)';
        this.context.shadowBlur = 0;

        this.context.save();
        this.context.globalCompositeOperation = 'source-atop';
        this.context.translate(this.iris.x * 0.1, 0);
        this.context.scale(0.9, 1);
        this.context.strokeStyle = 'rgba(0,0,0,0.5)';
        this.context.fillStyle = 'rgba(120, 0, 0, 0.9)';
        this.context.lineWidth = 2;
        this.context.beginPath();
        if (this.iris && this.iris.x && this.iris.y && this.iris.size) {
            this.context.arc(this.iris.x, this.iris.y, this.iris.size, 0, Math.PI * 2, true);
        }
        this.context.fill();
        this.context.stroke();
        this.context.restore();
        this.context.save();
        this.context.shadowColor = 'rgba(255,255,255,0.3)';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowBlur = 1 * this.scale;
        this.context.globalCompositeOperation = 'source-atop';
        this.context.translate(this.iris.x * 0.1, 0);
        this.context.scale(0.9, 1);
        this.context.fillStyle = 'rgba(255,255,255,0.1)';
        this.context.beginPath();
        if (this.iris && this.iris.x && this.iris.y && this.iris.size) {
            this.context.arc(this.iris.x, this.iris.y, this.iris.size * 0.7, 0, Math.PI * 2, true);
        }
        this.context.fill();
        this.context.restore();
        this.context.save();
        this.context.globalCompositeOperation = 'source-atop';
        this.context.fillStyle = 'rgba(0,0,0,0.9)';
        this.context.beginPath();
        this.context.moveTo(this.iris.x, this.iris.y - (this.pupil.height * 0.5));
        this.context.quadraticCurveTo(this.iris.x + (this.pupil.width * 0.5), this.iris.y, this.iris.x, this.iris.y + (this.pupil.height * 0.5));
        this.context.quadraticCurveTo(this.iris.x - (this.pupil.width * 0.5), this.iris.y, this.iris.x, this.iris.y - (this.pupil.height * 0.5));
        this.context.fill();
        this.context.restore();
        this.context.save();
        this.context.shadowColor = 'rgba(0,0,0,0.9)';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowBlur = 5;
        this.context.fillStyle = 'rgba(120,120,120,0.1)';
        this.context.beginPath();
        this.context.moveTo(el.x, el.y);
        this.context.quadraticCurveTo(et.x, et.y, er.x, er.y);
        this.context.quadraticCurveTo(eit.x, eit.y, el.x, el.y);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    }
}

window.requestAnimFrame = (function(){
	return window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame || 
			function(callback){
				return window.setTimeout(callback, 1000 / 60);
			};
})();
