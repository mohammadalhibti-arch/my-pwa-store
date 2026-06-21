// تسجيل Service Worker
export function register(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('✅ Service Worker مسجل بنجاح:', registration.scope);
          
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('🔄 تحديث جديد متاح');
                  } else {
                    console.log('📦 التطبيق جاهز للعمل بدون إنترنت');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.log('❌ فشل تسجيل Service Worker:', error);
        });
    });
  }
}

export function unregister(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}