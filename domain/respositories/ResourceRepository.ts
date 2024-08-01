import { Resource } from '../entities/Resource'

export interface ResourceRepository {
  create: (resource: Resource) => Promise<Resource>
  findAll: () => Promise<Resource[]>
}
