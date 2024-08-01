import {ResourceRepository} from "../../domain/respositories/ResourceRepository";
import {Resource} from "../../domain/entities/Resource";
import {Collection, Db} from "mongodb";

export class MongoDBResourcesRepository implements ResourceRepository {
    private readonly resourcesCollection: Collection<Resource>;

    constructor(client: Db) {
        this.resourcesCollection = client.collection('resources');
    }

    async create(resource: Resource): Promise<Resource> {
        await this.resourcesCollection.insertOne(resource);

        return new Resource(resource.id, resource.name, resource.documentationUrl);
    }

    async findAll(): Promise<Resource[]> {
        const data = await this.resourcesCollection.find().toArray();

        return data.map(resource => new Resource(resource.id, resource.name, resource.documentationUrl))
    }
}