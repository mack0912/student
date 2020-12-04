/**
 *
 * Find more about the Spinning Wheel function at
 * http://cubiq.org/spinning-wheel-on-webkit-for-iphone-ipod-touch/11
 *
 * Copyright (c) 2009 Matteo Spinelli, http://cubiq.org/
 * Released under MIT license
 * http://cubiq.org/dropbox/mit-license.txt
 *
 * Version 1.4 - Last updated: 2009.07.09
 *
 */

var SpinningWheel = {
	cellHeight: 44,
	friction: 0.003,
	slotData: [],

	/**
	 * Event handler
	 */
	handleEvent: function(e) {
		if (e.type == 'touchstart') {
			this.lockScreen(e);
			if (e.currentTarget.id == 'sw-cancel' || e.currentTarget.id == 'sw-done') {
				this.tapDown(e);
			} else if (e.currentTarget.id == 'sw-frame') {
				this.scrollStart(e);
			}
		} else if (e.type == 'touchmove') {
			this.lockScreen(e);
			if (e.currentTarget.id == 'sw-cancel' || e.currentTarget.id == 'sw-done') {
				/**
				 * 小米3、G9208三星S6、部分魅族机型内置浏览器事件触发有BUG
				 * 点确定的时候进不了touchend,触发的是touchmove
				 */
				this.tapUp(e);
			} else if (e.currentTarget.id == 'sw-frame') {
				this.scrollMove(e);
			}
		} else if (e.type == 'touchend') {
			if (e.currentTarget.id == 'sw-cancel' || e.currentTarget.id == 'sw-done') {
				this.tapUp(e);
			} else if (e.currentTarget.id == 'sw-frame') {
				this.scrollEnd(e);

				//setTimeout($.proxy(this.scrollEndAction(this.activeSlot), this), 100); <-- use if you are using a js library
				var self = this;
				setTimeout(function() {
					self.scrollEndAction.apply(self, [self.activeSlot])
				}, 100);
			}
		} else if (e.type == 'webkitTransitionEnd') {
			if (e.target.id == 'sw-wrapper') {
				this.destroy();
			} else {
				this.backWithinBoundaries(e);
			}
		} else if (e.type == 'orientationchange') {
			this.onOrientationChange(e);
		} else if (e.type == 'scroll') {
			this.onScroll(e);
		}
	},


	/**
	 *
	 * Global events
	 *
	 */

	onOrientationChange: function(e) {
		window.scrollTo(0, 0);
		this.swWrapper.style.top = window.innerHeight + window.pageYOffset + 'px';
		this.calculateSlotsWidth();
	},

	onScroll: function(e) {
		this.swWrapper.style.top = window.innerHeight + window.pageYOffset + 'px';
	},

	lockScreen: function(e) {
		e.preventDefault();
		e.stopPropagation();
	},


	/**
	 *
	 * Initialization
	 *
	 */

	reset: function() {
		this.slotEl = [];

		this.activeSlot = null;

		this.swWrapper = undefined;
		this.swSlotWrapper = undefined;
		this.swSlots = undefined;
		this.swFrame = undefined;
	},

	calculateSlotsWidth: function() {
		var div = this.swSlots.getElementsByTagName('div');
		for (var i = 0; i < div.length; i += 1) {
			this.slotEl[i].slotWidth = div[i].offsetWidth;
		}
	},

	create: function(options) {
		var i, l, out, ul, div;

		this.reset(); // Initialize object variables

		// Create the Spinning Wheel main wrapper
		div = document.createElement('div');
		div.id = 'sw-wrapper';
		div.style.top = window.innerHeight + window.pageYOffset +2+ 'px'; // Place the SW down the actual viewing screen
		div.style.webkitTransitionProperty = '-webkit-transform';
		div.innerHTML = '<div id="sw-header"><div id="sw-cancel" >取消</' + 'div><div id="sw-done" >确定</' + 'div></' + 'div><div id="sw-slots-wrapper"><div id="sw-slots" class="noDays_'+options.noDays+'"></' + 'div></' + 'div><div id="sw-frame"></' + 'div>';

		document.body.appendChild(div);

		this.swWrapper = div; // The SW wrapper
		this.swSlotWrapper = document.getElementById('sw-slots-wrapper'); // Slots visible area
		this.swSlots = document.getElementById('sw-slots'); // Pseudo table element (inner wrapper)
		this.swFrame = document.getElementById('sw-frame'); // The scrolling controller
		// Create HTML slot elements
		if (options.type.toLowerCase() === "custom") {
			for (l = 0; l < this.slotData.length; l += 1) {
				// Create the slot
				ul = document.createElement('ul');
				out = '';
				console.log( this.slotData);
			 	for (i in this.slotData[l].values) {
					// lihongbo change, only need number
					var value = this.slotData[l].values[i];
					out += '<li id="' + l + "_" + value + 'LI">' + value + '<' + '/li>';
				}
				ul.innerHTML = out;

				div = document.createElement('div'); // Create slot container
				div.className = this.slotData[l].style; // Add styles to the container
				div.appendChild(ul);

				// Append the slot to the wrapper
				this.swSlots.appendChild(div);

				ul.slotPosition = l; // Save the slot position inside the wrapper
				ul.slotYPosition = 0;
				ul.slotWidth = 0;
				ul.slotMaxScroll = this.swSlotWrapper.clientHeight - ul.clientHeight - 86;
				ul.style.webkitTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)'; // Add default transition

				this.slotEl.push(ul); // Save the slot for later use

				// Place the slot to its default position (if other than 0)
				if (this.slotData[l].defaultValue) {
					this.scrollToValue(l, this.slotData[l].defaultValue);
				}
			}
		 }else{
		 		// Create HTML slot elements
				for (l = 0; l < this.slotData.length; l += 1) {
					// Create the slot
					ul = document.createElement('ul');
					out = '';
					 if (options.type.toLowerCase() === "date") {

					 	for (i in this.slotData[l].values) {
							// lihongbo change, only need number
							var value = this.slotData[l].values[i];
							var value2="";
							switch(l)
							{
							case 0:
							 	value2=value+"年";
							  break;
							case 1:
							  	value2=value+"月";
							  break;
							case 2:
							  	value2=value+"日";
							break;
							}
							out += '<li id="' + l + "_" + value + 'LI">' + value2 + '<' + '/li>';
						}
					 }
					 if (options.type.toLowerCase() === "time") {
					 	for (i in this.slotData[l].values) {
							// lihongbo change, only need number
							var value = this.slotData[l].values[i];
							var value2="";
							switch(l)
							{
							case 0:
							 	value2=value+"时";
							  break;
							case 1:
							  	value2=value+"分";
							  break;
							case 2:
							  	value2=value+"";
							break;
							}
							out += '<li id="' + l + "_" + value + 'LI">' + value2 + '<' + '/li>';
						}
					 }
					ul.innerHTML = out;

					div = document.createElement('div'); // Create slot container
					div.className = this.slotData[l].style; // Add styles to the container
					div.appendChild(ul);

					// Append the slot to the wrapper
					this.swSlots.appendChild(div);

					ul.slotPosition = l; // Save the slot position inside the wrapper
					ul.slotYPosition = 0;
					ul.slotWidth = 0;
					ul.slotMaxScroll = this.swSlotWrapper.clientHeight - ul.clientHeight - 86;
					ul.style.webkitTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)'; // Add default transition

					this.slotEl.push(ul); // Save the slot for later use

					// Place the slot to its default position (if other than 0)
					if (this.slotData[l].defaultValue) {
						this.scrollToValue(l, this.slotData[l].defaultValue);
					}
				}
		}
		this.calculateSlotsWidth();
		// Global events
		document.addEventListener('touchstart', this, false); // Prevent page scrolling
		document.addEventListener('touchmove', this, false); // Prevent page scrolling
		window.addEventListener('orientationchange', this, true); // Optimize SW on orientation change
		window.addEventListener('scroll', this, true); // Reposition SW on page scroll
		// Cancel/Done buttons events
		document.getElementById('sw-cancel').addEventListener('touchstart', this, false);
		document.getElementById('sw-done').addEventListener('touchstart', this, false);

		// Add scrolling to the slots
		this.swFrame.addEventListener('touchstart', this, false);
	},

	open: function(options) {
		this.create(options);

		this.swWrapper.style.webkitTransitionTimingFunction = 'ease-out';
		this.swWrapper.style.webkitTransitionDuration = '350ms';
		this.swWrapper.style.webkitTransform = 'translate3d(0, -260px, 0)';
	},


	/**
	 *
	 * Unload
	 *
	 */

	destroy: function() {
		this.swWrapper.removeEventListener('webkitTransitionEnd', this, false);

		this.swFrame.removeEventListener('touchstart', this, false);

		document.getElementById('sw-cancel').removeEventListener('touchstart', this, false);
		document.getElementById('sw-done').removeEventListener('touchstart', this, false);

		document.removeEventListener('touchstart', this, false);
		document.removeEventListener('touchmove', this, false);
		window.removeEventListener('orientationchange', this, true);
		window.removeEventListener('scroll', this, true);

		this.slotData = [];
		this.cancelAction = function() {
			return false;
		};

		this.cancelDone = function() {
			return true;
		};

		this.scrollEndAction = function() {
			return false;
		};

		this.reset();

		document.body.removeChild(document.getElementById('sw-wrapper'));
	},

	close: function() {
		if (typeof this.swWrapper === 'undefined') {
			return false;
		}
		try {
			ScrollWheel.instanceOpen = false;
		} catch (e) {
			//do nothing
		}
		this.swWrapper.style.webkitTransitionTimingFunction = 'ease-in';
		this.swWrapper.style.webkitTransitionDuration = '400ms';
		this.swWrapper.style.webkitTransform = 'translate3d(0, 0, 0)';

		this.swWrapper.addEventListener('webkitTransitionEnd', this, false);
	},


	/**
	 *
	 * Generic methods
	 *
	 */

	addSlot: function(values, style, defaultValue) {
		if (!style) {
			style = '';
		}

		style = style.split(' ');

		for (var i = 0; i < style.length; i += 1) {
			style[i] = 'sw-' + style[i];
		}

		style = style.join(' ');

		var obj = {
			'values': values,
			'style': style,
			'defaultValue': defaultValue
		};
		this.slotData.push(obj);
	},

	getSelectedValues: function() {
		var index, count,
			i, l,
			keys = [],
			values = [];

		for (var i = 0; i < this.slotEl.length; i++) {
			// Remove any residual animation
			this.slotEl[i].removeEventListener('webkitTransitionEnd', this, false);
			this.slotEl[i].style.webkitTransitionDuration = '0';

			if (this.slotEl[i].slotYPosition > 0) {
				this.setPosition(i, 0);
			} else if (this.slotEl[i].slotYPosition < this.slotEl[i].slotMaxScroll) {
				this.setPosition(i, this.slotEl[i].slotMaxScroll);
			}

			index = -Math.round(this.slotEl[i].slotYPosition / this.cellHeight);

			count = 0;
			for (l in this.slotData[i].values) {
				if (count == index) {
					keys.push(l);
					values.push(this.slotData[i].values[l]);
					break;
				}

				count += 1;
			}
		}

		return {
			'keys': keys,
			'values': values
		};
	},

	getSlotValue: function(slot) {
		if (slot < 0 || slot >= this.slotEl.length) {
			return {
				'keys': null,
				'values': null
			};
		}
		var index, count,
			l,
			keys = [],
			values = [];

		index = -Math.round(this.slotEl[slot].slotYPosition / this.cellHeight);
		index += 1;
		keys.push(index);
		values.push(this.slotData[slot].values[index]);

		return {
			'keys': keys,
			'values': values
		};
	},

	hideSlotValuesAfter: function(slot, lastKey, length) {
		if (typeof length === 'undefined' || length == null) {
			console.log("did you forget to pass the length of this slot to hideSlotValuesAfter?");
			return false;
		}
		lastKey++;
		var thisSlot = null;

		//console.log("slot ul slotMaxScroll: " + this.slotEl[slot].slotMaxScroll);
		while (lastKey <= length) {
			thisSlot = document.getElementById(slot + "_" + lastKey + "LI");
			if (thisSlot) {
				this.slotEl[slot].removeChild(thisSlot);
				if(slot === 2) {
					if(this.slotData[2].values) {
						delete this.slotData[2].values[lastKey];
					}
				}
			}
			lastKey += 1;
		}
		this.slotEl[slot].slotMaxScroll = this.swSlotWrapper.clientHeight - this.slotEl[slot].clientHeight - 86;
		//console.log("UPDATED slot ul slotMaxScroll: " + this.slotEl[slot].slotMaxScroll);
		thisSlot = null;
	},

	showSlotValuesAfter: function(slot, lastKey, length) {
		if (typeof length === 'undefined' || length === null) {
			console.log("did you forget to pass the length of this slot to showSlotValuesAfter?");
			return false;
		}
		lastKey++;
		//console.log("slot ul slotMaxScroll: " + this.slotEl[slot].slotMaxScroll);
		if(this.slotEl[slot]){
			while (lastKey <= length) {
				//'<li id="' + slot + "_" + lastKey + 'LI">' + lastKey + '</li>';
				var existingLI = document.getElementById(slot + "_" + lastKey + "LI");
				if (typeof existingLI === 'undefined' || existingLI === null) {
					var LI = document.createElement("LI");
					LI.id = slot + "_" + lastKey + "LI";
					LI.textContent = lastKey;
				
						this.slotEl[slot].appendChild(LI);
					
					
					LI = null;
					if(slot === 2) {
						
							if(this.slotData[2].values) {
								this.slotData[2].values[lastKey] = lastKey;
							}
					
						
					}
				}
				lastKey += 1;
			}

			this.slotEl[slot].slotMaxScroll = this.swSlotWrapper.clientHeight - this.slotEl[slot].clientHeight - 86;
	 	}
		//console.log("UPDATED slot ul slotMaxScroll: " + this.slotEl[slot].slotMaxScroll);
	},

	/**
	 *
	 * Rolling slots
	 *
	 */

	setPosition: function(slot, pos) {
		this.slotEl[slot].slotYPosition = pos;
		this.slotEl[slot].style.webkitTransform = 'translate3d(0, ' + pos + 'px, 0)';
	},

	scrollStart: function(e) {
		// Find the clicked slot
		var xPos = e.targetTouches[0].clientX - this.swSlots.offsetLeft; // Clicked position minus left offset (should be 11px)

		// Find tapped slot
		var slot = 0;
		for (var i = 0; i < this.slotEl.length; i += 1) {
			slot += this.slotEl[i].slotWidth;

			if (xPos < slot) {
				this.activeSlot = i;
				break;
			}
		}

		// If slot is readonly do nothing
		//if(this.activeSlot){
			if (this.slotData[this.activeSlot].style.match('readonly')) {
				this.swFrame.removeEventListener('touchmove', this, false);
				this.swFrame.removeEventListener('touchend', this, false);
				return false;
			}
			this.slotEl[this.activeSlot].removeEventListener('webkitTransitionEnd', this, false); // Remove transition event (if any)
			this.slotEl[this.activeSlot].style.webkitTransitionDuration = '0'; // Remove any residual transition
			// Stop and hold slot position
			var theTransform = window.getComputedStyle(this.slotEl[this.activeSlot]).webkitTransform;
			theTransform = new WebKitCSSMatrix(theTransform).m42;
			if (theTransform != this.slotEl[this.activeSlot].slotYPosition) {
				this.setPosition(this.activeSlot, theTransform);
			}

			this.startY = e.targetTouches[0].clientY;
			this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
			this.scrollStartTime = e.timeStamp;

			this.swFrame.addEventListener('touchmove', this, false);
			this.swFrame.addEventListener('touchend', this, false);

			return true;
		//}
	},

	scrollMove: function(e) {
		var topDelta = e.targetTouches[0].clientY - this.startY;

		if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
			topDelta /= 2;
		}

		this.setPosition(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition + topDelta);
		this.startY = e.targetTouches[0].clientY;

		// Prevent slingshot effect
		if (e.timeStamp - this.scrollStartTime > 80) {
			this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
			this.scrollStartTime = e.timeStamp;
		}
	},

	scrollEnd: function(e) {
		this.swFrame.removeEventListener('touchmove', this, false);
		this.swFrame.removeEventListener('touchend', this, false);

		// If we are outside of the boundaries, let's go back to the sheepfold
		if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
			this.scrollTo(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition > 0 ? 0 : this.slotEl[this.activeSlot].slotMaxScroll);
			return false;
		}

		// Lame formula to calculate a fake deceleration
		var scrollDistance = this.slotEl[this.activeSlot].slotYPosition - this.scrollStartY;

		// The drag session was too short
		if (scrollDistance < this.cellHeight / 1.5 && scrollDistance > -this.cellHeight / 1.5) {
			if (this.slotEl[this.activeSlot].slotYPosition % this.cellHeight) {
				this.scrollTo(this.activeSlot, Math.round(this.slotEl[this.activeSlot].slotYPosition / this.cellHeight) * this.cellHeight, '100ms');
			}

			return false;
		}

		var scrollDuration = e.timeStamp - this.scrollStartTime;

		var newDuration = (2 * scrollDistance / scrollDuration) / this.friction;
		var newScrollDistance = (this.friction / 2) * (newDuration * newDuration);

		if (newDuration < 0) {
			newDuration = -newDuration;
			newScrollDistance = -newScrollDistance;
		}

		var newPosition = this.slotEl[this.activeSlot].slotYPosition + newScrollDistance;

		if (newPosition > 0) {
			// Prevent the slot to be dragged outside the visible area (top margin)
			newPosition /= 2;
			newDuration /= 3;

			if (newPosition > this.swSlotWrapper.clientHeight / 4) {
				newPosition = this.swSlotWrapper.clientHeight / 4;
			}
		} else if (newPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
			// Prevent the slot to be dragged outside the visible area (bottom margin)
			newPosition = (newPosition - this.slotEl[this.activeSlot].slotMaxScroll) / 2 + this.slotEl[this.activeSlot].slotMaxScroll;
			newDuration /= 3;

			if (newPosition < this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4) {
				newPosition = this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4;
			}
		} else {
			newPosition = Math.round(newPosition / this.cellHeight) * this.cellHeight;
		}

		this.scrollTo(this.activeSlot, Math.round(newPosition), Math.round(newDuration) + 'ms');
		return true;
	},

	scrollTo: function(slotNum, dest, runtime) {
		this.slotEl[slotNum].style.webkitTransitionDuration = runtime ? runtime : '100ms';
		this.setPosition(slotNum, dest ? dest : 0);

		// If we are outside of the boundaries go back to the sheepfold
		if (this.slotEl[slotNum].slotYPosition > 0 || this.slotEl[slotNum].slotYPosition < this.slotEl[slotNum].slotMaxScroll) {
			this.slotEl[slotNum].addEventListener('webkitTransitionEnd', this, false);
		}
	},

	scrollToValue: function(slot, value) {
		var yPos, count, i;

		this.slotEl[slot].removeEventListener('webkitTransitionEnd', this, false);
		this.slotEl[slot].style.webkitTransitionDuration = '0';

		count = 0;
		for (i in this.slotData[slot].values) {
			if (i == value) {
				yPos = count * this.cellHeight;
				this.setPosition(slot, yPos);
				break;
			}

			count -= 1;
		}
	},

	backWithinBoundaries: function(e) {
		e.target.removeEventListener('webkitTransitionEnd', this, false);

		this.scrollTo(e.target.slotPosition, e.target.slotYPosition > 0 ? 0 : e.target.slotMaxScroll, '150ms');
		return false;
	},


	/**
	 *
	 * Buttons
	 *
	 */

	tapDown: function(e) {
		e.currentTarget.addEventListener('touchmove', this, false);
		e.currentTarget.addEventListener('touchend', this, false);
		e.currentTarget.className = 'sw-pressed';
	},

	tapCancel: function(e) {
		e.currentTarget.removeEventListener('touchmove', this, false);
		e.currentTarget.removeEventListener('touchend', this, false);
		e.currentTarget.className = '';
	},

	tapUp: function(e) {
		this.tapCancel(e);

		if (e.currentTarget.id == 'sw-cancel') {
			this.cancelAction();
		} else {
			this.doneAction();
		}

		this.close();
	},

	setCancelAction: function(action) {
		this.cancelAction = action;
	},

	setDoneAction: function(action) {
		this.doneAction = action;
	},

	setSlotScrollEndAction: function(action) {
		this.scrollEndAction = action;
	},

	//default handlers
	cancelAction: function() {
		return false;
	},

	cancelDone: function() {
		return true;
	},

	scrollEndAction: function() {
		return false;
	}
};

