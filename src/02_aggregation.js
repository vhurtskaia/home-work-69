// =====================================================================
// Завдання 2: Агрегаційні операції
// Виконувати після 01_crud.js (колекція assignments вже має бути заповнена)
// Запуск:  mongosh < src/02_aggregation.js
// =====================================================================

use("studentDB");

// 1. Групування за subject + обчислення середнього балу (avgScore)
// 2. Фільтрація: лишити тільки предмети, де avgScore > 75
print("\n--- Середній бал за предметом (avgScore > 75) ---");
printjson(
  db.assignments.aggregate([
    {
      $group: {
        _id: "$subject",
        avgScore: { $avg: "$score" },
        studentsCount: { $sum: 1 },
      },
    },
    {
      $match: { avgScore: { $gt: 75 } },
    },
    {
      $sort: { avgScore: -1 },
    },
  ]).toArray()
);
