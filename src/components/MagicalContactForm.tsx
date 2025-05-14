/*************  ✨ Windsurf Command 🌟  *************/
"use client"

import React, { useRef, useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Sparkles } from "lucide-react"

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`w-full rounded-xl px-6 h-14 border focus:outline-none focus:ring-1 focus:ring-gray-200 disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-500 dark:disabled:bg-gray-800 dark:disabled:border-gray-700 dark:disabled:text-gray-600 ${className}`}
        {...props}
        ref={ref}
      />
    )
  },
)
Input.displayName = "Input"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentPropsWithoutRef<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`w-full rounded-xl px-6 py-3 h-32 border focus:outline-none focus:ring-1 focus:ring-gray-200 disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-500 dark:disabled:bg-gray-800 dark:disabled:border-gray-700 dark:disabled:text-gray-600 ${className}`}
        {...props}
        ref={ref}
      />
    )
  },
)
Textarea.displayName = "Textarea"

const Button = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`relative rounded-xl px-6 h-14 border font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:border-gray-700 dark:disabled:text-gray-600 ${className}`}
        {...props}
        ref={ref}
      />
    )
  },
)
Button.displayName = "Button"

const MagicalContactForm = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [fieldFocus, setFieldFocus] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(calc(${cursorPosition.x}px - 50%), calc(${cursorPosition.y}px - 50%), 0)`
    }
  }, [cursorPosition])

  // Define form values type 
  interface FormValues {
    name: string;
    email: string;
    message: string;
  }
  
  // Define a type for form field names
  type FormFieldName = keyof FormValues;
  
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log(values)
        setIsSuccess(true)
      } catch (error) {
        console.error(error)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = formik

  const handleFieldFocus = (index: number) => {
    setFieldFocus(index)
  }

  const handleFieldBlur = () => {
    setFieldFocus(null)
  }

  const InputWrapper = ({
    children,
    label,
    name,
  }: {
    children: React.ReactNode
    label: string
    name: FormFieldName
  }) => (
    <div className="relative">
      <label
        htmlFor={name.toString()}
        className={`absolute left-6 top-1/2 -translate-y-1/2 z-10 origin-0 scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-emerald-500 dark:peer-focus:text-emerald-400 peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 transition-all duration-300`}
      >
        {label}
      </label>
      {children}
      {errors[name] && touched[name] && (
        <div className="pointer-events-none absolute left-6 bottom-3 text-sm text-red-500">{errors[name]}</div>
      )}
    </div>
  )

  const fieldProps = (name: FormFieldName) => ({
    onChange: handleChange,
    onBlur: handleBlur,
    value: values[name],
    name: name.toString(), // Convert to string explicitly
    id: name.toString(),   // Convert to string explicitly
    "aria-invalid": errors[name] && touched[name] ? true : false,
    className: "peer",
  })

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-emerald-500/20 to-emerald-400/20 dark:from-emerald-800/30 dark:via-emerald-700/30 dark:to-emerald-600/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-800/50"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-emerald-400/10 dark:bg-emerald-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-600/10 dark:bg-emerald-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div
        ref={cursorRef}
        className={`pointer-events-none fixed opacity-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 mix-blend-screen blur-sm z-10 ${fieldFocus !== null ? 'opacity-100' : ''}`}
      ></div>

      <div className="relative z-10 p-8 rounded-2xl w-full max-w-md">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold text-green-500 dark:text-green-400">Message Sent!</h2>
            <Button
              onClick={(e) => {
                e.preventDefault();
                resetForm();
                setIsSuccess(false);
              }}
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 dark:from-emerald-500 dark:to-emerald-400 dark:hover:from-emerald-600 dark:hover:to-emerald-500 text-white transition-all duration-300"
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300 inline-flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Get in Touch
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">I&apos;d love to hear from you. Send me a message!</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">I&apos;d love to hear from you. Send me a message!</p>
            <InputWrapper label="Name" name="name">
              <Input
                placeholder="Your name"
                {...fieldProps("name")}
                className="bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all"
                onFocus={() => handleFieldFocus(0)}
                onBlur={() => handleFieldBlur()}
              />
            </InputWrapper>

            <InputWrapper label="Email" name="email">
              <Input
                placeholder="Your email"
                {...fieldProps("email")}
                className="bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all"
                onFocus={() => handleFieldFocus(1)}
                onBlur={() => handleFieldBlur()}
              />
            </InputWrapper>

            <InputWrapper label="Message" name="message">
              <Textarea
                placeholder="Your message"
                {...fieldProps("message")}
                className="bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all resize-none"
                onFocus={() => handleFieldFocus(2)}
                onBlur={() => handleFieldBlur()}
              />
            </InputWrapper>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="form-button w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 dark:from-emerald-500 dark:to-emerald-400 dark:hover:from-emerald-600 dark:hover:to-emerald-500 text-white py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 group"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default MagicalContactForm