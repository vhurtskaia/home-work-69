// =====================================================================
// Завдання 3: Робота з індексами
// Виконувати після 01_crud.js
// Запуск:  mongosh < src/03_indexes.js
// =====================================================================

use("studentDB");

// --- Аналіз ДО створення індексу ---
print("\n--- explain() ДО створення індексу (name починається на 'A') ---");
printjson(
  db.assignments.find({ name: { $regex: /^A/ } }).explain("executionStats")
);
// Зверніть увагу на поле "stage" у winningPlan - без індексу
// там буде COLLSCAN (повне сканування колекції), а executionTimeMillis
// та totalDocsExamined показують, скільки документів довелось перевірити.

// 1. Створення унікального індексу на полі name
//    (запобігає дублюванню імен студентів)
db.assignments.createIndex({ name: 1 }, { unique: true });

print("\n--- Список індексів колекції assignments ---");
printjson(db.assignments.getIndexes());

// 2. Запит, що використовує індекс (вибірка імен, що починаються на 'A')
print("\n--- Студенти, чиє ім'я починається на 'A' ---");
printjson(db.assignments.find({ name: { $regex: /^A/ } }).toArray());

// 3. Аналіз ПІСЛЯ створення індексу
print("\n--- explain() ПІСЛЯ створення індексу ---");
printjson(
  db.assignments.find({ name: { $regex: /^A/ } }).explain("executionStats")
);
// Примітка: регулярний вираз із "^" (префіксний пошук) MongoDB може
// виконати як IXSCAN (сканування індексу) замість COLLSCAN,
// що зазвичай швидше на великих колекціях.
// Якщо потрібен гарантований IXSCAN для точного значення, порівняйте
// також із запитом db.assignments.find({ name: "Andriy" }).explain(...)

// --- Демонстрація роботи унікального індексу ---
print("\n--- Спроба вставити дублікат імені (має завершитись помилкою) ---");
try {
  db.assignments.insertOne({ name: "Andriy", subject: "Chemistry", score: 70 });
} catch (e) {
  print("Помилка (очікувано): " + e.message);
}
