"use client";
import React, { useState } from 'react';
import { techCareers } from './carrerDB';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const Explore = () => {
  const [career, setCareer] = useState('');

  const filteredCareers = techCareers.filter(item =>
    item.title.toLowerCase().includes(career.toLowerCase())
  );

  return (
    <div className='p-6 md:p-10 max-w-7xl mx-auto'>
      {/* Header Section */}
      <div className='flex flex-col md:flex-row items-center gap-4 mb-8'>
        <Image
          src="/8d34699f-7474-43c6-a0f0-dfde1ef62907.webp"
          width={80}
          height={80}
          alt='logo'
          className='rounded-xl shadow-md'
        />
        <h1 className='text-2xl md:text-3xl font-bold text-center md:text-left text-gray-800 leading-tight'>
          Confused About Career Options and What Skills Are Required? <br />
          <span className='text-blue-600'>Here’s the Breakdown to Learn 🚀</span>
        </h1>
      </div>

      {/* Search Bar */}
      <div className='mb-6'>
        <Input
          onChange={(e) => setCareer(e.target.value)}
          value={career}
          type='text'
          placeholder='Search a Career (e.g. Frontend, DevOps, AI)'
          className='w-full max-w-lg border-2 border-gray-300 focus:border-blue-500 transition-all'
        />
      </div>

      {/* Career Cards */}
      <div className='space-y-10'>
        {filteredCareers.map((item, index) => (
          <div key={index} className='border-b pb-6'>
            <h2 className='text-xl md:text-2xl font-semibold text-blue-600 mb-1'>
              {item.title}
            </h2>
            <p className='text-gray-600 mb-3'>{item.description}</p>
            <div className='flex flex-wrap gap-3'>
              {item.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className='px-4 py-1.5 border-2 border-blue-400 text-sm rounded-full font-medium text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all cursor-pointer'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div className='text-center mt-8 text-gray-500 text-sm'>
          No career paths found for <strong>"{career}"</strong>.
        </div>
      )}
    </div>
  );
};

export default Explore;
