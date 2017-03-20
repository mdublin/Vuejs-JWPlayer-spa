
### Setup:


This project assumes a few things regarding the JWPlayer-side of things:

1. You have a JWPlayer account and are somewhat familiar with their Javascript API 
2. You have created a playlist and know how to grab the JSON feed for that playlist
3. Know where to grab the JW Player 7 (Self-Hosted) package
4. I am including my player license key at the very bottom of the jwplayer.js file: ```jwplayer.key="{your license key here}"```



For local dev/user, just point http-server at the repo's parent directory JWPlayer+Vue

**Note 1:**

When served locally, sometimes a 403 error on video file URLs at the following JWPLayer URL occurs periodically:

http://videos-f.jwpsrv.com/content/conversions/{VideoFileIDs}

However, when deployed to an S3 bucket to be served statically, this error no longer occurs and everything works.




This project uses the AMD pattern via requirejs for some basic module definition and the r.js optimizer. There is an r.js build file already configured in assets/js/build.js. To use r.js with the provided build.js file, makes sure your downloaded r.js file is located at the same level as the JWPlayer+Vue repo directory and run the following command: 

```$ r.js -o JWPlayer+Vue/assets/js/build.js```



In the same directory, this will create main-build.js, which you can then configure for use in the index.html (it is currently commented out)


**Note 2:**

There have apparently been some issues in the past with previous versions of JWPlayer when it came to AMD implementations, and workarounds were provided by JWPlayer dev team on the JWPlayer repo. However, with the JWPlayer package version used for this project, JW Player 7 production 7.9.3, while JWPlayer does work perfectly fine with requirejs, there were some problems post-optimization using r.js. The one that kep coming up was the ever-popular ```Error: Mismatched anonymous define() module: function ()``` which, according to requirejs docs, can stem from four main issues. Long story-short, my workaround was to add a module ID to the problem anonymous define function, nested deep within the jwplayer.js file @ line 7494:

Change the anonymous define() function at line 7494: 
```
return "function" == typeof i.define && i.define.amd && i.define([], function() {
```

to: 

```
return "function" == typeof i.define && i.define.amd && i.define('jwplayer', [], function() {  })
```



Screen shot:

![](https://raw.githubusercontent.com/mdublin/Vuejs-JWPlayer-spa/master/screenshot1.png)

Screen shot (responsive):

![](https://raw.githubusercontent.com/mdublin/Vuejs-JWPlayer-spa/master/screenshot2.png)


