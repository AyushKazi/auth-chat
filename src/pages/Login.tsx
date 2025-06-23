import { use, useEffect, useState } from "react";
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
import { Link, useLocation, useNavigate } from "react-router";
// import { userAuth } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormSchema = z.infer<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

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
      navigate(from, { replace: true });
      return null;
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    // if (data) {
    //   console.log("Google sign-in data:", data);
    //   navigate("/dashboard");
    //   return null;
    // }
  };

  return (
    <div className="container mx-auto ">
      <div className="  my-20 flex justify-center">
        <button
          className="border  px-4 py-2 rounded text-white-600 hover:bg-white-600 hover:text-white transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
        <Link to="/dashboard" className="ml-4 ">
          <Button variant={"secondary"}> Dashboard</Button>
        </Link>
      </div>
      <div className=" text-center ">
        <button
          className="border px-4 py-2 rounded text-white-600 hover:bg-white"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </button>{" "}
      </div>
      <hr className="my-8 max-w-sm mx-auto" />
      <div className=" max-w-sm mx-auto   rounded-lg shadow-md   ">
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
            <p className="text-sm text-center">
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
    </div>
  );
}
