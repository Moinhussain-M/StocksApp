import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const StockApp = () => {
  const [n, setN] = useState(0);
  const [stocks, setStocks] = useState([]);

  const fetchStocks = async () => {
    const response = await axios.get(`http://localhost:3000/stocks?n=${n}`);
    setStocks(response.data);
  };

  useEffect(() => {
    stocks.forEach(stock => {
      setInterval(async () => {
        const response = await axios.get(`http://localhost:3000/prices?symbol=${stock.symbol}`);
        stock.price = response.data.price;
      }, stock.refreshInterval * 1000);
    });
  }, [stocks]);

  return (
    <View>
      <TextInput onChangeText={text => setN(text)} />
      <Button title="Fetch Stocks" onPress={fetchStocks} />
      <FlatList
        data={stocks}
        keyExtractor={item => item.symbol}
        renderItem={({ item }) => (
          <Text>{item.symbol}: {item.price}</Text>
        )}
      />
    </View>
  );
};

export default StockApp;
