import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Viewpaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);
  return (
    <div>
      <div className="text-2xl font-bold mt-5 px-5">{paste.title}</div>
      <div className="mt-5 border border-black px-5">{paste.content}</div>
    </div>
  );
};

export default Viewpaste;
