Just a few jQueryUI Extensions
===========================================================

jQueryUI dialog-extras
----------------------------------------

The first of likely other extras plugins/widgets for jQueryUI

Defining the Need
----------------------------------------

There are a number of cases when a "lazy loading" functionality is
useful in web applications, preventing uneeded content from hiding
behind your web apps.

Unfortunately, jQueryUI does not provide a clean, straightforward way
to do this with dialogs as it does with say tab content. You could define 
some widgets and tie some .load() events to be triggered on them, but you 
would have to write a lot of boilerplate to do that for a lot of dialogs.

Additionally, there are times when you can reuse most of the dialog
conent, but might want to change it's behavior.  CRUD operations are a
good example of this.  You might have an "Add New" dialog, but also
want an "Edit" or "Update" dialog that follows the same basic
template.  I felt there should be an easier way to do this as well.

So, I decided to write the two widget extensions that you see here to help address this.

- **jquery.ui.dialog-lazy** Provides for the lazy loading functionality
- **jquery.ui.dialog-persona** Provides for the Multiple-Personality behavoir, or Personas

If you find them useful, that's great, if you don't that's fine to.

If you do use these modules and have any comments/suggestions
improvements, I welcome you to fork the project and provide feedback or pull
requests.

Example Uses
------------

The following examples go into some of the possible use cases for these extended dialog 
widgets.

The following examples are demo'ing both widgets.  The dialog-lazy
widget largely implements only the 'href' option, so separate examples
are not really needed.


Creating Manually
-----------------

Example of some of the options you can specify and the objects that would be passed.

```js
  // Create one more manually to show you some possibilities
  newDialog("widget").dialog({
	  href: "/fetch_dialog?dialog=widget", 
	      create: function(e,d) { console.log("Create fn Called"); },
	      autoOpen: false,
	      modal: true,
	      personas: { 
		          new: {buttons: 
			        {'New Widget': function(e) ($(this).find("form").submit()),
				'Cancel': function() {$(this).dialog('close');}}
				},
			  update: {buttons:
			           {'Update Widget': function(e) ($(this).find("form").submit()),
				    'Cancel': function() {$(this).dialog('close');} 
				    }
				   open: function(e,d) { ... Fetch Data, populate form ... };
				   close: function(e,d) { console.log("Update Closed"); }}}
      } );

  $("<button persona='new'>New Widget</button>").appendTo("body").on('click', function(e) {
  	     $("#dialog-field").dialog("open",e);
      }
   );

  $("<button persona='update'>Update Widget</button>").appendTo("body").on('click', function(e) {
  	     $("#dialog-field").dialog("open",e);
      }
   );

```

Creating many dialogs with a little more finesse
------------------------------------------------

These widgets are afterall being built for cases where you have a ton
of dialogs and don't want to load/instantiate them all fully if the
user might not use them all.  So here's a little more sugar to do this
en-masse.

```js
  var newDialog = function(id) { 
    var d = $('#dialog-' + id);      // Std id prefix for all dialogs
      if (d.length) 
	  return d;
      else {
	  return $("<div id='dialog-" + id + "'></div>").appendTo("body").hide();
      }
  }
  
  var newPersona = function(title, attr) {
      var newobj = {title: title};
      newobj['buttons'] = {};
      newobj['buttons'][title] = function(e) ($(this).find("form").submit());
      newobj['buttons']['Cancel'] = function() {$(this).dialog('close');};
      
      newobj =  $.extend(newobj, attr);
      return newobj;
  }

  var stdPersonas = function(type) {
      return {new: newPersona('New ' + type),
	      update: newPersona('Update ' + type)};
  }

  var stdDialog = function(id, type) { 
      return newDialog(id).dialog({href: "/fetch_dialog?dialog=" + id,
				   autoOpen: false,
				   modal: true,
				   personas: stdPersonas(type)
      });
  };

  //  Just so we can have different id's and Names for our Dialogs
  var stdDialogs = {"field": "Baseball Field",
                    "player": "Player",
                    "bat": "Bat",
		    "ball": "Ball",
		    "glove": "Glove",
  };

  // Create a batch of mostly "alike" dialogs
  $.each(stdDialogs, function(id,type) { stdDialog(id,type); });

  // Then you'd create your buttons, links, click actions somewhere to load a dialog.
  $("<button persona='new'>New Baseball Field</button>").appendTo("body").on('click', function(e) {
  	     $("#dialog-field").dialog("open",e);
      }
   );

  $("<button persona='update>Update Field</button>").appendTo("body").on('click', function(e) {
  	     $("#dialog-field").dialog("open",e);
      }
   );


```

Order of Use is Important
-------------------------

Ordering is important if you want to use both these javascript includes.

For example, the "title" of the "Loading" dialog could be switched by
a persona, if you have the persona loaded first, the dialog-lazy won't
get the persona switch until after it's opened.  If you've defined
callbacks via the option method to specific to personas, they also may
not be called as you expect.

```html
    <script type="text/javascript" src="/js/jquery.ui.dialog-lazy.js"></script>
    <script type="text/javascript" src="/js/jquery.ui.dialog-persona.js"></script>
```

Notes 
-----

Nothing else to say.
