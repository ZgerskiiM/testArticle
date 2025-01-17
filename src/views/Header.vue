<template>
    <div class="header-main">
      <div class="header">
        <img :src="coverImage" alt="Cover">
        <button class="edit-cover" @click="triggerCoverUpload">
          <i class="fas fa-edit"></i> Изменить обложку
        </button>
        <input
          type="file"
          ref="coverInput"
          @change="handleCoverChange"
          style="display: none"
          accept="image/*"
        >
      </div>

      <div class="profile-info">
        <div class="profile-photo-container">
          <img :src="profileImage" alt="Profile" class="profile-photo">
          <button class="edit-profile-photo" @click="triggerProfileUpload">
            <i class="fas fa-camera"></i> Изменить
          </button>
          <input
            type="file"
            ref="profileInput"
            @change="handleProfileChange"
            style="display: none"
            accept="image/*"
          >
        </div>

        <div v-if="!isEditing" class="profile-display">
          <h2>{{ profileData.name }}</h2>
          <p class="location">
            <i class="fas fa-map-marker-alt"></i>
            {{ profileData.location }}
          </p>
          <p class="description">{{ profileData.description }}</p>
          <button class="edit-profile-btn" @click="startEditing">
            <i class="fas fa-edit"></i> Редактировать профиль
          </button>
        </div>

        <div v-else class="edit-form">
          <div class="form-group">
            <label>Имя</label>
            <input v-model="editedData.name" placeholder="Введите имя">
          </div>
          <div class="form-group">
            <label>Местоположение</label>
            <input v-model="editedData.location" placeholder="Введите местоположение">
          </div>
          <div class="form-group">
            <label>Описание</label>
            <textarea
              v-model="editedData.description"
              placeholder="Введите описание"
              rows="3"
            ></textarea>
          </div>
          <div class="form-actions">
            <button class="save-btn" @click="saveChanges">
              <i class="fas fa-save"></i> Сохранить
            </button>
            <button class="cancel-btn" @click="cancelEditing">
              <i class="fas fa-times"></i> Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';

  const coverImage = ref('/default-cover.jpg');
  const profileImage = ref('/default-profile.jpg');
  const coverInput = ref<HTMLInputElement | null>(null);
  const profileInput = ref<HTMLInputElement | null>(null);
  const isEditing = ref(false);

  const profileData = ref({
    name: 'Марк Згерский',
    location: 'Санкт-Петербург',
    description: 'СПбГУПТД (бывш. СПГУТД)'
  });

  const editedData = ref({ ...profileData.value });

  const triggerCoverUpload = () => {
    coverInput.value?.click();
  };

  const triggerProfileUpload = () => {
    profileInput.value?.click();
  };

  const handleCoverChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        coverImage.value = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.value = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditing = () => {
    editedData.value = { ...profileData.value };
    isEditing.value = true;
  };

  const saveChanges = () => {
    profileData.value = { ...editedData.value };
    isEditing.value = false;
  };

  const cancelEditing = () => {
    isEditing.value = false;
  };
  </script>

<style scoped>
.main-window {
  max-width: 70vw;
  margin: 0 auto;
  color: rgb(237, 237, 237);
}

.profile-section {
  display: flex;
  position: relative;
}

.profile-photo-container {
  position: relative;
  margin-right: 20px;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgb(139, 139, 139);
  object-fit: cover;
  background-color: #fff;
}

.edit-cover,
.edit-profile-photo {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 8px 20px;
  margin-right: 1vw;
  cursor: pointer;
  border-radius: 10px;
  width: auto;
}

.edit-cover {
  top: 10px;
  right: 10px;
}

.edit-profile-photo {
  margin-top: 10vh;
  width: 10%;
  font-size: 0.8em;
}

img {
  border-radius: 2vw 2vw 0 0;
}

.profile-info {
  flex: 1;
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 16px 16px 2vw 2vw;
  box-shadow: 0 2px 4px rgba(197, 115, 115, 0.1);
  margin-top: -50px;
  position: relative;
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

.header-main {
  margin-top: 3vh;
  border: 2px solid gray;
  border-radius: 2vw;
}

.header {
  text-align: center;
  color: rgb(0, 0, 0);
  height: 30vh;
  position: relative;
  overflow: hidden;
  z-index: 1;
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

.articles-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-article {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.article-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px solid #5a5a5a;
  border-radius: 5vh;
  background: #3c3c3c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-content {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  flex: 1;

}

.article-content h3 {
  margin: 0 0 10px;
  font-size: 1.25rem;
  font-weight: bold;
  word-wrap: break-word;
}

.article-content p {
  margin: 0;
  color: #fff;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.article-actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.likes-dislikes {
  display: flex;
  gap: 10px;
  padding: 0 20px;
  margin-top: 10px;
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: auto;
}

.edit-btn {
  background-color: #1385fe;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.like-btn,
.dislike-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.like-btn {
  background-color: #28a745;
  color: white;
}

.like-btn:hover {
  background-color: #218838;
}

.dislike-btn {
  background-color: #dc3545;
  color: white;
}

.dislike-btn:hover {
  background-color: #c82333;
}

.comments-section {
  margin-top: 15px;
  padding: 0 20px;
  border-top: 1px solid #ccc;
}

.comment {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.comment:last-child {
  border-bottom: none;
}

.add-comment {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.add-comment input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 40vw;
  height: 3vh;
}

.add-comment button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-comment button:hover {
  background-color: #0056b3;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
}

.location {
  color: #888;
  margin: 5px 0;
}

.description {
  margin: 10px 0;
}

.edit-profile-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-profile-btn:hover {
  background-color: #0056b3;
}

.edit-btn:hover {
  background-color: #0e6cd4;
}

.delete-btn:hover {
  background-color: #bd2130;
}

.add-article:hover {
  background-color: #0056b3;
}

.edit-cover:hover,
.edit-profile-photo:hover {
  background: rgba(0, 0, 0, 0.8);
}

.articles-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #ededed;
}

.comments-section h4 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.comment strong {
  color: #ededed;
}

.comment p {
  margin: 5px 0;
  color: #ededed;
}

.edit-form input,
.edit-form textarea {
  background-color: #3a3a3a;
  color: #ededed;
  border: 1px solid #4a4a4a;
}

.edit-form input:focus,
.edit-form textarea:focus {
  outline: none;
  border-color: #007bff;
}

@media (max-width: 768px) {
  .main-window {
    max-width: 90vw;
  }

  .profile-section {
    flex-direction: column;
    align-items: center;
  }

  .profile-photo-container {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .article-actions {
    flex-direction: column;
  }

  .add-comment {
    flex-direction: column;
  }

  .add-comment input {
    width: 100%;
  }

  .edit-cover,
  .edit-profile-photo {
    padding: 6px 12px;
    font-size: 0.7em;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.article-card {
  animation: fadeIn 0.3s ease-in;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.error-message {
  color: #dc3545;
  margin: 5px 0;
  font-size: 0.9rem;
}

.success-message {
  color: #28a745;
  margin: 5px 0;
  font-size: 0.9rem;
}

input::placeholder,
textarea::placeholder {
  color: #888;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:focus,
input:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

textarea {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
}

textarea::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::selection {
  background-color: #007bff;
  color: white;
}

.drag-over {
  border: 2px dashed #007bff !important;
  background-color: rgba(0, 123, 255, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
  </style>
