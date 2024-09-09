crear un entorno virtual
py -m venv .env

activar el entorno
.env\Scripts\activate

En caso de error al activar el entorno ejecutar el siguiente comando
como administrador en powershell: Set-ExecutionPolicy RemoteSigned

instalar los requerimientos
py -m pip install -r requirements.txt