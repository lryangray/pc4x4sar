(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.warn('[site-init] Service worker registration failed', error)
      })
    })
  }

  console.log(
    "%c\n    . .\n   {   }\n   {   }\n  /{   }\\\\\n ( /   \\\\ )\n  |  o  |\n  |  _  |\n   \\\\   /\n    | |\n   /| |\\\\\n  (_| |_)\n",
    'color:#ff6b35;font-family:monospace;font-size:12px'
  )
  console.log(
    '%cYou found Bigfoot! %cPC4x4SAR — 100% Volunteer, 100% Free, 24/7/365',
    'color:#ff6b35;font-weight:bold;font-size:14px',
    'color:#9fb3c8;font-size:12px'
  )
})()
