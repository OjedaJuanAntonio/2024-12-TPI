(function() {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === 'touchstart' || type === 'touchmove' || type === 'mousewheel') {
        if (typeof options === 'object') {
          options.passive = true;
        } else {
          options = { passive: true };
        }
      }
      originalAddEventListener.call(this, type, listener, options);
    };
  })();
