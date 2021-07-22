const reducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_DARK_MODE':
      if (!state.darkMode) {
        localStorage.setItem('darkMode', !state.darkMode);
      } else {
        localStorage.removeItem('darkMode');
      }
      return { ...state, darkMode: !state.darkMode };
    case 'SET_REGIONS':
      return { ...state, allRegions: action.payload };
    case `CREATE_DROPDOWN_REF`:
      return { ...state, dropDown: action.payload };
    case `HANDLE_DROPDOWN`:
      return { ...state, isDropDownOpen: !state.isDropDownOpen };
    case `DARK_MODE_FALSE`:
      return { ...state, darkMode: false };
    case `UPDATE_COUNTRIES_LIST`:
      return { ...state, countriesList: action.payload };
    case `NO_COUNTRIES_MATCH`:
      return { ...state, countriesList: [] };
    case `HANLE_SEARCH_INPUT`:
      return {
        ...state,
        searchValue: action.payload,
      };
    case `SET_LOADING_TRUE`:
      return { ...state, isLoading: true };
    case `SET_LOADING_FALSE`:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
