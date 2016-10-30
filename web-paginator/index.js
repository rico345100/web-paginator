"use strict";
const $ = require('./jquery.min.js');

function Paginator(options) {
	options = options || {};

	this.el = $('<div></div>').addClass('ui-paginator');
	this._ul = $('<ul></ul>').appendTo(this.el);

	this.currentPage = options.currentPage || 1;
	this.totalPages = options.totalPages || 1;
	
	this._events = {};
};
Paginator.prototype.show = function(cb) {
	this.el.show();
	typeof cb === 'function' && cb();

	return this;
};
Paginator.prototype.hide = function(cb) {
	this.el.hide();
	typeof cb === 'function' && cb();

	return this;
};
Paginator.prototype.appendTo = function(sel) {
	this.el.appendTo($(sel));
	return this;
};
Paginator.prototype.on = function(name, fn) {
	if(!this._events[name]) {
		this._events[name] = [];
	}

	this._events[name].push(fn);

	return this;
};
Paginator.prototype.emit = function(name) {
	let fns = this._events[name];

	if(fns) {
		let newArgs = Array.prototype.slice.call(arguments);
		newArgs.splice(0, 1);

		for(let i = 0; i < fns.length; i++) {
			fns[i].apply(this, newArgs);
		}
	}

	return this;
};
Paginator.prototype.setCurrentPage = function(page) {
	this.currentPage = +page;
	return this.render();
};
Paginator.prototype.setTotalPages = function(totalPages) {
	this.totalPages = totalPages;
	return this.render();
};
Paginator.prototype.render = function() {
	this.reset();
	
	let currentPage = this.currentPage;
	let totalPages = this.totalPages;
	let divCount = 10;

	let startPage = 1;
	let endPage = 1;

	if(totalPages < divCount) {
		startPage = 1;
		endPage = totalPages;
	}
	else {
		let pos = (( (currentPage-1) / divCount) | 0) * divCount;	// 14 -> 10, 21 -> 20
		startPage = pos + 1;	// 14 -> 10 -> 11
		endPage = pos + divCount;	// 14 -> 10 -> 20
		
		if(endPage > totalPages) {
			endPage = totalPages;
			startPage = endPage - divCount;
		}
	}

	let ul = this._ul;
	let self = this;

	function createPageItem(text, page) {
		let li = $('<li></li>');
		let a = $('<a></a>').attr('href', '#').text(text).click((ev) => {
			ev.preventDefault();
			self.emit('pageclicked', page);
		});

		if(page === currentPage && typeof text === 'number') {
			a.addClass('active');
		}

		a.appendTo(li);
		li.appendTo(ul);
	}

	createPageItem('<<', 1);
	createPageItem('<', (() => {
		let prevPage = startPage - 1;
		if(prevPage < 1) prevPage = 1;
		
		return prevPage;
	})());

	for(let page = startPage; page <= endPage; page++) {
		createPageItem(page, page);
	}

	createPageItem('>', (() => {
		let nextPage = endPage + 1;
		if(nextPage > totalPages) nextPage = totalPages;

		return nextPage;
	})());
	createPageItem('>>', totalPages);

	return this;
};
Paginator.prototype.reset = function() {
	this._ul.empty();
	return this;
};
Paginator.prototype.destroy = function() {
	this.el.remove();
	this._events = {};
	return this;
};

module.exports = Paginator;