/**
 * BORASTONE Analytics – Konfiguration
 *
 * 1. GA4: analytics.google.com → Admin → Datenstreams → Mess-ID (G-XXXXXXXX)
 * 2. Google Ads: tools.google.com → Conversions → Website → Tag-ID (AW-XXXXXXXXX/YYYYYYYYYY)
 * 3. Meta Pixel (optional): business.facebook.com → Events Manager → Pixel-ID
 */
window.BORASTONE_ANALYTICS = {
  /** GA4 Measurement ID – leer lassen bis eingerichtet */
  ga4Id: 'G-G7QM0XWBT7',

  /** Google Ads Conversion Label – Format: AW-123456789/AbCdEfGhIj */
  googleAdsConversion: '',

  /** Meta Pixel ID (optional, nur wenn Instagram/Facebook Ads laufen) */
  metaPixelId: '',

  /** Cookie-Banner aktivieren (DSGVO) */
  cookieBanner: true,

  /** Debug-Ausgaben in der Browser-Konsole */
  debug: false
};
