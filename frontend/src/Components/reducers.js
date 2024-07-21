import { v4 as uuidv4 } from 'uuid';

const initialState = {
  rows: [],
  selectedRow: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROWS':
      return {
        ...state,
        rows: action.payload.map(row => ({ ...row, id: row.id || uuidv4() })),
      };
    case 'ADD_ROW':
      return {
        ...state,
        rows: [...state.rows, { ...action.payload, id: uuidv4() }],
      };
    case 'UPDATE_ROW':
      return {
        ...state,
        rows: state.rows.map((row) =>
          row.id === action.payload.id ? action.payload : row
        ),
      };
    case 'DELETE_ROW':
      return {
        ...state,
        rows: state.rows.filter((row) => row.id !== action.payload),
      };
    case 'SET_SELECTED_ROW':
      return { ...state, selectedRow: action.payload };
    case 'RESET_SELECTED_ROW':
      return { ...state, selectedRow: null };
    default:
      return state;
  }
};

export default rootReducer;
