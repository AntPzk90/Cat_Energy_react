# my-app

Стартовый шаблон: React 19.2 + TypeScript + Vite + react-router-dom + SCSS (CSS Modules) + json-server.

## Установка

```bash
npm install
```

## Запуск

Нужно поднять два процесса — фронтенд и локальный API:

```bash
# терминал 1: json-server (данные в db.json, порт 4000)
npm run server

# терминал 2: dev-сервер Vite (порт 3000)
npm run dev
```

Адрес API задаётся в `.env` → `VITE_API_URL`.

## Структура

```
src/
  components/
    layout/       — Layout, Header, Footer
    ui/            — Button, Loader, ErrorBoundary
  hooks/           — useFetch и другие кастомные хуки
  pages/           — страницы = роуты (Home, NotFound)
  routes/          — конфиг react-router
  services/        — api.ts, обёртка над fetch
  styles/          — SCSS переменные, миксины, глобальные стили
  types/           — общие TS-типы
```

## Стили

Каждый компонент — свой `*.module.scss` рядом с файлом компонента (CSS Modules,
изоляция классов). Переменные (`_variables.scss`) и миксины (`_mixins.scss`)
подключаются автоматически во все scss-файлы через `additionalData` в `vite.config.ts`
— писать `@use` руками в каждом файле не нужно.

## Добавление новой страницы

1. `src/pages/NewPage/NewPage.tsx` + `NewPage.module.scss` + `index.ts`
2. Добавить роут в `src/routes/index.tsx`

## Работа с API

`src/services/api.ts` — обёртка над fetch (get/post/put/delete).
`src/hooks/useFetch.ts` — хук, оборачивает любой async-запрос,
сам следит за `isLoading`/`error`, ничего не знает про стейт компонента:

```tsx
const [fetchQuestions, isLoading, error] = useFetch(() => api.get<Question[]>('/questions'));

const result = await fetchQuestions();
if (result) setQuestions(result);
```
