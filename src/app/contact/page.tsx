'use client'

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'


type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    // For demonstration, just log form data
    console.log(data)
    reset()
  }

  return (
    <section>
      <motion.h1
        className="text-3xl font-bold mb-6 text-terminal-green"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact
      </motion.h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            id="name"
            className="w-full rounded-md bg-light-card border border-light-border p-2 focus:outline-none focus:ring-2 focus:ring-terminal-green dark:bg-dark-card dark:border-dark-border"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-red-500 text-sm">Name is required.</span>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md bg-light-card border border-light-border p-2 focus:outline-none focus:ring-2 focus:ring-terminal-green dark:bg-dark-card dark:border-dark-border"
            {...register('email', { required: true })}
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required.</span>}
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea
            id="message"
            rows={5}
            className="w-full rounded-md bg-light-card border border-light-border p-2 focus:outline-none focus:ring-2 focus:ring-terminal-green dark:bg-dark-card dark:border-dark-border"
            {...register('message', { required: true })}
          />
          {errors.message && <span className="text-red-500 text-sm">Message is required.</span>}
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-terminal-green text-light-bg dark:text-dark-bg hover:bg-terminal-green/80 transition-colors">
          Send Message
        </button>
        {isSubmitSuccessful && <p className="text-terminal-green mt-2">Message sent! Thank you.</p>}
      </form>
    </section>
  )
}
