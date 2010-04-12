/*
 * jPicker 1.1.0
 *
 * jQuery Plugin for Photoshop style color picker
 *
 * Copyright (c) 2010 Christopher T. Tillman
 * Digital Magic Productions, Inc. (http://www.digitalmagicpro.com/)
 * MIT style license, FREE to use, alter, copy, sell, and especially ENHANCE
 *
 * Painstakingly ported from John Dyers' excellent work on his own color picker based on the Prototype framework.
 *
 * John Dyers' website: (http://johndyer.name)
 * Color Picker page:   (http://johndyer.name/post/2007/09/PhotoShop-like-JavaScript-Color-Picker.aspx)
 *
 *
 * Known Issues
 * ______________
 * Attaching multiple jPicker objects on a single page will slow performance.
 *   jPicker creates a new instance of the picker for every element. Performance will suffer when binding dozens of instances.
 *
 * Internet Explorer 8 Standards Mode is slow on dragging markers.
 *   While profiling using IE8 Dev kit it indicates it takes MUCH longer to apply the style changes while dragging the markers.
 *   There is no current solution I am aware of to fix this.
 *
 *
 * Coming Soon
 * ______________
 * 1.1.1
 *     Will consider supporting jQuery ThemeRoller CSS API for theming the UI if demand exists.
 *
 * Planned For Future Release
 * ______________
 *
 *   Move the jPicker object to a single instance that all selection instances point to.
 *      - This will result in much faster operation and initialization for pages with multiple pickers.
 *      - This will also remove the requirement for Internet Explorer to hide the picker icons for elements higher in the DOM (IE calculates its own z-index for embedded, positioned elements).
 *
 *   Add activateCallback option for calling a callback function when the jPicker is activated or its binding is switched to a different picker element.
 *
 *
 *
 * Change Log
 * ______________
 * 1.1.0
 *   Reworked nearly the entire plugin including the internal and external event model, bindings, DOM searches, classes, and overall presentation.
 *   The Color object now supports a changed event that you can bind to (or just bind to the picker events still included).
 *   Event order has been reversed, instead of an change event on the map/bar/text fields updating the display, they now update the Color object which then fires the events that update the display.
 *   alphaSupport re-implemented by request - default behavior is off.
 *   Hex code now only 6 characters again.
 *   Color object can now have its value changed from code, using the "val" method, and it will fire all events necessary to update the display.
 *   Removed all "get_*" methods from the color object, instead opting for a single "val" method for getting and setting, more in line with familiar jQuery methods.
 *   Better rendering for all IE versions in Quirks mode.
 *
 * 1.0.13
 *   Updated transparency algorithm for red/green/blue color modes. The algorithm from John Dyers' color picker was close but incorrect. Bar colors are now pixel perfect with the new algorithm.
 *   Changed from using "background-position" on the color maps to an element of full height using the "top" attribute for image-map location using "overflow: hidden" to hide overdraw.
 *   IE7/8 ignores opacity on elements taller than 4096px. Image maps therefore no longer include a blank first map so the Bar is just under 4096. Blank is now accomplished by setting the "top" setting to below the map display.
 *   New colorBar picker image that does not draw outside of the element since the elements now hide overdraw.
 *   Added IE5.5/6 support for the picker. This is why it now uses maps of full height and the "top" attribute for map locations.
 *   Moved the images in the maps to 4 pixels apart from each other. IE7/8 change the first pixel of the bottom-border of 2px to partially transparent showing a portion of a different color map without this.
 *
 * 1.0.12
 *   Added minified CSS file.
 *   Added IE7/8 Quirks Mode support.
 *   Added configurable string constants for all text and tooltips. You can now change the default values for different languages.
 *   Privatized the RGBA values in the Color object for better NULL handling. YOU MUST USE THE NEW GET FUNCTIONS TO ACCESS THE COLOR PROPERTIES.
 *   Better NULL color handling and an additional "No Color Selected" quick pick color.
 *   More consistent behavior across multiple versions of browsers.
 *   Added alpha response to the binded color picker icon.
 *   Removed "alphaSupport" variable. It is now always supported.
 *
 * 1.0.11b
 *   Corrected NULL behavior in IE. jQuery was getting an exception when attempting to assign a backgroundColor style of '#'. Now assigns 'transparent' if color is NULL.
 *   Can now create new Color object WITH OR WITHOUT the '#' prefix.
 *
 * 1.0.11
 *   Added ability for NULL colors (delete the hex value). Color will be returned as color.hex == ''. Can set the default color to an empty hex string as well.
 *   cancelCallback now returns the original color for use in programming responses.
 *
 * 1.0.10
 *   Corrected table layout and tweaked display for more consisent presentation. Nice catch from Jonathan Pasquier.
 *
 * 1.0.9
 *   Added optional title variable for each jPicker window.
 *
 * 1.0.8
 *   Moved all images into a few sprites - now using backgroundPosition to change color maps and bars instead of changing the image - this should be faster to download and run.
 *   
 * 1.0.7
 *   RENAMED CSS FILE TO INCLUDE VERSION NUMBER!!! YOU MUST USE THIS VERSIONED CSS FILE!!! There will be no need to do your own CSS version number increments from now on.
 *   Added opacity feedback to color preview boxes.
 *   Removed reliance on "id" value of containing object. Subobjects are now found by class and container instead of id's. This drastically reduces injected code.
 *   Removed (jQuery).jPicker.getListElementById(id) function since "id" is no longer incorporated or required.
 *
 * 1.0.6
 *   Corrected picker bugs introduced with 1.0.5.
 *   Removed alpha slider bar until activated - default behavior for alpha is now OFF.
 *   Corrected Color constructor bug not allowing values of 0 for initial value (it was evaluating false and missing the init code - Thanks Pavol).
 *   Removed title tags (tooltips) from color maps and bars - They get in the way in some browsers (e.g. IE - dragging marker does NOT prevent or hide the tooltip).
 *   THERE WERE CSS FILE CHANGES WITH THIS UPDATE!!! IF YOU USE NEVER-EXPIRE HEADERS, YOU WILL NEED TO INCREMENT YOUR CSS FILE VERSION NUMBER!!!
 *
 * 1.0.5
 *   Added opacity support to picker and color/callback methods. New property "a" (alpha - range from 0-100) in all color objects now - defaults to 100% opaque. (Thank you Pavol)
 *   Added title attributes to input elements - gives short tooltip directions on what button or field does.
 *   Commit callback used to fire on control initialization (twice actually) - This has been corrected, it does not fire on initialization.
 *   THERE WERE CSS FILE CHANGES WITH THIS UPDATE!!! IF YOU USE NEVER-EXPIRE HEADERS, YOU WILL NEED TO INCREMENT YOUR CSS FILE VERSION NUMBER!!!
 *
 * 1.0.4
 *   Added ability for smaller picker icon with expandable window on any DOM element (not just input).
 *   "draggable" property renamed to "expandable" and its scope increased to create small picker icon or large static picker.
 *
 * 1.0.3
 *   Added cancelCallback function for registering an external function when user clicks cancel button. (Thank you Jeff and Pavol)
 *
 * 1.0.2
 *   Random bug fixes - speed concerns.
 *
 * 1.0.1
 *   Corrected closure based memeory leak - there may be others?
 *
 * 1.0.0
 *   First Release.
 *
 */
