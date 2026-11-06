document.addEventListener('DOMContentLoaded', function () {

    var header = document.getElementById('site-header');
    var navToggle = document.getElementById('nav-toggle');
    var mainNav = document.getElementById('main-nav');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('main section[id]');

    /* ----------------------------------------------------------------------
       Header: scroll edilince gölge ekle
       ---------------------------------------------------------------------- */
    function handleHeaderScroll() {
        if (window.scrollY > 10) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    /* ----------------------------------------------------------------------
       Mobil menü: hamburger ile aç/kapat
       ---------------------------------------------------------------------- */
    function closeMobileMenu() {
        navToggle.classList.remove('is-open');
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    function toggleMobileMenu() {
        var isOpen = navToggle.classList.toggle('is-open');
        mainNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    navToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ----------------------------------------------------------------------
       Aktif nav linki: görünür bölüme göre işaretle
       ---------------------------------------------------------------------- */
    var sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                var id = entry.target.getAttribute('id');

                navLinks.forEach(function (link) {
                    var isActive = link.getAttribute('href') === '#' + id;
                    link.classList.toggle('is-active', isActive);
                });
            });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    /* ----------------------------------------------------------------------
       Scroll reveal: bölümler görünüme girince belir
       ---------------------------------------------------------------------- */
    var revealItems = document.querySelectorAll('.reveal');

    var revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });

});
