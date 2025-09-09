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
import { useRequestPasswordReset } from '@/lib/queries/useRequestPasswordReset';
import { Loader, CircleCheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { Alert, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

function ForgotPasswordForm() {
  const { mutateAsync: requestPasswordReset, status } =
    useRequestPasswordReset();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit(
    async (payload: z.infer<typeof formSchema>) => {
      const { email } = payload;

      try {
        await requestPasswordReset(
          { email },
          {
            onSuccess: res => {
              toast.success(res.message);
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
      {status === 'success' ? (
        <div className="mb-4">
          <Alert className="text-green-600">
            <CircleCheckIcon />
            <AlertTitle>Please check your email for the reset link.</AlertTitle>
          </Alert>
        </div>
      ) : null}

      <form onSubmit={onSubmit} id="forgot-password-form">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
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
          </div>
        </div>

        <Button
          type="submit"
          form="forgot-password-form"
          className="w-full mt-6"
          disabled={status === 'pending'}
        >
          Request{' '}
          {status === 'pending' ? (
            <Loader className="animate-spin" size={16} strokeWidth={2} />
          ) : null}
        </Button>
      </form>
    </Form>
  );
}

function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <CenteredLayout>
      <div className="flex flex-col items-center gap-5 w-full max-w-md px-4">
        <Logo size="default" />

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Forgot password</CardTitle>
            <CardDescription>
              Enter your email to request password reset
            </CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => navigate('/')}>
                Sign In
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </CenteredLayout>
  );
}

export default ForgotPassword;
