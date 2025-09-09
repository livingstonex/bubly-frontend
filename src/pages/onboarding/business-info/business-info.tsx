import z from 'zod';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useUpdateBusinessInfo } from '@/lib/queries/useUpdateBusinessInfo';
import { useBusiness } from '@/lib/queries/useBusiness';

const businessInfoSchema = z.object({
  business_name: z
    .string()
    .min(1, { message: 'Please enter your business name' })
    .max(256, { message: 'Name is too long.' }),
  business_industry: z
    .string()
    .min(1, { message: 'Please enter business industry' })
    .max(256, { message: 'Business industry entered is too long.' }),
  business_description: z.string().min(20, {
    message: 'Please enter at least 20 characters to describe your business.',
  }),
  business_primary_market: z.string().min(10, {
    message:
      'Describe your business taget market and countries where you focus on.',
  }),
});

function BusinessInfoForm({ onSuccess }: { onSuccess: () => void }) {
  const { mutateAsync: updateBusinessInfo, status } = useUpdateBusinessInfo();
  const { data: business } = useBusiness();

  const form = useForm<z.infer<typeof businessInfoSchema>>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      business_name: '',
      business_industry: '',
      business_description: '',
      business_primary_market: '',
    },
  });

  const onSubmit = form.handleSubmit(async data => {
    const businessId = business?.id;

    if (businessId == null) {
      toast.error('Business not loaded. Please try again.');
      return;
    }

    const {
      business_name,
      business_industry,
      business_description,
      business_primary_market,
    } = data;

    try {
      await updateBusinessInfo({
        business_id: businessId,
        business_name,
        business_industry,
        business_description,
        business_primary_market,
      });
      onSuccess();
      toast.success('Successful.');
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message || error.message
          : 'An error occurred';

      toast.error(`${errorMessage} Please try again.`);
    }
  });

  return (
    <div className="w-full md:w-3/5 lg:w-2/3 mx-auto">
      <Form {...form}>
        <form onSubmit={onSubmit} id="business-info-form">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="business_name"
                        type="text"
                        placeholder="Business Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="business_industry"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="business_industry"
                        type="text"
                        placeholder="Business Industry"
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
                name="business_description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="business_description"
                        type="text"
                        placeholder="Business Description"
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
                name="business_primary_market"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="business_primary_market"
                          type="text"
                          placeholder="Business Primary Market"
                          {...field}
                        />
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
            form="business-info-form"
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
    </div>
  );
}

export function BusinessInfo({ onSuccess }: { onSuccess: () => void }) {
  return (
    <div className="grid w-full">
      <BusinessInfoForm onSuccess={onSuccess} />
    </div>
  );
}
