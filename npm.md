
# How to release an update

1. Modify `package.json` version
2. Run the following commands:

```bash
pnpm run build
git tag -a v1.5.0 -m "Release version 1.5.0"
git push --tags
npm publish
```

Note: Publishing to npm still uses `npm publish` (not pnpm) for compatibility.

