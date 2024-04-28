import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6'

const Newsletter = () => {
    return (
        <div>
            <h3 className='text-lg font-bold mb-2 flex items-center'>
                <FaEnvelopeOpenText className='mr-2 text-xl'></FaEnvelopeOpenText>
                Subscribe to our job notifications</h3>
            <p className='text-primary/75 text-base mb-4'>Get updates on the latest job postings directly to your inbox.</p>

            <div className='w-full space-y-4'>
                <input type='email' name='email' id='email' placeholder='example@mail.com' className='w-full py-2 pl-3 border focus:outline-none' />
                <input type="submit" value={"Subscribe"} className='w-full py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
            </div>


            {/* 2nd part */}

            <div className='mt-20'>
                <h3 className='text-lg font-bold mb-2 flex items-center'>
                    <FaRocket className='mr-2 text-xl'/>
                    Get noticed faster</h3>
                <p className='text-primary/75 text-base mb-4'>Get updates on the latest job postings directly to your inbox.</p>

                <div className='w-full space-y-4'>
                    <input type="submit" value={"Upload your CV"} className='w-full py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
                </div>
            </div>


        </div>
    )
}

export default Newsletter
