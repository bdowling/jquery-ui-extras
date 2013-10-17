
// jquery.ui.dialog-persona:
// Extend ui.dialog with personalities.
// Also passes the calling event so the personality can be changed based 
// on the currentTarget.attr('persona');

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
$.widget( "ui.dialog", $.ui.dialog, {
	version: "0.2",
	options: {
	    'personas': {},
	    'defaultPersona': ""
		},

	// Save and make available the last event that activated this dialog
	activatedBy: null,

	_persona: false,

        // _hasPersonas: false,
        // _setOption: function(key,val) {
	//     if (key === "personas") {
	// 	this._hasPersonas = (val !== null);
	//     }

	//  XXX FEATURE: Could watch if href changes and invalidate
	//  _wasLoaded if it is set?

	//     this._super();
	// },

        // _init: function() {
	//     if (this._hasPersonas() && ! this._persona) {
	//  	this._persona = this.options.defaultPersona;
	//     }
	    
	//     return this._super();
	// },
	_hasPersonas: function() {
	    return Object.getOwnPropertyNames(this.options.personas).length > 0;
	},
	open: function(e) { 
	    if (this._hasPersonas()) { 
		this._setPersona(e);
	    }

	    this._superApply(arguments); // Open Dialog
	},
	refresh: function(e) {
	    if (e) {
		this._setPersona(e);
	    }
	    return this._super(e);
	},
	_setPersona: function(e) {
	    if (e) {
		if (e.currentTarget) {
		    $(this).activatedBy = $(e.currentTarget);
		    this.persona($(e.currentTarget).attr("persona"));
		} else {
		    this.persona(e);
		}
	    } else {
		this.persona();
	    }
	},
	_defaultPersona: function() {
	    if (this._hasPersonas() &&
		this._persona == false || this._persona == undefined) {
		if (!this.options.defaultPersona || 
		    !this.options.personas[this.options.defaultPersona]) {
		    this.options.defaultPersona = Object.keys(this.options.personas)[0];
		}

		return this.options.defaultPersona;
	    }
	},
	persona: function(persona) {
	    if (!this._hasPersonas()) {
		return;
	    }

	    var that = this;
	    if (!this._persona)
		persona = this._defaultPersona();

	    if (persona == null || persona == "") {
		return this._persona;
	    } else if (persona !== this._persona) {
		//		log("Persona: " + persona + " OLD: " + this._persona);
		var oldpersona = this._persona;
		this._persona = persona;

		if (!this.options.personas[this._persona]) {
		    this._persona = this.options.defaultPersona;
		}

		// One persona could have attributes the other does
		// not, so we'll clear the old one just to be safe.
		// Another option might to store the "clean" state and
		// reset options based of that merge.
		if (oldpersona && this.options.personas[oldpersona]) {
		    // XXXX This isn't always going to work right, it
		    // would be better to have same keys in personas.
		    // e.g. if the one had specfic height/width and
		    // the other did not have them, the dialog would
		    // not go back to auto. Fix for this one option below.
		    
		    $.each(this.options.personas[oldpersona], 
			   function(k,v) {
			       delete that.options[k];
			   });
		}

		// width and height auto seem ok to impart on the
		// dialog if not overridden

		// Trying something new here, instead of extending our
		// options it may be a better bet to call
		// _setOptions() with the persona, in that way if the
		// dialog is instantiated it will force the parents to
		// do their refresh actions.

		$.extend(this.options, 
		 	 {width:"auto", height:"auto"},
			 this.options.personas[this._persona]);
		// If the widget is already open, also call setOptions so it can
		// handle any dynamic changes.
		this._setOptions(this.options.personas[this._persona]);
		
		// Update any features that depend on changed options
		// Note: This just calls the parent refresh() without an e.
		this.refresh(); 

		this._trigger('persona', null, {'dialog': this,
			                            'oldpersona': oldpersona, 
                                                    'persona': this._persona});
		return this._persona;
	    }
	}
	    
    });
})(jQuery);
