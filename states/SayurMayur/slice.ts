import { createSlice } from "@reduxjs/toolkit";

import {
  getListSayurMayur,
  addSayurMayur,
  getSyaurMayurById,
  updateSayurMayur,
  removeSayurMayurById,
} from "states/SayurMayur/thunk";
import { TSayurMyur } from "types/sayurMayur";

interface InitialState {
  list: TSayurMyur[];
  dataDetail: TSayurMyur;
  loading: boolean;
  error: unknown;
  success: boolean;
}

const initialState: InitialState = {
  list: [],
  dataDetail: {
    id: "",
    productName: "",
    typeQTY: "",
    QTY: 0,
    priceBBS: 0,
    pricePWT: 0,
  },
  loading: false,
  error: null,
  success: false,
};

const SayurMayurSlice = createSlice({
  name: "sayurMayur",
  initialState,
  reducers: {
    clear: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getListSayurMayur.pending, (state) => {
      state.loading = true;
      state.success = false;
    });

    builder.addCase(getListSayurMayur.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.list = action.payload;
    });

    builder.addCase(getListSayurMayur.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(addSayurMayur.pending, (state) => {
      state.loading = true;
      state.success = false;
    });

    builder.addCase(addSayurMayur.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(addSayurMayur.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(getSyaurMayurById.pending, (state) => {
      state.loading = true;
      state.success = false;
    });

    builder.addCase(getSyaurMayurById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.dataDetail = action.payload;
    });

    builder.addCase(getSyaurMayurById.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(updateSayurMayur.pending, (state) => {
      state.loading = true;
      state.success = false;
    });

    builder.addCase(updateSayurMayur.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(updateSayurMayur.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(removeSayurMayurById.pending, (state) => {
      state.loading = true;
      state.success = false;
    });

    builder.addCase(removeSayurMayurById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(removeSayurMayurById.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const actions = {
  ...SayurMayurSlice.actions,
  getListSayurMayur,
  addSayurMayur,
  getSyaurMayurById,
  updateSayurMayur,
  removeSayurMayurById,
};

export const reducer = SayurMayurSlice.reducer;
