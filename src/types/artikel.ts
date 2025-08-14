export interface Artikel {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  mediaType: string;
  date?: string;
  author?: string;
  viewers: number;
  createdAt: string;
}
