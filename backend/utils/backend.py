import pandas as pd
import uuid  # Import uuid for generating unique IDs

def add_trade_to_blotter(trade, save_file=False):
    trade.database_id = str(uuid.uuid4())  # Generate a unique ID
    try:
        dict_trade = {
            'TradeDate': trade.get('TradeDate', ''),
            'ValuationFunction': trade.get('ValuationFunction', ''),
            'DomCurrency': trade.get('DomCurrency', ''),
            'FgnCurrency': trade.get('FgnCurrency', ''),
            'Index1': trade.get('Index1', ''),
            'Index2': trade.get('Index2', ''),
            'Level': trade.get('Level', ''),
            'Maturity': trade.get('Maturity', ''),
            'Risk (USD)': trade.get('Risk', ''),
            'Direction': trade.get('Direction', ''),
            'Cost(bps)': trade.get('Cost', ''),
            'Comment': trade.get('Comment', ''),
            'DatabaseID': trade.get('DatabaseID', ''),
            'Nominal1': trade.get('Nominal1', ''),
            'Nominal2': trade.get('Nominal2', '')
        }
        
        new_trade = pd.DataFrame([dict_trade])
        print("Trade data to add:", new_trade)  # Debug statement
    new_trade = pd.DataFrame(dict_trade.items())
    new_trade.columns = new_trade.iloc[0]
    new_trade = new_trade.iloc[1].reset_index(drop=True)
    load_df_to_db(new_trade, "TRADE_BLOTTER")

def delete_trade_from_blotter(trade_id):
    query = f"DELETE FROM TRADE_BLOTTER WHERE DatabaseID = '{trade_id}'"
    db_obj.execute_query(query)

def edit_trade_in_blotter(trade):
    delete_trade_from_blotter(trade.database_id)
    add_trade_to_blotter(trade)
