import {Db, MongoClient} from "mongodb";

export class MongoDBFactory {
    static createConnection(uri: string): Promise<MongoClient> {
      const client = new MongoClient(uri ?? process.env.DB_URI!)

      return client.connect()
    }

    static getDB(client: MongoClient): Db {
      return client.db('testing')
    }
}