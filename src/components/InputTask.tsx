import { BsMicFill } from "react-icons/bs";

const Header: React.FC<{
  handleHide: (state: boolean) => void;
}> = ({ handleHide }) => {
  return (
    <div>
      <div className="">
        <div>
          <div className="relative">
            <button
              onClick={() => handleHide(true)}
              id="input task"
              className="flex justify-between items-center w-full p-2 pl-5 text-base text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <span>Input task</span>
              <span className="text-[#3F5BF6] hover:text-[#0E31F2] font-medium text-2xl px-2 py-2">
                <BsMicFill />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
