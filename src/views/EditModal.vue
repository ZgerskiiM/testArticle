<!-- EditModal.vue -->
<template>
    <div class="modal">
      <div class="modal-content">
        <h1>{{ isEditing ? 'Редактировать статью' : 'Новая статья' }}</h1>
        <form @submit.prevent="saveArticle">
          <label>
            Заголовок:
            <input v-model="title" required />
          </label>
          <label>
            Содержание:
            <textarea v-model="content" required></textarea>
          </label>
           <button class="edit-cover" @click="triggerCoverUpload">
            <i class="fas fa-edit"></i> Добавить фото
            </button>
            <input
            type="file"
            ref="coverInput"
            @change="handleCoverChange"
            style="display: none"
            accept="image/*"
            />
            <img :src="coverImage1" alt="Preview" class="cover-preview" v-if="coverImage1" />
          <div class="button-group">
            <button type="submit">Сохранить</button>
            <button type="button" @click="$emit('close')">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted, computed, provide  } from 'vue';
import { useArticleStore } from '@/store/articles';


const props = defineProps<{
  articleId: number | null;
}>();

const saveArticle = () => {
  emit('save', {
    title: title.value,
    content: content.value,
    coverImage1: coverImage1.value, 
  });
};

const triggerCoverUpload = () => {
  coverInput.value?.click();
};



const handleCoverChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      coverImage1.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const coverInput = ref<HTMLInputElement | null>(null);
const coverImage1 = ref('/default-cover.jpg');

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', article: { title: string; content: string }): void;
}>();

const articleStore = useArticleStore();
const title = ref('');
const content = ref('');

const isEditing = computed(() => props.articleId !== null);



onMounted(() => {
  if (props.articleId !== null) {
    const article = articleStore.getArticleById(props.articleId);
    if (article) {
      title.value = article.title;
      content.value = article.content;
    }
  }
});

provide('coverImage1', coverImage1);


</script>


  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: rgb(67, 67, 67);
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
  }

  .cover-preview {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 10px;
  }

  input, textarea {
    width: 100%;
    padding: 5px;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  button {
    padding: 5px 10px;
  }
  </style>
