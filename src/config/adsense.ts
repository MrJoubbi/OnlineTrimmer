/**
 * Google AdSense Configuration
 *
 * Replace CA_PUB_ID with your actual publisher ID once your AdSense account is approved:
 * e.g. 'ca-pub-1234567890123456'
 */

export const ADSENSE_CONFIG = {
  // Your Google AdSense Publisher ID (replace with your real publisher ID)
  publisherId: 'ca-pub-XXXXXXXXXXXXXXXX',

  // Master switch to enable live Google ad calls
  // When false or in development/preview, renders compliant placeholder units
  isEnabled: false,

  // Dedicated Ad Slot IDs (generated from your AdSense dashboard)
  slots: {
    toolFooterBanner: '1234567890', // Responsive Leaderboard below tool workspace
    articleMidBanner: '2345678901', // In-article responsive banner
    sidebarRectangle: '3456789012', // 300x250 or responsive unit
  },
};
