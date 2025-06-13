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
import { Link, useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormSchema = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (formdata: LoginFormSchema) => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formdata.email,
      password: formdata.password,
    });

    if (error) {
      setMessage(error.message);
      form.reset();
      setLoading(false);
      return;
    }

    if (data) {
      navigate("/dashboard");
      return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md border mt-20">
      <h2 className="my-8 text-3xl font-semibold text-center">Login</h2>
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
            Don't have an account?{" "}
            <Link className="underline text-blue-300" to={"/signup"}>
              Sign Up
            </Link>
          </p>
          <Button
            variant={"secondary"}
            type="submit"
            className="w-full hover:cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logining In..." : "Login"}
          </Button>
        </form>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}
