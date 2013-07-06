/* ========================================================================== *\
    The snippet below is intended to be pasted into a bookmark's URL field.
    Clicking on the bookmark should execute the JavaScript file located at
    the URL specified on line 9.
\* ========================================================================== */
javascript:(function(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = ''; // Add your URL
    document.getElementsByTagName('head')[0].appendChild(script);
})();
