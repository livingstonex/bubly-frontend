import z from 'zod';
import { useBusiness } from '@/lib/queries/useBusiness';
import { useProcessWebsiteUrl } from '@/lib/queries/useProcessWebsiteUrl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
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

const businesUrlSchema = z.object({
  website_url: z
    .string()
    .regex(/^https:\/\//, { message: 'URL must start with https://' })
    .max(256, { message: 'Url is too long.' }),
});

function WebsiteUrlProcessingForm({ onSuccess }: { onSuccess: () => void }) {
  const { mutateAsync: processWebsiteUrl, status } = useProcessWebsiteUrl();
  const { data: business } = useBusiness();

  const form = useForm<z.infer<typeof businesUrlSchema>>({
    resolver: zodResolver(businesUrlSchema),
    defaultValues: {
      website_url: '',
    },
  });

  const onSubmit = form.handleSubmit(async data => {
    const businessId = business?.id;

    if (businessId == null) {
      toast.error('Business not loaded. Please try again.');
      return;
    }

    const { website_url } = data;

    try {
      await processWebsiteUrl({
        business_id: businessId,
        website_url,
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
            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="website_url"
                      type="text"
                      placeholder="Website url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export function BusinessWebsiteUrlProcessing({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return (
    <div className="grid w-full">
      <WebsiteUrlProcessingForm onSuccess={onSuccess} />
    </div>
  );
}
