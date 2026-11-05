# Third-party notices

The MIT license in this repository covers the original application source, SVG characters and editorial annotations. It does not relicense third-party code, models or assets.

Third-party runtime files are **not committed**. `npm run setup` downloads the exact files listed in `scripts/vendor-manifest.json` and verifies SHA-256 before installation.

| Component | Version / source | License information |
| --- | --- | --- |
| Three.js | 0.180.0, npm/jsDelivr | MIT; setup downloads `THREE-LICENSE.txt`. https://github.com/mrdoob/three.js |
| lunar-javascript | 1.7.4, npm/jsDelivr | MIT; setup downloads `LUNAR-LICENSE.txt`. https://github.com/6tail/lunar-javascript |
| MediaPipe Tasks Vision | 0.10.22-rc.20250304, npm/jsDelivr | Apache-2.0 framework; setup downloads `MEDIAPIPE-LICENSE.txt`. https://github.com/google-ai-edge/mediapipe |
| Hand Landmarker model | Google official `hand_landmarker/float16/1/hand_landmarker.task` endpoint | Downloaded separately from the publisher. The application MIT license does not cover the model. Refer to the publisher's model documentation and applicable terms: https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker |

The dependency manifest deliberately treats changed upstream bytes as an error, including license files. If a publisher changes a file, review the change and its license before updating the recorded checksum; do not bypass verification.

Classical Chinese judgments are historical public-domain text, rendered in simplified characters. Modern annotations, prompts and card artwork are original editorial material. The application does not bundle the supplied reference video, the user's screenshot, or third-party Tarot/Lenormand illustrations.

Implementation references:

- https://zh.wikisource.org/wiki/梅花易數/卷一
- https://zh.wikisource.org/zh-hans/增刪卜易
- https://zh.wikisource.org/zh-hans/六壬指南/1
- https://zh.wikisource.org/zh-hant/煙波釣叟歌
- https://www.hko.gov.hk/sc/gts/time/24solarterms.htm
- https://www.hko.gov.hk/sc/gts/time/stemsandbranches.htm
