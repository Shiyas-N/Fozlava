import React, { useState, useEffect } from "react";

const YourComponent = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/1HCCK_qgrPWHH1zX2a1Tg1TGti_u3sTExZYvnkoTDVIY/values/Sheet1?alt=json&key=AIzaSyDLy7YCQfJ-0LLj9epmeuDKdsFbeYdKYqE"
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    <div>
      {data ? (
        <table className="table table-striped">
          <thead>
            <tr>
              {data.values[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.values.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default YourComponent;