/**
 * improve the spinning wheel
 */
var ScrollWheel = function(options) {
	/*this.pickerDetails = {
		id: ""
	};*/
	this.closeCallback = options.closeCallback;
	if (options.type.toLowerCase() === "date") {
		this.showDatePicker(options);
	} else if (options.type.toLowerCase() === "time") {
		this.showTimePicker(options);
	} else if (options.type.toLowerCase() === "custom") {
		this.showCustomPicker(options);
	}

	var self = this;
	//default actions for SpinningWheel
	SpinningWheel.setDoneAction(function() {
		self.done.apply(self);
	});
	SpinningWheel.setCancelAction(function() {
		ScrollWheel.instanceOpen = false;
		SpinningWheel.close();
		// self.closeCallback.apply(self, [self.pickerDetails.id, null]);
	});
};

ScrollWheel.instanceOpen = false;

ScrollWheel.prototype.showTimePicker = function(options) {
	if (ScrollWheel.instanceOpen) {
		return false;
	}
	ScrollWheel.instanceOpen = true;
	var hours = {},
		minutes = {},
		ampm = {
			0: "AM",
			1: "PM"
		},
		i = 1;
	//hours
	for (i = 1; i < 13; i++) {
		if (i < 10) {
			hours[i] = '0' + i;
		} else {
			hours[i] = i;
		}
	}
	//mins
	for (i = 0; i < 60; i++) {
		if (i < 10) {
			minutes[i] = '0' + i;
		} else {
			minutes[i] = i;
		}
	}

	/*if (id != "")
		this.pickerDetails.id = id;*/
	//default values
	var now = new Date();
	var defH = now.getHours(),
		defM = now.getMinutes(),
		defAMPM = (defH < 12) ? 0 : 1;
	//convert hours to 12 hour clock format
	if (defH > 12) {
		defH -= 12;
	}
	now = null;
	if (options.value != "") {
		var temp = options.value.split(":");
		defH = temp[0];
		//check if it is 0 prefixed
		if (defH.indexOf('0') == 0) {
			defH = defH.charAt(1);
		}

		defM = temp[1].split(" ")[0];
		//check if it is 0 prefixed
		if (defM.indexOf('0') == 0) {
			defM = defM.charAt(1);
		}
		defAMPM = (temp[1].split(" ")[1].toUpperCase() === "AM") ? 0 : 1;
		temp = null;
	}

	//setup the slots now
	SpinningWheel.addSlot(hours, 'center', defH);
	SpinningWheel.addSlot(minutes, 'center', defM);
	SpinningWheel.addSlot(ampm, 'center', defAMPM);

	SpinningWheel.open(options);

	hours = null;
	minutes = null;
	seconds = null;
};

