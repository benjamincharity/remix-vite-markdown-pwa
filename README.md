# remix-vite-markdown-pwa

![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=remix-vite-markdown-pwa)

## FAQ

### I am getting an error when I run `npm run dev`

```
can not read a block mapping entry; a multiline key may not be an implicit key at line 2, column 8:
```

Check your yaml file for any syntax errors. This error is usually caused by
unescaped quotes.

### How can I update the PWA images?

Generate the images using
[Real Favicon Generator](https://realfavicongenerator.net/), then replace the
images in the `public/images/pwa` folder.

There is also a CLI tool called
[pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator)
