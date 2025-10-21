import FloatingChat from '@/components/FloatingChat'
import LeftSection from '@/components/LeftSection'
import RightSection from '@/components/RightSection'
import React from 'react'



const Home = () => {
    return (
        <div className='h-screen w-full bg-accent2 flex flex-col-reverse md:flex-row overflow-y-hidden'>
            <LeftSection />
            <RightSection />
            <FloatingChat />
        </div>
    )
}

export default Home