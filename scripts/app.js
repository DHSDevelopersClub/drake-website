// Removed for dev

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {
    console.log('[SW] Registered');
  }).catch(function(error) {
    console.log(`[SW] Registration failed: ${error}`);
  });
};