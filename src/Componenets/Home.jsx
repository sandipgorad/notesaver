import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addtopaste, updatetopaste } from "../Redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setsearchParams] = useSearchParams();
  const pasteID = searchParams.get("pasteID");

  const dispatch = useDispatch();

  const allpastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteID) {
      const paste = allpastes.find((p) => p?._id === pasteID);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteID,allpastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteID || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (title.trim() === "") {
      toast.error("Please enter a title");
      return;
    }

    if (value.trim() === "") {
      toast.error("Please enter some content");
      return;
    }

    if (pasteID) {
      //update
      dispatch(updatetopaste(paste));
    } else {
      //create
      dispatch(addtopaste(paste));
    }

    setTitle("");
    setValue("");
    setsearchParams({});
  }

  return (
    <div className="flex flex-col gap-17 w-full max-w-2xl mt-15 mx-auto px-4 md:px-10">
      <div className="flex gap-3 w-full mt-5 place-content-between">
        <input
          className="p-2 w-3/4 rounded-lg h-10 shadow-xl/20 border border-black"
          type="text"
          placeholder="Enter text here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="p-2 w-1/4 rounded-lg h-10 ring-2 shadow-xl/30 border-black "
          onClick={createPaste}
        >
          {pasteID ? "Update my paste" : "Create my paste"}
        </button>
      </div>

      <div>
        <textarea
          className="w-full max-w-2xl h-64 border p-2 mt-5 rounded-xl"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="enter value here"
        />
      </div>
    </div>
  );
};

export default Home;
