import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removefrompaste } from "../Redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy,faTrashCan,faShareFromSquare,faPenToSquare,faEye  } from '@fortawesome/free-regular-svg-icons';


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchterm, setsearchterm] = useState("");
  console.log(pastes);
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchterm.toLowerCase()),
  );

  function handledelete(id) {
    dispatch(removefrompaste(id));
  }

  const handleShare = async (paste) => {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
    try {
      await navigator.share({
        title: paste.title,
        text: paste.content,
        url: shareUrl,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const Navigate = useNavigate();

  return (
    <div className="text-center">
      <input
        className="w-full mt-20 h-10 px-4 p-2 rounded-xl shadow-xl/20 border border-black"
        type="text"
        placeholder="search here..."
        value={searchterm}
        onChange={(e) => setsearchterm(e.target.value)}
      ></input>
      <div className="flex flex-col mt-5 gap-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="flex flex-col border border-black"
                key={paste._id}
              >
                <div className="text-2xl font-bold">{paste.title}</div>
                <div className="text-1xl">{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly font-bold">
                  <button
                    onClick={() => Navigate(`/?pasteID=${paste?._id}`)}
                    className="p-2 w-1/5 rounded-lg h-10 ring-2 shadow-xl/10 border border-black text-center"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>

                  <button
                    onClick={() => Navigate(`/pastes/${paste?._id}`)}
                    className="p-2 w-1/5 rounded-lg h-10 ring-2 shadow-xl/10 border border-black text-center"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>

                  <button
                    className=" p-2 w-1/5 rounded-lg h-10 ring-2 shadow-xl/10 border border-black"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <button
                    className=" p-2 w-1/5 rounded-lg h-10 ring-2 shadow-xl/10 border border-black"
                    onClick={() => handledelete(paste?._id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <button
                    className=" p-2 w-1/5 rounded-lg h-10 ring-2 shadow-xl/10 border border-black"
                    onClick={() => {
                      handleShare(paste);
                    }}
                  >
                    <FontAwesomeIcon icon={faShareFromSquare} />
                  </button>
                </div>
                <div className="mt-5">
                  {new Date(paste.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
