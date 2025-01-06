import * as React from "react";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { formSchemaEmail } from "../utils/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import Submit from "../components/submit";
import Loading from "../components/loading";
import { toast } from "sonner";
import { Check, MoveLeft } from "lucide-react";

export default function Login() {
  const [sendInfo, setSendInfo] = React.useState(false);

  const { login, isLoading, } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(formSchemaEmail),
    defaultValues: {
      email: "",
    },
  });
  // Handle form submission
  const handleEmailSubmit = async (data: { email: string }) => {
    try {
      await login(data.email);
      setSendInfo(true)
      form.reset()
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    (localStorage.getItem?.("authLogin") == "true") ? <Loading className="h-screen " /> : (
      <div className="absolute top-0 right-0 left-0 max-w-[400px] h-full mx-auto w-full flex flex-col items-center justify-center">
        <div className="">

          <p className="text-center text-[35px] pb-4 font-bold text-green-500">Goal Oriented Academy</p>
          {sendInfo ? (
            <>
              <div className="p-2 w-full mx-2">
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
                          <FormDescription>
                            Enter your Goal-Oriented Academy email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      onClick={() =>
                        toast("Email has been send updated", {
                          description: "To login go to your email",
                          action: {
                            label: "Click to go to email",
                            onClick: () => window.open("https://mail.google.com/mail/u/0/#inbox", "_blank"),
                          },
                        })
                      }
                      className={`w-full py-6 ${form.formState.isValid ? "bg-green-400 hover:bg-green-300" : "bg-green-300 hover:bg-green-300 cursor-not-allowed"}`}
                    >
                      {(isLoading) ? <Submit /> : "Submit"}
                    </Button>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <>
              <MoveLeft onClick={() => setSendInfo(true)} className="mr-auto cursor-pointer w-[30px] h-[30px] mb-2 bg-slate-300 hover:bg-slate-200 rounded-full p-2" />
              <div className="w-full bg-green-100 rounded-sm p-2">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex items-center justify-center w-4 h-4 p-[1px] bg-green-500 text-white rounded-full">
                    <Check className="text-white" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Information has been sent successfully to your email. Please check your email to enter in GOA.
                  </p>
                </div>
              </div>
            </>
          )
          }

        </div>
      </div>)

  );
}