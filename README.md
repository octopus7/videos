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
- `public/videos/<폴더>/`에 빈 `.published` 파일이 있는 폴더만 공개합니다.
- 같은 폴더의 `.page.md`를 페이지 본문으로 Markdown 렌더링하며, 첫 화면 카드에도 표시합니다.
- 인덱스에는 영상 파일이 아니라 폴더명만 표시합니다. 예: `mole-astra`
- 폴더 링크 `/videos/<폴더>`는 해당 폴더의 영상을 담은 페이지입니다.
- 원본 영상은 `/videos/<폴더>/<파일명>.<확장자>`에서 제공됩니다.
- `.published`가 없는 폴더는 인덱스와 영상 페이지에 노출되지 않습니다.
- 새 영상이나 `.published` 변경은 Git push 후 Cloudflare Pages가 다시 빌드해야 반영됩니다.

예시:

```text
public/videos/mole-astra/
├─ .published
├─ .page.md
└─ *.mp4
```

Cloudflare Pages 설정:

- Build command: `npm run build`
- Build output directory: `dist`
