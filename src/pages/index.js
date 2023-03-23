import { useEffect, useState } from "react";

// export Item = ({})

export default function Home() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [amount, setAmount] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState("");
  let item;
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);
  const onMessageCloseBtnClicked = () => {
    setIsShow(false);
    setMessage("");
  };

  const validateInput = (min, max, amount) => {
    min = parseInt(min);
    max = parseInt(max);
    amount = parseInt(amount);

    if (isNaN(min) || isNaN(max) || isNaN(amount)) {
      setIsShow(true);
      setMessage("Harap memasukkan input berupa angka");
    }

    if (min > max) {
      setIsShow(true);
      setMessage("Nilai Maksimum harus lebih besar dari Minimum");
      return false;
    }

    if (amount < 0) {
      setIsShow(true);
      setMessage("Banyaknya tidak boleh kurang dari 0");
      setAmount(1);
      return false;
    }
  };
  const onGenerateClick = () => {};
  return (
    <div className="min-h-screen bg-gray-50 space-y-4">
      <div className="p-2 bg-slate-600 shadow-md">
        <h1 className="text-lg font-medium text-white text-center">
          Generator Angka Random
        </h1>
      </div>
      <div className="w-11/12 lg:w-8/12 bg-white rounded-lg m-auto p-4 shadow-md space-y-4">
        {isShow ? (
          <div className="p-4 min-w-fit m-auto bg-red-50 rounded-lg flex justify-between space-x-8">
            <h2 className="text-red-500">{message}</h2>
            <div
              className="font-medium text-red-800 hover:cursor-pointer hover:text-red-600 px-4 by-2 rounded-md border border-red-400"
              onClick={onMessageCloseBtnClicked}
            >
              X
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="flex space-x-2 items-center text">
          <div className="text-center w-full space-y-4">
            <div className="space-x-4 items-center justify-center w-full">
              <h3 className="text-center">Nilai Minimum</h3>
              <input
                type="text"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="text-center"
              />
            </div>
            <div className="space-x-4 items-center justify-center w-full">
              <h3 className="text-center">Nilai Maksimum</h3>
              <input
                type="text"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="text-center"
              />
            </div>
            <div className="space-x-4 w-full">
              <h3 className="text-center">Banyaknya</h3>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-center"
              />
            </div>
            <div
              className="px-4 py-2 text-regular font-medium text-white bg-green-500 rounded-lg shadow w-1/2 lg:w-1/3 m-auto hover:bg-green-600 hover:cursor-pointer"
              onClick={() => validateInput(min, max, amount)}
            >
              Generate
            </div>
          </div>
        </div>
        {/* <div className="w-full border border-rounded-lg">{item}</div> */}
      </div>
    </div>
  );
}
