export const generateContinuousData = (startDate, numDays) => {
    const continuousData = [];
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
  
    for (let i = 0; i < numDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
  
      continuousData.push({
        Date: formatDate(date),
        Target: parseFloat((Math.random() * 150 + 50).toFixed(2)),
        AUD: parseFloat((Math.random() * 100).toFixed(2)),
        EUR: parseFloat((Math.random() * 100).toFixed(2)),
        GBP: parseFloat((Math.random() * 100).toFixed(2)),
        JPY: parseFloat((Math.random() * 100).toFixed(2)),
        USD: parseFloat((Math.random() * 100).toFixed(2)),
        BRL: parseFloat((Math.random() * 100).toFixed(2)),
        CAD: parseFloat((Math.random() * 100).toFixed(2)),
        CHF: parseFloat((Math.random() * 100).toFixed(2)),
        CLP: parseFloat((Math.random() * 100).toFixed(2)),
        CNY: parseFloat((Math.random() * 100).toFixed(2)),
        CZK: parseFloat((Math.random() * 100).toFixed(2)),
        DKK: parseFloat((Math.random() * 100).toFixed(2)),
        HKD: parseFloat((Math.random() * 100).toFixed(2)),
        HUF: parseFloat((Math.random() * 100).toFixed(2)),
        INR: parseFloat((Math.random() * 100).toFixed(2)),
        KRW: parseFloat((Math.random() * 100).toFixed(2)),
        NOK: parseFloat((Math.random() * 100).toFixed(2)),
        NZD: parseFloat((Math.random() * 100).toFixed(2)),
        PLN: parseFloat((Math.random() * 100).toFixed(2)),
        SEK: parseFloat((Math.random() * 100).toFixed(2)),
        SGD: parseFloat((Math.random() * 100).toFixed(2)),
        THB: parseFloat((Math.random() * 100).toFixed(2)),
        TWD: parseFloat((Math.random() * 100).toFixed(2)),
        ZAR: parseFloat((Math.random() * 100).toFixed(2))
      });
    }
  
    return continuousData;
  };
  