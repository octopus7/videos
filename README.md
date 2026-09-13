# videos
생성 영상 보존 및 조회
# TunaVideo

Astro로 만든 Cloudflare Pages용 영상 라이브러리입니다.

## 개발

```bash
npm install
npm run dev
```

## 페이지 빌드 규칙

- `public/videos/` 아래의 `.mp4`, `.webm`, `.mov`, `.m4v` 파일을 영상으로 인식합니다.
- 영상 파일마다 `/videos/<경로>/<파일명>` 페이지를 정적으로 생성합니다.
- 원본 영상은 `/videos/<경로>/<파일명>.<확장자>`에서 제공됩니다.
- 인덱스에는 해당 폴더에 `.published` 파일이 있는 영상만 표시합니다.
- `.published`가 없어도 영상 페이지는 직접 URL로 접근할 수 있습니다.
- 새 영상이나 `.published` 변경은 Git push 후 Cloudflare Pages가 다시 빌드해야 반영됩니다.

Cloudflare Pages 설정:

- Build command: `npm run build`
- Build output directory: `dist`
