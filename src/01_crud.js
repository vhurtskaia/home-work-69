// =====================================================================
// Завдання 1: Операції з базами даних і документами в Mongo Shell
// Запуск:  mongosh < src/01_crud.js
// або в інтерактивній оболонці: load('src/01_crud.js')
// =====================================================================

// 1. Створення (перемикання на) нову базу даних studentDB
use("studentDB");

// 2. Створення колекції assignments
db.createCollection("assignments");

// 3. Додавання п'яти документів (name, subject, score)
db.assignments.insertMany([
  { name: "Andriy",   subject: "Math",    score: 92 },
  { name: "Olena",    subject: "Physics", score: 78 },
  { name: "Bohdan",   subject: "Math",    score: 65 },
  { name: "Anna",     subject: "Biology", score: 88 },
  { name: "Serhiy",   subject: "Physics", score: 81 },
]);

print("\n--- Усі документи після вставки ---");
printjson(db.assignments.find().toArray());

// 4. Пошук усіх документів, де score > 80
print("\n--- Документи зі score > 80 ---");
printjson(db.assignments.find({ score: { $gt: 80 } }).toArray());

// 5. Оновлення: збільшити score на 5 для студента, у якого score < 85
//    (оновлюємо лише ОДИН документ, тому updateOne)
db.assignments.updateOne(
  { score: { $lt: 85 } },
  { $inc: { score: 5 } }
);

print("\n--- Документи після updateOne ($inc score +5) ---");
printjson(db.assignments.find().toArray());

// 6. Видалення документа студента з найнижчим балом
const lowest = db.assignments.find().sort({ score: 1 }).limit(1).toArray()[0];
print("\n--- Студент з найнижчим балом (буде видалений) ---");
printjson(lowest);

db.assignments.deleteOne({ _id: lowest._id });

print("\n--- Документи після видалення ---");
printjson(db.assignments.find().toArray());

// 7. find() з проекцією: тільки name і score (_id приховуємо)
print("\n--- Проекція: тільки name і score ---");
printjson(
  db.assignments.find({}, { _id: 0, name: 1, score: 1 }).toArray()
);
