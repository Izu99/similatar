// src/pages/ApartmentPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images from the local directory
import bedroomsIcon from './images/image 4.svg';
import adultsIcon from './images/image 5.svg';
import childrenIcon from './images/image 6.svg';
import parkingIcon from './images/image 7.svg';
import petsIcon from './images/image 8.svg';

interface Apartment {
  id: number;
  property_name: string;
  property_code: string;
  check_in: string;
  check_out: string;
  bedrooms: number;
  adults: number;
  children: number;
  parking: number;
  pets: number;
  price: number;
  website: string;
  website_image: string;
}

const ApartmentPage: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Retrieved token:', token); // Log the retrieved token

        if (!token) {
          throw new Error('No token found. Please login first.');
        }

        const response = await fetch('https://skill-test.similater.website/api/v1/property/list', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          throw new Error('Unauthorized. Please login again.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch apartments');
        }

        const data = await response.json();
        console.log('Apartments data:', data); // Log the apartments data

        if (data.status === true && Array.isArray(data.data)) {
          setApartments(data.data);
        } else {
          throw new Error('Received data is not valid');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          if (err.message.includes('Unauthorized')) {
            localStorage.removeItem('authToken');
            navigate('/');
          }
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchApartments();
  }, [navigate]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Apartment List</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        {apartments.length > 0 ? (
          apartments.map((apartment) => (
            <div key={apartment.id} className="mb-8 p-4 border rounded-xl shadow-md bg-gray-100">
              <div className="flex items-start mb-4">
                <div className="w-1/3">
                  <img
                    src={apartment.website_image}
                    alt={apartment.property_name}
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div className="w-2/3 ml-4">
                  <h2 className="text-xl font-semibold mb-2">{apartment.property_name}</h2>
                  <p>Property Code: {apartment.property_code}</p>
                  <div className="flex justify-between mt-2">
                    <p>
                      Check-In: <b>{apartment.check_in}</b>
                    </p>
                    <p>
                      Check-Out: <b>{apartment.check_out}</b>
                    </p>
                  </div>
                  <h2 className="text-2xl font-bold text-purple-700 mt-2">${apartment.price.toFixed(2)}</h2>
                  <button className="bg-orange-500 text-white py-2 px-4 rounded mt-2">Select</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center">
                  <img src={bedroomsIcon} alt="Bedrooms" className="w-8 h-8 mr-2" />
                  <div>
                    <p className="text-sm">Bedrooms</p>
                    <p className="text-lg">{apartment.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={adultsIcon} alt="Adults" className="w-8 h-8 mr-2" />
                  <div>
                    <p className="text-sm">Adults</p>
                    <p className="text-lg">{apartment.adults}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={childrenIcon} alt="Children" className="w-8 h-8 mr-2" />
                  <div>
                    <p className="text-sm">Children</p>
                    <p className="text-lg">{apartment.children}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={parkingIcon} alt="Parking" className="w-8 h-8 mr-2" />
                  <div>
                    <p className="text-sm">Parking</p>
                    <p className="text-lg">{apartment.parking}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src={petsIcon} alt="Pets" className="w-8 h-8 mr-2" />
                  <div>
                    <p className="text-sm">Pets</p>
                    <p className="text-lg">{apartment.pets}</p>
                  </div>
                </div>
              </div>
              <a
                href={`http://${apartment.website}`}
                className="text-blue-500 mt-4 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {apartment.website}
              </a>
            </div>
          ))
        ) : (
          <div>No apartments available</div>
        )}
      </div>
    </div>
  );
};

export default ApartmentPage;
