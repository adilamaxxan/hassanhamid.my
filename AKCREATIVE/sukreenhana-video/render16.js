const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + __dirname + '/video-16x9.html'); await p.waitForFunction(() => window.ready);
  const FPS = 30, N = 15 * FPS;
  for (let i = 0; i < N; i++) {
    await p.evaluate(t => render(t), i / FPS);
    await p.screenshot({ path: `frames16/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
  }
  await b.close();
  console.log('frames', N);
})();
