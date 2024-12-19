export const initialState = {
  games: [],
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_DATA_GAMES":
      return {
        ...state,
        games: payload,
      };
    default:
      throw new Error();
  }
};
