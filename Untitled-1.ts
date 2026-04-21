import "./App.css";
import React, { useState } from "react";

export default function App() {
  const [table, setTable] = useState(
    Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => "")
    )
  );

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    const newTable = table.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? value : cell))
    );
    setTable(newTable);
  };

  return (
    <table>
      <tbody>
        {table.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => (
              <td key={colIndex}>
                <input
                  value={col}
                  onChange={e =>
                    handleChange(rowIndex, colIndex, e.target.value)
                  }
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}