# studentDB — практика Mongo Shell

Проект містить готові скрипти `mongosh` для бази даних `studentDB`
і колекції `assignments`.

## Структура

```
.
├── package.json
├── README.md
└── src/
    ├── 01_crud.js          # створення БД, CRUD, проекція
    ├── 02_aggregation.js   # агрегація
    ├── 03_indexes.js       # індекси, explain()
    └── run_all.js          # запускає всі три файли підряд
```

## Вимоги

- Встановлений **MongoDB** (локально або доступний за URI)
- Встановлена **mongosh** (MongoDB Shell): https://www.mongodb.com/try/download/shell

## Запуск

### Через npm-скрипти

```bash
npm run task1   # Завдання 1: CRUD
npm run task2   # Завдання 2: агрегація (потребує даних з task1)
npm run task3   # Завдання 3: індекси (потребує даних з task1)
npm run all     # всі три по черзі
```

### Напряму через mongosh

```bash
mongosh src/01_crud.js
mongosh src/02_aggregation.js
mongosh src/03_indexes.js
```

Якщо MongoDB працює не на `localhost:27017`, додайте URI:

```bash
mongosh "mongodb+srv://vhurtskaia_db_user:1Dkpd3v9D2lzQk1F@cluster0.pptjzrz.mongodb.net/"
load("src/01_crud.js")
load("src/02_aggregation.js")
load("src/03_indexes.js")
```

## Короткий опис кроків (Завдання 1)

1. `use("studentDB")` — перемикання/створення бази даних (реально
   створюється тільки після першого запису).
2. `db.createCollection("assignments")` — створення колекції.
3. `db.assignments.insertMany([...])` — вставка 5 документів
   `{ name, subject, score }`.
4. `db.assignments.find({ score: { $gt: 80 } })` — пошук score > 80.
5. `db.assignments.updateOne({ score: { $lt: 85 } }, { $inc: { score: 5 } })`
   — збільшення score на 5 для одного студента з балом < 85.
6. Пошук мінімального `score` через `sort({score:1}).limit(1)`,
   потім `deleteOne({ _id })` — видалення студента з найнижчим балом.
7. `db.assignments.find({}, { _id: 0, name: 1, score: 1 })` — проекція.

## Завдання 2 — агрегація

`$group` за `subject` з обчисленням `$avg` балу, потім `$match` —
лишаємо тільки предмети із середнім балом > 75.

## Завдання 3 — індекси

- `db.assignments.createIndex({ name: 1 }, { unique: true })` —
  унікальний індекс, запобігає дублюванню імен.
- `explain("executionStats")` викликається **до** і **після**
  створення індексу для запиту `name` на `/^A/`, щоб порівняти
  `COLLSCAN` (без індексу) і `IXSCAN` (з індексом), а також
  `executionTimeMillis` / `totalDocsExamined`.
