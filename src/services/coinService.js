const Coin = require('../models/Coin');

exports.getAll = () => Coin.find().lean();

exports.createCoin = (coinData) => Coin.create(coinData);

exports.getById = (coinId) => Coin.findById(coinId).lean();

exports.buyCoin = (coinId, userId) =>
  Coin.findByIdAndUpdate(coinId, { $push: { buyCrypto: userId } });

exports.editCoin = (coinId, data) =>
  Coin.findByIdAndUpdate(coinId, data, { runValidators: true, new: true });

exports.deleteCoin = (coinId) => Coin.findByIdAndDelete(coinId);

exports.searchCoins = (name, paymentMethod) => {
    let coins = Coin.find().lean();
    const searchParams = [];
  
    if (name) {
      searchParams.push({
        name: {
          $regex: name,
          $options: 'i',
        },
      });
    }
    if (paymentMethod) {
      searchParams.push({ paymentMethod: paymentMethod });
    }
    const finalSearch = searchParams.length ? { $and: searchParams } : {};
    coins = Coin.find(finalSearch).lean();
    return coins;
  };
