import React, { useState, useEffect } from 'react';

function Passengers() {
  const [passenger, setPassenger] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const api = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
      );
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData)
        setPassenger((prevData) => [...prevData, ...jsonData.data]);

      } else {
        console.error('Error in getting Data');
      }
    } catch (error) {
      console.error('Error occurred', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    api();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex flex-wrap gap-4 justify-center items-center'>
      {passenger.map((item,id) => (
        <div className='shadow-2xl p-8 w-1/4'  key={`${item._id}-${id}`}>
          <div>
            <div className='h-20 w-40'>

            <img
              src={item?.airline[0]?.logo}
              alt='Airline Logo'
            />
            </div>
            <div>
              <div className='font-bold'>
                {item.name}
              </div>
              <div>
                <div>
                  <p><b>Trips:</b> {item.trips}</p>
                  <p><b>Airline:</b> {item.airline[0]?.name}</p>
                  <p><b>Country:</b> {item.airline[0]?.country}</p>
                  <p><b>Established:</b> {item.airline[0]?.established}</p>
                  <p><b>Slogan:</b> {item.airline[0]?.slogan}</p>
                  <p><b>Head Quarters:</b> {item.airline[0]?.head_quaters}</p>
                  <button className='bg-black px-8 py-2 text-white mt-5'>
                    <a href={`https://${item.airline[0]?.website}`}> Airline Website </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isLoading && <div className='text-xl'>Loading...</div>}
    </div>
  );
}

export default Passengers;