export function buildStyles() {
  return `
          :host {
            --awc-font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            display: block; width: 100%; position: relative; background: transparent !important; min-height: 200px; font-family: var(--awc-font-family); letter-spacing: -0.015em; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
          }
          #card-root { position: relative; width: 100%; height: 100%; container-type: size; z-index: var(--awc-stack-order, 1); overflow: hidden; background: transparent; display: block; transform: translateZ(0); will-change: transform, opacity; opacity: 0; }
          #card-root.clickable { cursor: pointer; }
          #card-root.clickable:active { transform: scale(0.98); transition: scale 0.3s ease-in-out; }
          #card-root.standalone { border-radius: var(--awc-card-border-radius, var(--ha-card-border-radius, 12px)); }
          #card-root.revealed { opacity: 1; }
          #card-root.full-width { margin: 0px calc(var(--ha-view-sections-narrow-column-gap, var(--ha-card-margin, 8px)) * -1) !important; padding: 0px var(--ha-view-sections-narrow-column-gap, var(--ha-card-margin, 8px)) !important; }
          #card-root.no-mask-v canvas { --mask-v: linear-gradient(#000, #000); }
          #card-root.no-mask-h canvas { --mask-h: linear-gradient(#000, #000); }
          #card-root.standalone canvas,
          #card-root.no-mask canvas { -webkit-mask-image: none !important; mask-image: none !important; }
          #card-root.standalone { box-shadow: var(--ha-card-box-shadow, 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)); background-color: transparent; overflow: hidden; background-size: 100% 100%; border-width: var(--awc-card-border-width, var(--ha-card-border-width, 0px)); border-style: solid; border-color: var(--ha-card-border-color, var(--divider-color, #e0e0e0)); box-sizing: border-box; }
          #card-root.standalone.scheme-day { --bg-hl: 255,248,228; --bg-a1: 0.38; --bg-a2: 0.05; --bg-s2: 18%; --bg-s3: 42%; --bg-c1: #164FA6; --bg-c2: #4480C8; --bg-c3: #8CB9DD; --bg-hz: 255,222,172; --bg-hz-a: 0.10; background-image:
                          radial-gradient(ellipse 160% 42% at 50% -18%, rgba(var(--bg-hl), var(--bg-a1)) 0%, rgba(var(--bg-hl), 0) 80%),
                          linear-gradient(0deg, rgba(var(--bg-hz, 255,200,150), var(--bg-hz-a, 0)) 0%, transparent 30%),
                          radial-gradient(circle farthest-corner at var(--c-x, 65%) var(--c-y, 35%), var(--bg-c3) 10%, var(--bg-c2) 75%, var(--bg-c1) 100%); }
          #card-root.standalone.scheme-day.weather-exceptional { --bg-hl:255,244,210; --bg-a1:0.48; --bg-a2:0.08; --bg-c1:#0D4194; --bg-c2:#3470BD; --bg-c3:#7CB0DC; --bg-hz:255,228,162; --bg-hz-a:0.16; }
          #card-root.standalone.scheme-day.weather-partly { --bg-hl:250,248,236; --bg-a1:0.36; --bg-a2:0.05; --bg-s2:20%; --bg-s3:45%; --bg-c1:#1955A7; --bg-c2:#4683C8; --bg-c3:#90B8DD; --bg-hz:255,226,182; --bg-hz-a:0.08; }
          #card-root.standalone.scheme-day.weather-overcast { --bg-hl:248,248,244; --bg-a1:0.35; --bg-a2:0.05; --bg-s2:22%; --bg-s3:48%; --bg-c1:#2560A0; --bg-c2:#5088BD; --bg-c3:#9FBEDB; --bg-hz:248,228,196; --bg-hz-a:0.07; }
          #card-root.standalone.scheme-day.weather-rainy { --bg-hl:225,240,245; --bg-a1:0.35; --bg-a2:0.05; --bg-s2:20%; --bg-s3:45%; --bg-c1:#426A93; --bg-c2:#658FBA; --bg-c3:#B3D6E1; --bg-hz:190,210,225; --bg-hz-a:0.10; }
          #card-root.standalone.scheme-day.weather-pouring { --bg-hl:210,225,235; --bg-a1:0.32; --bg-a2:0.05; --bg-s2:20%; --bg-s3:45%; --bg-c1:#325478; --bg-c2:#527A9E; --bg-c3:#92B8C6; --bg-hz:170,190,210; --bg-hz-a:0.08; }
          #card-root.standalone.scheme-day.weather-storm { --bg-hl:212,224,238; --bg-a1:0.30; --bg-a2:0.05; --bg-s2:22%; --bg-s3:48%; --bg-c1:#3D5A82; --bg-c2:#587DA6; --bg-c3:#95C7CC; --bg-hz:175,190,212; --bg-hz-a:0.07; }
          #card-root.standalone.scheme-day.weather-snow { --bg-hl:234,240,252; --bg-a1:0.36; --bg-a2:0.06; --bg-s2:20%; --bg-s3:45%; --bg-c1:#4887AB; --bg-c2:#77A4C1; --bg-c3:#ABC4D4; --bg-hz:226,234,250; --bg-hz-a:0.10; }
          #card-root.standalone.scheme-day.weather-fog { --bg-hl:235,240,245; --bg-a1:0.38; --bg-a2:0.05; --bg-s2:20%; --bg-s3:45%; --bg-c1:#3C5E78; --bg-c2:#5F84A0; --bg-c3:#A3BDCD; --bg-hz:205,215,225; --bg-hz-a:0.15; }
          #card-root.standalone.scheme-night { --bg-hl: 155,185,252; --bg-a1: 0.14; --bg-a2: 0.04; --bg-s2: 40%; --bg-s3: 70%; --bg-c1: #000000; --bg-c2: #050E1A; --bg-c3: #122438; background-image:
                          radial-gradient(ellipse 160% 42% at 50% -18%, rgba(var(--bg-hl), var(--bg-a1)) 0%, rgba(var(--bg-hl), 0) 80%),
                          linear-gradient(0deg, rgba(var(--bg-hz, 155,168,200), var(--bg-hz-a, 0)) 0%, transparent 30%),
                          radial-gradient(circle farthest-corner at var(--c-x, 35%) var(--c-y, 25%), var(--bg-c3) 0%, var(--bg-c2) 75%, var(--bg-c1) 100%); }
          #card-root.standalone.scheme-night.weather-exceptional { --bg-a1:0.17; --bg-a2:0.05; --bg-c1:#000000; --bg-c2:#050E1A; --bg-c3:#10223A; }
          #card-root.standalone.scheme-night.weather-partly { --bg-a1:0.12; --bg-a2:0.03; --bg-s2:45%; --bg-s3:75%; --bg-c1:#010204; --bg-c2:#091420; --bg-c3:#182A3E; }
          #card-root.standalone.scheme-night.weather-overcast { --bg-hl:135,155,188; --bg-a1:0.10; --bg-a2:0.02; --bg-s2:50%; --bg-s3:80%; --bg-c1:#020304; --bg-c2:#0C1016; --bg-c3:#1A2028; }
          #card-root.standalone.scheme-night.weather-rainy { --bg-hl:130,145,168; --bg-a1:0.11; --bg-a2:0.03; --bg-s2:45%; --bg-s3:75%; --bg-c1:#020406; --bg-c2:#0C141C; --bg-c3:#1A2630; }
          #card-root.standalone.scheme-night.weather-pouring { --bg-hl:112,132,162; --bg-a1:0.09; --bg-a2:0.02; --bg-s2:45%; --bg-s3:75%; --bg-c1:#010203; --bg-c2:#060C14; --bg-c3:#0E1822; }
          #card-root.standalone.scheme-night.weather-storm { --bg-hl:95,108,148; --bg-a1:0.07; --bg-a2:0.02; --bg-s2:45%; --bg-s3:75%; --bg-c1:#000000; --bg-c2:#030508; --bg-c3:#0A1018; }
          #card-root.standalone.scheme-night.weather-snow { --bg-hl:175,198,232; --bg-a1:0.14; --bg-a2:0.04; --bg-s2:45%; --bg-s3:75%; --bg-c1:#030508; --bg-c2:#0E1822; --bg-c3:#1E2C3A; }
          #card-root.standalone.scheme-night.weather-fog { --bg-hl:145,155,178; --bg-a1:0.14; --bg-a2:0.04; --bg-s2:50%; --bg-s3:85%; --bg-c1:#040506; --bg-c2:#101216; --bg-c3:#1E2228; }
          #card-root.standalone.scheme-night.time-day { --bg-hl: 148,184,242; --bg-a1: 0.22; --bg-a2: 0.06; --bg-s2: 20%; --bg-s3: 48%; --bg-c1: #0A1C42; --bg-c2: #1A3268; --bg-c3: #2E5090; --bg-hz: 130,160,215; --bg-hz-a: 0.05; background-image:
                              radial-gradient(ellipse 160% 42% at 50% -18%, rgba(var(--bg-hl), var(--bg-a1)) 0%, rgba(var(--bg-hl), 0) 80%),
                              linear-gradient(0deg, rgba(var(--bg-hz, 140,160,210), var(--bg-hz-a, 0)) 0%, transparent 30%),
                              radial-gradient(circle farthest-corner at var(--c-x, 65%) var(--c-y, 35%), var(--bg-c3) 0%, var(--bg-c2) 75%, var(--bg-c1) 100%); }
          #card-root.standalone.scheme-night.time-day.weather-exceptional { --bg-hl:141,175,230; --bg-a1:0.22; --bg-a2:0.06; --bg-s2:20%; --bg-s3:48%; --bg-c1:#091A3F; --bg-c2:#182F63; --bg-c3:#2B4C89; --bg-hz:124,152,205; --bg-hz-a:0.05; }
          #card-root.standalone.scheme-night.time-day.weather-partly { --bg-hl:150,184,240; --bg-a1:0.20; --bg-a2:0.06; --bg-s2:22%; --bg-s3:50%; --bg-c1:#0C2048; --bg-c2:#1C386A; --bg-c3:#305692; --bg-hz:128,158,214; --bg-hz-a:0.04; }
          #card-root.standalone.scheme-night.time-day.weather-overcast { --bg-hl:148,172,210; --bg-a1:0.18; --bg-a2:0.05; --bg-s2:22%; --bg-s3:50%; --bg-c1:#0B1D40; --bg-c2:#19325A; --bg-c3:#2B4B7C; --bg-hz-a:0; }
          #card-root.standalone.scheme-night.time-day.weather-rainy { --bg-hl:130,160,185; --bg-a1:0.17; --bg-a2:0.05; --bg-s2:24%; --bg-s3:55%; --bg-c1:#081C28; --bg-c2:#16344A; --bg-c3:#285270; --bg-hz-a:0; }
          #card-root.standalone.scheme-night.time-day.weather-pouring { --bg-hl:110,135,165; --bg-a1:0.15; --bg-a2:0.04; --bg-s2:24%; --bg-s3:55%; --bg-c1:#061822; --bg-c2:#122E40; --bg-c3:#224C66; --bg-hz-a:0; }
          #card-root.standalone.scheme-night.time-day.weather-storm { --bg-hl:130,138,185; --bg-a1:0.17; --bg-a2:0.05; --bg-s2:22%; --bg-s3:52%; --bg-c1:#0C1028; --bg-c2:#1A1E48; --bg-c3:#42506E; --bg-hz:105,112,160; --bg-hz-a:0.04; }
          #card-root.standalone.scheme-night.time-day.weather-snow { --bg-hl:165,195,235; --bg-a1:0.22; --bg-a2:0.06; --bg-s2:20%; --bg-s3:48%; --bg-c1:#0C1C38; --bg-c2:#1E3656; --bg-c3:#405C82; --bg-hz:140,160,208; --bg-hz-a:0.06; }
          #card-root.standalone.scheme-night.time-day.weather-fog { --bg-hl:140,142,170; --bg-a1:0.18; --bg-a2:0.05; --bg-s2:28%; --bg-s3:60%; --bg-c1:#14162A; --bg-c2:#262A44; --bg-c3:#42466A; --bg-hz-a:0; }
          #card-root::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; background-image:
                      radial-gradient(circle var(--c-r, 10cqmax) at var(--c-x, 60%) var(--c-y, 40%), rgba(var(--g-rgb, 245,245,240), 0.88) 0%, rgba(var(--g-rgb, 245,245,240), 0.45) 18%, rgba(var(--g-rgb, 245,245,240), 0.12) 48%, rgba(var(--g-rgb, 245,245,240), 0) 100%),
                      radial-gradient(ellipse 140% 80% at var(--c-x, 60%) 100%, rgba(255, 160, 60, var(--gh-wash, 0)) 0%, rgba(255, 130, 45, var(--gh-wash, 0)) 30%, transparent 72%),
                      linear-gradient(rgba(25, 16, 10, var(--ambient-dim, 0)), rgba(25, 16, 10, var(--ambient-dim, 0))); opacity: var(--g-op, 0); }
          #card-root:not(.standalone)::after { background-image:
                      radial-gradient(circle calc(var(--c-r, 10cqmax) * 0.5) at var(--c-x, 60%) var(--c-y, 40%), rgba(var(--g-rgb, 245,245,240), 0.88) 0%, rgba(var(--g-rgb, 245,245,240), 0.45) 18%, rgba(var(--g-rgb, 245,245,240), 0.12) 48%, rgba(var(--g-rgb, 245,245,240), 0) 100%),
                      radial-gradient(circle calc(var(--c-r, 10cqmax) * 0.5) at var(--c-x, 60%) var(--c-y, 40%), rgba(255, 160, 60, var(--gh-wash, 0)) 0%, rgba(255, 130, 45, var(--gh-wash, 0)) 50%, transparent 100%); }
          #card-root.scheme-day { --awc-text-color: var(--awc-text-day, #2c2c2e); --awc-text-shadow-active: var(--awc-text-shadow-day, 0 1px 2px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.7), 0 0 14px rgba(255, 255, 255, 0.5)); --_chip-no-bg-shadow: var(--awc-chip-text-shadow, var(--awc-text-shadow-day, 0 1px 2px rgba(255, 255, 255, 0.85), 0 0 6px rgba(255, 255, 255, 0.5))); --_text-bg: rgba(255, 255, 255, 0.25); --_text-bg-border: rgba(255, 255, 255, 0.2); }
          #card-root.scheme-day .contrast { --_text-bg: rgba(255,255,255,0.52); --_contrast-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08); }
          #card-root.scheme-day .frosted { --_text-bg: rgba(255,255,255,0.18); --_text-bg-border: rgba(255,255,255,0.32); --_frosted-inset: inset 0 1px 2px rgba(0,0,0,0.12), inset 0 -1px 1px rgba(0,0,0,0.06); }
          #card-root.scheme-day .has-icon-bg.with-bg.frosted { --_stacked-icon-border: 1px solid rgba(255,255,255,0.22); }
          #card-root.scheme-day .has-icon-bg.with-bg.contrast { --_stacked-icon-shadow: 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12); }
          #card-root.scheme-night { --awc-text-color: var(--awc-text-night, #ffffff); --awc-text-shadow-active: var(--awc-text-shadow-night, 0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.7), 0 0 16px rgba(0, 0, 0, 0.5)); --_chip-no-bg-shadow: var(--awc-chip-text-shadow, var(--awc-text-shadow-night, 0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.6))); --_text-bg: rgba(0, 0, 0, 0.35); --_text-bg-border: rgba(255, 255, 255, 0.08); }
          #card-root.scheme-night .contrast { --_text-bg: rgba(0,0,0,0.58); --_contrast-shadow: inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.3); }
          #card-root.scheme-night .frosted { --_text-bg: rgba(0,0,0,0.26); --_text-bg-border: rgba(255,255,255,0.10); --_frosted-inset: inset 0 1px 2px rgba(0,0,0,0.25), inset 0 -1px 1px rgba(0,0,0,0.15); }
          #card-root.scheme-night .has-icon-bg.with-bg.frosted { --_stacked-icon-border: 1px solid rgba(255,255,255,0.08); }
          #card-root.scheme-night .has-icon-bg.with-bg.contrast { --_stacked-icon-shadow: 0 2px 6px rgba(0,0,0,0.28), 0 1px 2px rgba(0,0,0,0.18); }
          #card-root.is-offscreen .awc-marquee-host .awc-marquee-track { animation-play-state: paused; }
          canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; --mask-v: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent); --mask-h: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: var(--mask-v), var(--mask-h); mask-image: var(--mask-v), var(--mask-h); -webkit-mask-composite: source-in; mask-composite: intersect; }
          #fg-canvas { -webkit-mask-image: none !important; mask-image: none !important; }
          #image-slot { position: absolute; top: 0; height: 100%; width: auto; user-select: none; pointer-events: none; box-sizing: border-box; }
          #image-slot > img { display: block; height: 100%; width: auto; max-width: 100%; object-fit: contain; border: none; outline: none; }
          #image-slot > img[src=""],
          #image-slot > img:not([src]) { display: none; visibility: hidden; }
          #wind-compass { position: absolute; inset: 0; pointer-events: none; z-index: 1; font-family: var(--awc-font-family, var(--ha-font-family, var(--paper-font-body1_-_font-family, sans-serif))); color: var(--awc-text-color, #fff); --_cmp-glow: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 6px rgba(0, 0, 0, 0.5)); --_cmp-alt: rgba(20, 20, 24, 0.85); }
          #card-root.scheme-day #wind-compass { --_cmp-glow: none; --_cmp-alt: #ffffff; }
          #wind-compass .cmp { position: absolute; display: flex; flex-direction: column; gap: 2px; transform: scale(var(--_cmp-scale, 1)); }
          #wind-compass .cmp-pos-top-left { top: 12px; left: 14px; align-items: flex-start; transform-origin: top left; }
          #wind-compass .cmp-pos-top-right { top: 12px; right: 14px; align-items: flex-end; transform-origin: top right; }
          #wind-compass .cmp-pos-bottom-left { bottom: 10px; left: 14px; align-items: flex-start; transform-origin: bottom left; }
          #wind-compass .cmp-pos-bottom-right { bottom: 10px; right: 14px; align-items: flex-end; transform-origin: bottom right; }
          #wind-compass .cmp-pos-top-center { top: 12px; left: 50%; align-items: center; transform-origin: top center; transform: translateX(-50%) scale(var(--_cmp-scale, 1)); }
          #wind-compass .cmp-pos-bottom-center { bottom: 8px; left: 50%; align-items: center; transform-origin: bottom center; transform: translateX(-50%) scale(var(--_cmp-scale, 1)); }
          #wind-compass .cmp-pos-top-left, #wind-compass .cmp-pos-top-right, #wind-compass .cmp-pos-top-center { flex-direction: column-reverse; }
          #wind-compass .cmp-svg { display: block; overflow: visible; }
          #wind-compass .cmp-glow, #wind-compass .cmp-label { filter: var(--_cmp-glow); }
          #wind-compass .cmp-rot, #wind-compass .cmp-band { transition: transform 3s ease-in-out; }
          #wind-compass .cmp-line { fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
          #wind-compass .cmp-thin { fill: none; stroke: currentColor; stroke-width: 1; stroke-linecap: round; }
          #wind-compass .cmp-ink { fill: currentColor; }
          #wind-compass .cmp-alt { fill: var(--_cmp-alt); }
          #wind-compass .cmp-paper { fill: currentColor; }
          #wind-compass .cmp-frost { fill: var(--_text-bg, rgba(255, 255, 255, 0.22)); stroke: var(--_text-bg-border, rgba(255, 255, 255, 0.35)); stroke-width: 1; }
          #wind-compass .cmp-label { font-size: 13px; font-weight: 600; letter-spacing: 0.05em; line-height: 1.2; white-space: nowrap; }
          #wind-compass .cmp-label:empty { display: none; }
          #wind-compass .cmp-label span + span { margin-left: 0.4em; font-weight: 500; opacity: 0.8; }
          #wind-compass .cmp-style-arrow .cmp-line { stroke-width: 2.4; }
          #wind-compass .cmp-style-arrow .cmp-thin { stroke-width: 1.6; }
          #wind-compass .cmp-style-arrow .cmp-label { font-size: 14px; font-weight: 700; }
          #wind-compass .cmp.cmp-bg { --_cmp-glow: none; padding: 4px 10px 6px; border-radius: 12px; background: var(--_text-bg, rgba(255, 255, 255, 0.22)); border: 1px solid var(--_text-bg-border, rgba(255, 255, 255, 0.35)); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
          #wind-compass .cmp-style-pill { flex-direction: row; align-items: center; gap: 8px; padding: 5px 12px 5px 6px; border-radius: 999px; background: var(--_text-bg, rgba(255, 255, 255, 0.22)); border: 1px solid var(--_text-bg-border, rgba(255, 255, 255, 0.35)); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
          #wind-compass .cmp-style-pill .cmp-label { filter: none; }
          #wind-compass .cmp-style-pill .cmp-label span + span::before { content: "· "; }
          #text-wrapper { position: absolute; inset: 0; pointer-events: none; box-sizing: border-box; overflow: visible; }
          #text-wrapper > .pos-top-left { top: var(--_awc-pad-v, var(--awc-card-padding, 16px)); left: var(--_awc-pad-h, var(--awc-card-padding, 16px)); }
          #text-wrapper > .pos-top-center { top: var(--_awc-pad-v, var(--awc-card-padding, 16px)); left: 50%; transform: translateX(-50%); }
          #text-wrapper > .pos-top-right { top: var(--_awc-pad-v, var(--awc-card-padding, 16px)); right: var(--_awc-pad-h, var(--awc-card-padding, 16px)); }
          #text-wrapper > .pos-left { top: 50%; left: var(--_awc-pad-h, var(--awc-card-padding, 16px)); transform: translateY(-50%); }
          #text-wrapper > .pos-center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
          #text-wrapper > .pos-right { top: 50%; right: var(--_awc-pad-h, var(--awc-card-padding, 16px)); transform: translateY(-50%); }
          #text-wrapper > .pos-bottom-left { bottom: var(--_awc-pad-v, var(--awc-card-padding, 16px)); left: var(--_awc-pad-h, var(--awc-card-padding, 16px)); }
          #text-wrapper > .pos-bottom-center { bottom: var(--_awc-pad-v, var(--awc-card-padding, 16px)); left: 50%; transform: translateX(-50%); }
          #text-wrapper > .pos-bottom-right { bottom: var(--_awc-pad-v, var(--awc-card-padding, 16px)); right: var(--_awc-pad-h, var(--awc-card-padding, 16px)); }
          #chips-group { position: absolute; pointer-events: none; font-family: var(--awc-font-family, var(--ha-font-family, var(--paper-font-body1_-_font-family, sans-serif))); letter-spacing: -0.01em; transition: color 0.3s ease, text-shadow 0.3s ease; min-width: 0; max-width: calc(100% - var(--_awc-pad-h, var(--awc-card-padding, 16px)) * 2); box-sizing: border-box; }
          #chips-row,
          .chip-free { color: var(--awc-text-color); }
          .chip-sub { display: block; font-size: var(--awc-sub-size, 0.78em); opacity: 0.65; font-weight: var(--awc-sub-weight, 500); line-height: 1.2; white-space: var(--awc-sub-wrap, nowrap); overflow: var(--awc-sub-visible, hidden); text-overflow: var(--awc-sub-overflow, ellipsis); }
          .chip-val .fancy-unit { font-size: 0.55em; font-weight: 500; opacity: 0.85; vertical-align: baseline; position: relative; top: -0.45em; margin-left: 3px; }
          .chip.has-sub:not(.format-stacked):not(.format-vertical) { align-items: flex-start; }
          .chip.has-sub:not(.format-stacked):not(.format-vertical) .chip-icon { align-self: center; }
          .chip.has-sub:not(.format-stacked):not(.format-vertical) .chip-val { display: flex; flex-direction: column; }
          .chip.has-sub.format-stacked .chip-val,
          .chip.has-sub.format-vertical .chip-val { white-space: normal; overflow: visible; }
          #chips-group { pointer-events: auto; width: var(--awc-row-width, auto); box-sizing: border-box; padding: var(--awc-container-padding, 0); max-height: calc(100% - var(--_awc-pad-v, var(--awc-card-padding, 16px)) * 2); }
          #chips-group.has-row-wrap { --_pad-h: var(--_awc-pad-h, var(--awc-card-padding, 16px)); width: var(--awc-row-width, auto); }
          #chips-group.has-row-wrap.pos-top-left,
          #chips-group.has-row-wrap.pos-left,
          #chips-group.has-row-wrap.pos-bottom-left { left: var(--_pad-h); right: var(--_pad-h); width: var(--awc-row-width, auto); }
          #chips-group.has-row-wrap.pos-top-right,
          #chips-group.has-row-wrap.pos-right,
          #chips-group.has-row-wrap.pos-bottom-right { right: var(--_pad-h); left: auto; }
          #chips-group.has-row-wrap.pos-top-center,
          #chips-group.has-row-wrap.pos-bottom-center { left: 50%; transform: translateX(-50%); }
          #chips-group.has-row-wrap.pos-center { left: 50%; transform: translate(-50%, -50%); }
          #chips-group.has-row-wrap.pos-left { transform: translateY(-50%); }
          #chips-group.has-row-wrap.pos-right { transform: translateY(-50%); }
          #chips-group.has-row-horizontal-scroll { height: var(--awc-row-height, auto); }
          #chips-group.has-row-vertical-scroll { height: var(--awc-row-height, calc(100% - var(--_awc-pad-v, var(--awc-card-padding, 16px)) * 2)); }
          #chips-group.grouped { border-radius: var(--awc-bottom-bg-radius, calc(var(--awc-card-border-radius, var(--ha-card-border-radius, 12px)) - 5px)); }
          #chips-group.grouped.with-bg { --_bg: var(--awc-container-bg-color, var(--awc-bottom-bg-color, var(--_text-bg))); }
          #chips-group.grouped.with-bg.contrast { background: var(--_bg); box-shadow: var(--awc-bg-shadow, var(--_contrast-shadow)); }
          #chips-group.grouped.with-bg.frosted { background: var(--_bg); border: var(--awc-bg-border, 1px solid var(--_text-bg-border)); box-shadow: var(--awc-bg-shadow, var(--_frosted-inset, none)); backdrop-filter: var(--awc-bottom-bg-filter, blur(10px)); -webkit-backdrop-filter: var(--awc-bottom-bg-filter, blur(10px)); }
          #chips-group.grouped.with-bg.theme { background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color))); border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color)); box-shadow: var(--ha-card-box-shadow, none); }
          #chips-group.grouped.with-bg > #chips-row .chip.with-bg { background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; border-radius: 0; padding: var(--awc-chips-padding, 0); }
          #chips-group.grouped.with-bg > #chips-row.has-separator > .chip { position: relative; overflow: visible; }
          #chips-group.grouped.with-bg > #chips-row.has-separator > .chip + .chip::before { content: ""; position: absolute; pointer-events: none; top: 0; bottom: 0; inset-inline-start: calc((var(--awc-bottom-gap, 8px) / -2) - (var(--awc-separator-width, 2px) / 2)); width: var(--awc-separator-width, 2px); background: var(--awc-separator-color, color-mix(in srgb, currentColor 10%, transparent)); }
          #chips-group.grouped.with-bg > #chips-row.has-separator.row-vertical-scroll > .chip + .chip::before { top: calc((var(--awc-bottom-gap, 8px) / -2) - (var(--awc-separator-width, 2px) / 2)); bottom: auto; left: 0; right: 0; inset-inline-start: 0; width: auto; height: var(--awc-separator-width, 2px); }
          #chips-row { font-size: var(--awc-bottom-font-size, clamp(15px, 5cqmin, 26px)); font-weight: var(--awc-bottom-font-weight, 500); display: flex; align-items: center; gap: var(--awc-bottom-gap, 8px); width: 100%; box-sizing: border-box; pointer-events: auto; border-radius: inherit; }
          #chips-row.has-separator > .chip { position: relative; overflow: visible; }
          #chips-row.has-separator > .chip + .chip::before { content: ""; position: absolute; pointer-events: none; top: 0; bottom: 0; inset-inline-start: calc((var(--awc-bottom-gap, 8px) / -2) - (var(--awc-separator-width, 2px) / 2)); width: var(--awc-separator-width, 2px); background: var(--awc-separator-color, color-mix(in srgb, currentColor 10%, transparent)); }
          #chips-row.has-separator.row-vertical-scroll > .chip + .chip::before { top: calc((var(--awc-bottom-gap, 8px) / -2) - (var(--awc-separator-width, 2px) / 2)); bottom: auto; left: 0; right: 0; inset-inline-start: 0; width: auto; height: var(--awc-separator-width, 2px); }
          #chips-row.row-wrap { flex-wrap: wrap; }
          #chips-row.row-horizontal-scroll { flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; height: 100%; scroll-snap-type: x proximity; scrollbar-width: none; -ms-overflow-style: none; pointer-events: auto; }
          #chips-row.row-horizontal-scroll::-webkit-scrollbar { display: none; }
          #chips-row.row-horizontal-scroll.has-visible-count { display: grid; grid-auto-flow: column; grid-auto-columns: var(--awc-chip-basis); scroll-snap-type: x mandatory; }
          #chips-row.row-horizontal-scroll.has-visible-count > .chip { width: 100%; overflow: hidden; scroll-snap-align: start; }
          #chips-row.row-vertical-scroll { flex-direction: column; flex-wrap: nowrap; overflow-y: auto; overflow-x: hidden; height: 100%; max-height: var(--awc-row-max-height, none); scroll-snap-type: y proximity; scrollbar-width: none; -ms-overflow-style: none; pointer-events: auto; }
          #chips-row.row-vertical-scroll::-webkit-scrollbar { display: none; }
          #chips-row.row-vertical-scroll.has-visible-count { display: grid; grid-auto-flow: row; grid-auto-rows: var(--awc-chip-basis-v, auto); max-height: none; scroll-snap-type: y mandatory; }
          #chips-row.row-vertical-scroll.has-visible-count > .chip { height: 100%; overflow: hidden; scroll-snap-align: start; }
          #chips-row.row-vertical-scroll:not(.has-visible-count)[class*="pos-bottom"] > :first-child { margin-block-start: auto; }
          #chips-row.row-vertical-scroll:not(.has-visible-count).pos-center > :first-child { margin-block-start: auto; }
          #chips-row.row-vertical-scroll:not(.has-visible-count).pos-center > :last-child { margin-block-end: auto; }
          #chips-row.row-vertical-scroll[class*="right"] { align-items: flex-end; }
          #chips-row.row-vertical-scroll.pos-top-center,
          #chips-row.row-vertical-scroll.pos-center,
          #chips-row.row-vertical-scroll.pos-bottom-center { align-items: center; }
          #chips-row.row-grid { display: grid; grid-template-columns: repeat(var(--awc-row-columns, 1), minmax(0, 1fr)); align-items: stretch; row-gap: var(--awc-bottom-gap, 8px); column-gap: var(--awc-bottom-gap, 8px); }
          #chips-row.row-wrap[class*="right"] { justify-content: flex-end; }
          #chips-row.row-wrap.pos-top-center,
          #chips-row.row-wrap.pos-center,
          #chips-row.row-wrap.pos-bottom-center { justify-content: center; }
          #chips-row.row-grid,
          #chips-row.full-width,
          #chips-row.has-visible-count { align-items: stretch; }
          #chips-row.row-grid > .chip,
          #chips-row.full-width > .chip,
          #chips-row.has-visible-count > .chip { width: 100%; overflow: hidden; }
          #chips-row.row-grid > .chip > .chip-val,
          #chips-row.full-width > .chip > .chip-val,
          #chips-row.has-visible-count > .chip > .chip-val { flex: 0 1 auto; }
          #chips-row.align-center.row-grid > .chip,
          #chips-row.align-center.full-width > .chip,
          #chips-row.align-center.has-visible-count > .chip { justify-content: center; text-align: center; }
          #chips-row.align-end.row-grid > .chip,
          #chips-row.align-end.full-width > .chip,
          #chips-row.align-end.has-visible-count > .chip { justify-content: flex-start; text-align: end; }
          #chips-row.align-center .chip.format-stacked,
          #chips-row.align-center .chip.format-vertical { justify-content: center; }
          #chips-row.align-center .chip.format-stacked { grid-template-columns: auto minmax(0, auto); }
          #chips-row.align-center .chip.format-stacked .chip-name,
          #chips-row.align-center .chip.format-vertical .chip-name,
          #chips-row.align-center .chip.format-stacked .chip-val,
          #chips-row.align-center .chip.format-vertical .chip-val { align-self: auto; justify-self: start; text-align: start; }
          #chips-row.align-center .chip.format-vertical .chip-name,
          #chips-row.align-center .chip.format-vertical .chip-val { justify-self: center; text-align: center; display: flex; flex-direction: column; gap: 2px; }
          #chips-row.align-center .chip.format-stacked.no-icon,
          #chips-row.align-center .chip.format-vertical.no-icon { justify-items: center; }
          #chips-row.align-center .chip.format-stacked.no-icon .chip-name,
          #chips-row.align-center .chip.format-vertical.no-icon .chip-name,
          #chips-row.align-center .chip.format-stacked.no-icon .chip-val,
          #chips-row.align-center .chip.format-vertical.no-icon .chip-val { justify-self: center; text-align: center; }
          #chips-row.align-end .chip:not(.format-stacked):not(.format-vertical) { flex-direction: row-reverse; }
          #chips-row.align-end .chip:not(.format-stacked):not(.format-vertical) .chip-icon { margin-right: 0; margin-left: var(--awc-chip-gap, 6px); }
          #chips-row.align-end .chip:not(.format-stacked):not(.format-vertical) .chip-name { margin-right: 0; margin-left: var(--awc-chip-text-gap, 0.35em); }
          #chips-row.align-end .chip.format-stacked { grid-template: "name icon" auto "value icon" auto / minmax(0, auto) auto; justify-content: end; }
          #chips-row.align-end .chip.format-vertical { justify-items: end; text-align: end; }
          #chips-row.align-end .chip.format-stacked.with-bg,
          #chips-row.align-end .chip.format-vertical.with-bg { padding: var(--awc-chips-padding, 6px 6px 6px 10px); }
          #chips-row.align-end .chip.format-stacked .chip-name,
          #chips-row.align-end .chip.format-vertical .chip-name,
          #chips-row.align-end .chip.format-stacked .chip-val,
          #chips-row.align-end .chip.format-vertical .chip-val { justify-self: end; text-align: end; }
          #chips-row.align-spread .chip:not(.format-stacked):not(.format-vertical) { flex: 1 1 0; }
          #chips-row.align-spread .chip:not(.format-stacked):not(.format-vertical) .chip-val { margin-left: auto; text-align: right; }
          #chips-row.align-spread .chip.format-stacked { flex: 1 1 0; grid-template-columns: auto 1fr; }
          #chips-row.align-spread .chip.format-stacked .chip-val { text-align: right; justify-self: end; }
          #chips-row[class*="pos-bottom"]:not(.has-visible-count) > .chip.format-stacked,
          #chips-row[class*="pos-bottom"]:not(.has-visible-count) > .chip.format-vertical { align-content: end; }
          #chips-row[class*="pos-top"]:not(.has-visible-count) > .chip.format-stacked,
          #chips-row[class*="pos-top"]:not(.has-visible-count) > .chip.format-vertical { align-content: start; }
          #chips-row.pos-center:not(.has-visible-count) > .chip.format-stacked,
          #chips-row.pos-center:not(.has-visible-count) > .chip.format-vertical,
          #chips-row.pos-left:not(.has-visible-count) > .chip.format-stacked,
          #chips-row.pos-left:not(.has-visible-count) > .chip.format-vertical,
          #chips-row.pos-right:not(.has-visible-count) > .chip.format-stacked,
          #chips-row.pos-right:not(.has-visible-count) > .chip.format-vertical { align-content: center; }
          #chips-row.has-visible-count > .chip.format-stacked,
          #chips-row.has-visible-count > .chip.format-vertical { align-content: center; }
          #chips-row[class*="pos-bottom"]:not(.has-visible-count).has-enhanced-child { align-items: flex-end; }
          #chips-row[class*="pos-top"]:not(.has-visible-count).has-enhanced-child { align-items: flex-start; }
          .chip { display: flex; align-items: center; gap: 0; flex: 0 0 auto; min-width: 0; max-width: 100%; white-space: nowrap; box-sizing: border-box; scroll-snap-align: start; padding: var(--awc-chips-padding, 0); cursor: pointer; }
          .chip:not(.with-bg) .chip-name { opacity: var(--awc-bottom-opacity, 0.7); }
          .chip.has-icon-bg.frosted:not(.with-bg) .chip-name { opacity: var(--awc-bottom-opacity, 0.7); }
          .chip .chip-icon { flex: 0 0 auto; display: flex; align-items: center; justify-content: center; margin-right: var(--awc-chip-gap, 6px); padding: var(--awc-icon-padding, 0); }
          .chip .chip-icon ha-icon,
          .chip .chip-icon ha-state-icon { --mdc-icon-size: var(--awc-icon-size, 1.1em); opacity: 0.9; }
          .chip .chip-icon img.custom-bottom-icon { display: block; height: var(--awc-icon-size, 1.1em); width: var(--awc-icon-size, 1.1em); object-fit: contain; }
          .chip .chip-name { font-size: var(--awc-chip-name-font-size, inherit); font-weight: var(--awc-chip-name-weight, 500); opacity: var(--awc-chip-name-opacity, 0.7); color: var(--awc-chip-name-color, inherit); flex: 0 0 auto; margin-right: var(--awc-chip-text-gap, 0.35em); }
          .chip .chip-val { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; display: inline-block; font-weight: var(--awc-chip-value-weight, 700); }
          .chip.no-name:not(.format-stacked):not(.format-vertical) .chip-val { font-weight: var(--awc-chip-value-weight, 700); }
          .chip .chip-val,
          .chip .chip-name { text-shadow: var(--_chip-no-bg-shadow, 0 1px 2px rgba(0, 0, 0, 0.35)); }
          .chip.overflow-clip .chip-val { text-overflow: clip; }
          .chip.overflow-wrap .chip-val { white-space: normal; overflow: visible; text-overflow: clip; }
          .chip.overflow-wrap:not(.format-stacked):not(.format-vertical) .chip-val { display: inline; }
          .chip.with-bg { --_bg: var(--awc-bottom-bg-color, var(--_text-bg)); padding: var(--awc-chips-padding, 5px 10px); border-radius: var(--awc-bottom-bg-radius, calc(var(--awc-card-border-radius, var(--ha-card-border-radius, 12px)) - 5px)); align-items: center; }
          .chip.with-bg .chip-val,
          .chip.with-bg .chip-name { text-shadow: none; }
          .chip.with-bg.contrast { background: var(--_bg); box-shadow: var(--awc-bg-shadow, var(--_contrast-shadow)); }
          .chip.with-bg.frosted { background: var(--_bg); border: var(--awc-bg-border, 1px solid var(--_text-bg-border)); box-shadow: var(--awc-bg-shadow, var(--_frosted-inset, none)); backdrop-filter: var(--awc-bottom-bg-filter, blur(10px)); -webkit-backdrop-filter: var(--awc-bottom-bg-filter, blur(10px)); }
          .chip.with-bg.theme { background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color))); border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color)); box-shadow: var(--ha-card-box-shadow, none); }
          .chip.format-stacked,
          .chip.format-vertical { display: grid; align-items: center; }
          .chip.format-stacked .chip-icon,
          .chip.format-vertical .chip-icon { grid-area: icon; margin: 0; aspect-ratio: 1; overflow: visible; border-radius: var(--awc-stacked-icon-radius, calc(var(--awc-bottom-bg-radius, calc(var(--awc-card-border-radius, var(--ha-card-border-radius, 12px)) - 5px)) - var(--awc-stacked-icon-inset, 3px))); padding: var(--awc-icon-padding, 4px); }
          .chip.format-stacked .chip-icon ha-icon,
          .chip.format-stacked .chip-icon ha-state-icon,
          .chip.format-vertical .chip-icon ha-icon,
          .chip.format-vertical .chip-icon ha-state-icon { --mdc-icon-size: var(--awc-icon-size, 1.3em); opacity: 1; }
          .chip.format-stacked .chip-icon img.custom-bottom-icon,
          .chip.format-vertical .chip-icon img.custom-bottom-icon { height: var(--awc-icon-size, 1.3em); width: var(--awc-icon-size, 1.3em); }
          .chip.format-stacked .chip-name,
          .chip.format-vertical .chip-name { grid-area: name; max-width: 100%; font-size: var(--awc-chip-name-font-size, var(--awc-stacked-name-size, 0.85em)); font-weight: var(--awc-chip-name-weight, 500); opacity: var(--awc-stacked-name-opacity, 0.6); color: var(--awc-stacked-name-color, inherit); line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0; }
          .chip.format-stacked .chip-name:empty,
          .chip.format-vertical .chip-name:empty { display: none; }
          .chip.format-stacked:not(.chip-bar-type) .chip-name:empty + .chip-val,
          .chip.format-vertical:not(.chip-bar-type) .chip-name:empty + .chip-val { grid-row: 1 / -1; align-self: center; }
          .chip.format-stacked.empty-name .chip-icon,
          .chip.format-vertical.empty-name .chip-icon { background: none; border: none; box-shadow: none; aspect-ratio: unset; align-self: center; }
          .chip.format-stacked .chip-val,
          .chip.format-vertical .chip-val { grid-area: value; font-weight: var(--awc-stacked-value-weight, 700); min-width: 0; max-width: 100%; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .chip.format-stacked { grid-template: "icon name" auto "icon value" auto / auto 1fr; column-gap: var(--awc-stacked-column-gap, var(--awc-chip-gap, 10px)); row-gap: var(--awc-stacked-row-gap, var(--awc-chip-text-gap, 4px)); }
          .chip.format-stacked .chip-icon { align-self: stretch; }
          .chip.format-stacked .chip-name { align-self: end; }
          .chip.format-stacked .chip-val { align-self: start; }
          .chip.format-stacked.no-icon { grid-template: "name" auto "value" auto / 1fr; column-gap: 0; }
          .chip.format-stacked.with-bg { padding: var(--awc-chips-padding, 6px 10px 6px 6px); }
          .chip.format-vertical { grid-template: "icon" auto "name" auto "value" auto / 1fr; row-gap: 0; justify-items: center; text-align: center; }
          .chip.format-vertical .chip-name:empty + .chip-val { grid-row: value; align-self: center; }
          .chip.format-vertical .chip-icon { align-self: center; justify-self: center; margin: 0 0 var(--awc-vertical-icon-gap, var(--awc-chip-gap, 6px)) 0; }
          .chip.format-vertical .chip-icon ha-icon,
          .chip.format-vertical .chip-icon ha-state-icon { --mdc-icon-size: var(--awc-icon-size, 1.6em); }
          .chip.format-vertical .chip-icon img.custom-bottom-icon { height: var(--awc-icon-size, 1.6em); width: var(--awc-icon-size, 1.6em); }
          .chip.format-vertical .chip-name { align-self: auto; margin: 0 0 var(--awc-chip-text-gap, 4px) 0; }
          .chip.format-vertical .chip-val { align-self: auto; }
          .chip.format-vertical.with-bg { padding: var(--awc-chips-padding, 6px 10px); }
          .chip.format-vertical:not(.has-icon-bg) .chip-icon { background: none; border: none; box-shadow: none; aspect-ratio: unset; border-radius: 0; overflow: visible; padding: var(--awc-icon-padding, 0); }
          .chip.no-icon-bg .chip-icon { background: none !important; border: none !important; box-shadow: none !important; aspect-ratio: unset !important; border-radius: 0 !important; overflow: visible !important; padding: var(--awc-icon-padding, 0) !important; }
          .chip.icon-only .chip-icon { margin: 0 !important; }
          .chip.align-center:not(.format-stacked):not(.format-vertical) { justify-content: center; }
          .chip.align-center:not(.format-stacked):not(.format-vertical) .chip-val { flex: 0 0 auto; text-align: center; }
          .chip.align-end:not(.format-stacked):not(.format-vertical) { flex-direction: row-reverse; }
          .chip.align-end:not(.format-stacked):not(.format-vertical) .chip-icon { margin-right: 0; margin-left: var(--awc-chip-gap, 6px); }
          .chip.align-end:not(.format-stacked):not(.format-vertical) .chip-name { margin-right: 0; margin-left: var(--awc-chip-text-gap, 0.35em); }
          .chip.align-end:not(.format-stacked):not(.format-vertical) .chip-val { flex: 0 0 auto; }
          .chip.overflow-marquee:not(.marquee-label).align-center .chip-val,
          .chip.overflow-marquee:not(.marquee-label).align-end .chip-val { flex: 1 1 auto; min-width: 0; }
          .chip.align-spread:not(.format-stacked):not(.format-vertical) .chip-val { margin-left: auto; }
          .chip.align-start.format-stacked .chip-name,
          .chip.align-start.format-stacked .chip-val { justify-self: start; text-align: start; }
          .chip.align-center.format-stacked { grid-template-columns: auto minmax(0, auto); justify-content: center; }
          .chip.align-center.format-stacked .chip-name,
          .chip.align-center.format-stacked .chip-val { align-self: auto; justify-self: start; text-align: start; }
          .chip.align-end.format-stacked { grid-template: "name icon" auto "value icon" auto / minmax(0, auto) auto; justify-content: end; }
          .chip.align-end.format-stacked .chip-name,
          .chip.align-end.format-stacked .chip-val { justify-self: end; text-align: end; }
          .chip.align-end.format-stacked.with-bg { padding: var(--awc-chips-padding, 6px 6px 6px 10px); }
          .chip.align-start.format-vertical { justify-items: start; text-align: start; }
          .chip.align-center.format-vertical { justify-items: center; text-align: center; }
          .chip.align-end.format-vertical { justify-items: end; text-align: end; }
          .chip.has-icon-bg .chip-icon { aspect-ratio: 1; overflow: visible; border-radius: var(--awc-stacked-icon-radius, calc(var(--awc-bottom-bg-radius, calc(var(--awc-card-border-radius, var(--ha-card-border-radius, 12px)) - 5px)) - var(--awc-stacked-icon-inset, 3px))); padding: var(--awc-icon-padding, 4px); }
          .chip.has-icon-bg:not(.format-stacked):not(.format-vertical) .chip-icon { align-self: stretch; }
          .chip.has-icon-bg.format-stacked .chip-icon { align-self: stretch; }
          .chip.has-icon-bg:not(.with-bg) .chip-icon { background: var(--_bg, var(--awc-bottom-bg-color, var(--_text-bg))); border: var(--awc-bg-border, 1px solid var(--_text-bg-border, transparent)); box-shadow: var(--awc-icon-bg-shadow, var(--_frosted-inset, none)); }
          .chip.has-icon-bg:not(.with-bg).frosted .chip-icon { backdrop-filter: var(--awc-bottom-bg-filter, blur(10px)); -webkit-backdrop-filter: var(--awc-bottom-bg-filter, blur(10px)); }
          .chip.has-icon-bg:not(.with-bg).contrast .chip-icon { box-shadow: var(--awc-icon-bg-shadow, var(--_contrast-shadow, none)); border: none; }
          .chip.has-icon-bg:not(.with-bg).theme .chip-icon { background: var(--ha-card-background, var(--card-background-color, var(--primary-background-color))); border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color)); box-shadow: var(--ha-card-box-shadow, none); }
          .chip.has-icon-bg.with-bg .chip-icon { background: var(--awc-stacked-icon-bg, color-mix(in srgb, var(--ha-card-background, var(--card-background-color, var(--primary-background-color))) 20%, transparent)); border: none; box-shadow: var(--awc-icon-bg-shadow, 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)); }
          .chip.has-icon-bg.with-bg.frosted .chip-icon { border: var(--_stacked-icon-border, none); }
          .chip.has-icon-bg.with-bg.contrast .chip-icon { box-shadow: var(--awc-icon-bg-shadow, var(--_stacked-icon-shadow, 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12))); }
          .chip.has-icon-bg.with-bg.theme .chip-icon { border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color)); }
          .chip-free { position: absolute; pointer-events: auto; z-index: 99; font-family: var(--awc-font-family, var(--ha-font-family, var(--paper-font-body1_-_font-family, sans-serif))); letter-spacing: -0.01em; font-size: var(--awc-bottom-font-size, clamp(15px, 5cqmin, 26px)); font-weight: var(--awc-bottom-font-weight, 500); max-width: calc(100% - var(--_awc-pad-h, var(--awc-card-padding, 16px)) * 2); box-sizing: border-box; text-shadow: var(--awc-text-shadow-active); }
          .chip-free.behind { z-index: -1; }
          .chip.behind { position: relative; z-index: -1; }
          .chip.chip-round.with-bg { border-radius: 999px; }
          .chip.chip-round .chip-icon { border-radius: 999px; }
          .chip.chip-ring { position: relative; border-radius: 50%; aspect-ratio: 1; justify-content: center; align-content: center; z-index: 1; padding: var(--awc-chips-padding, 10px); }
          .chip.chip-ring.with-bg { border-radius: 50%; padding: var(--awc-chips-padding, 10px); }
          .chip.chip-ring.format-vertical .chip-icon { margin-bottom: var(--awc-vertical-icon-gap, var(--awc-chip-gap, 4px)); }
          .chip.chip-ring.format-vertical .chip-name { margin-bottom: var(--awc-chip-text-gap, 2px); }
          .chip-ring-wrap { position: relative; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; scroll-snap-align: start; }
          .chip-ring-wrap::before { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--awc-ring-gradient, conic-gradient(var(--awc-ring-color, var(--primary-color, #03a9f4)) var(--awc-ring-pct, 0%), transparent 0)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--awc-ring-w, 4px) - 0.5px), #000 calc(100% - var(--awc-ring-w, 4px))); mask: radial-gradient(farthest-side, transparent calc(100% - var(--awc-ring-w, 4px) - 0.5px), #000 calc(100% - var(--awc-ring-w, 4px))); transition: --awc-ring-pct 0.6s cubic-bezier(0.4, 0, 0.2, 1); pointer-events: none; z-index: 0; }
          .chip-ring-wrap.has-segments::before { -webkit-mask: conic-gradient(#000 var(--awc-ring-pct, 0%), transparent 0), radial-gradient(farthest-side, transparent calc(100% - var(--awc-ring-w, 4px) - 0.5px), #000 calc(100% - var(--awc-ring-w, 4px))); mask: conic-gradient(#000 var(--awc-ring-pct, 0%), transparent 0), radial-gradient(farthest-side, transparent calc(100% - var(--awc-ring-w, 4px) - 0.5px), #000 calc(100% - var(--awc-ring-w, 4px))); -webkit-mask-composite: source-in; mask-composite: intersect; }
          .chip-ring-track { position: absolute; inset: 0; border-radius: 50%; -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--awc-ring-w, 4px) - 0.5px), #000 calc(100% - var(--awc-ring-w, 4px))); mask: radial-gradient(farthest-side, transparent calc(100% - var(--awc-ring-w, 4px) - 0.5px), #000 calc(100% - var(--awc-ring-w, 4px))); background: currentColor; opacity: 0.10; pointer-events: none; }
          .chip-ring-wrap > .chip { margin: var(--awc-ring-gap, 3px); z-index: 1; }
          #chips-row.row-grid > .chip-ring-wrap > .chip,
          #chips-row.full-width > .chip-ring-wrap > .chip,
          #chips-row.has-visible-count > .chip-ring-wrap > .chip { width: calc(100% - var(--awc-ring-gap, 3px) * 2); }
          #chips-row.row-grid > .chip-ring-wrap { aspect-ratio: 1; }
          .chip-bar { --_bar-radius: calc(var(--awc-card-border-radius, var(--ha-card-border-radius, 12px)) * 0.35); position: relative; width: 100%; height: var(--awc-bar-h, 4px); border-radius: var(--_bar-radius); overflow: hidden; margin-top: var(--awc-bar-gap, 4px); flex-shrink: 0; }
          .chip-bar-track { position: absolute; inset: 0; border-radius: inherit; background: currentColor; opacity: 0.10; }
          .chip-bar-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--awc-bar-gradient, var(--awc-bar-color, var(--primary-color, #03a9f4))); transform-origin: left center; transform: scaleX(var(--awc-bar-scale, 0)); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
          .chip.chip-bar-type { flex-wrap: wrap; }
          .chip.chip-bar-type.format-stacked { grid-template: "icon name" auto "icon value" auto "bar bar" auto / auto 1fr; }
          .chip.chip-bar-type.format-stacked .chip-bar { grid-area: bar; }
          .chip.chip-bar-type.format-stacked.no-icon { grid-template: "name" auto "value" auto "bar" auto / 1fr; }
          .chip.chip-bar-type.format-vertical { grid-template: "icon" auto "name" auto "value" auto "bar" auto / 1fr; }
          .chip.chip-bar-type.format-vertical .chip-bar { grid-area: bar; justify-self: stretch; }
          .chip.chip-loading { position: relative; }
          .chip.chip-loading .chip-icon,
          .chip.chip-loading .chip-name,
          .chip.chip-loading .chip-val,
          .chip.chip-loading .chip-bar { visibility: hidden; }
          .chip-ring-wrap.chip-loading .chip-ring-track,
          .chip-ring-wrap.chip-loading::before { visibility: hidden; }
          .chip-loader { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 5px; pointer-events: none; }
          .chip-loader span { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.2; animation: awc-dot-pulse 1.2s ease-in-out infinite; }
          .chip-loader span:nth-child(2) { animation-delay: 0.2s; }
          .chip-loader span:nth-child(3) { animation-delay: 0.4s; }
@keyframes awc-dot-pulse {
              0%, 60%, 100% { opacity: 0.2; transform: scale(0.85); }
              30%           { opacity: 0.7; transform: scale(1); }
          }
          .chip .chip-val.awc-marquee-host { overflow: hidden; text-overflow: clip; contain: layout style; }
          .chip .chip-name.awc-marquee-host { overflow: hidden; text-overflow: clip; contain: layout style; margin-right: var(--awc-chip-text-gap, 0.35em); }
          .chip.marquee-value .chip-name { flex: 0 0 auto; }
          .chip.marquee-label .chip-name { flex: 1 1 auto; min-width: 0; }
          .chip.marquee-label .chip-val { flex: 0 0 auto; }
          .chip.marquee-both .chip-name { flex: 1 1 auto; min-width: 0; }
          .chip.marquee-both .chip-val { flex: 1 1 auto; min-width: 0; }
          .chip .chip-val.awc-marquee-host.is-animating { -webkit-mask-image: linear-gradient(to right, transparent 0, #000 var(--awc-marquee-fade, 12px), #000 calc(100% - var(--awc-marquee-fade, 12px)), transparent 100%); mask-image: linear-gradient(to right, transparent 0, #000 var(--awc-marquee-fade, 12px), #000 calc(100% - var(--awc-marquee-fade, 12px)), transparent 100%); }
          .chip .chip-name.awc-marquee-host.is-animating { -webkit-mask-image: linear-gradient(to right, transparent 0, #000 var(--awc-marquee-fade, 12px), #000 calc(100% - var(--awc-marquee-fade, 12px)), transparent 100%); mask-image: linear-gradient(to right, transparent 0, #000 var(--awc-marquee-fade, 12px), #000 calc(100% - var(--awc-marquee-fade, 12px)), transparent 100%); }
          .chip-sub.awc-marquee-host { overflow: hidden; text-overflow: clip; contain: layout style; }
          .chip-sub.awc-marquee-host.is-animating { -webkit-mask-image: linear-gradient(to right, transparent 0, #000 var(--awc-marquee-fade, 12px), #000 calc(100% - var(--awc-marquee-fade, 12px)), transparent 100%); mask-image: linear-gradient(to right, transparent 0, #000 var(--awc-marquee-fade, 12px), #000 calc(100% - var(--awc-marquee-fade, 12px)), transparent 100%); }
          .awc-marquee-track { display: inline-block; white-space: nowrap; }
          .awc-marquee-text { display: inline; }
          .awc-marquee-sep { display: inline-block; padding: 0 var(--awc-marquee-sep-gap, 0.4em); opacity: 0.5; }
          .awc-marquee-sep::before { content: var(--awc-marquee-separator, "•"); }
          .awc-marquee-host.is-animating .awc-marquee-track { will-change: transform; animation: awc-marquee var(--awc-marquee-duration, 20s) linear infinite; }
          .awc-marquee-host.awc-marquee-rtl .awc-marquee-track { animation-direction: reverse; }
@keyframes awc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .awc-marquee-host.is-animating .awc-marquee-track { animation: none; will-change: auto; } }
          #custom-cards-wrapper { position: absolute; inset: 0; box-sizing: border-box; z-index: 10; display: none; flex-wrap: wrap; flex-direction: var(--awc-custom-cards-direction, row); gap: var(--awc-custom-cards-gap, 8px); justify-content: var(--awc-custom-cards-justify, flex-start); align-items: var(--awc-custom-cards-align, flex-start); padding: var(--awc-card-padding, var(--ha-space-4, 16px)); pointer-events: none; overflow: visible; }
          #custom-cards-wrapper.has-cards { display: flex; }
          #custom-cards-wrapper > * { pointer-events: auto; }
          #custom-cards-wrapper.cc-text-left { justify-content: flex-start; }
          #custom-cards-wrapper.cc-text-right { justify-content: flex-end; }
          #custom-cards-wrapper.cc-text-hcenter { justify-content: center; }
          #custom-cards-wrapper.cc-align-top { align-content: flex-start; }
          #custom-cards-wrapper.cc-align-center { align-content: center; }
          #custom-cards-wrapper.cc-align-bottom { align-content: flex-end; }

`;
}
