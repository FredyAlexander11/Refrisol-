
import csv
from flask import Flask, request, jsonify, render_template #libreria
import pandas as pd    #librería para archivos excel y csv
import os     #librería para ingresar al sistema operativo 

app = Flask(__name__) #inicializamos el flask

@app.route("/") #funcion creacion de la ruta para el index
def index(): #ruta para el index
    return render_template("index.html") #ruta para el index

@app.route("/formulario")
def formulario():
    return render_template("form.html")

@app.route("/lavadoras")
def lavadoras():
    return render_template("lavadoras.html")

@app.route("/guardar", methods=["POST"]) #ruta para guardar los datos
def guardar():
    datos = request.get_json()   #obtenemos los datos del formulario
    
    nuevo_dato = pd.DataFrame([{
        "Nombre": datos.get("nombre"), 
        "Telefono": datos.get("telefono"),
        "Correo": datos.get("correo"),
        "Dirección": datos.get("direccion"),
        "Tipo de servicio": datos.get("select"),
        "Fecha": datos.get("fecha"),
        "Tipo de maquina": datos.get("select1"),
        "Comentarios": datos.get("mensaje")
    }])
    
    archivo_excel = "clientes.xlsx"
    os.makedirs("Data", exist_ok=True)
    ruta_archivo = os.path.join("Data", archivo_excel)

    if os.path.exists(ruta_archivo):
        df = pd.read_excel(ruta_archivo)
        df_final = pd.concat([df, nuevo_dato], ignore_index=True)
    else:
        df_final = nuevo_dato
    df_final.to_excel(ruta_archivo, index=False)
    return jsonify({"sucess": True})

if __name__ == "__main__":
    app.run(debug=True)

