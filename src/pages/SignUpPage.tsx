import { atom, useAtom } from 'jotai'
import React, { useEffect } from 'react'

type Props = {}


const input_first_name = atom("")
const input_last_name = atom("")
const input_email = atom("")
const input_nic = atom("")
const input_phone_number = atom("")
const input_password = atom("")
const input_re_entered_password = atom("")


const input_riot_id_before_hash = atom("")
const input_riot_id_after_hash = atom("")

const is_riot_id_valid = atom<boolean>(false)
const is_riot_id_verification_request_loading = atom<boolean>(false)


const show_verification_error = atom<boolean>(false)
const account_level = atom<string>("")
const account_rank = atom<string>("")
const account_name = atom<string>("")
const account_banner_url = atom<string>("")



const SignUpPage = (props: Props) => {
    return (
        <div className='container mx-auto'>
            <div className='pt-8 '>
                <h4 className='text-2xl font-semibold '>
                    Sign Up
                </h4>
            </div>

            <SignUpForm/>           

        </div>
    )
}


const SignUpForm = () => {

    const [ v_input_first_name , set_input_first_name] = useAtom(input_first_name)
    const [ v_input_last_name , set_input_last_name] = useAtom(input_last_name)
    const [ v_input_email , set_input_email] = useAtom(input_email)
    const [v_input_nic , set_input_nic] = useAtom(input_nic)
    const [ v_input_phone_number , set_input_phone_number] = useAtom(input_phone_number)
    const [ v_input_password , set_input_password] = useAtom(input_password)
    const [ v_input_re_entered_password , set_input_re_entered_password] = useAtom(input_re_entered_password)

    const [v_input_riot_id_before_hash, set_input_riot_id_before_hash] = useAtom(input_riot_id_before_hash)
    const [v_input_riot_id_after_hash, set_input_riot_id_after_hash] = useAtom(input_riot_id_after_hash)
    
    const [ v_is_riot_id_valid , set_is_riot_id_valid] = useAtom(is_riot_id_valid)
    const [ v_is_riot_id_verification_request_loading , set_is_riot_id_verification_request_loading] = useAtom(is_riot_id_verification_request_loading)

    const [v_account_name , set_account_name] = useAtom(account_name)
    const [v_account_level , set_account_level] = useAtom(account_level)
    const [v_account_rank, set_account_rank] = useAtom(account_rank)
    const [v_account_banner_url , set_account_banner_url] = useAtom(account_banner_url)
    const [v_show_verification_error , set_show_verification_error] = useAtom(show_verification_error)
    
    
    const handle_verify_riot_id = () => {
        let url = `${import.meta.env.VITE_BACKEND_URL}/account/${v_input_riot_id_before_hash}/${v_input_riot_id_after_hash}`

        set_is_riot_id_verification_request_loading(true)

        fetch(url , 
            {
                headers :{
                    "Access-Control-Allow-Origin" : "http://localhost:5173"
                }
            }
            ).then(
            res => {
                set_is_riot_id_verification_request_loading(false)
                console.log(res)
                if(res.ok) {
                    set_is_riot_id_valid(true)
                    set_show_verification_error(false)
                    return res.json()
                }
                else {
                    set_is_riot_id_valid(false)
                    set_show_verification_error(true)
                }
            }
        ).then(
            data => {
                console.log(data)
                set_account_name(data.account_name)
                set_account_rank(data.rank)
                set_account_level(data.account_level)
                set_account_banner_url(data.banner_url)
            }
        )
        .catch(
            err => {
                set_is_riot_id_verification_request_loading(false)
                console.log(err)
                set_is_riot_id_valid(false)
            }
        )

    }

    return (
        <div className='mt-6 flex'>
                <div className=' flex-grow mr-4'>
                    <p className='text-md font-thin tracking-wider'>
                        Please fill in the information
                    </p>

                    <div className='mt-4 max-w-md'>
                        <h4 className='text-md text-gray-200'>
                            First Name
                        </h4>
                        <input
                            type="text"
                            className='bg-slate-700 rounded-md w-full mt-2 p-1'
                            value={v_input_first_name}
                            onChange={ e => set_input_first_name(e.target.value)}
                        />
                    </div>

                    <div className='mt-4 max-w-md'>
                        <h4 className='text-md text-gray-200'>
                            Last Name
                        </h4>
                        <input
                            type="text"
                            className='bg-slate-700 rounded-md w-full mt-2 p-1'
                            value={v_input_last_name}
                            onChange={ e => set_input_last_name(e.target.value)}
                        />
                    </div>

                    <div className='mt-4 max-w-md'>
                        <h4 className='text-md text-gray-200'>
                            Email (Used for log In)
                        </h4>
                        <input
                            type="email"
                            className='bg-slate-700 rounded-md w-full mt-2 p-1'
                            value={v_input_email}
                            onChange={ e => set_input_email(e.target.value)}
                        />
                    </div>

                    <div className='mt-4 max-w-md'>
                        <h4 className='text-md text-gray-200'>
                            NIC
                        </h4>
                        <input
                            type="text"
                            className='bg-slate-700 rounded-md w-full mt-2 p-1'
                            value={v_input_nic}
                            onChange={ e => set_input_nic(e.target.value)}
                        />
                    </div>

                    <div className='mt-4 max-w-md'>
                        <h4 className='text-md text-gray-200'>
                            Phone
                        </h4>
                        <input
                            type="text"
                            className='bg-slate-700 rounded-md w-full mt-2 p-1'
                            value={v_input_phone_number}
                            onChange={ e => set_input_phone_number(e.target.value)}
                        />
                    </div>

                    <div className='mt-4 max-w-md'>
                        <h4 className='text-md text-gray-200'>
                            Password
                        </h4>
                        <input
                            type="password"
                            className='bg-slate-700 rounded-md w-full mt-2 p-1'
                            value={v_input_password}
                            onChange={ e => set_input_password(e.target.value)}
                        />
                    </div>

                    <div className='mt-4 max-w-md'>
                        <h4 className='text-md text-gray-200'>
                            Re-enter Password
                        </h4>
                        <input
                            type="password"
                            className='bg-slate-700 rounded-md w-full mt-2 p-1'
                            value={v_input_re_entered_password}
                            onChange={ e => set_input_re_entered_password(e.target.value)}
                        />
                    </div>


                </div>
                <div className='flex-grow'>
                    <h4 className='text-md font-semibold '>
                        Riot Account Details
                    </h4>

                    <div className='mt-4 max-w-md'>
                        <h4 className='text-md text-gray-200'>
                            Riot ID
                        </h4>
                        <div className='flex items-center justify-between w-full'>
                            <input
                                type="text"
                                className='bg-slate-700 rounded-md mt-2 p-1 flex-grow'
                                value={v_input_riot_id_before_hash}
                                onChange={ e => set_input_riot_id_before_hash(e.target.value)}
                            />
                            <h4 className='mx-2 text-gray-500'>
                                #
                            </h4>
                            <input
                                type="text"
                                className='bg-slate-700 rounded-md mt-2 p-1 flex-grow'
                                value={v_input_riot_id_after_hash}
                                onChange={ e => set_input_riot_id_after_hash(e.target.value)}
                            />
                        </div>

                        {
                            v_is_riot_id_verification_request_loading ? 
                            <div className='mt-4 bg-neutral-800 p-2 rounded-lg '>
                                <h4 className='text-md text-neutral-100 text-center'>
                                    Verifying your Riot ID, Please wait...
                                </h4>
                            </div>
                             
                            :
                            <button 
                                className='mt-4 bg-red-600 px-4 py-2 text-md font-semibold rounded-md w-full'
                                onClick={handle_verify_riot_id}
                            >
                                Verify Riot ID
                            </button>  
                        }
                        


                        {
                            v_is_riot_id_valid  && 
                            <ConfirmAccountDetails/>                            
                        }   
                        
                        {
                            !show_verification_error && 
                            <IncorrectRiotIDMessage/>
                        }

              

                    </div>

                </div>
            </div>
    )
}


