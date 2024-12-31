import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchemaEmail } from "@/schema/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, MoveLeft } from "lucide-react"

export default function Login() {
  const [emailValue, setEmailValue] = React.useState("")
  const [sendInfo, setSendInfo] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(formSchemaEmail),
    defaultValues: {
      email: "",
    },
  })

  // ! this is important if i want change values and update it instant
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value)
  }
  // ! this is important if i want change values and update it instant
  const emailValidationResult = formSchemaEmail.safeParse(form.getValues())
  // * client email 
  const clientEmail = ""
  const handleEmailSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
  }


  return (
    <div className="max-w-[400px] mx-auto h-screen w-full flex flex-col items-center justify-center">
      <p className="text-center text-[35px] pb-4 font-bold text-green-500">Goal Oriented Academy</p>
      {!sendInfo ? (<div className="p-2 w-full mx-2">
        <Form {...form}>
          <form method="get" action="http://localhost:5000/login" className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input

                      className="p-2 px-4"
                      placeholder="Enter your email"
                      {...field}
                      // ! this is important if i want change values and update it instant
                      onChange={(e) => {
                        field.onChange(e) // Let React Hook Form handle the change //! this is important if i want change values and update it instant
                        handleEmailChange(e) // Also update our local state //! ! this is important if i want change values and update it instant
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your Goal-Oriented Academy email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type={"submit"}
              onClick={handleEmailSubmit}
              // ! this is important if i want change values and update it instant ---> emailValidationResult.success
              className={`w-full py-6 ${emailValidationResult.success ? "bg-green-500 hover:bg-green-300" : "bg-green-300 hover:bg-green-300 cursor-not-allowed"}`}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>)
        :
        < >

          <MoveLeft onClick={() => setSendInfo(false)} className="mr-auto cursor-pointer w-[30px] h-[30px] mb-2 bg-slate-300 hover:bg-slate-200 rounded-full p-2" />
          <div className="w-full bg-green-100 rounded-sm p-2">
            <div className="flex items-start space-x-3">
              <div className=" mt-1 flex items-center justify-center w-4 h-4 p-[1px] bg-green-500 text-white rounded-full">
                <Check className="text-white" />
              </div>
              <p className="text-sm text-gray-700">
                <b>{clientEmail}</b> Information has been sent successfully to your email. Please check your email to enter in GOA.
              </p>
            </div>
          </div>
        </>
      }
    </div>
  )
}
