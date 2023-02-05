type Props = {
  title: string;
  disable: boolean;
  onClick: () => void;
};

export default function SubmitButton({ title, disable, onClick }: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disable}
      className={
        "px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" +
        " " +
        (disable ? "bg-gray-800 + cursor-not-allowed" : "bg-blue-800")
      }
    >
      {title}
    </button>
  );
}
