CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    product_quantity integer NOT NULL,
    status text,
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_id FOREIGN KEY (product_quantity)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);