from flask import Flask, request, jsonify
from trade_blotter import add_trade_to_blotter, delete_trade_from_blotter, edit_trade_in_blotter, get_trade_blotter

app = Flask(__name__)

@app.route('/fva_data_get_blotter', methods=['GET'])
def fva_data_get_blotter():
    data = get_trade_blotter()
    return data.to_json(orient='records')

@app.route('/api/add_trade', methods=['POST'])
def add_trade():
    trade = request.json
    try:
        add_trade_to_blotter(trade)
        return jsonify({'message': 'Trade added successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Failed to add trade', 'error': str(e)}), 400

@app.route('/api/edit_trade', methods=['POST'])
def edit_trade():
    trade = request.json
    try:
        edit_trade_in_blotter(trade)
        return jsonify({'message': 'Trade edited successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Failed to edit trade', 'error': str(e)}), 400

@app.route('/api/delete_trade', methods=['POST'])
def delete_trade():
    trade_id = request.json['DatabaseID']
    try:
        delete_trade_from_blotter(trade_id)
        return jsonify({'message': 'Trade deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Failed to delete trade', 'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
