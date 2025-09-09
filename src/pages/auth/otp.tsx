import z from 'zod';

import CenteredLayout from '@/app/layout/centered-layout';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/ui/logo';
import { useNavigate } from 'react-router';
import otpLogo from '../../assets/otp.svg';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useVerifyEmail } from '@/lib/queries/useVerifyEmail';
import { useGetUser } from '@/lib/queries/useGetUser';
import { ROUTES } from '@/routes';
import { useResendOtp } from '@/lib/queries/useResendOtp';
import { Loader } from 'lucide-react';

const OtpSchema = z.object({
  pin: z.string().min(4, {
    message: 'Your one-time password must be 4 digit number.',
  }),
});

export function InputOTPForm() {
  const navigate = useNavigate();
  const { mutateAsync: verifyEmail, status } = useVerifyEmail();
  const { data: user } = useGetUser();
  const { mutateAsync: resendOtp, status: resendOtpStatus } = useResendOtp();

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: '',
    },
  });

  const onSubmit = form.handleSubmit(async payload => {
    const { pin } = payload;

    try {
      await verifyEmail({
        email: user?.email ?? '',
        code: pin,
      });
      toast.success('Successfully verified email.');
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message
          : 'An error occurred';

      toast.error(`${errorMessage} Please try again.`);
    }
  });

  const initiateOtpResend = async () => {
    try {
      await resendOtp(
        {
          email: user?.email ?? '',
        },
        {
          onSuccess: res => {
            toast.success(res.message ?? 'Successfully verified email.');
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
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Form {...form}>
        <form onSubmit={onSubmit} id="otp-form">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={4}
                      onComplete={onSubmit}
                      {...field}
                      disabled={status === 'pending'}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator className="text-gray-300" />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex justify-around items-center">
        <div className="text-sm text-gray-500">Didn't receive code?</div>
        <Button
          variant="link"
          disabled={resendOtpStatus === 'pending'}
          onClick={initiateOtpResend}
        >
          Resend
          {resendOtpStatus === 'pending' ? (
            <Loader className="animate-spin" size={8} strokeWidth={2} />
          ) : null}
        </Button>
      </div>
    </div>
  );
}

function Otp() {
  return (
    <CenteredLayout>
      <div className="flex flex-col items-center gap-7 w-full max-w-md px-4">
        <Logo size="default" />

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              Enter OTP sent to your email to verify
            </CardDescription>
            <CardAction>
              <Logo size="small" variant="icon" />
            </CardAction>
          </CardHeader>
          <img src={otpLogo} alt="otp" className="h-30 rounded-md" />
          <CardContent>
            <InputOTPForm />
          </CardContent>
        </Card>
      </div>
    </CenteredLayout>
  );
}

export default Otp;
