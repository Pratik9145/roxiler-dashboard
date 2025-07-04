const axios = require('axios');
const Transaction = require('../models/Transaction');

const fetchSeedData = async () => {
  const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
  const response = await axios.get(url);
  await Transaction.deleteMany();
  await Transaction.insertMany(response.data);
  return { message: 'Database seeded successfully' };
};

module.exports = fetchSeedData;