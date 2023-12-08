import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation"
const formSchema = z.object({
    username: z.string().min(1, "username is required"),
    firstname: z.string().min(1, "firstname is required"),
    lastname: z.string().min(1, "lastname is required"),
    email: z.string().email("invalid format"),
    password: z.string().min(1, "password is required"),
})

const SignUpForm = () => {
    const router = useRouter()
    type ValidationSchemaType = z.infer<typeof formSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })
    const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
        try {
            const { firstname, lastname, ...rest } = data
            let res = await fetch("/api/user", {
                method: "POST",
                body: JSON.stringify({ ...rest }),
                headers: {
                    "Content-type": "application/json"
                }
            })
           
            if (res.ok) {
                toast.success("kayıt başarılı")
            }
            else{
                toast.error("hataaa")
            }
        }
        catch (err) {

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col items-start space-y-7'>
                    <div className='flex justify-between items space-x-10' >
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="firstname" className='text-gray-800'>First Name</label>
                            <input {...register("firstname")} type="text" id='firstname' className={`outline-none border-2  p-2 rounded-lg  ${errors.firstname ? "border-red-400" : "border-blue-400"} `} placeholder='username' />

                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="text" className='text-gray-800'>Last Name</label>
                            <input {...register("lastname")} type="text" id='text' className='outline-none border-2 border-blue-400 p-2 rounded-lg' placeholder='email' />
                        </div>
                    </div>
                    <div className='flex justify-between items space-x-10' >
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="username" className='text-gray-800'>Username</label>
                            <input {...register("username")} type="text" id='username' className='outline-none border-2 border-blue-400 p-2 rounded-lg' placeholder='username' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="email" className='text-gray-800'>Email</label>
                            <input {...register("email")} type="email" id='email' className='outline-none border-2 border-blue-400 p-2 rounded-lg' placeholder='email' />
                        </div>
                    </div>
                    <div className='flex flex-col space-y-2 w-full'>
                        <label htmlFor="password">Password</label>
                        <input {...register("password")} type="password" id='password' className='outline-none border-blue-400 border-2 p-2 rounded-lg' placeholder='password' />
                    </div>
                    <button className='bg-blue-400  text-white w-full p-2 rounded-md ' type='submit'>Register</button>
                </div>

            </form>

        </>


    )
}

export default SignUpForm