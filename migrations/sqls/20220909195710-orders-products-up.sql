CREATE TABLE products_orders (
id SERIAL PRIMARY KEY, 
product_id INTEGER NOT NULL,
order_id INTEGER NOT NULL, 
product_quantity INTEGER NOT NULL,
CONSTRAINT product_id FOREIGN KEY (product_id)
    REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION 
        ON DELETE NO ACTION,
CONSTRAINT order_id FOREIGN KEY (order_id)
    REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION 
        ON DELETE NO ACTION
);