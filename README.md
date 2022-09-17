# Setup the project
* run `npm i`
* setup the database
* add .env file to root folder
* add database.json file to root folder
* run `db-migrate up`
* run `npm run start`

# Test the project
* run `npm run test`

# Ports
* Database port: default (5432)
* Server: 3000

# Environment variables
```
POSTGRES_DB=storefront_dev
POSTGRES_TEST_DB=storefront_test
POSTGRES_HOST=127.0.0.1
POSTGRES_USER=storefront_user
POSTGRES_PASSWORD=123456789
TOKEN_SECRET=DontTell4ny0ne7hatIam4Weak5ecret!SHHH!
BCRYPT_PASSWORD=14m7he5tr0ngestPassw0rdPepper1n7heW0rld!
SALT_ROUNDS=10
ENV=dev 
```

# Database.json variables
```
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "storefront_dev",
      "user": "storefront_user",
      "password": "123456789"
    },
    
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "storefront_test",
      "user": "storefront_user",
      "password": "123456789"
    }
    
  }
```

# Database setup
```
-- Create databases 
CREATE DATABASE storefront_dev;
CREATE DATABASE storefront_test;

-- Create user
CREATE USER storefront_user WITH PASSWORD '123456789';

-- Grant privileges to user
GRANT ALL PRIVILEGES ON DATABASE "storefront_dev" TO storefront_user;
```
