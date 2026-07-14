/* ============================================================
   ADMIN LOGIN — client-side demo gate only.
   NOTE: This check runs in the browser, so it is NOT secure
   for a real production admin panel — anyone can view the
   source and read the credentials. For a real site, replace
   this with a server-side login (PHP session, database-backed
   auth, hashed passwords, etc). This is a front-end portfolio
   demo of the "hidden admin page" concept only.
   ============================================================ */
(function(){
  "use strict";

  const ADMIN_USER = "gopi";
  const ADMIN_PASS = "12345";

  const form = document.getElementById('adminForm');
  const errorBox = document.getElementById('loginError');

  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value;

    if(user === ADMIN_USER && pass === ADMIN_PASS){
      sessionStorage.setItem('gp-admin-auth', 'true');
      window.location.href = 'admin-dashboard.html';
    } else {
      errorBox.classList.add('show');
      form.querySelector('input[type="password"]').value = '';
    }
  });
})();
