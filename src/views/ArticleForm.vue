<template>
    <div>
      <h1>{{ isEditing ? 'Edit Article' : 'New Article' }}</h1>
      <form @submit.prevent="saveArticle">
        <label>
          Title:
          <input v-model="title" required />
        </label>
        <label>
          Content:
          <textarea v-model="content" required></textarea>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useArticleStore } from '@/store/articles.ts';
  import { useRoute, useRouter } from 'vue-router';

  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const articleStore = useArticleStore();

      const isEditing = ref(false);
      const title = ref('');
      const content = ref('');

      onMounted(() => {
        if (route.params.id) {
          isEditing.value = true;
          const article = articleStore.getArticleById(Number(route.params.id));
          if (article) {
            title.value = article.title;
            content.value = article.content;
          }
        }
      });

      const saveArticle = () => {
        if (isEditing.value && route.params.id) {
          articleStore.updateArticle(Number(route.params.id), { title: title.value, content: content.value });
        } else {
          articleStore.addArticle({ title: title.value, content: content.value });
        }
        router.push('/articles');
      };

      return {
        isEditing,
        title,
        content,
        saveArticle
      };
    }
  });
  </script>

<style scoped>
.profile-section {
  display: flex;
  padding: 20px;
  margin-top: -50px;
  position: relative;
}

.profile-photo-container {
  position: relative;
  margin-right: 20px;
}

.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  background-color: #fff;
}

.edit-cover, .edit-profile-photo {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  width: auto;
}

.edit-cover {
  top: 10px;
  right: 10px;
}

.edit-profile-photo {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  font-size: 0.8em;
}

.profile-info {
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-form input,
.edit-form textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.edit-form button {
  width: auto;
  padding: 8px 16px;
  margin-right: 10px;
}

.header {
  text-align: center;
  color: rgb(0, 0, 0);
  height: 30vh;
  position: relative;
  overflow: hidden;
}

.header img {
  width: 100%;
  height: 80%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
}

  .header h1 {
    font-size: 2.5rem;
    margin: 0;
  }

  .articles-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px;
  }

  .article-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Изменено с center на flex-start */
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap; /* Добавлено */
}

  .article-content h3 {
    margin: 0;
    font-size: 1.25rem;
  }

  .article-content {
  flex: 1;
  min-width: 0; /* Добавлено */
  margin-right: 20px; /* Добавлено */
}

  .article-content p {
  margin: 5px 0 0;
  color: #555;
  word-wrap: break-word; /* Добавлено */
  overflow-wrap: break-word; /* Добавлено */
  white-space: pre-wrap; /* Добавлено */
}
  .article-actions {
    display: flex;
    gap: 10px;
  }

  .edit-btn, .delete-btn {
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .edit-btn {
    background-color: #007bff;
    color: white;
  }

  .delete-btn {
    background-color: #dc3545;
    color: white;
    height: 10px;
  }

  .add-article {
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    text-align: center;
  }

  .add-article:hover {
    background-color: #218838;
  }



  button {
    width: 10vw;
  }
  </style>
