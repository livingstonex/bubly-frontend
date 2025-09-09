import CenteredLayout from '@/app/layout/centered-layout';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useSignUp } from '@/lib/queries/useSignUp';
import { ROUTES } from '@/routes';

const formSchema = z
  .object({
    firstname: z
      .string()
      .min(1, { message: 'Please enter your firstname' })
      .max(256, { message: 'firstname is too long.' }),
    lastname: z
      .string()
      .min(1, { message: 'Please enter your lastname' })
      .max(256, { message: 'lastname is too long.' }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' })
      .regex(/[a-z]/, { message: 'Password must contain a lowercase letter.' })
      .regex(/[A-Z]/, { message: 'Password must contain an uppercase letter.' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: signUp, status } = useSignUp();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = form.handleSubmit(async data => {
    const { firstname, lastname, email, password } = data;

    try {
      await signUp({ firstname, lastname, email, password });
      toast.success('User signup successful.');
      navigate(ROUTES.OTP);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message || error.message
          : 'An error occurred';

      toast.error(`${errorMessage} Please try again.`);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} id="signup-form">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Firstname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Lastname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        {...field}
                      />

                      <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer">
                        {showPassword ? (
                          <EyeOff
                            className="h-4 w-4"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <Eye
                            className="h-4 w-4"
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        {...field}
                      />

                      <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer">
                        {showConfirmPassword ? (
                          <EyeOff
                            className="h-4 w-4"
                            onClick={() => setShowConfirmPassword(false)}
                          />
                        ) : (
                          <Eye
                            className="h-4 w-4"
                            onClick={() => setShowConfirmPassword(true)}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          form="signup-form"
          className="w-full mt-6"
          disabled={status === 'pending'}
        >
          Sign Up
          {status === 'pending' ? (
            <Loader className="animate-spin" size={16} strokeWidth={2} />
          ) : null}
        </Button>
        <Button variant="outline" className="w-full mt-2">
          Sign Up with Google
        </Button>
      </form>
    </Form>
  );
}

function SignUp() {
  const navigate = useNavigate();
  return (
    <CenteredLayout>
      <div className="flex flex-col items-center gap-5 w-full max-w-md px-4">
        <Logo size="default" />

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Sign up for your account</CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => navigate('/')}>
                Sign In
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </CenteredLayout>
  );
}

export default SignUp;
