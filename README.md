**Notes**

When served locally, a 403 error on video files emanating from the following JWPLayer URL occurs periodically:

http://videos-f.jwpsrv.com/content/conversions/MGujs7qA/videos/9EkN93ib-29410351.mp4


However, when deployed to an S3 bucket and served statically, this error no longer occurs and everything works. 

This project is using AMD but we have yet to implement a minifier/concatenator/compiler solution for both all the js and css files (will use r.js for js files).



Screen shot:

![](https://raw.githubusercontent.com/mdublin/Vuejs-JWPlayer-spa/master/screenshot1.png)

Screen shot (responsive):

![](https://raw.githubusercontent.com/mdublin/Vuejs-JWPlayer-spa/master/screenshot2.png)


