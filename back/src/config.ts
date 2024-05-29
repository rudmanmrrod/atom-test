export const firebaseConfig = {
  apiKey: "AIzaSyALbGCM7hSonF4GVU-QjVrRafqJENoX25k",
  authDomain: "atomtest-75339.firebaseapp.com",
  projectId: "atomtest-75339",
  storageBucket: "atomtest-75339.appspot.com",
  messagingSenderId: "150563149043",
  appId: "1:150563149043:web:880339fd3c2d4a947bd386",
  measurementId: "G-NREK0828ZS"
};

export const ApiList: string[] = [
  "GET /tasks: Obtener la lista de todas las tareas.",
  "POST /tasks: Agregar una nueva tarea.",
  "PUT /tasks/{taskId}: Actualizar los datos de una tarea existente.",
  "DELETE /tasks/{taskId}: Eliminar una tarea existente.",
  "GET /users/{email}: Busca el usuario si ha sido creado",
  "POST /users : Agrega un nuevo usuario"
]