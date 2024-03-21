# This project representing the smart lockit system BackEnd

## Available Scripts

In the project directory, you can run:

### `npm run start` or `npm start`

### while developing open in nodemon `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5000/](http://localhost:5000/) to view it in your browser.

## Available Data collection

### userDetails

### device

## Available APIs

#### Register a new user

(POST)
@post
### `http://localhost:5000/api/users/register`

Sample Request Body

```
{
    "username": "pradishan",
    "email": "sha@gmail.com",
    "phoneNumber": "1231235235",
    "password": "*******"
}
```

#### login a user

(POST)
### `http://localhost:5000/api/users/login`

Sample Request Body

```
{
    "email": "sha@gmail.com",
    "password": "*******"
}
```
#### logout a user

(POST)
### `http://localhost:5000/api/users/logout`

#### change user password

(PUT)
### `http://localhost:5000/api/users/change-password`

Sample Request Body 

```
{
    "email": "sha@gmail.com",
    "oldPassword": "******",
    "newPassword": "XXXXXXXX"
}
```

#### Get A user

(GET)
### `http://localhost:5000/api/users/:id/profile`

#### Get All User

(GET)
### `http://localhost:5000/api/users/allprofile`

#### Delete a user

(DELETE)
### `http://localhost:5000/api/users/:id/deleteUser`

#### Update a user

(PUT)
### `http://localhost:5000/api/users/:id/profile`

Sample Request Body 

```
{
    "username": "sharoon",
    "email": "adsadad@gmail.com",
    "phoneNumber": "349848585"
}
```

### Devices APIs

#### Register a new Device
(POST)
### `http://localhost:5000/api/devices/register`

Sample Request Body

```
{
    "deviceID": "12312",
    "owner": "adsadad@gmail.com"
}
```

#### Lock a device

(POST)
### `http://localhost:5000/api/devices/:deviceID/lock`

```
{
    "ownerID": "65fXXXXXXXXXc342"
}
```

#### Unlock a device

(POST)
### `http://localhost:5000/api/devices/:deviceID/unlock`

```
{
    "ownerID": "65fXXXXXXXXXc342"
}
```

#### Block a device

(POST)
### `http://localhost:5000/api/devices/:deviceID/block`

```
{
    "ownerID": "65fXXXXXXXXXc342"
}
```

#### UnBlock a device

(POST)
### `http://localhost:5000/api/devices/:deviceID/unblock`

```
{
    "ownerID": "65fXXXXXXXXXc342"
}
```

#### Get a device

(GET)
### `http://localhost:5000/api/devices/:deviceID`

#### Get a device by owner

(GET)
### `http://localhost:5000/api/devices/:owner/devices`

#### Get All device

(GET)
### `http://localhost:5000/api/devices/allDevices`

#### Delete device

(DELETE)
### `http://localhost:5000/api/devices/:deviceID/delete`

