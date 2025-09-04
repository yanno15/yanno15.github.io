document.addEventListener('DOMContentLoaded', function () {
    
    // --- Gestion de l'écran de chargement ---
    (function () {
      // Élément qui couvre l'écran (ou fallback sur #loader)
      const loaderWrapper = document.getElementById('loader-wrapper');
      const loaderInner = document.getElementById('loader');
      const loaderEl = loaderWrapper || loaderInner;
      if (!loaderEl) return;

      const MIN_WAIT = 1500; // durée minimale en ms (1.5s). Modifie si besoin.

      function getNavigationStart() {
        if (performance.timing && performance.timing.navigationStart) return performance.timing.navigationStart;
        if (performance.timeOrigin) return performance.timeOrigin;
        // fallback raisonnable
        return Date.now() - performance.now();
      }

      function hideLoaderWithMinimum() {
        const start = getNavigationStart();
        const timePassed = Date.now() - start;
        const remaining = Math.max(0, MIN_WAIT - timePassed);
        console.log('[loader] timePassed=', Math.round(timePassed), 'ms remaining=', Math.round(remaining), 'ms');

        setTimeout(() => {
          loaderEl.classList.add('hidden');
          // on enlève du DOM après la transition pour éviter d'avoir l'overlay invisible mais présent
          setTimeout(() => {
            if (loaderEl.parentNode) loaderEl.parentNode.removeChild(loaderEl);
          }, 700); // > transition duration (0.5s) pour être sûr
        }, remaining);
      }

      // Si la page est déjà complètement chargée (script exécuté après load)
      if (document.readyState === 'complete') {
        hideLoaderWithMinimum();
      } else {
        // attendre le load (styles, images, etc.)
        window.addEventListener('load', hideLoaderWithMinimum);
      }
    })();


    // --- Gestion du Menu Mobile ---
    const hamburgerButton = document.getElementById('hamburger');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMenu() {
        mobileMenuContainer.classList.remove('hidden');
        mobileMenuContainer.classList.remove('animate__fadeOutUp');
        mobileMenuContainer.classList.add('animate__fadeInDown');
    }

    function closeMenu() {
        mobileMenuContainer.classList.add('animate__fadeOutUp');
        mobileMenuContainer.classList.remove('animate__fadeInDown');
        setTimeout(() => {
            mobileMenuContainer.classList.add('hidden');
        }, 500); // Durée de l'animation
    }

    hamburgerButton.addEventListener('click', openMenu);
    closeMobileMenuButton.addEventListener('click', closeMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    mobileMenuContainer.addEventListener('click', (event) => {
        if (event.target === mobileMenuContainer) {
            closeMenu();
        }
    });


    // --- Gestion du Carousel ---
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".carousel-item");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (carousel && slides.length > 0 && prevBtn && nextBtn) {
        let index = 0;
        function showSlide(i) {
            index = (i + slides.length) % slides.length;
            carousel.style.transform = `translateX(-${index * 100}%)`;
        }
        prevBtn.addEventListener("click", () => showSlide(index - 1));
        nextBtn.addEventListener("click", () => showSlide(index + 1));
    }


    // --- Gestion du curseur personnalisé ---
    let cursor = document.getElementById("custom-cursor");
    if (!cursor) {
        cursor = document.createElement("div");
        cursor.id = "custom-cursor";
        cursor.style.position = "fixed";
        cursor.style.pointerEvents = "none";
        cursor.style.width = "24px";
        cursor.style.height = "24px";
        cursor.style.borderRadius = "50%";
        cursor.style.background = "rgba(74,44,42,0.2)";
        cursor.style.border = "3px solid #d9625b";
        cursor.style.zIndex = "9999";
        cursor.style.transition = "transform 0.1s ease, top 0.1s ease, left 0.1s ease";
        document.body.appendChild(cursor);
    }

    document.addEventListener("mousemove", function (e) {
        cursor.style.left = e.clientX - 12 + "px";
        cursor.style.top = e.clientY - 12 + "px";
    });
});
