import base64

class Store:
    
    def __init__(self, conn, store_id):
        self.conn = conn
        self.store_id = store_id
              
    def categories(self):
        return self.conn.read_query("""
            SELECT 
                category.name,
                category.description,
                category.id,
                COALESCE(data, '[]') as data
            FROM category
            LEFT JOIN store 
                ON store_id = store.id
            LEFT JOIN (
                SELECT category_id, jsonb_agg(
                    jsonb_build_object(
                        'id', product.id,
                        'name', product.name,
                        'description', product.description,
                        'price', product.price,
                        'category_id', product.category_id,
                        'photo', encode(product.photo, 'base64'),
                        'promotional_price', product.promotional_price
                    )
                ) AS data
                FROM product
                LEFT JOIN category 
                    ON category_id = category.id
                WHERE store_id = %s
                GROUP BY category_id          
            ) alias
                ON category_id = category.id
            WHERE store.id = %s
        """, [self.store_id, self.store_id]).to_dict(orient = 'records')
    
    def create_category(self, name, description):
        return self.conn.read_query("""
            INSERT INTO category (name, description, store_id)
            VALUES
            (%s, %s, %s)
            RETURNING *
        """, [name, description, self.store_id]).to_dict(orient = 'records')[0]
        
    def delete_category(self, category_id):
        return self.conn.read_query("""
            DELETE FROM category CASCADE
            WHERE id = %s
            RETURNING *
        """, [category_id]).to_dict(orient = 'records')[0]
    
    def update_category(self, category_id, name, description):
        return self.conn.read_query("""
            UPDATE category
            SET 
                name = %s,
                description = %s
            WHERE id = %s
            RETURNING *
        """, [name, description, category_id]).to_dict(orient = 'records')[0]

    def update_payment(self, aceita_credito, aceita_debito, aceita_dinheiro, aceita_pix):
        return self.conn.read_query("""
            UPDATE store
            SET 
            aceita_credito = %s,
            aceita_debito = %s,
            aceita_dinheiro = %s,
            aceita_pix = %s
            WHERE id = %s
            RETURNING *
        """, [aceita_credito, aceita_debito, aceita_dinheiro, aceita_pix, self.store_id]).to_dict(orient = 'records')[0]
        
    def get_payment(self):
        return self.conn.read_query("""
            SELECT s.aceita_credito, s.aceita_debito, s.aceita_dinheiro, s.aceita_pix
            FROM store s
            WHERE id = %s
        """, [self.store_id]).to_dict(orient = 'records')[0]
        
    def products(self):
        data = self.conn.read_query("""
            SELECT product.id, product.name, product.description, product.price, product.category_id, product.photo
            FROM product
            LEFT JOIN category
                ON category_id = category.id
            WHERE store_id = %s
        """, [self.store_id])
        data['photo'] = data['photo'].apply(lambda x: base64.b64encode(x).decode("utf8"))

        return data.to_dict(orient = 'records')
    
    def get_promotional_price(self, id):
        data = self.conn.read_query("""
            SELECT product.promotional_price
            FROM product
            WHERE product.id = %s
        """, [id])
        
        return data.to_dict(orient = 'records')[0]
        
    def update_promotional_price(self, promotional_price, product_id):
        data = self.conn.read_query("""
            UPDATE product
            SET promotional_price = %s
            WHERE id = %s
            RETURNING *
        """, [promotional_price, product_id])
        return "Sucesso"
    
    def additional_options(self, product_id):
        data = self.conn.read_query("""
            SELECT * 
            FROM additional_options
            WHERE product_id = %s
        """, [product_id])
        return data.to_dict(orient = 'records')
    
    def add_additional_options(self, name, price, product_id):
        data = self.conn.read_query("""
            INSERT INTO additional_options (name, price, product_id)
            VALUES
            (%s, %s, %s)
            RETURNING *
        """, [name, price, product_id])
        
        return 'Op????o Adicional Adicionada'

    def delete_additional_options(self, id):
        data = self.conn.read_query("""
            DELETE FROM additional_options
            WHERE id = %s
            RETURNING *
        """, [id])
        
        return 'Op????o Adicional Deletada'

    def create_product(self, name, description, price, photo, category_id):
        if self.conn.DEBUG:
            self.conn.DEBUG = False
        data = self.conn.read_query("""
            INSERT INTO product (name, description, price, photo, category_id)
            VALUES
            (%s, %s, %s, %s, %s)
            RETURNING *
        """, [name, description, price, photo, category_id])

        data['photo'] = data['photo'].apply(lambda x: base64.b64encode(x).decode("utf8"))

        return data.to_dict(orient = 'records')[0]

        
    def update_product(self, product_id, name, description, price, photo):
        data = self.conn.read_query("""
            UPDATE product
            SET 
                name = %s,
                description = %s,
                price = %s,
                photo = %s
            WHERE id = %s
            RETURNING *
        """, [name, description, price, photo, product_id])

        data['photo'] = data['photo'].apply(lambda x: base64.b64encode(x).decode("utf8"))

        return data.to_dict(orient = 'records')[0]

    def delete_product(self, product_id):
        data = self.conn.read_query("""
            DELETE FROM product
            WHERE id = %s
            RETURNING *
        """, [product_id])

        data['photo'] = data['photo'].apply(lambda x: base64.b64encode(x).decode("utf8"))

        return data.to_dict(orient = 'records')[0]
        
    def specialtys(self):
        return self.conn.read_query("""
            SELECT specialtys
            FROM store
            WHERE id = %s
        """, [self.store_id]).to_dict(orient = 'records')
        
    
    def update_specialtys(self, specialtys):        
        return self.conn.read_query("""
            UPDATE store
            SET specialtys = %s
            WHERE id = %s
            RETURNING *
        """, [specialtys, self.store_id]).to_dict(orient = 'records')[0]

    def address(self):
        return self.conn.read_query("""
            SELECT 
                adress_country,
                adress_city,
                adress_borough,
                adress_street
            FROM store
            WHERE id = %s
        """, [self.store_id]).to_dict(orient = 'records')[0]
        
    def update_address(self, adress_country, adress_city, adress_borough, adress_street):        
        return self.conn.read_query("""
            UPDATE store
            SET 
                adress_country = %s,
                adress_city = %s,
                adress_borough = %s,
                adress_street = %s
            WHERE id = %s
            RETURNING *
        """, [adress_country, adress_city, adress_borough, adress_street, self.store_id]).to_dict(orient = 'records')[0]
        
    def schedules(self):
        return self.conn.read_query("""
            SELECT id, store_id, dow_start, dow_end, opens_at::text, closes_at::text
            FROM schedule
            WHERE store_id = %s
        """, [self.store_id]).to_dict(orient = 'records')

    def add_schedule(self, dow_start, dow_end, opens_at, closes_at):
        return self.conn.read_query("""
            INSERT INTO schedule (dow_start, dow_end, opens_at, closes_at, store_id)
            VALUES
            (%s, %s, %s, %s, %s)
            RETURNING id, store_id, dow_start, dow_end, opens_at::text, closes_at::text
        """, [dow_start, dow_end, opens_at, closes_at, self.store_id]).to_dict(orient = 'records')[0]
        
    def delete_schedule(self, schedule_id):
        return self.conn.read_query("""
            DELETE FROM schedule
            WHERE id = %s
            RETURNING id, store_id, dow_start, dow_end, opens_at::text, closes_at::text
        """, [schedule_id]).to_dict(orient = 'records')[0]    


def create_store(
        conn,
        name,
        phone,
        email,
        password,
        specialtys,
        adress_country,
        adress_city,
        adress_borough,
        adress_street
    ):
    return conn.read_query("""
        INSERT INTO store (
            name,
            phone,
            email,
            password,
            specialtys,
            adress_country,
            adress_city,
            adress_borough,
            adress_street
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING *
    """, [
        name,
        phone,
        email,
        password,
        specialtys,
        adress_country,
        adress_city,
        adress_borough,
        adress_street
    ]).to_dict(orient = 'records')[0]


def store_login(
    conn,
    email,
    password
):

    data = conn.read_query("""
        SELECT *
        FROM store
        WHERE email = %s
        AND password = %s
    """, [email, password])

    return data