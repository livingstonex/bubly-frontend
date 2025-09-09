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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useResetPassword } from '@/lib/queries/useResetPassword';
import { ROUTES } from '@/routes';

const formSchema = z
  .object({
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

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutateAsync: resetPassword, status } = useResetPassword();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = form.handleSubmit(
    async (payload: z.infer<typeof formSchema>) => {
      if (!email || !code) {
        toast.error('Please use the reset link from your email.');
        return;
      }

      const { password } = payload;

      try {
        await resetPassword(
          { email, newPassword: password, token: code },
          {
            onSuccess: res => {
              toast.success(res.message);
              navigate(ROUTES.ROOT);
            },
          }
        );
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data.message
            : 'An error occurred';

        toast.error(`${errorMessage} Please try again.`);
      }
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} id="reset-password-form">
        <div className="flex flex-col gap-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
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
          form="reset-password-form"
          className="w-full mt-6"
          disabled={status === 'pending'}
        >
          Submit
          {status === 'pending' ? (
            <Loader className="animate-spin" size={16} strokeWidth={2} />
          ) : null}
        </Button>
      </form>
    </Form>
  );
}

function ResetPassword() {
  const navigate = useNavigate();

  return (
    <CenteredLayout>
      <div className="flex flex-col items-center gap-5 w-full max-w-md px-4">
        <Logo size="default" />

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reset password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => navigate('/')}>
                Sign In
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </CenteredLayout>
  );
}

export default ResetPassword;