(function($, version)
{
  var Slider = // encapsulate slider functionality for the ColorMap and ColorBar - could be useful to use a jQuery UI draggable for this with certain extensions
      function(bar, options)
      {
        var $this = this, // private properties, methods, and events - keep these variables and classes invisible to outside code
          arrow = bar.find('img').eq(0), // the arrow image image to drag
          minX = 0,
          maxX = 100,
          rangeX = 100,
          minY = 0,
          maxY = 100,
          rangeY = 100,
          x = 0,
          y = 0,
          offset,
          changeEvents = new Array(),
          fireChangeEvents =
            function(context)
            {
              for (var i = 0; i < changeEvents.length; i++) changeEvents[i]($this, context);
            },
          mouseDown = // bind the mousedown to the bar not the arrow for quick snapping to the clicked location
            function(e)
            {
              var off = bar.offset();
              offset = { l: off.left | 0, t: off.top | 0 };
              setValuesFromMousePosition(e);
              // Bind mousemove and mouseup event to the document so it responds when dragged of of the bar - we will unbind these when on mouseup to save processing
              $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
              e.stopPropagation();
              e.preventDefault(); // don't try to select anything or drag the image to the desktop
              return false;
            },
          mouseMove = // set the values as the mouse moves
            function(e)
            {
              setValuesFromMousePosition(e);
              e.stopPropagation();
              e.preventDefault();
              return false;
            },
          mouseUp = // unbind the document events - they aren't needed when not dragging
            function(e)
            {
              $(document).unbind('mouseup', mouseUp).unbind('mousemove', mouseMove);
              e.stopPropagation();
              e.preventDefault();
              return false;
            },
          setValuesFromMousePosition = // calculate mouse position and set value within the current range
            function(e)
            {
              var locX = e.pageX - offset.l,
                  locY = e.pageY - offset.t,
                  barW = bar.w, // local copies for YUI compressor
                  barH = bar.h;
              // keep the arrow within the bounds of the bar
              if (locX < 0) locX = 0;
              else if (locX > barW) locX = barW;
              if (locY < 0) locY = 0;
              else if (locY > barH) locY = barH;
              val('xy', { x: ((locX / barW) * rangeX) + minX, y: ((locY / barH) * rangeY) + minY });
            },
          draw =
            function()
            {
              var arrowOffsetX = 0,
                arrowOffsetY = 0,
                barW = bar.w,
                barH = bar.h,
                arrowW = arrow.w,
                arrowH = arrow.h;
              if (rangeX > 0) // range is greater than zero
              {
                // constrain to bounds
                if (x == maxX) arrowOffsetX = barW;
                else arrowOffsetX = ((x / rangeX) * barW) | 0;
              }
              if (rangeY > 0) // range is greater than zero
              {
                // constrain to bounds
                if (y == maxY) arrowOffsetY = barH;
                else arrowOffsetY = ((y / rangeY) * barH) | 0;
              }
              // if arrow width is greater than bar width, center arrow and prevent horizontal dragging
              if (arrowW >= barW) arrowOffsetX = (barW >> 1) - (arrowW >> 1); // number >> 1 - superfast bitwise divide by two and truncate (move bits over one bit discarding lowest)
              else arrowOffsetX -= arrowW >> 1;
              // if arrow height is greater than bar height, center arrow and prevent vertical dragging
              if (arrowH >= barH) arrowOffsetY = (barH >> 1) - (arrowH >> 1);
              else arrowOffsetY -= arrowH >> 1;
              // set the arrow position based on these offsets
              arrow.css({ left: arrowOffsetX + 'px', top: arrowOffsetY + 'px' });
            },
          val =
            function(name, value, context)
            {
              var set = value !== undefined;
              if (!set)
              {
                if (name === undefined || name == null) name = 'xy';
                switch (name.toLowerCase())
                {
                  case 'x': return x;
                  case 'y': return y;
                  case 'xy':
                  default: return { x: x, y: y };
                }
              }
              if (context != null && context == $this) return;
              var changed = false,
                  newX,
                  newY;
              if (name == null) name = 'xy';
              switch (name.toLowerCase())
              {
                case 'x':
                  newX = value && (value.x && value.x | 0 || value | 0) || 0;
                  break;
                case 'y':
                  newY = value && (value.y && value.y | 0 || value | 0) || 0;
                  break;
                case 'xy':
                default:
                  newX = value && value.x && value.x | 0 || 0;
                  newY = value && value.y && value.y | 0 || 0;
                  break;
              }
              if (newX != null)
              {
                if (newX < minX) newX = minX;
                else if (newX > maxX) newX = maxX;
                if (x != newX)
                {
                  x = newX;
                  changed = true;
                }
              }
              if (newY != null)
              {
                if (newY < minY) newY = minY;
                else if (newY > maxY) newY = maxY;
                if (y != newY)
                {
                  y = newY;
                  changed = true;
                }
              }
              changed && fireChangeEvents(context || $this);
            },
          range =
            function (name, value)
            {
              var set = value !== undefined;
              if (!set)
              {
                if (name === undefined || name == null) name = 'all';
                switch (name.toLowerCase())
                {
                  case 'minx': return minX;
                  case 'maxx': return maxX;
                  case 'rangex': return { minX: minX, maxX: maxX, rangeX: rangeX };
                  case 'miny': return minY;
                  case 'maxy': return maxY;
                  case 'rangey': return { minY: minY, maxY: maxY, rangeY: rangeY };
                  case 'all':
                  default: return { minX: minX, maxX: maxX, rangeX: rangeX, minY: minY, maxY: maxY, rangeY: rangeY };
                }
              }
              var changed = false,
                  newMinX,
                  newMaxX,
                  newMinY,
                  newMaxY;
              if (name == null) name = 'all';
              switch (name.toLowerCase())
              {
                case 'minx':
                  newMinX = value && (value.minX && value.minX | 0 || value | 0) || 0;
                  break;
                case 'maxx':
                  newMaxX = value && (value.maxX && value.maxX | 0 || value | 0) || 0;
                  break;
                case 'rangex':
                  newMinX = value && value.minX && value.minX | 0 || 0;
                  newMaxX = value && value.maxX && value.maxX | 0 || 0;
                  break;
                case 'miny':
                  newMinY = value && (value.minY && value.minY | 0 || value | 0) || 0;
                  break;
                case 'maxy':
                  newMaxY = value && (value.maxY && value.maxY | 0 || value | 0) || 0;
                  break;
                case 'rangey':
                  newMinY = value && value.minY && value.minY | 0 || 0;
                  newMaxY = value && value.maxY && value.maxY | 0 || 0;
                  break;
                case 'all':
                default:
                  newMinX = value && value.minX && value.minX | 0 || 0;
                  newMaxX = value && value.maxX && value.maxX | 0 || 0;
                  newMinY = value && value.minY && value.minY | 0 || 0;
                  newMaxY = value && value.maxY && value.maxY | 0 || 0;
                  break;
              }
              if (newMinX != null && minX != newMinX)
              {
                minX = newMinX;
                rangeX = maxX - minX;
              }
              if (newMaxX != null && maxX != newMaxX)
              {
                maxX = newMaxX;
                rangeX = maxX - minX;
              }
              if (newMinY != null && minY != newMinY)
              {
                minY = newMinY;
                rangeY = maxY - minY;
              }
              if (newMaxY != null && maxY != newMaxY)
              {
                maxY = newMaxY;
                rangeY = maxY - minY;
              }
            },
          bind =
            function (callback)
            {
              if ($.isFunction(callback)) changeEvents.push(callback);
            },
          unbind =
            function (callback)
            {
              if (!$.isFunction(callback)) return;
              var i;
              while ((i = $.inArray(callback, changeEvents)) != -1) changeEvents.splice(i, 1);
            },
          destroy =
            function()
            {
              // unbind all possible events and null objects
              $(document).unbind('mouseup', mouseUp).unbind('mousemove', mouseMove);
              bar.unbind('mousedown', mouseDown);
              bar = null;
              arrow = null;
              changeEvents = null;
            };
        $.extend(true, $this, // public properties, methods, and event bindings - these we need to access from other controls
          {
            val: val,
            range: range,
            bind: bind,
            unbind: unbind,
            destroy: destroy
          });
        // initialize this control
        arrow.src = options.arrow && options.arrow.image;
        arrow.w = options.arrow && options.arrow.width || arrow.width();
        arrow.h = options.arrow && options.arrow.height || arrow.height();
        bar.w = options.map && options.map.width || bar.width();
        bar.h = options.map && options.map.height || bar.height();
        // bind mousedown event
        bar.bind('mousedown', mouseDown);
        bind(draw);
      },
    ColorValuePicker = // controls for all the input elements for the typing in color values
      function(picker, color, bindedHex)
      {
        var $this = this, // private properties and methods
          red = picker.find('tr.Red td.Text input').eq(0),
          green = picker.find('tr.Green td.Text input').eq(0),
          blue = picker.find('tr.Blue td.Text input').eq(0),
          alpha = picker.find('tr.Alpha td.Text input').eq(0),
          hue = picker.find('tr.Hue td.Text input').eq(0),
          saturation = picker.find('tr.Saturation td.Text input').eq(0),
          value = picker.find('tr.Value td.Text input').eq(0),
          hex = picker.find('tr.Hex td.Text input.Hex').eq(0),
          ahex = picker.find('tr.Hex td.Text input.AHex').eq(0),
          keyUp = // hue, saturation, or value input box key up - validate value and set color
            function(e)
            {
              if (e.target.value == '' && e.target != hex.get(0) && (bindedHex != null && e.target != bindedHex.get(0) || bindedHex == null)) return;
              if (!validateKey(e)) return e;
              switch (e.target)
              {
                case red.get(0):
                  red.val(setValueInRange(red.val(), 0, 255));
                  color.val('r', red.val(), e.target);
                  break;
                case green.get(0):
                  green.val(setValueInRange(green.val(), 0, 255));
                  color.val('g', green.val(), e.target);
                  break;
                case blue.get(0):
                  blue.val(setValueInRange(blue.val(), 0, 255));
                  color.val('b', blue.val(), e.target);
                  break;
                case alpha.get(0):
                  alpha.val(setValueInRange(alpha.val(), 0, 100));
                  color.val('a', alpha.val(), e.target);
                  break;
                case hue.get(0):
                  hue.val(setValueInRange(hue.val(), 0, 360));
                  color.val('h', hue.val(), e.target);
                  break;
                case saturation.get(0):
                  saturation.val(setValueInRange(saturation.val(), 0, 100));
                  color.val('s', saturation.val(), e.target);
                  break;
                case value.get(0):
                  value.val(setValueInRange(value.val(), 0, 100));
                  color.val('v', value.val(), e.target);
                  break;
                case hex.get(0):
                  hex.val(hex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 6));
                  bindedHex && bindedHex.val(hex.val());
                  color.val('hex', hex.val() != '' ? hex.val() : null, e.target);
                  break;
                case bindedHex && bindedHex.get(0):
                  bindedHex.val(bindedHex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 6));
                  hex.val(bindedHex.val());
                  color.val('hex', bindedHex.val() != '' ? bindedHex.val() : null, e.target);
                  break;
                case ahex.get(0):
                  ahex.val(ahex.val().replace(/[^a-fA-F0-9]/g, '').toLowerCase().substring(0, 2));
                  color.val('a', ahex.val() != null ? ((parseInt(ahex.val(), 16) * 100) / 255) : null, e.target);
                  break;
              }
            },
          blur = // hue, saturation, or value input box blur - reset to original if value empty
            function(e)
            {
              if (color.val() != null)
              {
                switch (e.target)
                {
                  case red.get(0): red.val(color.val('r')); break;
                  case green.get(0): green.val(color.val('g')); break;
                  case blue.get(0): blue.val(color.val('b')); break;
                  case alpha.get(0): alpha.val(color.val('a')); break;
                  case hue.get(0): hue.val(color.val('h')); break;
                  case saturation.get(0): saturation.val(color.val('s')); break;
                  case value.get(0): value.val(color.val('v')); break;
                  case hex.get(0):
                  case bindedHex && bindedHex.get(0):
                    hex.val(color.val('hex'));
                    bindedHex && bindedHex.val(color.val('hex'));
                    break;
                  case ahex.get(0): ahex.val(color.val('ahex').substring(6)); break;
                }
              }
            },
          validateKey = // validate key
            function(e)
            {
              switch(e.keyCode)
              {
                case 9:
                case 16:
                case 29:
                case 37:
                case 38:
                case 40:
                  return false;
                case 'c'.charCodeAt():
                case 'v'.charCodeAt():
                  if (e.ctrlKey) return false;
              }
              return true;
            },
          setValueInRange = // constrain value within range
            function(value, min, max)
            {
              if (value == '' || isNaN(value)) return min;
              if (value > max) return max;
              if (value < min) return min;
              return value;
            },
          colorChanged =
            function(ui, context)
            {
              if (context != red.get(0)) red.val(ui.val('r') != null ? ui.val('r') : '');
              if (context != green.get(0)) green.val(ui.val('g') != null ? ui.val('g') : '');
              if (context != blue.get(0)) blue.val(ui.val('b') != null ? ui.val('b') : '');
              if (context != alpha.get(0)) alpha.val(ui.val('a') != null ? ui.val('a') : '');
              if (context != hue.get(0)) hue.val(ui.val('h') != null ? ui.val('h') : '');
              if (context != saturation.get(0)) saturation.val(ui.val('s') != null ? ui.val('s') : '');
              if (context != value.get(0)) value.val(ui.val('v') != null ? ui.val('v') : '');
              if (context != hex.get(0) && (bindedHex && context != bindedHex.get(0) || !bindedHex)) hex.val(ui.val('hex') != null ? ui.val('hex') : '');
              if (bindedHex && context != bindedHex.get(0) && context != hex.get(0)) bindedHex.val(ui.val('hex') != null ? ui.val('hex') : '');
              if (context != ahex.get(0)) ahex.val(ui.val('ahex') != null ? ui.val('ahex').substring(6) : '');
            },
          destroy =
            function()
            {
              // unbind all events and null objects
              red.add(green).add(blue).add(alpha).add(hue).add(saturation).add(value).add(hex).add(bindedHex).add(ahex).unbind('keyup', keyUp).unbind('blur', blur);
              color.unbind(colorChanged);
              red = null;
              green = null;
              blue = null;
              alpha = null;
              hue = null;
              saturation = null;
              value = null;
              hex = null;
              ahex = null;
            };
        $.extend(true, $this, // public properties and methods
          {
            destroy: destroy
          });
        red.add(green).add(blue).add(alpha).add(hue).add(saturation).add(value).add(hex).add(bindedHex).add(ahex).bind('keyup', keyUp).bind('blur', blur);
        color.bind(colorChanged);
      };
  $.jPicker =
    {
      List: [], // array holding references to each active instance of the control
      Color: // color object - we will be able to assign by any color space type or retrieve any color space info
             // we want this public so we can optionally assign new color objects to initial values using inputs other than a string hex value (also supported)
        function(init)
        {
          var $this = this,
            r,
            g,
            b,
            a,
            h,
            s,
            v,
            changeEvents = new Array(),
            fireChangeEvents = 
              function(context)
              {
                for (var i = 0; i < changeEvents.length; i++) changeEvents[i]($this, context);
              },
            val =
              function(name, value, context)
              {
                var set = value !== undefined;
                if (!set)
                {
                  if (name === undefined || name == null || name == '') name = 'all';
                  switch (name.toLowerCase())
                  {
                    case 'ahex': return r != null ? ColorMethods.rgbaToHex({ r: r, g: g, b: b, a: a }) : null;
                    case 'hex':
                      var ret = val('ahex');
                      return ret && ret.substring(0, 6) || null;
                    case 'all': return r != null ? { r: r, g: g, b: b, a: a, h: h, s: s, v: v, hex: val('hex'), ahex: val('ahex') } : null;
                    default:
                      var ret={};
                      for (var i = 0; i < name.length; i++)
                      {
                        switch (name.charAt(i))
                        {
                          case 'r':
                            if (name.length == 1) ret = r;
                            else ret.r = r;
                            break;
                          case 'g':
                            if (name.length == 1) ret = g;
                            else ret.g = g;
                            break;
                          case 'b':
                            if (name.length == 1) ret = b;
                            else ret.b = b;
                            break;
                          case 'a':
                            if (name.length == 1) ret = a;
                            else ret.a = a;
                            break;
                          case 'h':
                            if (name.length == 1) ret = h;
                            else ret.h = h;
                            break;
                          case 's':
                            if (name.length == 1) ret = s;
                            else ret.s = s;
                            break;
                          case 'v':
                            if (name.length == 1) ret = v;
                            else ret.v = v;
                            break;
                        }
                      }
                      return ret == {} ? val('all') : ret;
                      break;
                  }
                }
                if (context != null && context == $this) return;
                var changed = false;
                if (name == null) name = '';
                if (value == null)
                {
                  if (r != null)
                  {
                    r = null;
                    changed = true;
                  }
                  if (g != null)
                  {
                    g = null;
                    changed = true;
                  }
                  if (b != null)
                  {
                    b = null;
                    changed = true;
                  }
                  if (a != null)
                  {
                    a = null;
                    changed = true;
                  }
                  if (h != null)
                  {
                    h = null;
                    changed = true;
                  }
                  if (s != null)
                  {
                    s = null;
                    changed = true;
                  }
                  if (v != null)
                  {
                    v = null;
                    changed = true;
                  }
                  changed && fireChangeEvents(context || $this);
                  return;
                }
                switch (name.toLowerCase())
                {
                  case 'ahex':
                  case 'hex':
                    var ret = ColorMethods.hexToRgba(value && (value.ahex || value.hex) || value || '00000000');
                    val('rgba', { r: ret.r, g: ret.g, b: ret.b, a: name == 'ahex' ? ret.a : a != null ? a : 100 }, context);
                    break;
                  default:
                    if (value && (value.ahex != null || value.hex != null))
                    {
                      val('ahex', value.ahex || value.hex || '00000000', context);
                      return;
                    }
                    var newV = {}, rgb = false, hsv = false;
                    if (value.r !== undefined && !name.indexOf('r') == -1) name += 'r';
                    if (value.g !== undefined && !name.indexOf('g') == -1) name += 'g';
                    if (value.b !== undefined && !name.indexOf('b') == -1) name += 'b';
                    if (value.a !== undefined && !name.indexOf('a') == -1) name += 'a';
                    if (value.h !== undefined && !name.indexOf('h') == -1) name += 'h';
                    if (value.s !== undefined && !name.indexOf('s') == -1) name += 's';
                    if (value.v !== undefined && !name.indexOf('v') == -1) name += 'v';
                    for (var i = 0; i < name.length; i++)
                    {
                      switch (name.charAt(i))
                      {
                        case 'r':
                          if (hsv) continue;
                          rgb = true;
                          newV.r = value && value.r && value.r | 0 || value && value | 0 || 0;
                          if (newV.r < 0) newV.r = 0;
                          else if (newV.r > 255) newV.r = 255;
                          if (r != newV.r)
                          {
                            r = newV.r;
                            changed = true;
                          }
                          break;
                        case 'g':
                          if (hsv) continue;
                          rgb = true;
                          newV.g = value && value.g && value.g | 0 || value && value | 0 || 0;
                          if (newV.g < 0) newV.g = 0;
                          else if (newV.g > 255) newV.g = 255;
                          if (g != newV.g)
                          {
                            g = newV.g;
                            changed = true;
                          }
                          break;
                        case 'b':
                          if (hsv) continue;
                          rgb = true;
                          newV.b = value && value.b && value.b | 0 || value && value | 0 || 0;
                          if (newV.b < 0) newV.b = 0;
                          else if (newV.b > 255) newV.b = 255;
                          if (b != newV.b)
                          {
                            b = newV.b;
                            changed = true;
                          }
                          break;
                        case 'a':
                          newV.a = value && value.a != null ? value.a | 0 : value != null ? value | 0 : 100;
                          if (newV.a < 0) newV.a = 0;
                          else if (newV.a > 100) newV.a = 100;
                          if (a != newV.a)
                          {
                            a = newV.a;
                            changed = true;
                          }
                          break;
                        case 'h':
                          if (rgb) continue;
                          hsv = true;
                          newV.h = value && value.h && value.h | 0 || value && value | 0 || 0;
                          if (newV.h < 0) newV.h = 0;
                          else if (newV.h > 360) newV.h = 360;
                          if (h != newV.h)
                          {
                            h = newV.h;
                            changed = true;
                          }
                          break;
                        case 's':
                          if (rgb) continue;
                          hsv = true;
                          newV.s = value && value.s != null ? value.s | 0 : value != null ? value | 0 : 100;
                          if (newV.s < 0) newV.s = 0;
                          else if (newV.s > 100) newV.s = 100;
                          if (s != newV.s)
                          {
                            s = newV.s;
                            changed = true;
                          }
                          break;
                        case 'v':
                          if (rgb) continue;
                          hsv = true;
                          newV.v = value && value.v != null ? value.v | 0 : value != null ? value | 0 : 100;
                          if (newV.v < 0) newV.v = 0;
                          else if (newV.v > 100) newV.v = 100;
                          if (v != newV.v)
                          {
                            v = newV.v;
                            changed = true;
                          }
                          break;
                      }
                    }
                    if (changed)
                    {
                      if (rgb)
                      {
                        r = r || 0;
                        g = g || 0;
                        b = b || 0;
                        var ret = ColorMethods.rgbToHsv({ r: r, g: g, b: b });
                        h = ret.h;
                        s = ret.s;
                        v = ret.v;
                      }
                      else if (hsv)
                      {
                        h = h || 0;
                        s = s != null ? s : 100;
                        v = v != null ? v : 100;
                        var ret = ColorMethods.hsvToRgb({ h: h, s: s, v: v });
                        r = ret.r;
                        g = ret.g;
                        b = ret.b;
                      }
                      a = a != null ? a : 100;
                      fireChangeEvents(context || $this);
                    }
                    break;
                }
              },
            bind =
              function(callback)
              {
                if ($.isFunction(callback)) changeEvents.push(callback);
              },
            unbind =
              function(callback)
              {
                if (!$.isFunction(callback)) return;
                var i;
                while ((i = $.inArray(callback, changeEvents)) != -1) changeEvents.splice(i, 1);
              },
            destroy =
              function()
              {
                changeEvents = null;
              }
          $.extend(true, $this, // public properties and methods
            {
              val: val,
              bind: bind,
              unbind: unbind,
              destroy: destroy
            });
          if (init)
          {
            if (init.hex != null) val('hex', init);
            else if (init.ahex != null) val('ahex', init);
            else if (init.r != null && init.g != null && init.b != null) val('rgb', init);
            else if (init.h != null && init.s != null && init.v != null) val('hsv', init);
          }
        },
      ColorMethods: // color conversion methods  - make public to give use to external scripts
        {
          hexToRgba:
            function(hex)
            {
              hex = this.validateHex(hex);
              if (hex == '') return { r: null, g: null, b: null, a: null };
              var r = '00', g = '00', b = '00', a = '100';
              if (hex.length == 6) hex += 'ff';
              if (hex.length > 6)
              {
                r = hex.substring(0, 2);
                g = hex.substring(2, 4);
                b = hex.substring(4, 6);
                a = hex.substring(6, hex.length);
              }
              else
              {
                if (hex.length > 4)
                {
                  r = hex.substring(4, hex.length);
                  hex = hex.substring(0, 4);
                }
                if (hex.length > 2)
                {
                  g = hex.substring(2, hex.length);
                  hex = hex.substring(0, 2);
                }
                if (hex.length > 0) b = hex.substring(0, hex.length);
              }
              return { r: this.hexToInt(r), g: this.hexToInt(g), b: this.hexToInt(b), a: ((this.hexToInt(a) * 100) / 255) | 0 };
            },
          validateHex:
            function(hex)
            {
              hex = hex.toLowerCase().replace(/[^a-f0-9]/g, '');
              if (hex.length > 8) hex = hex.substring(0, 8);
              return hex;
            },
          rgbaToHex:
            function(rgba)
            {
              return this.intToHex(rgba.r) + this.intToHex(rgba.g) + this.intToHex(rgba.b) + this.intToHex(((rgba.a * 255) / 100) | 0);
            },
          intToHex:
            function(dec)
            {
              var result = (dec | 0).toString(16);
              if (result.length == 1) result = ('0' + result);
              return result.toLowerCase();
            },
          hexToInt:
            function(hex)
            {
              return parseInt(hex, 16);
            },
          rgbToHsv:
            function(rgb)
            {
              var r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255, hsv = { h: 0, s: 0, v: 0 }, min = 0, max = 0, delta;
              if (r >= g && r >= b)
              {
                max = r;
                min = g > b ? b : g;
              }
              else if (g >= b && g >= r)
              {
                max = g;
                min = r > b ? b : r;
              }
              else
              {
                max = b;
                min = g > r ? r : g;
              }
              hsv.v = max;
              hsv.s = max ? (max - min) / max : 0;
              if (!hsv.s) hsv.h = 0;
              else
              {
                delta = max - min;
                if (r == max) hsv.h = (g - b) / delta;
                else if (g == max) hsv.h = 2 + (b - r) / delta;
                else hsv.h = 4 + (r - g) / delta;
                hsv.h = parseInt(hsv.h * 60);
                if (hsv.h < 0) hsv.h += 360;
              }
              hsv.s = (hsv.s * 100) | 0;
              hsv.v = (hsv.v * 100) | 0;
              return hsv;
            },
          hsvToRgb:
            function(hsv)
            {
              var rgb = { r: 0, g: 0, b: 0, a: 100 }, h = hsv.h, s = hsv.s, v = hsv.v;
              if (s == 0)
              {
                if (v == 0) rgb.r = rgb.g = rgb.b = 0;
                else rgb.r = rgb.g = rgb.b = (v * 255 / 100) | 0;
              }
              else
              {
                if (h == 360) h = 0;
                h /= 60;
                s = s / 100;
                v = v / 100;
                var i = h | 0,
                    f = h - i,
                    p = v * (1 - s),
                    q = v * (1 - (s * f)),
                    t = v * (1 - (s * (1 - f)));
                switch (i)
                {
                  case 0:
                    rgb.r = v;
                    rgb.g = t;
                    rgb.b = p;
                    break;
                  case 1:
                    rgb.r = q;
                    rgb.g = v;
                    rgb.b = p;
                    break;
                  case 2:
                    rgb.r = p;
                    rgb.g = v;
                    rgb.b = t;
                    break;
                  case 3:
                    rgb.r = p;
                    rgb.g = q;
                    rgb.b = v;
                    break;
                  case 4:
                    rgb.r = t;
                    rgb.g = p;
                    rgb.b = v;
                    break;
                  case 5:
                    rgb.r = v;
                    rgb.g = p;
                    rgb.b = q;
                    break;
                }
                rgb.r = (rgb.r * 255) | 0;
                rgb.g = (rgb.g * 255) | 0;
                rgb.b = (rgb.b * 255) | 0;
              }
              return rgb;
            }
        }
    };
  var Color = $.jPicker.Color, List = $.jPicker.List, ColorMethods = $.jPicker.ColorMethods; // local copies for YUI compressor
  $.fn.jPicker =
    function(options)
    {
      var $arguments = arguments;
      return this.each(
        function()
        {
          var $this = this, settings = $.extend(true, {}, $.fn.jPicker.defaults, options); // local copies for YUI compressor
          if ($($this).get(0).nodeName.toLowerCase() == 'input') // Add color picker icon if binding to an input element and bind the events to the input
          {
            $.extend(true, settings,
              {
                window:
                {
                  bindToInput: true,
                  expandable: true,
                  input: $($this)
                }
              });
            if (ColorMethods.validateHex($($this).val()))
            {
              settings.color.active = new Color({ hex: $($this).val(), a: settings.color.active.val('a') });
              settings.color.current = new Color({ hex: $($this).val(), a: settings.color.active.val('a') });
            }
          }
          if (settings.window.expandable)
            $($this).after('<span class="jPicker"><span class="Icon"><span class="Color">&nbsp;</span><span class="Alpha">&nbsp;</span><span class="Image" title="Click To Open Color Picker">&nbsp;</span><span class="Container">&nbsp;</span></span></span>');
          else settings.window.liveUpdate = false; // Basic control binding for inline use - You will need to override the liveCallback or commitCallback function to retrieve results
          var isLessThanIE7 = parseFloat(navigator.appVersion.split('MSIE')[1]) < 7 && document.body.filters, // needed to run the AlphaImageLoader function for IE6
            container = null,
            colorMapDiv = null,
            colorBarDiv = null,
            colorMapL1 = null, // different layers of colorMap and colorBar
            colorMapL2 = null,
            colorMapL3 = null,
            colorBarL1 = null,
            colorBarL2 = null,
            colorBarL3 = null,
            colorBarL4 = null,
            colorBarL5 = null,
            colorBarL6 = null,
            colorMap = null, // color maps
            colorBar = null,
            colorPicker = null,
            elementStartX = null, // Used to record the starting css positions for dragging the control
            elementStartY = null,
            pageStartX = null, // Used to record the mousedown coordinates for dragging the control
            pageStartY = null,
            activePreview = null, // color boxes above the radio buttons
            currentPreview = null,
            okButton = null,
            cancelButton = null,
            grid = null, // preset colors grid
            iconColor = null, // iconColor for popup icon
            iconAlpha = null, // iconAlpha for popup icon
            iconImage = null, // iconImage popup icon
            moveBar = null, // drag bar
            setColorMode = // set color mode and update visuals for the new color mode
              function(colorMode)
              {
                var active = color.active, // local copies for YUI compressor
                  clientPath = images.clientPath,
                  hex = active.val('hex'),
                  rgbMap,
                  rgbBar;
                settings.color.mode = colorMode;
                switch (colorMode)
                {
                  case 'h':
                    setBG(colorMapDiv, 'transparent');
                    setImgLoc(colorMapL1, 0);
                    setAlpha(colorMapL1, 100);
                    setImgLoc(colorMapL2, 260);
                    setAlpha(colorMapL2, 100);
                    setBG(colorBarDiv, 'transparent');
                    setImgLoc(colorBarL1, 0);
                    setAlpha(colorBarL1, 100);
                    setImgLoc(colorBarL2, 260);
                    setAlpha(colorBarL2, 100);
                    setImgLoc(colorBarL3, 260);
                    setAlpha(colorBarL3, 100);
                    setImgLoc(colorBarL4, 260);
                    setAlpha(colorBarL4, 100);
                    setImgLoc(colorBarL6, 260);
                    setAlpha(colorBarL6, 100);
                    colorMap.range('all', { minX: 0, maxX: 100, minY: 0, maxY: 100 });
                    colorBar.range('rangeY', { minY: 0, maxY: 360 });
                    colorMap.val('xy', { x: active.val('s'), y: 100 - active.val('v') }, colorMap);
                    colorBar.val('y', 360 - active.val('h'), colorBar);
                    break;
                  case 's':
                    setBG(colorMapDiv, 'transparent');
                    setImgLoc(colorMapL1, -260);
                    setImgLoc(colorMapL2, -520);
                    setImgLoc(colorBarL1, -260);
                    setImgLoc(colorBarL2, -520);
                    setImgLoc(colorBarL6, 260);
                    setAlpha(colorBarL6, 100);
                    colorMap.range('all', { minX: 0, maxX: 360, minY: 0, maxY: 100 });
                    colorBar.range('rangeY', { minY: 0, maxY: 100 });
                    colorMap.val('xy', { x: active.val('h'), y: 100 - active.val('v') }, colorMap);
                    colorBar.val('y', 100 - active.val('s'), colorBar);
                    break;
                  case 'v':
                    setBG(colorMapDiv, '000000');
                    setImgLoc(colorMapL1, -780);
                    setImgLoc(colorMapL2, 260);
                    setBG(colorBarDiv, hex);
                    setImgLoc(colorBarL1, -520);
                    setImgLoc(colorBarL2, 260);
                    setAlpha(colorBarL2, 100);
                    setImgLoc(colorBarL6, 260);
                    setAlpha(colorBarL6, 100);
                    colorMap.range('all', { minX: 0, maxX: 360, minY: 0, maxY: 100 });
                    colorBar.range('rangeY', { minY: 0, maxY: 100 });
                    colorMap.val('xy', { x: active.val('h'), y: 100 - active.val('s') }, colorMap);
                    colorBar.val('y', 100 - active.val('v'), colorBar);
                    break;
                  case 'r':
                    rgbMap = -1040;
                    rgbBar = -780;
                    colorMap.range('all', { minX: 0, maxX: 255, minY: 0, maxY: 255 });
                    colorBar.range('rangeY', { minY: 0, maxY: 255 });
                    colorMap.val('xy', { x: active.val('b'), y: 255 - active.val('g') }, colorMap);
                    colorBar.val('y', 255 - active.val('r'), colorBar);
                    break;
                  case 'g':
                    rgbMap = -1560;
                    rgbBar = -1820;
                    colorMap.range('all', { minX: 0, maxX: 255, minY: 0, maxY: 255 });
                    colorBar.range('rangeY', { minY: 0, maxY: 255 });
                    colorMap.val('xy', { x: active.val('b'), y: 255 - active.val('r') }, colorMap);
                    colorBar.val('y', 255 - active.val('g'), colorBar);
                    break;
                  case 'b':
                    rgbMap = -2080;
                    rgbBar = -2860;
                    colorMap.range('all', { minX: 0, maxX: 255, minY: 0, maxY: 255 });
                    colorBar.range('rangeY', { minY: 0, maxY: 255 });
                    colorMap.val('xy', { x: active.val('r'), y: 255 - active.val('g') }, colorMap);
                    colorBar.val('y', 255 - active.val('b'), colorBar);
                    break;
                  case 'a':
                    setBG(colorMapDiv, 'transparent');
                    setImgLoc(colorMapL1, -260);
                    setImgLoc(colorMapL2, -520);
                    setImgLoc(colorBarL1, 260);
                    setImgLoc(colorBarL2, 260);
                    setAlpha(colorBarL2, 100);
                    setImgLoc(colorBarL6, 0);
                    setAlpha(colorBarL6, 100);
                    colorMap.range('all', { minX: 0, maxX: 360, minY: 0, maxY: 100 });
                    colorBar.range('rangeY', { minY: 0, maxY: 100 });
                    colorMap.val('xy', { x: active.val('h'), y: 100 - active.val('v') }, colorMap);
                    colorBar.val('y', 100 - active.val('a'), colorBar);
                    break;
                  default:
                    throw ('Invalid Mode');
                    break;
                }
                switch (colorMode)
                {
                  case 'h':
                    break;
                  case 's':
                  case 'v':
                  case 'a':
                    setAlpha(colorMapL1, 100);
                    setAlpha(colorBarL1, 100);
                    setImgLoc(colorBarL3, 260);
                    setAlpha(colorBarL3, 100);
                    setImgLoc(colorBarL4, 260);
                    setAlpha(colorBarL4, 100);
                    break;
                  case 'r':
                  case 'g':
                  case 'b':
                    setBG(colorMapDiv, 'transparent');
                    setBG(colorBarDiv, 'transparent');
                    setAlpha(colorBarL1, 100);
                    setAlpha(colorMapL1, 100);
                    setImgLoc(colorMapL1, rgbMap);
                    setImgLoc(colorMapL2, rgbMap - 260);
                    setImgLoc(colorBarL1, rgbBar - 780);
                    setImgLoc(colorBarL2, rgbBar - 520);
                    setImgLoc(colorBarL3, rgbBar);
                    setImgLoc(colorBarL4, rgbBar - 260);
                    setImgLoc(colorBarL6, 260);
                    setAlpha(colorBarL6, 100);
                    break;
                }
                activeColorChanged(active);
              },
            activeColorChanged = // Update color when user changes text values
              function(ui, context)
              {
                if (!colorPicker || !colorMap || !colorBar) return;
                if (context == null || (context != colorBar && context != colorMap)) positionMapAndBarArrows(ui, context);
                updatePreview(ui);
                updateMapVisuals(ui);
                updateBarVisuals(ui);
              },
            mapValueChanged = // user has dragged the ColorMap pointer
              function(ui, context)
              {
                if (!colorPicker || !colorMap || !colorBar) return;
                var active = color.active;
                if (context != colorMap && active.val() == null) return;
                switch (settings.color.mode)
                {
                  case 'h':
                    active.val('sv', { s: ui.val('x'), v: 100 - ui.val('y') }, context);
                    break;
                  case 's':
                  case 'a':
                    active.val('hv', { h: ui.val('x'), v: 100 - ui.val('y') }, context);
                    break;
                  case 'v':
                    active.val('hs', { h: ui.val('x'), s: 100 - ui.val('y') }, context);
                    break;
                  case 'r':
                    active.val('gb', { g: 255 - ui.val('y'), b: ui.val('x') }, context);
                    break;
                  case 'g':
                    active.val('rb', { r: 255 - ui.val('y'), b: ui.val('x') }, context);
                    break;
                  case 'b':
                    active.val('rg', { r: ui.val('x'), g: 255 - ui.val('y') }, context);
                    break;
                }
              },
            colorBarValueChanged = // user has dragged the ColorBar slider
              function(ui, context)
              {
                if (!colorPicker || !colorMap || !colorBar) return;
                var active = color.active;
                if (context != colorBar && active.val() == null) return;
                switch (settings.color.mode)
                {
                  case 'h':
                    active.val('h', { h: 360 - ui.val('y') }, context);
                    break;
                  case 's':
                    active.val('s', { s: 100 - ui.val('y') }, context);
                    break;
                  case 'v':
                    active.val('v', { v: 100 - ui.val('y') }, context);
                    break;
                  case 'r':
                    active.val('r', { r: 255 - ui.val('y') }, context);
                    break;
                  case 'g':
                    active.val('g', { g: 255 - ui.val('y') }, context);
                    break;
                  case 'b':
                    active.val('b', { b: 255 - ui.val('y') }, context);
                    break;
                  case 'a':
                    active.val('a', 100 - ui.val('y'), context);
                    break;
                }
              },
            positionMapAndBarArrows = // position map and bar arrows to match current color
              function(ui, context)
              {
                if (context != colorMap)
                {
                  switch (settings.color.mode)
                  {
                    case 'h':
                      colorMap.val('xy', { x: ui.val('s') != null ? ui.val('s') : 100, y: 100 - (ui.val('v') != null ? ui.val('v') : 100) }, context);
                      break;
                    case 's':
                      colorMap.val('xy', { x: ui.val('h') || 0, y: 100 - (ui.val('v') != null ? ui.val('v') : 100) }, context);
                      break;
                    case 'v':
                      colorMap.val('xy', { x: ui.val('h') || 0, y: 100 - (ui.val('s') != null ? ui.val('s') : 100) }, context);
                      break;
                    case 'r':
                      colorMap.val('xy', { x: ui.val('b') || 0, y: 255 - (ui.val('g') || 0) }, context);
                      break;
                    case 'g':
                      colorMap.val('xy', { x: ui.val('b') || 0, y: 255 - (ui.val('r') || 0) }, context);
                      break;
                    case 'b':
                      colorMap.val('xy', { x: ui.val('r') || 0, y: 255 - (ui.val('g') || 0) }, context);
                      break;
                    case 'a':
                      colorMap.val('xy', { x: ui.val('h') || 0, y: 100 - (ui.val('v') || 0) }, context);
                      mapY = 100 - (ui.val('v') || 0);
                      break;
                  }
                }
                if (context != colorBar)
                {
                  switch (settings.color.mode)
                  {
                    case 'h':
                      colorBar.val('y', 360 - (ui.val('h') || 0), context);
                      break;
                    case 's':
                      colorBar.val('y', 100 - (ui.val('s') != null ? ui.val('s') : 100), context);
                      break;
                    case 'v':
                      colorBar.val('y', 100 - (ui.val('v') != null ? ui.val('v') : 100), context);
                      break;
                    case 'r':
                      colorBar.val('y', 255 - (ui.val('r') || 0), context);
                      break;
                    case 'g':
                      colorBar.val('y', 255 - (ui.val('g') || 0), context);
                      break;
                    case 'b':
                      colorBar.val('y', 255 - (ui.val('b') || 0), context);
                      break;
                    case 'a':
                      colorBar.val('y', 100 - (ui.val('a') != null ? ui.val('a') : 100), context);
                      break;
                  }
                }
              },
            updatePreview =
              function(ui)
              {
                try
                {
                  var hex = ui.val('hex');
                  activePreview.css({ backgroundColor: hex && '#' + hex || 'transparent' });
                  setAlpha(activePreview, ui.val('a') != null ? ui.val('a') : 0);
                }
                catch (e) { }
              },
            updateMapVisuals =
              function(ui)
              {
                switch (settings.color.mode)
                {
                  case 'h':
                    setBG(colorMapDiv, new Color({ h: ui.val('h') || 0, s: 100, v: 100 }).val('hex'));
                    break;
                  case 's':
                  case 'a':
                    setAlpha(colorMapL2, 100 - (ui.val('s') != null ? ui.val('s') : 100));
                    break;
                  case 'v':
                    setAlpha(colorMapL1, ui.val('v') != null ? ui.val('v') : 100);
                    break;
                  case 'r':
                    setAlpha(colorMapL2, (ui.val('r') || 0) / 255 * 100);
                    break;
                  case 'g':
                    setAlpha(colorMapL2, (ui.val('g') || 0) / 255 * 100);
                    break;
                  case 'b':
                    setAlpha(colorMapL2, (ui.val('b') || 0) / 255 * 100);
                    break;
                }
                setAlpha(colorMapL3, 100 - (ui.val('a') != null ? ui.val('a') : 0));
              },
            updateBarVisuals =
              function(ui)
              {
                switch (settings.color.mode)
                {
                  case 'h':
                    setAlpha(colorBarL5, 100 - (ui.val('a') != null ? ui.val('a') : 0));
                    break;
                  case 's':
                    var saturatedColor = new Color({ h: ui.val('h') || 0, s: 100, v: ui.val('v') != null ? ui.val('v') : 100 });
                    setBG(colorBarDiv, saturatedColor.val('hex'));
                    setAlpha(colorBarL2, 100 - (ui.val('v') != null ? ui.val('v') : 100));
                    setAlpha(colorBarL5, 100 - (ui.val('a') != null ? ui.val('a') : 0));
                    break;
                  case 'v':
                    var valueColor = new Color({ h: ui.val('h') || 0, s: ui.val('s') != null ? ui.val('s') : 100, v: 100 });
                    setBG(colorBarDiv, valueColor.val('hex'));
                    setAlpha(colorBarL5, 100 - (ui.val('a') != null ? ui.val('a') : 0));
                    break;
                  case 'r':
                  case 'g':
                  case 'b':
                    var hValue = 0, vValue = 0;
                    if (settings.color.mode == 'r')
                    {
                      hValue = ui.val('b') || 0;
                      vValue = ui.val('g') || 0;
                    }
                    else if (settings.color.mode == 'g')
                    {
                      hValue = ui.val('b') || 0;
                      vValue = ui.val('r') || 0;
                    }
                    else if (settings.color.mode == 'b')
                    {
                      hValue = ui.val('r') || 0;
                      vValue = ui.val('g') || 0;
                    }
                    var middle = vValue > hValue ? hValue : vValue;
                    setAlpha(colorBarL2, hValue > vValue ? ((hValue - vValue) / (255 - vValue)) * 100 : 0);
                    setAlpha(colorBarL3, vValue > hValue ? ((vValue - hValue) / (255 - hValue)) * 100 : 0);
                    setAlpha(colorBarL4, middle / 255 * 100);
                    setAlpha(colorBarL5, 100 - (ui.val('a') != null ? ui.val('a') : 0));
                    break;
                  case 'a':
                    setBG(colorBarDiv, ui.val('hex') || '000000');
                    setAlpha(colorBarL5, ui.val('a') != null ? 0 : 100);
                    setAlpha(colorBarL6, ui.val('a') != null ? 100 : 0);
                    break;
                }
              },
            setBG =
              function(el, c)
              {
                el.css({ backgroundColor: c && '#' + c || 'transparent' });
              },
            setImg =
              function(img, src)
              {
                if (isLessThanIE7 && (src.indexOf('AlphaBar.png') != -1 || src.indexOf('Bars.png') != -1 || src.indexOf('Maps.png') != -1))
                {
                  img.attr('pngSrc', src);
                  img.css({ backgroundImage: 'none', filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\', sizingMethod=\'scale\')' });
                }
                else img.css({ backgroundImage: 'url(' + src + ')' });
              },
            setImgLoc =
              function(img, y)
              {
                img.css({ top: y + 'px' });
              },
            setAlpha =
              function(obj, alpha)
              {
                obj.css({ visibility: alpha > 0 ? 'visible' : 'hidden' });
                if (alpha > 0 && alpha < 100)
                {
                  if (isLessThanIE7)
                  {
                    var src = obj.attr('pngSrc');
                    if (src != null && (src.indexOf('AlphaBar.png') != -1 || src.indexOf('Bars.png') != -1 || src.indexOf('Maps.png') != -1))
                      obj.css({ filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\', sizingMethod=\'scale\') progid:DXImageTransform.Microsoft.Alpha(opacity=' + alpha + ')' });
                    else obj.css({ opacity: alpha / 100 });
                  }
                  else obj.css({ opacity: alpha / 100 });
                }
                else if (alpha == 0 || alpha == 100)
                {
                  if (isLessThanIE7)
                  {
                    var src = obj.attr('pngSrc');
                    if (src != null && (src.indexOf('AlphaBar.png') != -1 || src.indexOf('Bars.png') != -1 || src.indexOf('Maps.png') != -1))
                      obj.css({ filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\', sizingMethod=\'scale\')' });
                    else obj.css({ opacity: '' });
                  }
                  else obj.css({ opacity: '' });
                }
              },
            revertColor = // revert color to original color when opened
              function()
              {
                color.active.val('ahex', color.current.val('ahex'));
              },
            commitColor = // commit the color changes
              function()
              {
                color.current.val('ahex', color.active.val('ahex'));
              },
            radioClicked =
              function(e)
              {
                setColorMode(e.target.value);
              },
            currentClicked =
              function()
              {
                revertColor();
              },
            cancelClicked =
              function()
              {
                revertColor();
                window.expandable && hide();
                $.isFunction(cancelCallback) && cancelCallback(color.active, cancelButton);
              },
            okClicked =
              function()
              {
                commitColor();
                window.expandable && hide();
                $.isFunction(commitCallback) && commitCallback(color.active, okButton);
              },
            iconImageClicked =
              function()
              {
                show();
              },
            currentColorChanged =
              function(ui, context)
              {
                var hex = ui.val('hex');
                currentPreview.css({ backgroundColor: hex && '#' + hex || 'transparent' });
                setAlpha(currentPreview, ui.val('a'));
              },
            expandableColorChanged =
              function(ui, context)
              {
                var hex = ui.val('hex');
                iconColor.css({ backgroundColor: hex && '#' + hex || 'transparent' });
                setAlpha(iconAlpha, 100 - ui.val('a'));
                if (window.bindToInput)
                  window.input.css(
                    {
                      backgroundColor: hex && '#' + hex || 'transparent',
                      color: ui.val('v') > 75 ? '#000000' : '#ffffff'
                    });
              },
            moveBarMouseDown =
              function(e)
              {
                var element = window.element, // local copies for YUI compressor
                  page = window.page;
                elementStartX = parseInt(container.css('left'));
                elementStartY = parseInt(container.css('top'));
                pageStartX = e.pageX;
                pageStartY = e.pageY;
                // bind events to document to move window - we will unbind these on mouseup
                $(document).bind('mousemove', documentMouseMove).bind('mouseup', documentMouseUp);
                e.stopPropagation();
                e.preventDefault(); // prevent attempted dragging of the column
                return false;
              },
            documentMouseMove =
              function(e)
              {
                container.css({ left: elementStartX - (pageStartX - e.pageX) + 'px', top: elementStartY - (pageStartY - e.pageY) + 'px' });
                e.stopPropagation();
                e.preventDefault();
                return false;
              },
            documentMouseUp =
              function(e)
              {
                $(document).unbind('mousemove', documentMouseMove).unbind('mouseup', documentMouseUp);
                e.stopPropagation();
                e.preventDefault();
                return false;
              },
            quickPickClicked =
              function(e)
              {
                e.preventDefault();
                e.stopPropagation();
                color.active.val('ahex', $(this).attr('title') || null, e.target);
                return false;
              },
            commitCallback = $.isFunction($arguments[1]) && $arguments[1] || null,
            liveCallback = $.isFunction($arguments[2]) && $arguments[2] || null,
            cancelCallback = $.isFunction($arguments[3]) && $arguments[3] || null,
            show =
              function()
              {
                if (document.all) // In IE, due to calculated z-index values, we need to hide all color picker icons that appear later in the source code than this one
                {
                  var foundthis = false;
                  for (i = 0; i < List.length; i++)
                  {
                    if (foundthis) List[i].icon.css({ display: 'none' });
                    if (List[i] == $this) foundthis = true;
                  }
                }
                color.current.val('ahex', color.active.val('ahex'));
                container.css({ display: 'block' });
              },
            hide =
              function()
              {
                if (document.all) // In IE, show the previously hidden color picker icons again
                {
                  var foundthis = false;
                  for (i = 0; i < List.length; i++)
                  {
                    if (foundthis) List[i].icon.css({ display: 'inline-block' });
                    if (List[i] == $this) foundthis = true;
                  }
                }
                container.css({ display: 'none' });
              },
            destroy =
              function()
              {
                container.find('td.Radio input').unbind('click', radioClicked);
                currentPreview.unbind('click', currentClicked);
                cancelButton.unbind('click', cancelClicked);
                okButton.unbind('click', okClicked);
                if (window.expandable)
                {
                  iconImage.unbind('click', iconImageClicked);
                  moveBar.unbind('mousedown', moveBarMouseDown);
                  $this.icon = null;
                }
                container.find('.QuickColor').unbind('click', quickPickClicked);
                colorMapDiv = null;
                colorBarDiv = null;
                colorMapL1 = null;
                colorMapL2 = null;
                colorMapL3 = null;
                colorBarL1 = null;
                colorBarL2 = null;
                colorBarL3 = null;
                colorBarL4 = null;
                colorBarL5 = null;
                colorBarL6 = null;
                colorMap.destroy();
                colorMap = null;
                colorBar.destroy();
                colorBar = null;
                colorPicker.destroy();
                colorPicker = null;
                activePreview = null;
                currentPreview = null;
                okButton = null;
                cancelButton = null;
                grid = null;
                commitCallback = null;
                cancelCallback = null;
                liveCallback = null;
                container.html('');
                for (i = 0; i < List.length; i++) if (List[i] == $this) List.splice(i, 1);
              },
            images = settings.images, // local copies for YUI compressor
            window = settings.window,
            localization = settings.localization,
            color =
              {
                active: (typeof(settings.color.active)).toString().toLowerCase() == 'string' ? new Color({ ahex: settings.color.active }) : new Color({ ahex: settings.color.active.val('ahex') }),
                current: (typeof(settings.color.active)).toString().toLowerCase() == 'string' ? new Color({ ahex: settings.color.active }) : new Color({ ahex: settings.color.active.val('ahex') }),
                quickList: settings.color.quickList
              };
          $.extend(true, $this, // public properties, methods, and callbacks
            {
              commitCallback: commitCallback, // commitCallback function can be overridden to return the selected color to a method you specify when the user clicks "OK"
              liveCallback: liveCallback, // liveCallback function can be overridden to return the selected color to a method you specify in live mode (continuous update)
              cancelCallback: cancelCallback, // cancelCallback function can be overridden to a method you specify when the user clicks "Cancel"
              color: color,
              show: show,
              hide: hide,
              destroy: destroy // destroys this control entirely, removing all events and objects, and removing itself from the List
            });
          container = window.expandable ? $($this).next().find('.Container').eq(0) : $($this);
          if (window.expandable)
            container.css( // positions must be set and display set to absolute before source code injection or IE will size the container to fit the window
              {
                left: window.position.x == 'left' ? '-526px' : window.position.x == 'center' ? '-259px' : window.position.x == 'right' ? '0px' : window.position.x == 'screenCenter' ?
                  (($(document).width() >> 1) - 259) - $($this).next().offset().left + 'px' : window.position.x,
                position: 'absolute',
                top: window.position.y == 'top' ? '-350px' : window.position.y == 'center' ? '-158px' : window.position.y == 'bottom' ? '25px' : window.position.y
              });
          // if default colors are hex strings, change them to color objects
          if ((typeof (color.active)).toString().toLowerCase() == 'string') color.active = new Color({ ahex: color.active });
          // inject html source code - we are using a single table for this control - I know tables are considered bad, but it takes care of equal height columns and
          // this control really is tabular data, so I believe it is the right move
          container.html('<table class="jPicker" cellpadding="0" cellspacing="0"><tbody>' + (window.expandable ? '<tr><td class="Move" colspan="6">&nbsp;</td></tr>' : '') + '<tr><td rowspan="9"><h2 class="Title">' + (window.title || localization.text.title) + '</h2><div class="Map"><span class="Map1">&nbsp;</span><span class="Map2">&nbsp;</span><span class="Map3">&nbsp;</span><img src="' + images.clientPath + images.colorMap.arrow.file + '" class="Arrow"/></div></td><td rowspan="9"><div class="Bar"><span class="Map1">&nbsp;</span><span class="Map2">&nbsp;</span><span class="Map3">&nbsp;</span><span class="Map4">&nbsp;</span><span class="Map5">&nbsp;</span><span class="Map6">&nbsp;</span><img src="' + images.clientPath + images.colorBar.arrow.file + '" class="Arrow"/></div></td><td colspan="3" class="Preview">' + localization.text.newColor + '<div><span class="Active" title="' + localization.tooltips.colors.newColor + '">&nbsp;</span><span class="Current" title="' + localization.tooltips.colors.currentColor + '">&nbsp;</span></div>' + localization.text.currentColor + '</td><td rowspan="9" class="Button"><input type="button" class="Ok" value="' + localization.text.ok + '" title="' + localization.tooltips.buttons.ok + '"/><input type="button" class="Cancel" value="' + localization.text.cancel + '" title="' + localization.tooltips.buttons.cancel + '"/><hr/><div class="Grid">&nbsp;</div></td></tr><tr class="Hue"><td class="Radio"><input type="radio" id="jPicker_Hue_' + List.length + '" name="jPicker_Mode_' + List.length + '" value="h" title="' + localization.tooltips.hue.radio + '"' + (settings.color.mode == 'h' ? ' checked="checked"' : '') + '/></td><td class="Label"><label for="jPicker_Hue_' + List.length + '" title="' + localization.tooltips.hue.radio + '">H:</label></td><td class="Text"><input type="text" maxlength="3" value="' + color.active.val('h') + '" title="' + localization.tooltips.hue.textbox + '"/>&nbsp;&deg;</td></tr><tr class="Saturation"><td class="Radio"><input type="radio" id="jPicker_Saturation_' + List.length + '" name="jPicker_Mode_' + List.length + '" value="s" title="' + localization.tooltips.saturation.radio + '"' + (settings.color.mode == 's' ? ' checked="checked"' : '') + '/></td><td class="Label"><label for="jPicker_Saturation_' + List.length + '" title="' + localization.tooltips.saturation.radio + '">S:</label></td><td class="Text"><input type="text" maxlength="3" value="' + color.active.val('s') + '" title="' + localization.tooltips.saturation.textbox + '"/>&nbsp;%</td></tr><tr class="Value"><td class="Radio"><input type="radio" id="jPicker_Value_' + List.length + '" name="jPicker_Mode_' + List.length + '" value="v" title="' + localization.tooltips.value.radio + '"' + (settings.color.mode == 'v' ? ' checked="checked"' : '') + '/><br/><br/></td><td class="Label"><label for="jPicker_Value_' + List.length + '" title="' + localization.tooltips.value.radio + '">V:</label><br/><br/></td><td class="Text"><input type="text" maxlength="3" value="' + color.active.val('v') + '" title="' + localization.tooltips.value.textbox + '"/>&nbsp;%<br/><br/></td></tr><tr class="Red"><td class="Radio"><input type="radio" id="jPicker_Red_' + List.length + '" name="jPicker_Mode_' + List.length + '" value="r" title="' + localization.tooltips.red.radio + '"' + (settings.color.mode == 'r' ? ' checked="checked"' : '') + '/></td><td class="Label"><label for="jPicker_Red_' + List.length + '" title="' + localization.tooltips.red.radio + '">R:</label></td><td class="Text"><input type="text" maxlength="3" value="' + color.active.val('r') + '" title="' + localization.tooltips.red.textbox + '"/></td></tr><tr class="Green"><td class="Radio"><input type="radio" id="jPicker_Green_' + List.length + '" name="jPicker_Mode_'+List.length+'" value="g" title="' + localization.tooltips.green.radio + '"' + (settings.color.mode == 'g' ? ' checked="checked"' : '') + '/></td><td class="Label"><label for="jPicker_Green_' + List.length + '" title="' + localization.tooltips.green.radio + '">G:</label></td><td class="Text"><input type="text" maxlength="3" value="' + color.active.val('g') + '" title="' + localization.tooltips.green.textbox + '"/></td></tr><tr class="Blue"><td class="Radio"><input type="radio" id="jPicker_Blue_' + List.length + '" name="jPicker_Mode_' + List.length + '" value="b" title="' + localization.tooltips.blue.radio + '"' + (settings.color.mode == 'b' ? ' checked="checked"' : '') + '/></td><td class="Label"><label for="jPicker_Blue_' + List.length + '" title="' + localization.tooltips.blue.radio + '">B:</label></td><td class="Text"><input type="text" maxlength="3" value="' + color.active.val('b') + '" title="' + localization.tooltips.blue.textbox + '"/></td></tr><tr class="Alpha"><td class="Radio">' + (window.alphaSupport ? '<input type="radio" id="jPicker_Alpha_' + List.length + '" name="jPicker_Mode_' + List.length + '" value="a" title="' + localization.tooltips.alpha.radio + '"' + (settings.color.mode == 'a' ? ' checked="checked"' : '') + '/>' : '&nbsp;') + '</td><td class="Label">' + (window.alphaSupport ? '<label for="jPicker_Alpha_' + List.length + '" title="' + localization.tooltips.alpha.radio + '">A:</label>' : '&nbsp;') + '</td><td class="Text">' + (window.alphaSupport ? '<input type="text" maxlength="3" value="' + color.active.val('a') + '" title="' + localization.tooltips.alpha.textbox + '"/>&nbsp;%' : '&nbsp;') + '</td></tr><tr class="Hex"><td colspan="3" class="Text"><label for="jPicker_Hex_' + List.length + '" title="' + localization.tooltips.hex.textbox + '">#:</label><input type="text" maxlength="6" class="Hex" id="jPicker_Hex_' + List.length+'" value="' + color.active.val('hex') + '" title="' + localization.tooltips.hex.textbox + '"/>' + (window.alphaSupport ? '<input type="text" maxlength="2" class="AHex" value="' + color.active.val('ahex').substring(6) + '" title="' + localization.tooltips.hex.alpha + '"/></td>' : '&nbsp;') + '</tr></tbody></table>');
          // initialize the objects to the source code just injected
          colorMapDiv = container.find('.Map').eq(0);
          colorBarDiv = container.find('.Bar').eq(0);
          colorMapL1 = colorMapDiv.find('.Map1').eq(0);
          colorMapL2 = colorMapDiv.find('.Map2').eq(0);
          colorMapL3 = colorMapDiv.find('.Map3').eq(0);
          colorBarL1 = colorBarDiv.find('.Map1').eq(0);
          colorBarL2 = colorBarDiv.find('.Map2').eq(0);
          colorBarL3 = colorBarDiv.find('.Map3').eq(0);
          colorBarL4 = colorBarDiv.find('.Map4').eq(0);
          colorBarL5 = colorBarDiv.find('.Map5').eq(0);
          colorBarL6 = colorBarDiv.find('.Map6').eq(0);
          // create color pickers and maps
          colorMap = new Slider(colorMapDiv,
            {
              map:
              {
                width: images.colorMap.width,
                height: images.colorMap.height
              },
              arrow:
              {
                image: images.clientPath + images.colorMap.arrow.file,
                width: images.colorMap.arrow.width,
                height: images.colorMap.arrow.height
              }
            });
          colorMap.bind(mapValueChanged);
          colorBar = new Slider(colorBarDiv,
            {
              map:
              {
                width: images.colorBar.width,
                height: images.colorBar.height
              },
              arrow:
              {
                image: images.clientPath + images.colorBar.arrow.file,
                width: images.colorBar.arrow.width,
                height: images.colorBar.arrow.height
              }
            });
          colorBar.bind(colorBarValueChanged);
          colorPicker = new ColorValuePicker(container, color.active, window.expandable && window.bindToInput ? window.input : null);
          var hex = color.active.val('hex');
          activePreview = container.find('.Preview .Active').eq(0).css({ backgroundColor: hex && '#' + hex || 'transparent' });
          currentPreview = container.find('.Preview .Current').eq(0).css({ backgroundColor: hex && '#' + hex || 'transparent' }).bind('click', currentClicked);
          okButton = container.find('.Button .Ok').eq(0).bind('click', okClicked);
          cancelButton = container.find('.Button .Cancel').eq(0).bind('click', cancelClicked);
          grid = container.find('.Button .Grid').eq(0);
          setImg(colorMapL1, images.clientPath + 'Maps.png');
          setImg(colorMapL2, images.clientPath + 'Maps.png');
          setImg(colorMapL3, images.clientPath + 'map-opacity.png');
          setImg(colorBarL1, images.clientPath + 'Bars.png');
          setImg(colorBarL2, images.clientPath + 'Bars.png');
          setImg(colorBarL3, images.clientPath + 'Bars.png');
          setImg(colorBarL4, images.clientPath + 'Bars.png');
          setImg(colorBarL5, images.clientPath + 'bar-opacity.png');
          setImg(colorBarL6, images.clientPath + 'AlphaBar.png');
          setImg(container.find('.Preview div').eq(0), images.clientPath + 'preview-opacity.png');
          container.find('td.Radio input').bind('click', radioClicked);
          // initialize quick list
          if (color.quickList && color.quickList.length > 0)
          {
            grid.html('');
            for (i = 0; i < color.quickList.length; i++)
            {
              /* if default colors are hex strings, change them to color objects */
              if ((typeof (color.quickList[i])).toString().toLowerCase() == 'string') color.quickList[i] = new Color({ hex: color.quickList[i] });
              var rgba = color.quickList[i].val('ahex');
              grid.append('<span class="QuickColor" title="' + (rgba && '#' + rgba || '') + '">&nbsp;</span>');
              var quickHex = color.quickList[i].val('hex');
              container.find('.QuickColor').eq(i).css({ backgroundColor: quickHex && '#' + quickHex || 'transparent', backgroundImage: quickHex && 'none' || 'url(' + images.clientPath + 'NoColor.png)' }).click(quickPickClicked);
            }
          }
          setColorMode(settings.color.mode);
          color.active.bind(activeColorChanged);
          $.isFunction(liveCallback) && color.active.bind(liveCallback);
          color.current.bind(currentColorChanged);
          // bind to input
          if (window.expandable)
          {
            $this.icon = container.parents('.Icon').eq(0);
            iconColor = $this.icon.find('.Color').eq(0).css({ backgroundColor: hex && '#' + hex || 'transparent' });
            iconAlpha = $this.icon.find('.Alpha').eq(0);
            setImg(iconAlpha, images.clientPath + 'bar-opacity.png');
            setAlpha(iconAlpha, 100 - color.active.val('a'));
            iconImage = $this.icon.find('.Image').eq(0).css(
              {
                backgroundImage: 'url(' + images.clientPath + images.picker.file + ')'
              }).bind('click', iconImageClicked);
            if (window.bindToInput)
              window.input.css(
                {
                  backgroundColor: hex && '#' + hex || 'transparent',
                  color: color.active.val('v') > 75 ? '#000000' : '#ffffff'
                });
            moveBar = container.find('.Move').eq(0).bind('mousedown', moveBarMouseDown);
            color.active.bind(expandableColorChanged);
          }
          else show();
          List.push(this);
        });
    };
  $.fn.jPicker.defaults = /* jPicker defaults - you can change anything in this section (such as the clientPath to your images) without fear of breaking the program */
      {
      window:
        {
          title: null, /* any title for the jPicker window itself - displays "Drag Markers To Pick A Color" if left null */
          position:
          {
            x: 'screenCenter', /* acceptable values "left", "center", "right", "screenCenter", or relative px value */
            y: 'top' /* acceptable values "top", "bottom", "center", or relative px value */
          },
          expandable: false, /* default to large static picker - set to true to make an expandable picker (small icon with popup) - set automatically when binded to input element */
          liveUpdate: true, /* set false if you want the user to have to click "OK" before the binded input box updates values */
          alphaSupport: false /* set to true to enable alpha picking */
        },
      color:
        {
          mode: 'h', /* acceptabled values "h" (hue), "s" (saturation), "v" (value), "r" (red), "g" (green), "b" (blue), "a" (alpha) */
          active: new Color({ ahex: '#ffcc00ff' }), /* acceptable values are any declared $.jPicker.Color object or string HEX value (e.g. #ffc000) WITH OR WITHOUT the "#" prefix */
          quickList: /* the quick pick color list */
            [
              new Color({ h: 360, s: 33, v: 100 }), /* acceptable values are any declared $.jPicker.Color object or string HEX value (e.g. #ffc000) WITH OR WITHOUT the "#" prefix */
              new Color({ h: 360, s: 66, v: 100 }),
              new Color({ h: 360, s: 100, v: 100 }),
              new Color({ h: 360, s: 100, v: 75 }),
              new Color({ h: 360, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 100 }),
              new Color({ h: 30, s: 33, v: 100 }),
              new Color({ h: 30, s: 66, v: 100 }),
              new Color({ h: 30, s: 100, v: 100 }),
              new Color({ h: 30, s: 100, v: 75 }),
              new Color({ h: 30, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 90 }),
              new Color({ h: 60, s: 33, v: 100 }),
              new Color({ h: 60, s: 66, v: 100 }),
              new Color({ h: 60, s: 100, v: 100 }),
              new Color({ h: 60, s: 100, v: 75 }),
              new Color({ h: 60, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 80 }),
              new Color({ h: 90, s: 33, v: 100 }),
              new Color({ h: 90, s: 66, v: 100 }),
              new Color({ h: 90, s: 100, v: 100 }),
              new Color({ h: 90, s: 100, v: 75 }),
              new Color({ h: 90, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 70 }),
              new Color({ h: 120, s: 33, v: 100 }),
              new Color({ h: 120, s: 66, v: 100 }),
              new Color({ h: 120, s: 100, v: 100 }),
              new Color({ h: 120, s: 100, v: 75 }),
              new Color({ h: 120, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 60 }),
              new Color({ h: 150, s: 33, v: 100 }),
              new Color({ h: 150, s: 66, v: 100 }),
              new Color({ h: 150, s: 100, v: 100 }),
              new Color({ h: 150, s: 100, v: 75 }),
              new Color({ h: 150, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 50 }),
              new Color({ h: 180, s: 33, v: 100 }),
              new Color({ h: 180, s: 66, v: 100 }),
              new Color({ h: 180, s: 100, v: 100 }),
              new Color({ h: 180, s: 100, v: 75 }),
              new Color({ h: 180, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 40 }),
              new Color({ h: 210, s: 33, v: 100 }),
              new Color({ h: 210, s: 66, v: 100 }),
              new Color({ h: 210, s: 100, v: 100 }),
              new Color({ h: 210, s: 100, v: 75 }),
              new Color({ h: 210, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 30 }),
              new Color({ h: 240, s: 33, v: 100 }),
              new Color({ h: 240, s: 66, v: 100 }),
              new Color({ h: 240, s: 100, v: 100 }),
              new Color({ h: 240, s: 100, v: 75 }),
              new Color({ h: 240, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 20 }),
              new Color({ h: 270, s: 33, v: 100 }),
              new Color({ h: 270, s: 66, v: 100 }),
              new Color({ h: 270, s: 100, v: 100 }),
              new Color({ h: 270, s: 100, v: 75 }),
              new Color({ h: 270, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 10 }),
              new Color({ h: 300, s: 33, v: 100 }),
              new Color({ h: 300, s: 66, v: 100 }),
              new Color({ h: 300, s: 100, v: 100 }),
              new Color({ h: 300, s: 100, v: 75 }),
              new Color({ h: 300, s: 100, v: 50 }),
              new Color({ h: 180, s: 0, v: 0 }),
              new Color({ h: 330, s: 33, v: 100 }),
              new Color({ h: 330, s: 66, v: 100 }),
              new Color({ h: 330, s: 100, v: 100 }),
              new Color({ h: 330, s: 100, v: 75 }),
              new Color({ h: 330, s: 100, v: 50 }),
              new Color()
            ]
        },
      images:
        {
          clientPath: '/jPicker/images/', /* Path to image files */
          colorMap:
          {
            width: 256,
            height: 256,
            arrow:
            {
              file: 'mappoint.gif', /* ColorMap arrow icon */
              width: 15,
              height: 15
            }
          },
          colorBar:
          {
            width: 20,
            height: 256,
            arrow:
            {
              file: 'rangearrows.gif', /* ColorBar arrow icon */
              width: 20,
              height: 7
            }
          },
          picker:
          {
            file: 'picker.gif', /* Color Picker icon */
            width: 25,
            height: 24
          }
        },
      localization:
        {
          text:
          {
            title: 'Drag Markers To Pick A Color',
            newColor: 'new',
            currentColor: 'current',
            ok: 'OK',
            cancel: 'Cancel'
          },
          tooltips:
          {
            colors:
            {
              newColor: 'New Color - Press &ldquo;OK&rdquo; To Commit',
              currentColor: 'Click To Revert To Original Color'
            },
            buttons:
            {
              ok: 'Commit To This Color Selection',
              cancel: 'Cancel And Revert To Original Color'
            },
            hue:
            {
              radio: 'Set To &ldquo;Hue&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Hue&rdquo; Value (0-360&deg;)'
            },
            saturation:
            {
              radio: 'Set To &ldquo;Saturation&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Saturation&rdquo; Value (0-100%)'
            },
            value:
            {
              radio: 'Set To &ldquo;Value&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Value&rdquo; Value (0-100%)'
            },
            red:
            {
              radio: 'Set To &ldquo;Red&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Red&rdquo; Value (0-255)'
            },
            green:
            {
              radio: 'Set To &ldquo;Green&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Green&rdquo; Value (0-255)'
            },
            blue:
            {
              radio: 'Set To &ldquo;Blue&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Blue&rdquo; Value (0-255)'
            },
            alpha:
            {
              radio: 'Set To &ldquo;Alpha&rdquo; Color Mode',
              textbox: 'Enter A &ldquo;Alpha&rdquo; Value (0-100)'
            },
            hex:
            {
              textbox: 'Enter A &ldquo;Hex&rdquo; Color Value (#000000-#ffffff)',
              alpha: 'Enter A &ldquo;Alpha&rdquo; Value (#00-#ff)'
            }
          }
        }
    };
})(jQuery, '1.1.0');
