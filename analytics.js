(function () {
  'use strict';

  var CFG = window.BORASTONE_ANALYTICS || {};
  var CONSENT_KEY = 'borastone_analytics_consent';
  var loaded = false;

  function log() {
    if (!CFG.debug) return;
    console.log.apply(console, ['[BORASTONE Analytics]'].concat(Array.prototype.slice.call(arguments)));
  }

  function hasConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY) === 'granted';
    } catch (_) {
      return false;
    }
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (_) {}
  }

  function loadScript(src, callback) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    s.onload = callback || null;
    document.head.appendChild(s);
  }

  function initGtag() {
    if (loaded || !CFG.ga4Id) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.ga4Id), function () {
      gtag('js', new Date());
      gtag('config', CFG.ga4Id, {
        anonymize_ip: true,
        send_page_view: true
      });
      log('GA4 geladen:', CFG.ga4Id);
    });
  }

  function initMetaPixel() {
    if (!CFG.metaPixelId || window.fbq) return;

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', CFG.metaPixelId);
    fbq('track', 'PageView');
    log('Meta Pixel geladen:', CFG.metaPixelId);
  }

  function trackEvent(name, params) {
    if (!hasConsent()) return;

    if (window.gtag) {
      gtag('event', name, params || {});
    }

    if (CFG.googleAdsConversion && name === 'generate_lead') {
      gtag('event', 'conversion', { send_to: CFG.googleAdsConversion });
    }

    if (window.fbq) {
      if (name === 'generate_lead') fbq('track', 'Lead', params || {});
      if (name === 'contact') fbq('track', 'Contact', params || {});
    }

    log('Event:', name, params || {});
  }

  function trackInquiry(extra) {
    var page = (extra && extra.page) || window.location.pathname.replace(/^\//, '') || 'index.html';
    trackEvent('generate_lead', {
      event_category: 'Anfrage',
      event_label: page,
      page_location: window.location.href,
      value: (extra && extra.value) || 1
    });
  }

  function trackPhoneClick() {
    trackEvent('contact', {
      event_category: 'Telefon',
      event_label: window.location.pathname,
      method: 'phone'
    });
  }

  function grantConsent() {
    saveConsent('granted');
    hideBanner();
    initGtag();
    initMetaPixel();
  }

  function denyConsent() {
    saveConsent('denied');
    hideBanner();
  }

  function hideBanner() {
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.hidden = true;
  }

  function showBanner() {
    if (!CFG.cookieBanner) return;
    if (hasConsent() || localStorage.getItem(CONSENT_KEY) === 'denied') return;

    var banner = document.getElementById('cookieBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'cookieBanner';
      banner.className = 'cookie-banner';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-label', 'Cookie-Einstellungen');
      banner.innerHTML =
        '<div class="cookie-banner__inner">' +
          '<p class="cookie-banner__text">' +
            'Wir nutzen Cookies für Statistik und Werbung (Google Analytics), um unsere Angebote zu verbessern. ' +
            'Details in der <a href="datenschutz.html">Datenschutzerklärung</a>.' +
          '</p>' +
          '<div class="cookie-banner__actions">' +
            '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-consent="accept">Akzeptieren</button>' +
            '<button type="button" class="cookie-banner__btn cookie-banner__btn--decline" data-consent="decline">Ablehnen</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(banner);

      banner.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-consent]');
        if (!btn) return;
        if (btn.getAttribute('data-consent') === 'accept') grantConsent();
        else denyConsent();
      });
    }

    banner.hidden = false;
  }

  function hookFormspreeTracking() {
    var originalFetch = window.fetch;
    if (!originalFetch || originalFetch.__borastonePatched) return;

    window.fetch = function () {
      var args = arguments;
      var url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url) || '';

      return originalFetch.apply(this, args).then(function (res) {
        if (url.indexOf('formspree.io') !== -1 && res.ok) {
          trackInquiry({ page: window.location.pathname });
        }
        return res;
      });
    };
    window.fetch.__borastonePatched = true;
  }

  function hookPhoneTracking() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="tel:"]');
      if (link) trackPhoneClick();
    });
  }

  window.BorastoneAnalytics = {
    trackEvent: trackEvent,
    trackInquiry: trackInquiry,
    trackPhoneClick: trackPhoneClick,
    grantConsent: grantConsent,
    denyConsent: denyConsent
  };

  document.addEventListener('DOMContentLoaded', function () {
    hookFormspreeTracking();
    hookPhoneTracking();

    if (hasConsent()) {
      initGtag();
      initMetaPixel();
    } else if (CFG.cookieBanner) {
      showBanner();
    } else if (CFG.ga4Id) {
      initGtag();
      initMetaPixel();
    }
  });
})();
