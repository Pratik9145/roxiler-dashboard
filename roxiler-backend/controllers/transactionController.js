const Transaction = require('../models/Transaction');
const fetchSeedData = require('../utils/fetchSeedData');

exports.initDB = async (req, res) => {
  try {
    const result = await fetchSeedData();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listTransactions = async (req, res) => {
  try {
    const { month, search = '', page = 1, limit = 10 } = req.query;
    const monthNumber = new Date(`${month} 1, 2020`).getMonth();

    const query = {
  $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber + 1] },
  $or: [
    { title: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
    {
      // Match price only if search is a number
      ...(Number.isFinite(Number(search)) && {
        price: Number(search),
      }),
    },
  ],
};


    const transactions = await Transaction.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.statistics = async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

    const stats = await Transaction.aggregate([
      { $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] } } },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: { $cond: ['$sold', '$price', 0] } },
          soldItems: { $sum: { $cond: ['$sold', 1, 0] } },
          notSoldItems: { $sum: { $cond: ['$sold', 0, 1] } },
        },
      },
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.barChart = async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

    const items = await Transaction.aggregate([
      { $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] } } },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901, Infinity],
          default: '901-above',
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.pieChart = async (req, res) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

    const categories = await Transaction.aggregate([
      { $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] } } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.combinedData = async (req, res) => {
  try {
    const stats = await exports.statistics(req, res, true);
    const bar = await exports.barChart(req, res, true);
    const pie = await exports.pieChart(req, res, true);
    res.json({ stats, bar, pie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
