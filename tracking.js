(function(){
  window.dataLayer = window.dataLayer || [];

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a[data-section]').forEach(function(link){
      link.addEventListener('click', function(e){
        e.preventDefault();
        var sectionName = this.getAttribute('data-section') || this.textContent.trim();
        var targetId = this.getAttribute('href').replace('#','');
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.dataLayer.push({
          event: 'nav_click',
          section_name: sectionName
        });
      });
    });

    var milestones = [25,50,75,100];
    var fired = new Set();
    function getScrollPercent() {
      var docEl = document.documentElement;
      var body = document.body;
      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop || 0;
      var scrollHeight = Math.max(body.scrollHeight, docEl.scrollHeight, body.offsetHeight, docEl.offsetHeight);
      var winHeight = window.innerHeight || docEl.clientHeight;
      var denom = (scrollHeight - winHeight);
      if (denom <= 0) return 100;
      var pct = Math.round( (scrollTop / denom) * 100 );
      return Math.min(100, Math.max(0, pct));
    }

    var throttleTimer = null;
    function onScroll() {
      if (throttleTimer) return;
      throttleTimer = setTimeout(function(){
        throttleTimer = null;
        var percent = getScrollPercent();
        milestones.forEach(function(m){
          if (!fired.has(m) && percent >= m) {
            fired.add(m);
            window.dataLayer.push({
              event: 'scroll_depth',
              scroll_percent: m
            });
          }
        });
      }, 150);
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
  });
})();
