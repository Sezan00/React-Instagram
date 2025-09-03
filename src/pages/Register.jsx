import Footer from "../component/Footer";

function Register(){


    return(
            <> 
         
        <div className="flex justify-center">
            <div className=" border border-gray-400 mt-12 w-100 max-w-[350px] justify-center p-10 rounded shadow">
                <h2 className="text-4xl text-center font-dancing-script font-bold">Instagram</h2>
                <h3 className="text-gray-400 text-center text-sm font-motserrat mt-3 font-bold">Sign up to see photos and videos from your friends.</h3>
                <div className="flex justify-center">
                    <button className="font-montserrat font-semibold bg-[#1877F2] text-white px-12 py-1 rounded-sm mt-2">
                        Log in with Facebook
                    </button>
                </div>
                
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-400 font-bold">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div>
                    <div className="relative">
                        <input className="peer w-full border border-gray-300 rounded px-2 pt-5 pb-1 text-xs" type="text" id="email" placeholder=" "/>
                        <label htmlFor="email" 
                        className="absolute text-sm left-2 top-1.5 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-sm">
                            Mobile Number or Email
                        </label>
                    </div>
                    <div className="relative">
                        <input className="peer mt-2 w-full border border-gray-300 rounded px-2 py-1" id="password" type="text" placeholder=" " />
                        <label htmlFor="password"
                        className="absolute text-sm left-2 top-1.5 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-sm">
                            password
                        </label>
                    </div>
                    
                    
                    <div className="relative">
                        <input className="peer mt-2 w-full border border-gray-300 rounded px-2 py-1" id="full_name" type="text" placeholder=" "/>
                        <label htmlFor="full_name"
                        className="absolute text-sm left-2 top-1.5 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-sm">
                            Full name
                        </label>
                    </div>


                    <div className="relative">
                        <input className="peer mt-2 w-full border border-gray-300 rounded px-2 py-1" id="username" type="text" placeholder=" "/>
                        <label htmlFor="username"
                        className="absolute text-sm left-2 top-1.5 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-sm">
                            username
                        </label>
                    </div>
                </div>

                <div className="flex  flex-col items-center mt-2 text-xs">
                    <span className="text-center">People who use our service may have uploaded your contact information to Instagram. Learn</span>
                    <span className="text-blue-500 cursor-pointer text-center">More</span>
                </div>

              <div className="flex flex-wrap justify-center mt-3 text-xs text-center">
                <span>By signing up, you agree to our&nbsp;</span>
                <span className="text-blue-500 cursor-pointer">Terms</span>
                <span>,&nbsp;</span>
                <span className="text-blue-500 cursor-pointer">Privacy Policy</span>
                <span>&nbsp;and&nbsp;</span>
                <span className="text-blue-500 cursor-pointer">Cookies Policy</span>
                <span>.</span>
             </div>

             <div className="flex justify-center mt-2">
                <button className="border px-20 py-1 bg-[#1877F2] text-white font-semibold rounded-sm">Sign up</button>
             </div>
            
            </div>
        </div>

        <div className="flex justify-center">
            <div className=" border border-gray-400 mt-8 w-100 max-w-[350px] justify-center p-5 rounded shadow">
                <div className="flex flex-col items-center gap-2">
                    <span>Have an account?</span>
                    <button className="text-blue-500 font-semibold">Log in</button>
                </div>
            </div>
        </div>

        <Footer/>
           </>
    )
}
export default Register;
