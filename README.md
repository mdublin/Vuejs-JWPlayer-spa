**This is an updated version from the master branch, which used requirejs, to a (basic) Webpack2 implementation**

Before you start, this project assumes a few things regarding the JWPlayer-side of things:

1. You have a JWPlayer account and are somewhat familiar with their Javascript API
2. You have created a playlist and know how to grab the JSON feed for that playlist
3. Know where to grab the JW Player 7 (Self-Hosted) package
4. I am including my player license key at the very bottom of the jwplayer.js file: ```jwplayer.key="{your license key here}"```


### Setup:

1. ```npm install```

2. ```webpack```

3. ```webpack-dev-server```

3. (optional) ```webpack --watch```


**Note 1:**

When served locally, sometimes a 403 error on video file URLs at the following JWPLayer URL occurs periodically:

http://videos-f.jwpsrv.com/content/conversions/{VideoFileIDs}

However, when deployed to an S3 bucket to be served statically, this error no longer occurs and everything works.








Screen shot:

![](https://raw.githubusercontent.com/mdublin/Vuejs-JWPlayer-spa/master/screenshot1.png)

Screen shot (responsive):

![](https://raw.githubusercontent.com/mdublin/Vuejs-JWPlayer-spa/master/screenshot2.png)
