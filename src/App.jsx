import { useState, useEffect } from "react";

const YourComponent = () => {
  const [data, setData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1HCCK_qgrPWHH1zX2a1Tg1TGti_u3sTExZYvnkoTDVIY/values/Sheet1?alt=json&key=AIzaSyDLy7YCQfJ-0LLj9epmeuDKdsFbeYdKYqE"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-[url('./bg3.png')] flex flex-col">
      <img
        src={isMobile ? "./Nav2.png" : "./Nav_Desk.png"}
        className="sm:h-20 w-full"
      />
      {/* relative overflow-x-auto */}
      <div className=" sm:px-20 min-h-screen flex flex-col items-center flex-1 sm:mb-20">
        <img src="./Hero2.png" className="sm:h-80" />
        <h1 className="w-full text-left px-10 md:pl-20 mb-5 text-xl">
          Point Table
        </h1>
        {data ? (
          <table className="w-11/12 text-sm text-center rtl:text-right  ">
            <thead className="text-md text-gray-900 uppercase">
              <tr>
                {data.values[0].map((header, index) => (
                  <th key={index} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.values.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="backdrop-blur-xl bg-white/30">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 align-middle">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center h-full">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <img
        src={isMobile ? "./Footer2.png" : "./Footer_Desk.png"}
        className=" w-full"
      />
    </div>
  );
};

export default YourComponent;
