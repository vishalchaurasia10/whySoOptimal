'use client'

import { navbarData } from '@/app/utils/constants'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const Sidebar = () => {

    const [isMobile, setIsMobile] = useState(false);

    type navbarItem = {
        title: string,
        path: string,
    }

    useEffect(() => {

        function checkScreenSize() {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const isExpanded = useSelector((state: any) => state.navReducer.isExpanded)

    return (
        <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{
                x:isMobile ? (isExpanded ? '40%' : '100%') : (isExpanded ? '60%' : '100%'),
                opacity: 1,
            }}
            transition={{ duration: 0.3 }}
            className='h-screen lg:hidden bg-[#e0e0e0] px-6 pt-20 md:pt-28'>
            <ul className='flex flex-col space-y-4 text-xl'>
                {navbarData.map((item: navbarItem, index: number) => {
                    return (
                        <li key={index}>
                            <Link href={item.path}>
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </motion.div>
    )
}

export default Sidebar
