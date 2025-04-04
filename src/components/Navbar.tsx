import { FaMusic } from "react-icons/fa";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

export default function Navbar(){
    return(
        <div className='w-screen text-sky-300 h-20  bg-gradient-to-b from-slate-950  to-slate-900'>
            <nav className='flex justify-between h-full  px-2 sm:px-4 md:px-6 w-11/12 mx-auto items-center'>
                <div className='text-4xl font-serif font-semibold'><FaMusic className='inline h-8 w-8 mr-3'/>Beatocracy</div>
                <div >
                    <SignedIn>
                        <UserButton showName/>
                    </SignedIn>
                    <SignedOut>
                        <SignUpButton>
                            <button className='h-10 w-fit p-2 mr-8 rounded-md bg-slate-900 hover:bg-slate-800 duration-200 border-slate-500 border-[1px] cursor-pointer'>Sign Up</button>
                        </SignUpButton>
                        <SignInButton>
                            <button className='h-10 w-fit p-2 rounded-md bg-slate-900 hover:bg-slate-800 duration-200 border-slate-500 border-[1px] cursor-pointer'>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </nav>
        </div>
    )
}