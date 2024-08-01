import { randomUUID } from 'crypto'
import { ResourceRepository } from '../../domain/respositories/ResourceRepository'
import { Resource } from '../../domain/entities/Resource'

interface Input {
  name: string
  documentationUrl: string
}

export class CreateResource {
  constructor (
    private readonly resourceRepository: ResourceRepository
  ) { }

  async create (input: Input): Promise<Resource> {
    return await this.resourceRepository.create(new Resource(
      randomUUID(),
      input.name,
      input.documentationUrl
    ))
  }
}
