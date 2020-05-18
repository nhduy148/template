"use strict";

(function () {
  'use strict';

  // Convert 
  if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]" 
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 79
  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Edge (based on chromium) detection
  var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;


  var spacedScript = {

    // Main init function
    init: function init() {
      this.events();
    },
    // Events
    events: function events() {
      var self = this; // Run on document ready

      document.addEventListener("DOMContentLoaded", function () {
        let abc = selector(".abc");
        let abc2 = selector("#abc");
        const a1 = selector("#a1");
        const $ = fn;

        $.event(abc, "click", function (e, current) {
          const _this = selector(current);
          $.hide(_this)
        });
        $.event(abc2, "click", function (e, current) {
          const _this = selector(current);
          $.append( $.parent(_this), '<div style="font-size: 20px" id="two">two</div>', 'beforeend');
          // $.toggleClass(_this, "123");
          
          $.fadeIn(abc, 10000)
          // setTimeout(() => {
          //   $.fadeIn(abc, 1000)
          // }, 1200);
        })

        $.event(a1, "click", function (e, current) {
          const _this = selector(current);
          // console.log(_this.closest("#closest").innerHTML);
        })
      });

      // Run on Window Load
      window.onload = function () { };
    },

    scrollToTop: function () {
      const button = selector("#scroll-top");
      const distance = 800;
      button.hide();
      window.onscroll = function () {
        if (window.pageYOffset > distance) button.fadeIn();
        else button.hide();
      }
    }
  };

  const selector = function (el) {
    const isHTMLCollection = HTMLElement.prototype.isPrototypeOf(el);
    return isHTMLCollection ? [el] : Array.prototype.slice.call(document.querySelectorAll(el));
  };

  var fn = {
    addClass: function (selector, className) {
      selector.forEach(function (element) {
        element.classList.add(className);
      })
    },
    removeClass: function (selector, className) {
      selector.forEach(function (element) {
        element.classList.remove(className);
      })
    },
    toggleClass: function (selector, className) {
      selector.forEach(function (element) {
        element.classList.toggle(className);
      })
    },
    hasClass: function (selector, className) {
      selector.forEach(function () {
        element.classList.contains(className);
      })
    },
    hide: function (selector) {
      selector.forEach(function (element) {
        element.style.display = "none";
      })
    },
    show: function (selector) {
      selector.forEach(function (element) {
        element.style.display = "";
      })
    },
    fadeIn: function (selector, timeout) {
      function render(currTime) {
        var opacity = (currTime / timeout);
        selector.forEach(function (element) {
          element.style.opacity = opacity;
        })
      }
      var startTime = -1.0;
      function eachFrame() {
        if(startTime<0) {
          startTime = (new Date()).getTime();
          render(0.0);
        } else {
          render( (new Date()).getTime() - startTime );
        }    
        window.requestAnimationFrame(eachFrame);        
      };
      window.requestAnimationFrame(eachFrame);
    },
    fadeOut: function (selector, timeout) {
      var startTime = -1.0;

      function render(currTime) {
        var opacity = (timeout * currTime);

        selector.forEach(function (element) {
          element.style.opacity = opacity;
        })
      }

      function eachFrame() {
        var timeRunning = (new Date()).getTime() + startTime;

        if (startTime < 0) {
          startTime = (new Date()).getTime();
          render(0.0);
        } else if (timeRunning <= timeout) {
          render(timeRunning);
        } else {
          return;
        }
        window.requestAnimationFrame(eachFrame);
      };
      window.requestAnimationFrame(eachFrame);
    },
    next: function (selector) {
      return [selector[0].nextElementSibling]
    },
    prev: function (selector) {
      return [selector[0].prevElementSibling]
    },
    parent: function (selector) {      
      return [selector[0].parentNode]
    },
    append(selector, html, position = "beforeend") {
      selector.forEach(function (element) {
        return element.insertAdjacentHTML(position, html);
      })
    },
    event: function (selector, event, callback) {
      selector.forEach(function (element) {
        element.addEventListener(event, function (e) {
          const current = e.currentTarget;
          return callback(e, current)
        });
      })
    }
  }

  // Start things up
  spacedScript.events();
})();


// window.addEventListener("DOMContentLoaded", function() {
//   // get url from sessionStorage
//   const url = sessionStorage.getItem("url");
//   // get url from sessionStorage
//   const position = sessionStorage.getItem("position");

//   // get current url
//   const currentURL = window.location.href;

//   // compare current url and url on sessionStorage
//   if(url === currentURL) {
//     // scroll to the position that was saved before.
//     window.scrollTo({
//       left: 0,
//       top: position
//     })
//   }

//   // get button by ID
//   const button = document.getElementById("button");

//   // click function
//   button.onclick = function(e) {
//     e.preventDefault();

//     // get current URL
//     const currentURL = window.location.href;
//     // get current position
//     const currentPosition = window.pageYOffset;
//     // set current URL to sessionStorage
//     sessionStorage.setItem("url", currentURL);
//     // set current position to sessionStorage
//     sessionStorage.setItem("position", currentPosition);

//     // Write what you want to do here before reloading the page.
//     //  ....
//     // Write what you want to do here before reloading the page.

//     // Reload page
//     window.location.href = currentURL;
//   }
// })