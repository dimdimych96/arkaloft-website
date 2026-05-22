// Типы для блога
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number; // минуты
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}
