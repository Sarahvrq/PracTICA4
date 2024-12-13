import { MongoClient } from "mongodb";
import type { Usuario_M, Proyecto_M, Tarea_M } from "./types.ts";
import {
  fromModeltoUsuario,
  fromModeltoProyecto,
  fromModelToTarea,
} from "./utils.ts";

const url = Deno.env.get("MONGO_URL");

if (!url) {
  console.error("Sin conexion");
  Deno.exit(1);
}

const client = new MongoClient(url);
await client.connect();
console.info("Conectado a MongoDB :)");

const DB = client.db("PRAC4-BE");

const UsuarioCollection = DB.collection<Usuario_M>("Usuarios");
const ProyectosCollection = DB.collection<Proyecto_M>("Proyectos");
const TareaCollection = DB.collection<Tarea_M>("Tareas");

const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;
  const searchParam = url.searchParams;


  if (method === "GET") {
    if (path === "/users") {
      const name = url.searchParams.get("name");

      if(name){ //repasar conceptos (cada linea)
        const userDB = await UsuarioCollection.find({name}).toArray();
        const users = await Promise.all(
          userDB.map((u)=>fromModeltoUsuario(u))
        )
        return new Response(JSON.stringify(users));
      }else{
        const userDB = await UsuarioCollection.find().toArray();
        const users = await Promise.all(
          userDB.map((u)=>fromModeltoUsuario(u))
        )
        return new Response(JSON.stringify(users));
      }
    }else if (path === "/user"){
      const id = url.searchParams.get()
    }

    } else if (path === "/projects") {
    } else if (path === "/tasks") {
    }
  } else if (method === "POST") {
    if (path === "/users") {
    } else if (path === "/projects") {
    } else if (path === "/tasks") {
     
    }
  } else if (method === "DELETE") {
    if (path === "/users") {
    } else if (path === "/projects") {
    } else if (path === "/tasks") {
    }

  }
  return new Response("Endpoint not found", { status: 404 });

};

Deno.serve({ port: 3000 }, handler);
