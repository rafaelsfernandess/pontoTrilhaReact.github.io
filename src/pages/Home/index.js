import React, { useEffect, useState } from 'react';

import './styles.css';
import Header from '../../components/Header/Header';
import { Button } from 'react-bootstrap';
import api from '../../service/api';

function Home() {
    const [ response, setResponse]= useState('')

    const handleRefreshToken = async () =>{
      const userName = localStorage.getItem('username')
      const refreshToken = 'Bearer '+localStorage.getItem('accessToken')
      
      try {
        const response = await api.put(`/auth/refresh/${userName}`, {},{
          headers:{
            'Authorization': refreshToken,
          },
        });
        alert('Token atualizado')
        setResponse(response.data)
      } catch (error) {
        alert('Erro ao atualizar token')
      }

    }

  return (
    <div>
      <Header />
      <Button onClick={handleRefreshToken}>Refresh</Button>

    </div>
  )
}

export default Home