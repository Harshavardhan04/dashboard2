import sqlite3

def add_trade_to_blotter(trade):
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
        
        conn = sqlite3.connect('trades.db')
        cursor = conn.cursor()
        
        # Create table if it doesn't exist
        cursor.execute('''CREATE TABLE IF NOT EXISTS trade_blotter (
            TradeDate TEXT,
            ValuationFunction TEXT,
            DomCurrency TEXT,
            FgnCurrency TEXT,
            Index1 TEXT,
            Index2 TEXT,
            Level TEXT,
            Maturity TEXT,
            "Risk (USD)" TEXT,
            Direction TEXT,
            "Cost(bps)" TEXT,
            Comment TEXT,
            DatabaseID TEXT PRIMARY KEY,
            Nominal1 TEXT,
            Nominal2 TEXT
        )''')
        
        # Insert the new trade
        cursor.execute('''INSERT INTO trade_blotter (
            TradeDate, ValuationFunction, DomCurrency, FgnCurrency, Index1, Index2,
            Level, Maturity, "Risk (USD)", Direction, "Cost(bps)", Comment,
            DatabaseID, Nominal1, Nominal2
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', (
            dict_trade['TradeDate'], dict_trade['ValuationFunction'], dict_trade['DomCurrency'],
            dict_trade['FgnCurrency'], dict_trade['Index1'], dict_trade['Index2'],
            dict_trade['Level'], dict_trade['Maturity'], dict_trade['Risk (USD)'],
            dict_trade['Direction'], dict_trade['Cost(bps)'], dict_trade['Comment'],
            dict_trade['DatabaseID'], dict_trade['Nominal1'], dict_trade['Nominal2']
        ))
        
        conn.commit()
        conn.close()
        print("Trade data added to database successfully")  # Debug statement
    except Exception as e:
        print("Error in add_trade_to_blotter:", e)  # Debug statement
        raise e

def delete_trade_from_blotter(database_id):
    try:
        print("Database ID to delete:", database_id)  # Debug statement
        conn = sqlite3.connect('trades.db')
        cur = conn.cursor()
        cur.execute("DELETE FROM trade_blotter WHERE DatabaseID = ?", (database_id,))
        conn.commit()
        conn.close()
        print("Trade deleted successfully")  # Debug statement
    except Exception as e:
        print("Error in delete_trade_from_blotter:", e)  # Debug statement
        raise e
