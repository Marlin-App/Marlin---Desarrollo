Dentro de la carpeta BackEnd crear un entorno virtual
py -m venv .env

activar el entorno
.env\Scripts\activate

En caso de error al activar el entorno ejecutar
el siguiente comando como administrador en powershell
Set-ExecutionPolicy RemoteSigned

Instalar los requerimientos
py -m pip install -r requirements.txt

Dentro de la carpeta src inicar el servidor
py manage.py runserver