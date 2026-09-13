# videos
생성 영상 보존 및 조회
# TunaVideo

Astro로 만든 Cloudflare Pages용 영상 라이브러리입니다.

## 개발

```bash
npm install
npm run dev
```

`public/videos/` 아래의 영상 파일마다 다음 두 주소가 빌드됩니다.

- 원본 영상: `/videos/<경로>/<파일명>.mp4`
- 영상 페이지: `/videos/<경로>/<파일명>`

Cloudflare Pages 설정:

- Build command: `npm run build`
- Build output directory: `dist`
