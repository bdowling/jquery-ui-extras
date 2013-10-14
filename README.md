[jquery.ui-extras] A few of my jQuery ui Extensions
===========================================================

jqeury.ui.dialog-extras
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

If you find them useful, that's great, if you don't that's fine to.

If you do use these modules and have any comments/suggestions
improvements, I welcome you to fork the project and provide feedback or pull
requests.

Example Uses
------------

The following examples go into some of the possible use cases for these extended dialog 
widgets.

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

  // Create one more manually to show you some possibilities
  newDialog("widget").dialog({
	  href: "/fetch_dialog?dialog=widget", 
	      create: function(e,d) { console.log("Create fn Called"); },
	      open: function(e,d) { console.log("Open fn Called"); },
	      autoOpen: false,
	      modal: true,
	      personas: { 
		          new: newPersona('New Widget'),
			  update: newPersona('Update Widget', {
			          open: function(e,d) { ... Fetch Data, populate form ... };
				  close: function(e,d) { console.log("Update Closed"); }})
		      }
      } );

  //  Just so we can have different id's and Names for our Dialogs
  var stdDialogs = {"bat": "Bat",
		    "ball": "Ball",
  };

  // Create a batch of mostly "alike" dialogs
  $.each(stdDialogs, function(id,type) { stdDialog(id,type); });

  $("<button persona='new'>New Widget</button>").appendTo("body").on('click', function(e) {
  	     $("#dialog-widget").dialog("open",e);
      }
   );

  $("<button persona='update>Update Widget</button>").appendTo("body").on('click', function(e) {
  	     $("#dialog-widget").dialog("open",e);
      }
   );


```

Order of Use is Important
-------------------------

Ordering is important if you want to use both these modules.

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
