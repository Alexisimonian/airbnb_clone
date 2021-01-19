# Airbnb Clone JS

<img src='https://gitreposas.s3.amazonaws.com/index.png' align='right' alt='airbnb-logo' width='100px'/>

This app is a clone of the main features of Airbnb in JavaScript. You can access it by following this link: [airbnb-clone-alexisimonian](https://airbnb-clone-alexissimonian.herokuapp.com/).<br>
<u>**It includes:**</u>

* **Searching for stays**: users can see available stays according to search preferences.
<p align='center'>
<img src='https://gitreposas.s3.amazonaws.com/staylistclonebnb.png' alt='clone-airbnb-stays' width='700px'/>
</p>
<br>

* **Booking a stay :** users can book stays and see their bookings on their account page.
* **Adding stays :** users can add stays to the website.

<p align='center'>
<img src='https://gitreposas.s3.amazonaws.com/addstayclone.png' alt='clone-airbnb-userinfos' width='700px'/>
</p>

* **User management :** users can sign-in and out, see their profile information, modifty them and delete them.
<p align='center'>
<img src='https://gitreposas.s3.amazonaws.com/modaccinfosbnbclone2.gif' alt='clone-airbnb-userinfos' width='700px'/>
</p>


## How it works

Users can search for a stay from the search bar from homepage. The only field that is mandatory is the location field. The other ones can be left blank.

<p align='center'>
<img src='https://gitreposas.s3.amazonaws.com/homepagebnbclone.png' alt='home-page-airbnbclone' width='700px'/>
</p>
<br>

After selecting the house they like, they can book it by clicking on it. If they're not connected a prompt will ask them to identify themselves. Once done, they can see their bookings or unbook them on their account page.

<br>
<p align='center'>
<img src='https://gitreposas.s3.amazonaws.com/bookastay.png' alt='home-page-airbnbclone' width='700px'/>
</p>
<br>

All adress fields are autocompleted/corrected by **google's map api** ensuring getting correct information and making user experience better.

<br>

## Tools used

| Tool | Used for |
|---|---|
| [NodeJS], [ExpressJS] | Backend controls |
| [JQuery], [JQuery Datepicker] | Frontend controls + Base for datepicker |
| [Mysql], [ClearDB] | Database management |
| [Heroku] | Hosting + Environment variables |
| [Google Map API] | Map + Geocoder + Autocomplete + Positioning markers + Extra information from addresses (e.g. latitude and longitude) |
| [AWS-SDK], [Multer], [Multer-S3] | Cloud file management |
| [Bcrypt] | Crypt users' passwords |

[NodeJS]: https://nodejs.org/en/
[ExpressJS]: https://expressjs.com/
[JQuery]: https://jquery.com/
[JQuery Datepicker]: https://jqueryui.com/datepicker/
[Mysql]: https://www.mysql.com/
[ClearDB]: https://www.cleardb.com/
[Heroku]: www.heroku.com
[Google Map API]: https://developers.google.com/maps/documentation/javascript/overview
[AWS-SDK]: https://aws.amazon.com/sdk-for-javascript/
[Multer]: https://github.com/expressjs/multer
[Multer-S3]: https://www.npmjs.com/package/multer-s3
[Bcrypt]: https://www.npmjs.com/package/bcrypt