/**********************************************************************\
  This script creates a preview of the current page as it would look on 
  a screen that is 1024 pixels wide. Here is how it works:

  1. Create a "faux screen" container that is 1024 pixels wide.
  2. Transfer the original <html> and <body> styles to the faux screen.
  3. Copy the <body> innerHTML into the faux screen container.
  4. Delete the old <body> innerHTML.
  5. Append our faux screen container to the empty <body> element.

  Here is a simplified abstraction of the concept:

  Before:

      <body style="ABC">                   <!-- body.width = 1920px -->
          <p>Hello World!</p>              <!--    p.width = 1920px -->
      </body>


  After:

      <body>                               <!-- body.width = 1920px -->
          <div style="width:1024px; ABC">  <!--  div.width = 1024px -->
              <p>Hello World!</p>          <!--    p.width = 1024px -->
          </div>
      </body>

\**********************************************************************/

(function() {

var deviceWidth  = 1024;
var deviceHeight = 768;
var deviceFrame  = 36;
var deviceInner  = 4;
var deviceRadius = 32;
var spaceFromTop = 48;

// Get the original <html> and <body> elements.
var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByTagName('body')[0];

// Get their CSS properties.
// TODO: add IE compatibility
// TODO: are their any other CSS properties we should transfer?
var htmlBg  = window.getComputedStyle(html).getPropertyCSSValue('background').cssText;
var bodyBg  = window.getComputedStyle(body).getPropertyCSSValue('background').cssText;
var bodyMar = window.getComputedStyle(body).getPropertyCSSValue('margin').cssText;
var bodyPad = window.getComputedStyle(body).getPropertyCSSValue('padding').cssText;

// Create monitor and "faux" <html> and <body> elements.
var monitor  = document.createElement('div');
var fauxHTML = document.createElement('div');
var fauxBody = document.createElement('div');
var fauxFix  = document.createElement('div');

monitor.id  = 'monitor';
fauxHTML.id = 'fauxHTML';
fauxBody.id = 'fauxBody';
fauxFix.id  = 'fauxFixed';

monitor.style.width            = (deviceWidth + (deviceFrame * 2)) + 'px';
monitor.style.height           = (deviceHeight + (deviceFrame * 2)) + 'px';
monitor.style.margin           = '0 auto 0 auto';
monitor.style.padding          = '0 0 0 0';
monitor.style.position         = 'relative';
monitor.style.top              = spaceFromTop + 'px';
monitor.style.background       = 'rgba(0, 0, 0, 1) none repeat scroll 0% 0%';
monitor.style.borderRadius     = deviceRadius + 'px';
monitor.style.boxShadow        = '0 0 20px #333';

fauxHTML.style.width           = deviceWidth + 'px';
fauxHTML.style.height          = deviceHeight + 'px';
fauxHTML.style.margin          = '0 auto 0 auto';
fauxHTML.style.padding         = '0 0 0 0';
fauxHTML.style.overflowY       = 'auto';
fauxHTML.style.position        = 'relative';
fauxHTML.style.top             = '32px';
fauxHTML.style.background      = htmlBg;
fauxHTML.style.borderRadius    = deviceInner + 'px';
fauxHTML.style.border          = deviceInner + 'px #333 solid';

fauxBody.style.width           = '100%';
fauxBody.style.height          = 'auto';
fauxBody.style.margin          = bodyMar;
fauxBody.style.padding         = bodyPad;
fauxBody.style.position        = 'absolute';
fauxBody.style.top             = '0';
fauxBody.style.background      = bodyBg;

fauxFix.style.height           = deviceHeight + 'px';
fauxFix.style.margin           = '0 0 0 0';
fauxFix.style.padding          = '0 0 0 0';
fauxFix.style.overflow         = 'hidden';
fauxFix.style.position         = 'fixed';
fauxFix.style.top              = (spaceFromTop + deviceFrame) + 'px';

// Put the faux "fixed positioning reference" node in the faux <html> node.
fauxHTML.appendChild(fauxFix);

// Put the faux <body> node in the faux <html> node.
fauxHTML.appendChild(fauxBody);

// Put the faux <html> node in the monitor node.
monitor.appendChild(fauxHTML);

// Copy the original <body> content into the faux <body>.
fauxBody.innerHTML = body.innerHTML;

// Delete the original <body> content...
body.innerHTML = '';

// ...and replace it with the copy that we wrapped with our faux <html> and <body>.
body.appendChild(monitor);

html.style.margin     = '0 0 0 0';
html.style.padding    = '0 0 0 0';
html.style.position   = 'relative';
html.style.background = 'rgba(255, 255, 255, 1) none repeat scroll 0% 0%';

body.style.width      = '100%';
body.style.height     = '100%';
body.style.margin     = '0 0 0 0';
body.style.padding    = '0 0 0 0';
body.style.position   = 'absolute';
body.style.top        = '0';
body.style.left       = '0';
body.style.background = 'rgba(204, 204, 204, 1) none repeat scroll 0% 0%';

var fixedElements = document.getElementsByTagName('*');
var fauxFixedElement;
for (i = 0, max = fixedElements.length; i < max; i++) {
	if ((window.getComputedStyle(fixedElements[i]).getPropertyCSSValue('position').cssText == 'fixed') && (fixedElements[i].id != 'fauxFixed')) {
		fauxFixedElement = fixedElements[i].cloneNode(true);
		fauxFixedElement.style.position = 'absolute';
		fixedElements[i].parentNode.removeChild(fixedElements[i]);
		fauxFix.appendChild(fauxFixedElement);
	}
}

fauxFix.style.width = fauxBody.offsetWidth + 'px';

})();
