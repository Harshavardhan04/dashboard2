from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app, resources={r"/xva": {"origins": "http://localhost:3000"}})

def generate_smooth_data(start_date, num_days):
    start_date = datetime.strptime(start_date, "%Y-%m-%d")
    data = []
    
    # Initialize previous values for all currencies
    prev_values = {currency: 50.0 for currency in [
        'AUD', 'EUR', 'GBP', 'JPY', 'USD', 'BRL', 'CAD', 'CHF', 'CLP', 
        'CNY', 'CZK', 'DKK', 'HKD', 'HUF', 'INR', 'KRW', 'NOK', 'NZD', 
        'PLN', 'SEK', 'SGD', 'THB', 'TWD', 'ZAR'
    ]}

    for i in range(num_days):
        date = start_date + timedelta(days=i)
        
        # Generate data with small daily changes for smoothness
        daily_data = {currency: round(prev_values[currency] + random.uniform(-1, 1), 2) 
                      for currency in prev_values}
        
        # Update previous values
        prev_values.update(daily_data)

        total = sum(daily_data.values())
        target = total + 10
        daily_data.update({
            'Date': date.strftime('%Y-%m-%d'),
            'Target': target,
            'Total': total
        })
        
        data.append(daily_data)
    return data

@app.route('/xva', methods=['GET'])
def get_data():
    start_date = '2017-07-01'
    days = 7 * 365  # 7 years
    data = generate_smooth_data(start_date, days)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5004)
