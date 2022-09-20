## Database schema
![Database schema](https://github.com/HusseinSamy/storefront-api/blob/master/photos/database%20schema.png)


## API Endpoints

### Products
* **Index -** `GET /products` 
* **Show -** `GET /products/:id`     
* **Create [token required] -** `POST /products`
* **Top 5 most popular products -** `GET /products/top5`
* **Products by category -** `GET /products/productByCategory`    
### Users
* **Index [token required] -** `GET /users`      
* **Show  [token required] -** `GET /users/:id`
* **Create -** `POST /users`

### Orders
* **Current Order by user -** `GET /orders/:id/products`     
* **Completed Orders by user [token required] -** `GET /orders/completedOrdersByUser/:id`
* **Orders of certain user -** `GET /orders/:id`
* **Create an order for user -** `POST /orders`
