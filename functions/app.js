let nextOrganizerId = 1; // Menyimpan nilai id berikutnya untuk organizers

const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const { trainings } = require('../data/trainings');
const { users } = require('../data/users');
const { organizers } = require('../data/organizers');

const serverless = require('serverless-http');
const router = express.Router();

const app = express();

// Endpoint untuk mendapatkan semua pelatihan
router.get('/trainings', (req, res) => {
  res.json(trainings);
});

// Endpoint untuk menambahkan pelatihan baru
router.post('/trainings', (req, res) => {
  const {
    nama_pelatihan,
    penyelenggara,
    durasi,
    kelompok_umur,
    kategori,
    deskripsi,
    persyaratan,
    fasilitas,
    pendaftaran,
    kontak,
    link_pendaftaran,
    sumber_informasi
  } = req.body;

  const newTraining = {
    id: trainings.length + 1, // Menggunakan panjang array sebagai id berikutnya
    nama_pelatihan,
    penyelenggara,
    durasi,
    kelompok_umur,
    kategori,
    deskripsi,
    persyaratan,
    fasilitas,
    pendaftaran,
    kontak,
    link_pendaftaran,
    sumber_informasi
  };

  trainings.push(newTraining);
  res.status(201).json(newTraining);
});

// Endpoint untuk mendapatkan pelatihan berdasarkan ID tertentu
router.get('/trainings/:id', (req, res) => {
  const training = trainings.find(t => t.id === parseInt(req.params.id));

  if (training) {
    res.json(training);
  } else {
    res.status(404).send('Pelatihan tidak ditemukan');
  }
});

// Endpoint untuk mendapatkan semua organizer
router.get('/organizers', (req, res) => {
  res.json(organizers);
});

// Endpoint untuk menambahkan organizer baru
router.post('/organizers', (req, res) => {
  const { username, password, email, pelatihan_id } = req.body;

  const newOrganizer = {
    id: nextOrganizerId++, // Menggunakan nilai id berikutnya dan menambahkan nilai
    username,
    password,
    email,
    pelatihan_id
  };

  organizers.push(newOrganizer);
  res.status(201).json(newOrganizer);
});

// Endpoint untuk mendapatkan semua user
router.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint untuk menambahkan user baru
router.post('/users', (req, res) => {
  const { username, password, email, favorit_pelatihan } = req.body;

  const newUser = {
    id: users.length + 1, // Menggunakan panjang array sebagai id berikutnya
    username,
    password,
    email,
    favorit_pelatihan
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint untuk mendapatkan user berdasarkan ID tertentu
router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User tidak ditemukan');
  }
});

// Endpoint untuk menambahkan pelatihan favorit ke user
router.post('/users/:id/favorite', (req, res) => {
  const userId = parseInt(req.params.id);
  const { trainingId } = req.body;

  const user = users.find(u => u.id === userId);
  const training = trainings.find(t => t.id === trainingId);

  if (!user) {
    return res.status(404).send('User tidak ditemukan');
  }

  if (!training) {
    return res.status(404).send('Pelatihan tidak ditemukan');
  }

  if (!user.favorit_pelatihan.includes(trainingId)) {
    user.favorit_pelatihan.push(trainingId);
    res.status(200).json(user);
  } else {
    res.status(400).send('Pelatihan sudah ada di favorit');
  }
});

app.use('/.netlify/functions/app', router);
module.exports.handler = serverless(app);