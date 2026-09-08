import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addtopaste: (state, action) => {
      const paste = action.payload;
      // check for already exist note or empty note
      const alreadyExists = state.pastes.some(
        (existingPaste) => existingPaste.title === paste.title,
      );

      if (alreadyExists) {
        toast.error("Title is already exist");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully!");
    },

    updatetopaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("paste updated");
      }
    },
    resetallpaste: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },
    removefrompaste: (state, action) => {
      const pasteID = action.payload;
      console.log(pasteID);
      const index = state.pastes.findIndex((item) => item._id === pasteID);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste deleted");
      }
    },
  },
});

export const { addtopaste, updatetopaste, resetallpaste, removefrompaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
