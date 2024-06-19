let nextId = 1; // Menyimpan nilai id berikutnya

let users = [
    {
      id: nextId++,
      username: "admin",
      password: "admin",
      email: "john_doe@example.com",
      favorit_pelatihan: []
    }
  ];

module.exports = { users };