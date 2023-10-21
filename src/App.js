import React, { useEffect, useState } from 'react'
import { baseRequest } from './services/request';
import { Search } from './components/Search';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import './styles/main.scss'
import { HOST } from './services/constants';


function App() {

  const [ data, setData ] = useState([]);
  const [ modal, setModal ] = useState(false)
  const [ modalData, setModalData ] = useState({})

  useEffect(() => {
    getData()
  }, [])

  const getData = async (param) => {
    try {
        if (param) {
          const res = await baseRequest(HOST, param)
          setData(res);
        } else {
          const res = await baseRequest(HOST)
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
    setModalData(item)
    setModal(true)
  }

  return (
    <div className="App">
        <Search onUserInput={onUserInput}></Search>
        <div className="wrapper">
          {
            data.length < 1
            ?
            <div className='empty_request'>Ошибка сервера или не удалось найти данные по вашему запросу.</div>
            :
            data.map((item, idx) => 
                <Card
                  data={item}
                  key={idx}
                  onClick={() => openModal(item)}
                ></Card>
            )
          }
          {(modal && modalData) && <Modal modalData={modalData} setModal={setModal}></Modal>}
        </div>
    </div>
  );
}

export default App;
