## API Endpoints

#### Products
* Index - GET /products     
* Show - GET /products/:id     
* Create [token required] - POST /products
* Top 5 most popular products - GET /products/top5
- Products by category - GET /products/productByCategory    
#### Users
* Index [token required] - GET /users      
* Show  [token required] - GET /users/:id
* Create - POST /users

#### Orders
* Current Order by user - GET /orders/:id/products     
* Completed Orders by user [token required] - GET /orders/completedOrdersByUser/:id
* Orders of certain user - GET /orders/:id
* Create an order for user - POST /orders
## Data Shapes

#### Product Table Schema
* id (Primary key)
* name
* price
* category

#### User Table Schema
* id (Primary key)
* firstName 
* lastName
* password

#### Orders Table Schema
* id (Primary key)
* user_id
* status of order

#### Products_Orders Table Schema
* id (primary key)
* user_id (foregin key references id column in users table)
* product_id (foregin key references id column in products table)
* product quantity