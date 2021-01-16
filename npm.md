# Run specific test

  jest --runInBand



# How to release an update


 modifiy package.json
  
    npm run build
    git tag -a v1.3.0 -m "Release version 1.3.0"
    git push
    npm publish


