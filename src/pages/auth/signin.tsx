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
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useSignIn } from '@/lib/queries/useSignIn';
import { toast } from 'sonner';
import { ROUTES } from '@/routes';
import { AxiosError } from 'axios';

const formSchema = z.object({
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
});

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: signIn, status } = useSignIn();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async payload => {
    try {
      await signIn(payload);
      toast.success('Successfully signed in.');
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message
          : 'An error occurred';

      toast.error(`${errorMessage} Please try again.`);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} id="signin-form">
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your-email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
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
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          form="signin-form"
          className="w-full mt-6"
          disabled={status === 'pending'}
        >
          Sign In
          {status === 'pending' ? (
            <Loader className="animate-spin" size={16} strokeWidth={2} />
          ) : null}
        </Button>
        <Button
          variant="outline"
          className="w-full mt-2"
          onClick={() => toast.success("Yeah, we're still working on this.")}
        >
          Sign In with Google
        </Button>
      </form>
    </Form>
  );
}

function SignIn() {
  const navigate = useNavigate();

  return (
    <CenteredLayout>
      <div className="flex flex-col items-center gap-5 w-full max-w-md px-4">
        <Logo size="default" />

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Sign into your account</CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </CenteredLayout>
  );
}

export default SignIn;
