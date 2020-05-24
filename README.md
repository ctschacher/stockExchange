## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)



## About the Project
- displays shares as table
- uses RapidApi to connect with Yahoo Finance API to retrieve latest values

### RapidApi
- free if less than 500 requests per month
  - retrieving current values of all shares consumes just one request
  

## Getting Started
To get things working you need to provide some data. The shares of your portfolio goes into ...

### resources/shares.json
```JS
{
    "AOR.PA": { 
        "initialValue": 12.99,
        "quantity": 92
    },
    "BCS.PA": {
        "initialValue": 53.16,
        "quantity": 15
    },
    "EGI.PA": {
        "initialValue": 9.60,
        "quantity": 80
    }
}
```


### resources/apiKey.json
And the API key for the rapid API ...
```JS
{
    "apiKey": "a12b13c14bb2c1a92390cd1221"
}
```