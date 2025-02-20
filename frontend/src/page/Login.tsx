import * as React from "react"
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { formSchemaEmail } from "../interface/(login)/login-form"
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "../store/authStore"
import Submit from "../components/submit"
import Loading from "../components/loading"
import { useToast } from "../hooks/use-toast"
import { Navigate } from "react-router-dom"


export default function Login() {
  const { login, isLoading, isLogin } = useAuthStore()

  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchemaEmail),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  React.useEffect(() => {
    if (isLogin) {
      window.location.href = "/dashboard"
    }
  }, [isLogin])

  const handleEmailSubmit = async (data: { email: string; password: string; }) => {
    try {
      await login(data.email, data.password)
      const { isLogin } = useAuthStore.getState() // ✅ Get the updated state

      if (isLogin) {
        toast({
          variant: "default",
          description: "Login successful!",
        })
        form.reset({ password: "", email: data.email })
      } else {
        toast({
          variant: "destructive",
          description: "Incorrect email or password.",
        })
      }
    } catch (error) {
      console.error("Error logging in:", error)
      toast({
        variant: "destructive",
        description: "An unexpected error occurred during login.",
      })
    }
  }
  return (
    (localStorage.getItem?.("authLogin") == "true") ? <Loading className="h-screen " /> : (
      <div className="absolute top-0 right-0 left-0 max-w-[400px] h-full mx-auto w-full flex flex-col items-center justify-center">
        <div >

          <p className="text-center text-[32px] p-2 pb-4 font-bold text-green-500">Goal Oriented Academy</p>
          <div className="p-2 w-full ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="p-2 px-4"
                          placeholder="Enter your email"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input
                          className="p-2 px-4"
                          placeholder="Enter your password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={`w-full py-6 ${form.formState.isValid ? "bg-green-400 hover:bg-green-300" : "bg-green-300 hover:bg-green-300 cursor-not-allowed"}`}
                >
                  {(isLoading) ? <Submit /> : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>)
  )
}