export interface ICategoryDto {
  name: string;
  description: string;
  media_id: number | null;
  parent_id: number | null;
}

export class CategoryDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly mediaId: number | null,
    public readonly parentId: number | null,
  ) {}

  public toApi(): ICategoryDto {
    return {
      name: this.name,
      description: this.description,
      media_id: this.mediaId,
      parent_id: this.parentId,
    };
  }
}