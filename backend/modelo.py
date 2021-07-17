from flask import Flask, render_template, request
from flask_mysqldb import MySQL
from flask import jsonify
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '988991495dD'
app.config['MYSQL_DB'] = 'meumenu'

mysql = MySQL(app)

@app.route('/',methods=['GET','POST'])
def index():
    if request.method == "POST":
        num = request.form.get('num')
        cur = mysql.connection.cursor()
        cur.execute("insert into teste(id) values(%s)",[num])
        mysql.connection.commit()
        cur.close()
        return 'success'
    return """
        <form method="POST">
            <div><label>Numero: <input type="text" name="num"></label></div>
            <input type="submit" value="Submit">
        </form>
    """

@app.route('/get',methods=['GET','POST'])
def id():
    cur = mysql.connection.cursor()
    resultIds = cur.execute("SELECT * FROM fornecedores")
    if resultIds > 0:
        ids = cur.fetchall()
        cur.close()
        print(type(ids))
        return jsonify(ids)
    cur.close()    
    return "Falhou"

@app.route('/get/categoriaItens', methods = ['GET', 'POST'])
def getCatItem():
    cur = mysql.connection.cursor()
    resultado = cur.execute("SELECT * FROM categoria;")
    categorias = []
    categoriasItens = []
    nomesColunas = ["title", "data"]
    if resultado > 0:
        categorias = cur.fetchall()
    for categoria in categorias:    
        resultado = cur.execute("SELECT * FROM item WHERE id_categoria = %s;", [categoria[0]])
        if resultado > 0:
            itens = cur.fetchall()
            categoriasItens.append(dict(zip(nomesColunas,(categoria[1] , itens))))
     
    cur.close()
    return jsonify(categoriasItens)

@app.route('/insert/fornecedor', methods = ['GET', 'POST'])
def createLoja():
    nome = request.args.get('nome')
    email = request.args.get('email')
    senha = request.args.get('senha')
    if request.method == 'POST':
        print("ENTREI")
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO fornecedores(email, nome, senha) VALUES(%s, %s, %s)", [email,nome,senha])
        mysql.connection.commit()
        cur.close()
        print("OK")
        return "SUCESSO"
    
    return str(request.args)


if __name__ == '__main__':
    app.run(host= '0.0.0.0')