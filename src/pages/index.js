import { useEffect, useState } from "react";

// export Item = ({})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const TempItem = ({ min, max, interval, duration }) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(min);
  const [intervalId, setIntervalId] = useState("");
  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        setValue(getRandomInt(min, max));
        setCount((prev) => prev++);

        if (count >= parseInt(duration / interval)) {
          clearInterval(intervalId);
        }
      }, interval)
    );
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    if (count >= parseInt(duration / interval)) {
      clearInterval(intervalId);
    }
  }, [count]);

  return (
    <div className="bg-gray-50  px-4 py-2 text-black border rounded-lg">
      {value}
    </div>
  );
};

export const Item = ({ randomNumber }) => {
  return (
    <div className="bg-gray-50 px-4 py-2 text-black border rounded-lg">
      {randomNumber}
    </div>
  );
};

export default function Home() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(3000);
  const [amount, setAmount] = useState(10);
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState("");
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [duration, setDuration] = useState(1);

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
    const pattern = /[a-zA-Z]/i;
    const isMinContainStr = pattern.test(min);
    const isMaxContainStr = pattern.test(max);
    const isAmountContainStr = pattern.test(amount);

    min = parseInt(min);
    max = parseInt(max);
    amount = parseInt(amount);
    // duration = parseInt(duration);

    if (isMinContainStr || isMaxContainStr || isAmountContainStr) {
      setIsShow(true);
      setMessage("Harap memasukkan input berupa angka");
      return false;
    }

    if (min > max) {
      setIsShow(true);
      setMessage("Nilai Maksimum harus lebih besar dari Minimum");
      return false;
    }
    if (min == max) {
      setIsShow(true);
      setMessage("Nilai Maksimum harus berbeda dengan nilai Minimum");
      return false;
    }
    if (amount < 0) {
      setIsShow(true);
      setMessage("Banyaknya tidak boleh kurang dari 0");
      setAmount(1);
      return false;
    }
    return true;
  };

  const onGenerateClick = () => {
    const isValid = validateInput(min, max, amount);
    if (isValid) {
      let temp = [];
      for (let i = 0; i < amount; i++) {
        temp.push(getRandomInt(min, max));
      }
      setRandomNumbers(temp);
    }
  };

  if (randomNumbers.length > 0) {
    item = randomNumbers.map((rn, idx) => {
      return (
        <Item
          key={idx}
          randomNumber={rn}
          min={min}
          max={max}
          interval={100}
          duration={duration * 1000}
        />
      );
    });
  }
  return (
    <div className="min-h-screen bg-gray-50 space-y-4">
      <div className="p-2 bg-slate-600 shadow-md">
        <h1 className="text-lg font-medium text-white text-center">
          Generator Angka Random
        </h1>
      </div>
      <div className="w-11/12 lg:w-6/12 bg-white rounded-lg m-auto p-4 shadow-md space-y-4">
        {isShow ? (
          <div className="p-4 min-w-fit m-auto bg-red-50 rounded-lg flex justify-between space-x-8">
            <h2 className="text-red-500">{message}</h2>
            <div
              className="font-medium text-red-800 hover:cursor-pointer hover:text-red-600 px-4 by-2 rounded-md border border-red-400 flex items-center"
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
                className="text-center border rounded-lg"
              />
            </div>
            <div className="space-x-4 items-center justify-center w-full">
              <h3 className="text-center">Nilai Maksimum</h3>
              <input
                type="text"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="text-center border rounded-lg"
              />
            </div>
            <div className="space-x-4 w-full">
              <h3 className="text-center ">Jumlah</h3>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-center border rounded-lg"
              />
            </div>
            {/* <div className="space-x-4 w-full">
              <h3 className="text-center">Durasi (dalam detik)</h3>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="text-center"
              />
            </div> */}
            <div
              className="px-4 py-2 text-regular font-medium text-white bg-green-500 rounded-lg shadow w-1/2 lg:w-1/3 m-auto hover:bg-green-600 hover:cursor-pointer"
              onClick={onGenerateClick}
            >
              Generate
            </div>
          </div>
        </div>
        {item && (
          <div className="w-full p-2 space-y-4 pt-8">
            <h2 className="text-lg font-medium text-slate-700 text-center">
              Angka Random
            </h2>
            <div className="grid grid-cols-3 gap-4 ">{item}</div>
          </div>
        )}
      </div>
    </div>
  );
}
