import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang } from '@/i18n/translations';

const LANGUAGE_KEY = '@settings_language';

export const loadLanguage = createAsyncThunk('settings/loadLanguage', async () => {
  const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
  return (stored as Lang) ?? 'en';
});

interface SettingsState {
  language: Lang;
}

const initialState: SettingsState = {
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Lang>) => {
      state.language = action.payload;
      AsyncStorage.setItem(LANGUAGE_KEY, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadLanguage.fulfilled, (state, action) => {
      state.language = action.payload;
    });
  },
});

export const { setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
