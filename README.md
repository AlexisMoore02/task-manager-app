# Task Manager (React + Firebase)

Приложение для управления задачами с авторизацией через Firebase. 
Пользователь может регистрироваться, входить в аккаунт, создавать, редактировать, удалять и фильтровать задачи.

## Технологии
- React (hooks, functional components)
- Redux Toolkit
- Firebase (Authentication + Firestore)
- Ant Design (UI)
- React Router

## Функционал
- Регистрация и авторизация пользователей (Firebase Auth)
- Сброс пароля через отправку письма на почту (Firebase Auth)
- CRUD операции с задачами (Firestore)
- Фильтрация задач: все / активные / выполненные
- Поиск задач по названию
- Адаптивный UI
- Поддержка светлой и темной темы
- Уведомления об успешных действиях и ошибках
- Loading States
- Частичная работа в offline режиме (при аутентификации ошибки при отсутствии интернета)



## Установка и запуск
#### Клонировать репозиторий
```bash
git clone https://github.com/AlexisMoore02/task-manager-app.git
```

#### Перейти в папку проекта
```bash 
cd task-manager-app
```

#### Установить зависимости
```bash 
npm install
```

#### Настроить Firebase:

1. Создайте проект Firebase
2. Включите:
   - Authentication (Email/Password)
   - Firestore (Collection: tasks)
3. Создайте .env в корне проекта и вставьте свои конфигурационные данные::
 
```ini
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=... 
```

#### Запуск проекта локально:
```bash
npm run dev
```

## Деплой
Приложение доступно по ссылке: [Task Manager Live](https://task-manager-9017d.web.app/)