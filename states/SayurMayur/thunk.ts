// @flow
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toastr } from "react-redux-toastr";

import firebase from "@/connections/firebase";
import { TSayurMyur, TSayurMyurPayload } from "types/sayurMayur";
import { toastr } from "react-redux-toastr";

const db = firebase.firestore();

export const getListSayurMayur = createAsyncThunk(
  "sayurMayur/getListSayurMayur",
  async (_, { rejectWithValue }) => {
    try {
      const list: TSayurMyur[] = [];
      const snapshot = db.collection("sayur_Mayur");
      const doc = await snapshot.orderBy("productName").get();
      const newDoc = doc.docs;
      console.log("newdoc", newDoc);
      if (!doc.empty) {
        newDoc.forEach((item) => {
          const data = item.data() as TSayurMyur;
          data.id = item.id;
          list.push(data as TSayurMyur);
        });
      } else {
        throw new Error("Data is empty!");
      }

      return list;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSayurMayur = createAsyncThunk(
  "sayurMayur/addSayurMayur",
  async (payload: TSayurMyurPayload, { rejectWithValue }) => {
    try {
      const snapShotRef = db.collection("sayur_Mayur").doc();
      await snapShotRef.set(payload);
      return toastr.success("", "success");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSyaurMayurById = createAsyncThunk(
  "sayurmayur/getSayurMayurById",
  async (id: string, { rejectWithValue }) => {
    try {
      const snapShotRef = db.collection("sayur_Mayur").doc(id);
      const dataSsayurMayur = await snapShotRef.get();
      if (!dataSsayurMayur.exists) {
        throw new Error("data not found");
      }
      return dataSsayurMayur.data() as TSayurMyur;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSayurMayur = createAsyncThunk(
  "sayurMayur/updateSayurMayur",
  async (
    { id, payload }: { id: string; payload: TSayurMyurPayload },
    { rejectWithValue }
  ) => {
    try {
      const snapShotRef = db.collection("sayur_Mayur").doc(id);
      await snapShotRef.update(payload);
      return toastr.success("", "success");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeSayurMayurById = createAsyncThunk(
  "sayurMayur/removeSayurMayurById",
  async (id: string, { rejectWithValue }) => {
    try {
      const snapShotRef = db.collection("sayur_Mayur").doc(id);
      await snapShotRef.delete();
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
