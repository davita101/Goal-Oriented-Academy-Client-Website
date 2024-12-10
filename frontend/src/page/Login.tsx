import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema, formSchemaEmail } from "@/schema/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api") 
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const form = useForm({
    resolver: zodResolver(errorMessage ? formSchema :  formSchemaEmail),
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  const onSubmit = (data) => {
    const { email } = data;

    // Check if the email exists in the users array
    const userExists = users.some((user) => user.email === email);

    if (!userExists) {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
      console.log("Email found:", email);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto h-screen w-full flex flex-col items-center justify-center">
      <Card className="w-full px-2 py-4 mb-2">
        <p className="text-center text-green-500">Goal Oriented Academy</p>
      </Card>
      <Card className="p-2 w-full mx-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your Goal-Oriented Academy email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
