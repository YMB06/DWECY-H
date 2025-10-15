

    (function(){
      const btn = document.getElementById('menuBtn');
      const sidenav = document.getElementById('sidenav');
      function toggleNav(){
        const open = sidenav.classList.toggle('open');
        sidenav.setAttribute('aria-hidden', String(!open));
      }
      btn && btn.addEventListener('click', toggleNav);
      document.addEventListener('keydown', e => { if(e.key === 'Escape') sidenav.classList.remove('open'); });
      sidenav.addEventListener('click', e => { if(e.target.tagName === 'A') sidenav.classList.remove('open'); });
    })();