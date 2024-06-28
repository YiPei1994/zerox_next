import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Spinner() {
  return (
    <div className="w-full h-[120px] flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-3xl text-primary" />
    </div>
  );
}
