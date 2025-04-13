// https://www.greatfrontend.com/interviews/study/gfe75/questions/user-interface/contact-form/react

import { ChangeEvent, FormEvent, useState } from "react";

const submissionEndpoint = 'https://questions.greatfrontend.com/api/questions/contact-form'

type FormPayload = {
    email: string;
    name: string;
    message:string;
}

export default function ContactForm(){
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)

    async function submit(e: FormEvent){
        e.preventDefault()
        // TODO:validation
        setLoading(true)

       try {
        const res = await fetch(submissionEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                email,
                name,
                message
            } satisfies FormPayload)
        })

        if (!res.ok) {
            throw new Error("Something went wrong.")
        }
        resetForm()
       
       } catch (error: unknown) {
        console.error(error)
       } finally {
        setLoading(false)
       }
    }

    function onChangeName(e: ChangeEvent<HTMLInputElement>){
        setName(e.target.value)
    }
    function onChangeEmail(e: ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value)
    }
    function onChangeMessage(e: ChangeEvent<HTMLTextAreaElement>){
        setMessage(e.target.value)
    }

    function resetForm(){
        setEmail("")
        setName("")
        setMessage("")
    }
    return (
        <form onSubmit={submit} className="max-w-lg mx-auto mt-8 p-6 border rounded shadow-lg bg-white space-y-4">
             <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email" // Use type="email" for better validation/UX
                    id="email"
                    required // Add basic required validation
                    className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={email}
                    onChange={onChangeEmail}
                />
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    id="name"
                    required
                    className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={name}
                    onChange={onChangeName}
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                    id="message"
                    required
                    rows={4} // Give textarea a default size
                    className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={message}
                    onChange={onChangeMessage}
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                disabled={loading}
            >
                Send
            </button>
        </form>
    )
}
