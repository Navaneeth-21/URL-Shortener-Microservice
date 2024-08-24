# URL Shortener Microservice
A Url shortner microserivce which is used to shorten the url provided using crypto package(hashing)
 - Validates the provided url using a package 'validator'
 - converting the url into a 8 digit hashed integer using crypto which can navigate to the actual url
 - It consists of following Endpoints :
   
   - POST REQUEST ( ' /api/shorturl ' ) => stores the provided url in a In-memory storage called MAP
   - GET REQUEST ( ' /api/shorturl/:shorturl ' ) => navigate to the actual link using the shorturl
