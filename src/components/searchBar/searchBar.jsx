import React, {useState, useEffect} from 'react'
import { TickerSymbols } from "./TickerSymbols";
import searchIcon from './search.png'
import './searchBar.css'

const SearchBar = ({ handleSearch }) => {
    const [stocks, setStocks] = useState([]);
    const [inputValue, setInputValue] = useState("");
  
    useEffect(() => {
      const regex = new RegExp(`^${inputValue.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')}`, "i");
      setStocks(
        TickerSymbols.filter((val) => regex.test(val.symbol)).slice(0, 11)
      );
    }, [inputValue]);
  
    return (
      <div className="container">
        <input
        placeholder="PICK A SYMBOL..."
          list="stock-picker"
          type="text"
          value={inputValue}
          onChange={(e) =>
            e.target.value.length <= 5
              ? setInputValue(e.target.value.toUpperCase())
              : setInputValue(inputValue)
          }
        />
        <datalist id="stock-picker">
          {inputValue.length &&
            stocks.map((val) => (
              <option
                key={val.symbol}
                value={val.symbol}
                label={val.name}
              ></option>
            ))}
        </datalist>
        <button onClick={() => {handleSearch(inputValue); setInputValue("")}}>
              <img className="SearchButton" src={searchIcon} width="30px"></img>
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  