ScrollWheel.prototype.showCustomPicker = function(options) {
	if (ScrollWheel.instanceOpen) {
		return false;
	}
	ScrollWheel.instanceOpen = true;
	var defaultValue = "";
	for (var i = 0; i < options.slotData.length; i++) {
		//setup the slots now
		if (options.defaultValue.length > i) {
			defaultValue = options.defaultValue[i];
		}
		SpinningWheel.addSlot(options.slotData[i], 'center '+options.count, defaultValue);
	}

	SpinningWheel.open(options);
};

ScrollWheel.prototype.showDatePicker = function(options) {
	if (ScrollWheel.instanceOpen) {
		return false;
	}
	ScrollWheel.instanceOpen = true;
	/*if (id != "") {
		this.pickerDetails.id = id;
	}*/
	//default values
	var defY = 1990,
		defM = 1,
		defD = 1,
		minY = 0,
		minM = 0,
		minD = 0,
		maxY = 0,
		maxM = 0,
		maxD = 0;
	// 默认值
	if (typeof options.defaultValue === 'function') {
		var defaultValue = options.defaultValue();
		if (defaultValue) {
			var temp = defaultValue.split("-");
			defY = parseInt(temp[0], 10);
			defM = parseInt(temp[1], 10);
			defD = parseInt(temp[2], 10);
		}
	}

	// 最小值
	if (options.minValue) {
		var min = options.minValue.split("-");
		minY = parseInt(min[0], 10);
		/*minM = parseInt(min[1], 10);
		minD = parseInt(min[2], 10);*/
	}

	// 最大值
	if (options.maxValue) {
		var max = options.maxValue.split("-");
		maxY = parseInt(max[0], 10);
		/*maxM = parseInt(max[1], 10);
		maxD = parseInt(max[2], 10);*/
	}

	var now = new Date();
	var days = {};
	var years = {};
	var months = {};

	var startYear = minY || now.getFullYear() - 100;
	var endYear = maxY || now.getFullYear() + 1;
	for (var y = startYear; y <= endYear; y += 1) {
		years[y] = y;
	}
	for (var i = 1; i <= 12; i += 1) {
		months[i] = i;
	}

	var month = defM || new Date().getMonth()+1;
	var dd = 31;
	if(month === 4|| month=== 6||month===9||month === 11){
		dd = 30;
	}else if(month===2){
		dd = 28;
		var year = defY || new Date().getFullYear();
		if((year%4===0 && year%100!==0) || year%400===0){ 
			dd = 29;
		}
	}

	for (var j = 1; j <= dd; j += 1) {
		days[j] = j;
	}
	/*var now = new Date();
	var endYear = now.getFullYear() - 12;
	var days = {};
	var years = {};
	var months = {
		1: 'January',
		2: 'February',
		3: 'March',
		4: 'April',
		5: 'May',
		6: 'June',
		7: 'July',
		8: 'August',
		9: 'September',
		10: 'October',
		11: 'November',
		12: 'December'
	};

	for (var i = 1; i < 32; i += 1) {
		days[i] = i;
	}

	for (i = now.getFullYear() - 100; i < endYear; i += 1) {
		years[i] = i;
	}

	SpinningWheel.addSlot(months, 'shrink', defM);
	SpinningWheel.addSlot(days, 'right', defD);
	SpinningWheel.addSlot(years, 'right', defY);*/


	SpinningWheel.addSlot(years, 'center', defY);
	SpinningWheel.addSlot(months, 'center', defM);
	if (!options.noDays) {
		SpinningWheel.addSlot(days, 'center', defD);
	}
	SpinningWheel.setSlotScrollEndAction(this.updateDates);
	SpinningWheel.open(options);
	now = null;
	days = null;
	months = null;
	years = null;
	selection();
};


