import pandas as pd
import uuid  # Import uuid for generating unique IDs

def add_trade_to_blotter(trade, save_file=False):
    trade.database_id = str(uuid.uuid4())  # Generate a unique ID
    dict_trade = {
        'TradeDate': trade.trade_date,
        'ValuationFunction': trade.valuation_function,
        'DomCurrency': trade.dom_currency,
        'FgnCurrency': trade.for_currency,
        'Index1': trade.index_1,
        'Index2': trade.index_2,
        'Level': trade.level,
        'Maturity': trade.maturity,
        'Risk': trade.risk_usd,
        'Direction': trade.direction,
        'Cost(bps)': trade.cost_bps,
        'Comment': trade.comment,
        'DatabaseID': trade.database_id,
        'Nominal1': trade.nominal_1,
        'Nominal2': trade.nominal_2
    }
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
