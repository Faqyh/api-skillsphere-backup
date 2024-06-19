let nextId = 1; // Menyimpan nilai id berikutnya

let organizers = [
  {
    id: nextId++, // Menggunakan nilai id dan menambahkan nilai
    username: "Belajar co.id",
    password: "pelatihan",
    email: "bigo@example.com",
    pelatihan_id: [],
  },
  {
    id: nextId++, // Menggunakan nilai id berikutnya dan menambahkan nilai
    username: "PT Dicoding",
    password: "123",
    email: "123@gmail.com",
    pelatihan_id: [],
  },
];

module.exports = { organizers };
