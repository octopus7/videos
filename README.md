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

인덱스 페이지에 목록을 노출하려면 해당 폴더에 빈 `.published` 파일을 추가합니다.
`.published`가 없는 폴더의 영상도 직접 URL을 알면 페이지에 접근할 수 있지만, 인덱스 목록에는 표시되지 않습니다.

Cloudflare Pages 설정:

- Build command: `npm run build`
- Build output directory: `dist`
