**dev notes**

For reasons still not identified, we seem to get 403 Forbidden errors on video files emanating from the following JWPLayer URL:

http://videos-f.jwpsrv.com/content/conversions/MGujs7qA/videos/9EkN93ib-29410351.mp4

When server the project locally for dev with Node http-server. However, when deployed to an S3 bucket and served statically, this error no longer occurs and everything works ok. 

The current implementation is hosting a JWPlayer locally (self-hoste) but the player is calling back to video assets uploaded to JWPlayer. 

Additionally, we are using background-video configuration. 

This project is using AMD but we have yet to implement a minifier/concatenator/compiler solution for both all the js and css files (will use r.js for js files)


