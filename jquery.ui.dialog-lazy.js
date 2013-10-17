
// jquery.ui.dialog-lazy:
// Extend jquery.ui.dialog to provide a delayed loading or "lazy loading" functionality

//   Copyright (C) 2013 Brian J. Dowling

//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.

//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.

//   You should have received a copy of the GNU General Public License
//   along with this program.  If not, see <http://www.gnu.org/licenses/>.


(function($){

    var delayedOptions = {title: true,
			  width: true,
			  appendTo: true, // XXXX Caveats?
			  height: true};
    
    
    $.widget('ui.dialog', $.ui.dialog, {
	version: "0.2",
	options: {
	    href: "",
	    dialogLoaded: "",
	    loadingTitle: "",
	    loadingDialog: '<div style="text-align:center;"><strong>Fetching widgets ...</strong><br>' 
		              + '<br><img src="/new_images/loader2.gif"></div>',
        },
	_init: function() {
	    //	    if (this.options.href !== "") {
	    //		this.options.autoOpen = false;
	    //	    }
	    
	    return this._super();
	 }, 
	_create:  function() {
	      if (this.options.href === ""  ||      // Nothing to load
		  this._wasCreated === true) {     // or it was loaded
		  return this._super();
	      } else {
		  return false;
	      }
	}, 

	// Next few methods are just to protect from calling parent before instantiation
        // There are a host of other methods in ui.dialog that are unsafe, but these
	// are just a few common ones
	_setOptions: function (options) {
	    if (!this._wasCreated) { //  && key in delayedOptions) {
		return;
	    }

	    return this._super(key,val);
	},
	_setOption: function (key, val) {
	    if (!this._wasCreated) { //  && key in delayedOptions) {
		return;
	    } else if (key == "href" && val) {
		this._wasCreated = false;
	    }

	    return this._super(key,val);
	},
	refresh: function(e) {
	    if (this.options.href && this._wasCreated) {
		// This was here for mostly for persona, but is better
		// done there when switching personas
		// this._setOptions(this.options); // Bit Overkill, Could this backfire?
		// Alternatively have an array of keys that should be refreshed
		// this._createButtons();
	    }
	    return this._super(e);
	},
	_createButtons: function () { // Unsafe until loaded
	    if (this._wasCreated) {
		return this._super();
	    }
	},
	button: function () { // Unsafe until loaded
	    if (this._wasCreated) {
		return this._super();
	    }
	},

	open: function(e) {
	    if (this.options.href === ""  ||      // Nothing to load
		this._wasCreated === true) {     // or it was loaded
		return this._superApply(arguments);
	    } else {
		this._openNext = true;
		return this.loadDialog(e);
	    }
	},
	reload: function(e) {
	    this._wasCreated = false;
	    this._openNext = true;
	    if (e) 
		 this.refresh(e);

	    return this.loadDialog(e);
	},
	loadDialog: function(e) {
	    if (this._loader) 
		return;
	    if (this._openNext && !this._isOpen) {
		this._loader = $(this.options.loadingDialog);
		this._loader.attr('title', this.options.loadingTitle || 
				  this.options.title ? 
				  (this.options.title + " (loading)") : "Loading ...");
		this._loader.appendTo("body").hide().dialog({autoOpen: true, modal:true});
	    }
	    this._lastEvent = e;

	    $.ajax({
		    url: this.options.href,
			method: 'GET'
			})
		.then($.proxy(this._loadDialog, this)); 
	    
	    return true;
	},
        _loadDialog: function(data, textStatus, jqXHR) {
	    var e = this._lastEvent;

	    var element = this.element[0];
	    var div;
	    if (typeof data == "object" && data.html) { // JSON is possible
		div = $(data.html);
	    } else {                                    // otherwise assumed to be HTML
		div = $(data);
	    }

	    $(element).hide().html($(div).html()); 
	    $.each(["class", "title", "name", "id"], function (i,a) {
		    $(element).attr(a, $(div).attr(a));
		});
	    
	    if (this._loader) {
		this._loader.remove();
		delete this._loader;
	    }

	    this._wasCreated = true;  // Feels like this belongs in _create, should we have a _wasLoaded ?
	    this._create();

	    this._trigger('loaded', null, {'dialog': this});
	    if (this._openNext) {
		this._openNext = false;
		return this.open(e); 
	    } else {
		return this;
	    }
	},
        _openSuper: function() {
	    return $.ui.dialog.prototype.open.call( this );		    
	},
    });
})(jQuery);
