// TypeScript interfaces for Article data

export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArticlesData {
  articles: Article[];
}

export interface PublishedArticlesData {
  publishedArticles: Article[];
}

export interface ArticleData {
  article: Article;
}

export interface ArticleVars {
  id: string;
}
