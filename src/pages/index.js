import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
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

  return (
    <div className="min-h-screen bg-gray-50 space-y-4">
      <div className="p-2 bg-slate-600 shadow-md">
        <h1 className="text-lg font-medium text-white text-center">
          Generator Angka Random
        </h1>
      </div>
      <div className="w-11/12 bg-white rounded-lg m-auto">
        <div className="flex space-x-2 items-center">
          <div
            className="p-2 rounded-lg bg-blue-500 hover:cursor-pointer shadow"
            onClick={() => setCount((prev) => prev + 1)}
          >
            tambah
          </div>
          <div>{count}</div>
        </div>
      </div>
    </div>
  );
}
