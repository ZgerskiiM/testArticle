import { defineStore } from 'pinia';

interface Article {
  id: number;
  title: string;
  content: string;
  likes: number; 
  dislikes: number;
}

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [] as Article[]
  }),
  actions: {
    addArticle(article: Omit<Article, 'id' | 'likes' | 'dislikes'>) {
      const id = this.articles.length + 1;
      this.articles.push({
        id,
        ...article,
        likes: 0,
        dislikes: 0,
      });
    },
    updateArticle(id: number, updatedArticle: Omit<Article, 'id'>) {
      const index = this.articles.findIndex(article => article.id === id);
      if (index !== -1) {
        this.articles[index] = { id, ...updatedArticle };
      }
    },
    deleteArticle(id: number) {
      this.articles = this.articles.filter(article => article.id !== id);
    }
  },
  getters: {
    getArticleById: (state) => (id: number) => {
      return state.articles.find(article => article.id === id);
    }
  }
});
