import React, { useEffect, useState } from 'react'
import { baseRequest } from './services/request';
import { Search } from './components/Search';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import dotenv from 'dotenv';
import './styles/main.scss'

dotenv.config()

function App() {
  
  const [ data, setData ] = useState([]);
  const [ modal, setModal ] = useState(false)
  const [ propsData, setPropsData ] = useState({})

  useEffect(() => {
    getData()
  }, [])

  const getData = async (param) => {
    try {
        if (param) {
          const res = await baseRequest(process.env.REACT_HOST, param)
          setData(res);
        } else {
          const res = await baseRequest(process.env.REACT_HOST)
          setData(res);
        }
    } catch (error) {
      console.error(error);
    }
  };

  const onUserInput = async (val) => {
    try {
      getData(val)
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
        <Search onUserInput={onUserInput}></Search>
        <div className="wrapper">
          {
            data.length < 1
            ?
            <div className='empty_request'>Не удалсь получить данные</div>
            :
            data.map((item, idx) => 
                <Card
                  data={item}
                  key={idx}
                  onClick={() => openModal(item)}
                ></Card>
            )
          }
          {
            modal && propsData
            ?
            <Modal propsData={propsData} setModal={setModal}></Modal> 
            : 
            null
          }
        </div>
    </div>
  );
}

export default App;