const ConfirmAccountDetails = () => {

    const [v_account_name , set_account_name] = useAtom(account_name)
    const [v_account_level , set_account_level] = useAtom(account_level)
    const [v_account_rank, set_account_rank] = useAtom(account_rank)
    const [v_account_banner_url , set_account_banner_url] = useAtom(account_banner_url)

    const [ v_input_first_name , set_input_first_name] = useAtom(input_first_name)
    const [ v_input_last_name , set_input_last_name] = useAtom(input_last_name)
    const [ v_input_email , set_input_email] = useAtom(input_email)
    const [v_input_nic , set_input_nic] = useAtom(input_nic)
    const [ v_input_phone_number , set_input_phone_number] = useAtom(input_phone_number)
    const [ v_input_password , set_input_password] = useAtom(input_password)
    const [ v_input_re_entered_password , set_input_re_entered_password] = useAtom(input_re_entered_password)

    const [v_input_riot_id_before_hash, set_input_riot_id_before_hash] = useAtom(input_riot_id_before_hash)
    const [v_input_riot_id_after_hash, set_input_riot_id_after_hash] = useAtom(input_riot_id_after_hash)
    
 
    const handle_sign_up = () => {
        let url = `${import.meta.env.VITE_BACKEND_URL}/user/register`

        fetch(
            url, 
            {
                method:"POST",
                headers:{
                    'Content-Type' : "application/json",
                    "Access-Control-Allow-Origin" : "http://localhost:5173" 
                },
                body: JSON.stringify({
                    "first_name": v_account_name,
                    "last_name": v_input_last_name,
                    "riot_id_first": v_input_riot_id_before_hash,
                    "riot_id_hash": v_input_riot_id_after_hash,
                    "email": v_input_email,
                    "nic": v_input_nic,
                    "phone": v_input_phone_number,
                    "password": v_input_password,
                    "is_verified": true,
                    "in_queue": true
                })
            }
        ).then(
            res => {
                console.log(res)
                if(res.ok){
                    alert("Sign Up Successfull")
                }else{
                    alert("Sign Up Failed")
                    console.log(res)
                }
            }
        ).catch(
            err => {
                alert("Sign Up Failed")
                console.log(err)
            }
        )


    }

    return(
        <div className='mt-4'>
                            <h4 className='text-md font-semibold '>
                                Verify Account Details
                            </h4>

                            <img 
                                src={v_account_banner_url}
                                className="h-80 w-full object-contain"
                            />                            
                            <div className='flex justify-between'>
                                <div className='mt-4 max-w-md'>
                                    <h4 className='text-md text-gray-200'>
                                        Account Name
                                    </h4>
                                    <h4 className='text-sm text-gray-400'>
                                        {v_account_name}
                                    </h4>
                                </div>
                                <div className='mt-4 max-w-md'>
                                    <h4 className='text-md text-gray-200'>
                                        Account Level 
                                    </h4>
                                    <h4 className='text-sm text-gray-400'>
                                        {v_account_level}
                                    </h4>
                                </div>
                                <div className='mt-4 max-w-md'>
                                    <h4 className='text-md text-gray-200'>
                                        Rank
                                    </h4>
                                    <h4 className='text-sm text-gray-400'>
                                        {v_account_rank}
                                    </h4>
                                </div>
                            </div>
                       
                            <button 
                                className='mt-4 bg-red-600 px-4 py-2 text-md font-semibold rounded-md w-full'
                                onClick={ handle_sign_up}
                            >
                                Confirm & Sign Up
                            </button>   

                        </div>
    )
}

const IncorrectRiotIDMessage = () => {
    return(
        <div className='flex justify-center items-center bg-red-100 mt-4 p-3 rounded-lg'>
            <h4 className='text-sm text-red-700 '>
                No Riot Account Found For This Riot ID
            </h4>
            
        </div>
    )
}

export default SignUpPage