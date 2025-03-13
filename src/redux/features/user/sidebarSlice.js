// store/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';


const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState: {
	  activeItem: 'dashboard',
	  openDropdowns: [],
	},
	reducers: {
	  setActiveItem: (state, action) => {
		state.activeItem = action.payload;
	  },
	  toggleDropdown: (state, action) => {
		if (state.openDropdowns.includes(action.payload)) {
		  state.openDropdowns = state.openDropdowns.filter(item => item !== action.payload);
		} else {
		  state.openDropdowns.push(action.payload);
		}
	  },
	},
  });

// export 
export const { setActiveItem, toggleDropdown } = sidebarSlice.actions;
export default sidebarSlice.reducer;