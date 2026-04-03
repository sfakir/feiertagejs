
# How to release an update


for this documeation we assume you want to release 1.5.0
1. Update changelog.mg

2. Update Version in `package.json` 
 Line: "version": "1.5.0",

3. Run the following commands to 

```bash
pnpm run build
git tag -a v1.5.1 -m "Release version 1.5.1"
git push --tags
npm publish
```

Note: Publishing to npm still uses `npm publish` (not pnpm) for compatibility.


