
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
	    return this.options.personas !== null;
	},
	open: function(e) { 
	    if (this._hasPersonas()) { 
		this._setPersona(e);
	    }

	    this._superApply(arguments); // Open Dialog
	},
	_setPersona: function(e) {
	    if (e) {

		if (e.currentTarget) {
		    $(this).activatedBy = $(e.currentTarget);
		    this.persona($(e.currentTarget).attr("persona"));
		} else if (e) {
		    this.persona(e);
		}
	    } else {
		this._defaultPersona();
	    }
	},
	_defaultPersona: function() {
	    if (this._hasPersonas() &&
		this._persona == false || this._persona == undefined) {
		if (!this.options.defaultPersona || 
		    !this.options.personas[this.options.defaultPersona]) {
		    if (this.options.personas) {
			this.options.defaultPersona = Object.keys(this.options.personas)[0];
		    }
		}
		
		this.persona(this.options.defaultPersona);
	    }
	},
	refresh: function(e) {
	    if (e) {   //  XXXX Note: Without test, this infinate recurssion would result 
		this._setPersona(e);
	    }
	    return this._super(e);
	},
	persona: function(persona) {
	    if (!this._hasPersonas()) {
		return;
	    }

	    var that = this;
	    if (persona == null || persona == "") {
		return this._persona;
	    } else if (persona !== this._persona) {
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
		    
		    $.each(Object.keys(this.options.personas[oldpersona]), function(i,k) {
			    delete that.options[k];
			});
		}

		// width and height auto seem ok to impart into the dialog if not overridden
		$.extend(this.options, 
			 {width:"auto",height:"auto"}, 
			 this.options.personas[this._persona]);

		// Update any features that depend on changed options
		this.refresh();

		this._trigger('persona', null, {'dialog': this,
			                            'oldpersona': oldpersona, 
                                                    'persona': this._persona});
		return this._persona;
	    }
	}
	    
    });
})(jQuery);
