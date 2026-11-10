// Запускає всі три завдання послідовно в одній сесії mongosh.
// Використання:  mongosh < src/run_all.js
load("src/01_crud.js");
load("src/02_aggregation.js");
load("src/03_indexes.js");
