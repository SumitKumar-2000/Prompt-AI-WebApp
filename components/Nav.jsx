"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { MdFiberSmartRecord } from "react-icons/md";

// auth imports
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = () => {

  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(()=>{
    const setProviders = async () => {
        const response = await getProviders();
        setProviders(response)
    }

    setProviders()
  },[])
  
  return (
    <nav className='flex-between w-full md:mb-16 py-3'>
      <Link href="/" className="flex-between">
        <MdFiberSmartRecord
            className="text-orange-600 h-[30px] md:h-[40px] w-[30px] md:w-[40px]"
        />
        <div className="logo_text">
            Prompt AI
        </div>
      </Link>

      {/* Desktop Navigation content */}
      <div className="max-sm:hidden flex">
        {
            isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link 
                        href="create-prompt"
                        className="black_btn"
                    >
                        Create Post
                    </Link>

                    <button 
                        type="button"
                        // onClick={signOut}
                        className="outline_btn"
                    >
                        Sign Out
                    </button>

                    <Link href="/profile">
                        <Image
                            src="assets/images/user_profile.svg"
                            width={40}
                            height={40}
                            alt="User Image"
                            className="rounded-full border border-black"
                        />
                    </Link>
                </div>
            ) : (
                <>
                  {
                    providers && Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={()=>signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In
                        </button>
                    ))
                  }  
                </>
            )
        }
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden ">
        {isUserLoggedIn ? (
            <div className="flex relative">
                <Image
                    src="assets/images/user_profile.svg"
                    width={30}
                    height={30}
                    alt="User Image"
                    className="rounded-full border border-black"
                    onClick={()=>setToggleDropdown(prev => !prev)}
                />

                <div className={`dropdown ${toggleDropdown ? "scale-[100%]" : "scale-[0%]"} transition-all duration-300`}>
                    <Link 
                        href="/profile"
                        className="dropdown_link"
                        onClick={()=>setToggleDropdown(false)}
                    >
                        My Profile
                    </Link>
                    <Link 
                        href="/create-prompt"
                        className="dropdown_link"
                        onClick={()=>setToggleDropdown(false)}
                    >
                        Create Post
                    </Link>
                    <div 
                        onClick={() => {
                            setToggleDropdown(false)
                            signOut()
                        }}
                        className="dropdown_btn"
                    >
                        Sign Out
                    </div>
                </div>
            </div>
        ) : (
            <>
                {
                  providers && Object.values(providers).map((provider) => (
                      <button
                          type="button"
                          key={provider.name}
                          onClick={()=>signIn(provider.id)}
                          className="black_btn"
                      >
                          Sign In
                      </button>
                  ))
                }  
            </>
        )}
      </div>

    </nav>
  )
}

export default Nav
