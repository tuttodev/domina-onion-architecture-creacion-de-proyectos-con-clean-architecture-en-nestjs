import { config } from 'dotenv'
import { MongoClient } from 'mongodb'
import {MongoDBResourcesRepository} from "../../persistence/MongoDBResourcesRepository";
import {CreateResource} from "../../../application/usecases/CreateResource";
import {FindResource} from "../../../application/usecases/FindResources";

config();

const connect = async (uri: string) => {
  const client = new MongoClient(uri)

  try {
     await client.connect();

     return client
  } catch (error) {
    console.error(error)
    throw new Error('Error connecting to the database')
  }
}

const getDB = async (client: MongoClient) => {
  return client.db('testing')
}

(async () => {
  const uri = process.env.DB_URI!
  const client = await connect(uri)
  const db = await getDB(client)

  console.log('Connected to the database')

  const repository = new MongoDBResourcesRepository(db)
  const createResource = new CreateResource(repository)
  await createResource.create({
    name: 'PokéApi',
    documentationUrl: 'https://pokeapi.co/'
  })

  const findResources = new FindResource(repository)
  const resources = await findResources.find()

  console.log(resources)

  await client.close()
})()