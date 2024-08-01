import { ResourceRepository } from '../../domain/respositories/ResourceRepository'
import { Resource } from '../../domain/entities/Resource'

export class FindResource {
  constructor (
    private readonly resourceRepository: ResourceRepository
  ) { }

  async find (): Promise<Resource[]> {
    return await this.resourceRepository.findAll()
  }
}
