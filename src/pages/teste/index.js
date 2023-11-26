import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import GpxParser from 'gpxparser';

//let gpxParser = require('gpxparser');

const SeuComponente = () => {
  const [file, setfile] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [valorParaGet, setValorParaGet] = useState('');

  const [stringResposta, setStringResposta] = useState(null);

  const [parsedGpx, setParsedGpx] = useState(null);

  //dados evento
  const [locationName, setlocationName] = useState('Local B');
  const [street, setstreet] = useState('Rua B');
  const [neighborhood, setneighborhood] = useState('Bairro B');
  const [city, setcity] = useState('Cidade B');
  const [state, setstate] = useState('Estado B');
  const [zipCode, setzipCode] = useState('CEP B');
  const [complement, setcomplement] = useState('Complemento B');
  const [eventName, seteventName] = useState('Evento B');
  const [description, setdescription] = useState('Descrição do Evento B');
  const [startDate, setstartDate] = useState('2023-01-01');
  const [endDate, setendDate] = useState('2023-01-10');
  const [ticketTitle, setticketTitle] = useState('Ingresso B');
  const [quantity, setquantity] = useState(100);
  const [tickePrice, settickePrice] = useState(50.0);
  const [startOfSales, setstartOfSales] = useState('2022-12-01');
  const [endOfSales, setendOfSales] = useState('2022-12-31');
  const [minPurchaseQuantity, setminPurchaseQuantity] = useState(1);
  const [maxPurchaseQuantity, setmaxPurchaseQuantity] = useState(1);
  const [eventStatus, seteventStatus] = useState(1);
  const [map_description, setmap_description] = useState('TESTE MAPA');
  const [latitude, setlatitude] = useState('1');
  const [longitude, setlongitude] = useState('2');

  //dados evento

  const [resposta, setResposta] = useState(null);

  const handleFileChange = (event) => {
    setfile(event.target.files[0]);
  };

  const handleAccessTokenChange = (event) => {
    setAccessToken(event.target.value);
  };

  const handleValorParaGetChange = (event) => {
    setValorParaGet(event.target.value);
  };

  const enviarRequisicao = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('locationName', locationName);
      formData.append('street', street);
      formData.append('neighborhood', neighborhood);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('zipCode', zipCode);
      formData.append('complement', complement);
      formData.append('eventName', eventName);
      formData.append('description', description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('ticketTitle', ticketTitle);
      formData.append('quantity', quantity);
      formData.append('tickePrice', tickePrice);
      formData.append('startOfSales', startOfSales);
      formData.append('endOfSales', endOfSales);
      formData.append('minPurchaseQuantity', minPurchaseQuantity);
      formData.append('maxPurchaseQuantity', maxPurchaseQuantity);
      formData.append('eventStatus', eventStatus);
      formData.append('map_description', map_description);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);


      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
        //'Seu-Outro-Header': 'ValorDoOutroHeader',
      };

      //const response = await axios.post('https://pontotrilha.onrender.com/api/event/v1', formData, { headers });

      const response = await axios.post('https://pontotrilha.onrender.com/api/event/v1', formData, { headers });

      setResposta(response.data); // Armazena a resposta na variável de estado
    } catch (error) {
      console.error('Erro na requisição POST:', error);
    }
  };

  const realizarGet = async () => {
    try {
      //const response = await axios.get(`https://pontotrilha.onrender.com/api/files/v1/${valorParaGet}`, {
      const response = await axios.get(`https://pontotrilha.onrender.com/api/files/v1/${valorParaGet}`, {
        responseType: 'blob', // Define o tipo de resposta como blob (para file binário)
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Seu-Outro-Header': 'ValorDoOutroHeader',
        },
      }
      );



      // Obter o tipo de conteúdo a partir do cabeçalho "Content-Type"
      const contentType = response.headers['content-type'];

      //console.log(response.data);

      // Salvar o file usando a biblioteca file-saver
      saveAs(response.data, `file_retornado.${getFileExtension(contentType)}`);
    } catch (error) {
      console.error('Erro na requisição GET:', error);
    }
  };

  // Função auxiliar para obter a extensão do file a partir do tipo de conteúdo
  const getFileExtension = (contentType) => {
    const mimeTypes = {
      'application/pdf': 'pdf',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      // Adicione mais tipos MIME conforme necessário
    };

    const defaultExtension = 'bin'; // Extensão padrão para tipos não mapeados

    return mimeTypes[contentType] || defaultExtension;
  };

  const realizarGetMap = async () => {
    try {
      const response = await axios.get(`https://pontotrilha.onrender.com/api/files/v1/content/${valorParaGet}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Seu-Outro-Header': 'ValorDoOutroHeader',
        },
        responseType: 'text', // Indica que a resposta deve ser interpretada como texto
      });
      console.log(response.data)

      const gpxParser = new GpxParser();
      const parsedData = gpxParser.parse(response.data);
      console.log(parsedData);

      var totalDistance = parsedData.tracks[0].distance.total;
      console.log(totalDistance);

      // const parsedData = parse.parse(response.data);
      // console.log(parsedData);
      // setParsedGpx(parsedData);

    } catch (error) {
      console.error('Erro na requisição GET:', error);
    }
  };

  

  const realizarGetString = async () => {
    try {
      const response = await axios.get(`https://pontotrilha.onrender.com/api/files/v1/${valorParaGet}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Seu-Outro-Header': 'ValorDoOutroHeader',
        },
        responseType: 'text', // Indica que a resposta deve ser interpretada como texto
      });
  
      // Atualizar o estado com a string da resposta
      setStringResposta(response.data);
    } catch (error) {
      console.error('Erro na requisição GET:', error);
    }
  };

  useEffect(() => {
    // Quando o parsedGpx é atualizado, você pode fazer qualquer processamento necessário aqui.
    // Neste exemplo, estamos apenas imprimindo os pontos no console.
    console.log(parsedGpx);
  }, [parsedGpx]);

  return (
   
  

    <div>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Access Token" value={accessToken} onChange={handleAccessTokenChange} />
      <button onClick={enviarRequisicao}>Enviar Requisição POST</button>

      <div style={{ marginTop: '20px' }}>
        <input type="text" placeholder="ID do arquivo" value={valorParaGet} onChange={handleValorParaGetChange} />
        <button onClick={realizarGet}>Realizar Requisição GET (Arquivo)</button>
        <button onClick={realizarGetString}>Realizar Requisição GET (String)</button>
        <button onClick={realizarGetMap}>Realizar Requisição GET (MAP)</button>
      </div>

      {stringResposta && (
        <div>
          <h3>Resposta da API (String):</h3>
          <pre>{stringResposta}</pre>
        </div>
      )}

      {parsedGpx && parsedGpx.tracks && (
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {parsedGpx.tracks.flatMap((track) =>
            track.segments.flatMap((segment) =>
              segment.points.map((point, index) => (
                <Marker key={index} position={[point.lat, point.lon]}>
                  <Popup>
                    Latitude: {point.lat} <br />
                    Longitude: {point.lon}
                  </Popup>
                </Marker>
              ))
            )
          )}
        </MapContainer>
      )}

      {resposta && (
        <div>
          <h3>Resposta da API:</h3>
          <pre>{JSON.stringify(resposta, null, 2)}</pre>
        </div>
      )}


    </div>
  );
};

export default SeuComponente;
