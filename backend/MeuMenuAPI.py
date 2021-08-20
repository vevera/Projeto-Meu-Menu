from DatabaseDAO import DatabaseDAO
from Store import Store, create_store, store_login

# Connection
CONNECTION = {
    'host': 'localhost',
    'port': 5432,
    'database': 'meumenu',
    'user': 'postgres',
    'password': 'postgres'
}
conn = DatabaseDAO(**CONNECTION)
conn.DEBUG = False


# API
from flask import Flask, request, make_response, jsonify
import json

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Welcome to MeuMenu API!</p>"

# Create New Store
@app.route("/store/sign", methods = ["POST"])
def app_create_store():
    data = request.get_json()
    return create_store(
        conn,
        data['name'],
        data['phone'],
        data['email'],
        data['password'],
        data['specialtys'],
        data['adress_country'],
        data['adress_city'],
        data['adress_borough'],
        data['adress_street']
    )

@app.route("/store/login", methods = ["GET"])
def app_store_information():
    params = request.args
    data = store_login(conn, **params)
    if not data.empty:
        return data.to_dict(orient = 'records')[0]
    else:
        return make_response("Non Authorized", 401)

@app.route("/store/<store_id>/payment", methods = ["PUT"])
def app_payment(store_id):

    store = Store(conn, store_id)

    if request.method == 'PUT':
        data = request.get_json()
        return jsonify(store.update_payment(**data))

@app.route("/store/<store_id>/categories", methods = ["GET", "POST", "PUT", "DELETE"])
def app_categories(store_id):

    store = Store(conn, store_id)
    if request.method == 'GET':
        params = request.args
        return jsonify({'response': store.categories()})
    
    elif request.method == 'POST':
        data = request.get_json()
        return jsonify(store.create_category(**data))
        
    elif request.method == 'PUT':
        data = request.get_json()
        return jsonify(store.update_category(**data))

    elif request.method == 'DELETE':
        data = request.get_json()
        return jsonify(store.delete_category(**data))

import base64
import io

@app.route("/store/<store_id>/products", methods = ["GET", "POST", "PUT", "DELETE"])
def app_products(store_id):

    store = Store(conn, store_id)
    if request.method == 'GET':
        params = request.args
        return jsonify({'response': store.products()})
    
    elif request.method == 'POST':
        data = request.get_json()
        
        im_b64 = data.pop('photo')
        img_bytes = base64.b64decode(im_b64.encode('utf-8'))
        img = io.BytesIO(img_bytes)
        data['photo'] = img_bytes
        
        return jsonify(store.create_product(**data))
        
    elif request.method == 'PUT':
        data = request.get_json()
        
        im_b64 = data.pop('photo')
        img_bytes = base64.b64decode(im_b64.encode('utf-8'))
        img = io.BytesIO(img_bytes)
        data['photo'] = img_bytes
        
        return jsonify(store.update_product(**data))

    elif request.method == 'DELETE':
        data = request.get_json()
        return jsonify(store.delete_product(**data))
    
@app.route("/store/<store_id>/promotion", methods = ["PUT", "GET"])
def app_promotion(store_id):
    store = Store(conn, store_id)
    
    if request.method == 'GET':
        params = request.args
        return jsonify(store.get_promotional_price(**params))
    elif request.method == 'PUT':
        data = request.get_json()
        return store.update_promotional_price(**data)


@app.route("/store/<store_id>/additional_options", methods = ["POST", "GET", "DELETE"])
def app_additional_options(store_id):
    store = Store(conn, store_id)
    
    if request.method == 'GET':
        params = request.args
        return jsonify({'response': store.additional_options(**params)})
    elif request.method == 'POST':
        data = request.get_json()
        return store.add_additional_options(**data)
    elif request.method == 'DELETE':
        data = request.get_json()
        return store.delete_additional_options(**data)
    
@app.route("/store/<store_id>/specialtys", methods = ["GET", "PUT"])
def app_specialtys(store_id):

    store = Store(conn, store_id)
    if request.method == 'GET':
        params = request.args
        return jsonify(json.dumps(store.specialtys()[0]))
    
    elif request.method == 'PUT':
        data = request.get_json()
        return jsonify(store.update_specialtys(**data))

@app.route("/store/<store_id>/schedules", methods = ["GET", "POST", "DELETE"])
def app_schedules(store_id):

    store = Store(conn, store_id)
    if request.method == 'GET':
        params = request.args
        return jsonify({'response': store.schedules()})
    
    elif request.method == 'POST':
        data = request.get_json()
        return jsonify(store.add_schedule(**data))
        
    elif request.method == 'DELETE':
        data = request.get_json()
        return jsonify(store.delete_schedule(**data))
    
@app.route("/store/<store_id>/address", methods = ["GET", "POST"])
def app_address(store_id):

    store = Store(conn, store_id)
    if request.method == 'GET':
        params = request.args
        return jsonify({'response': store.address()})
    
    elif request.method == 'POST':
        data = request.get_json()
        return jsonify(store.update_address(**data))
        
@app.route("/store/<store_id>/schedules/delete", methods = ["POST"])
def app_schedulesDelete(store_id):
    store = Store(conn, store_id)
    data = request.get_json()
    return jsonify(store.delete_schedule(**data))

app.run("0.0.0.0", port = 5000)