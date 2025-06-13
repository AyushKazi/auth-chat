import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../helper/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignUpFormSchema = z.infer<typeof formSchema>;

const Signup = () => {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (formdata: SignUpFormSchema) => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: formdata.email,
      password: formdata.password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage(
        "User account created successfully! Please check your email for confirmation."
      );
    }
    form.reset();
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md border mt-20">
      <h2 className="my-8 text-3xl font-semibold text-center">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="underline text-blue-300" to={"/login"}>
              Login
            </Link>
          </p>
          <Button
            variant={"secondary"}
            type="submit"
            className="w-full hover:cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Submit"}
          </Button>
        </form>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
