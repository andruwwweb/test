import React, { useEffect, useState } from 'react'
import { HOST, baseRequest } from './services/request';
import { Search } from './components/Search';
import { Card } from './components/Card';
import './styles/main.scss'
import { Modal } from './components/Modal';

function App() {
  
  const [data, setData] = useState([]);
  const [ modal, setModal ] = useState(false)
  const [ propsData, setPropsData ] = useState({})
  const [ inputValue, setInputValue ] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
        const res = await baseRequest(HOST)
        setData(res);
    } catch (error) {
      console.error(error);
    }
  };

  const onUserInput = async (inputValue) => {
    console.log(inputValue)
    try {
      if (inputValue.length <= 1) {
        getData()
      } else {
        const res = await baseRequest(HOST, inputValue)
        setData(res)
      }
    } catch (error) {
      console.error(error);
      
    }
  }


  const openModal = (item) => {
    setPropsData(item)
    setModal(true)
  }

  return (
    <div className="App">
        <Search inputValue={inputValue} onUserInput={onUserInput} setInputValue={setInputValue}></Search>
        <div className="wrapper">
          {data.map((item, idx) => 
            {return <Card data={item} key={idx} onClick={() => openModal(item)}></Card>}
          )}
          {modal && propsData ? <Modal propsData={propsData} setModal={setModal}></Modal> : null}
        </div>
    </div>
  );
}

export default App;
