
### Setup:


This project assumes a few things regarding the JWPlayer-side of things:

1. You have a JWPlayer account and are somewhat familiar with their Javascript API 
2. You have created a playlist and know how to grab the JSON feed for that playlist
3. Know where to grab the JW Player 7 (Self-Hosted) package



For local dev/user, just point http-server at the repo's parent directory JWPlayer+Vue

**Note:**

When served locally, sometimes a 403 error on video file URLs at the following JWPLayer URL occurs periodically:

http://videos-f.jwpsrv.com/content/conversions/{VideoFileIDs}

However, when deployed to an S3 bucket to be served statically, this error no longer occurs and everything works.




This project uses the AMD pattern via requirejs for some basic module definition and the r.js optimizer. There is an r.js build file already configured in assets/js/build.js. To use r.js with the provided build.js file, makes sure your downloaded r.js file is located at the same level as the JWPlayer+Vue repo directory and run the following command: 

```$ r.js -o JWPlayer+Vue/assets/js/build.js```



In the same directory, this will create main-build.js, which you can then configure for use in the index.html (it is currently commented out)



Screen shot:

![](https://raw.githubusercontent.com/mdublin/Vuejs-JWPlayer-spa/master/screenshot1.png)

Screen shot (responsive):

![](https://raw.githubusercontent.com/mdublin/Vuejs-JWPlayer-spa/master/screenshot2.png)


