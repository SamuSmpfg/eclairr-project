const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kscodinp_db_user:Samuel@cluster0.i34kdjt.mongodb.net/eclairr')
  .then(() => console.log('Terminal funcionando'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err.message))