//15年12月修改-jindw
var selection = function(data) {

	for(i =0;i<=2;i++){
		var key = SpinningWheel.getSlotValue(i).keys;
		var select = $('#sw-slots .sw-center:eq('+i+')').children("ul").children("li");
		select.attr('class', '');
		if(i === 2){
			select.parent().css({"position":"static"});
		}
		if(key > select.length){//向下滚过头
			select.eq(key-2).addClass('select');
			select.eq(key-3).addClass('near');
			select.eq(key-4).addClass('topshow');
		}else if(key ==   0){//向上滚过头
			select.eq(0).addClass('select');
			select.eq(1).addClass('nearb');
		}else{//正常
			select.eq(key-1).addClass('select');
			select.eq(key-2).addClass('near');
			select.eq(key).addClass('nearb');//选中元素的下一个元素
			select.eq(key-3).addClass('topshow');
		}
	}
}

ScrollWheel.prototype.done = function() {
	ScrollWheel.instanceOpen = false;
	var results = SpinningWheel.getSelectedValues();
	this.closeCallback(results.values);
	results = null;
};

ScrollWheel.prototype.updateDates = function(index) {

	var results = null,
		keys = null,
		selectedDate = null;

    
	if (index === 0) {
		// 滑动的是年份，要判断是闰年还是平年，然后修正二月份的天数
		results = SpinningWheel.getSlotValue(0);
		if (results && results.keys && results.values) {
			// keys = results.keys;
			selectedDate = SpinningWheel.getSlotValue(2);
			// 检查是否二月
			var month = SpinningWheel.getSlotValue(1);
			if (selectedDate.keys){
				if (!month || !month.keys) {
					return;
				}
				if (month.keys[0] === 2) {
					if ((results.keys[0] % 4) === 0) {
						// 闰年2月有29天
						// 日期恢复到有29号
						SpinningWheel.showSlotValuesAfter(2, 28, 29);
						if (parseInt(selectedDate.keys[0], 10) > 29) {
							SpinningWheel.scrollToValue(2, 29);
						}
						SpinningWheel.hideSlotValuesAfter(2, 29, 31);
					} else {
						// 平年2月有28天
						if (parseInt(selectedDate.keys[0], 10) > 28) {
							SpinningWheel.scrollToValue(2, 28);
						}
						SpinningWheel.hideSlotValuesAfter(2, 28, 31);
					}
				}
			}
		}
	} else if (index === 1) {
		// 如果是滑动月份的话，大小月以及二月的日子要修正
		results = SpinningWheel.getSlotValue(1);
		  
		if (results && results.keys && results.values) {
			keys = results.keys;
			// values = results.values;
			selectedDate = SpinningWheel.getSlotValue(2);
			if (selectedDate.keys)  {
				// 检查是否二月
				if (keys[0] === 2) {
					// 获取年份
					results = SpinningWheel.getSlotValue(0);
					if ((results.keys[0] % 4) === 0) {
						// 闰年2月有29天
						if (parseInt(selectedDate.keys[0], 10) > 29) {
							SpinningWheel.scrollToValue(2, 29);
						}
						SpinningWheel.hideSlotValuesAfter(2, 29, 31);
					} else {
						// 平年2月有28天
						if (parseInt(selectedDate.keys[0], 10) > 28) {
							SpinningWheel.scrollToValue(2, 28);
						}
						SpinningWheel.hideSlotValuesAfter(2, 28, 31);
					}
				}
				// 大月份有31号
				else if (keys[0] === 1 || keys[0] === 3 || keys[0] === 5 || keys[0] === 7 || keys[0] === 8 || keys[0] === 10 || keys[0] === 12) {
					// 日期恢复到有31号
					SpinningWheel.showSlotValuesAfter(2, 28, 31);
				}
				// 小月份只有30号
				else if (keys[0] === 4 || keys[0] === 6 || keys[0] === 9 || keys[0] === 11) {
					// 日期恢复到有30号
					SpinningWheel.showSlotValuesAfter(2, 28, 30);
					if (parseInt(selectedDate.keys[0], 10) > 30) {
						SpinningWheel.scrollToValue(2, 30);
					}
					// 隐藏31号
					SpinningWheel.hideSlotValuesAfter(2, 30, 31);
				}else if(keys[0] === 13){//滑过头，回到12月，大月
					SpinningWheel.showSlotValuesAfter(2, 28, 31);
				}
			selectedDate = null;
		  }
		}
		results = null;
	}
	selection();
};