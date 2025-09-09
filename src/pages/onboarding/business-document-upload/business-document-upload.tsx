import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadBusinessDocument } from '@/lib/queries/useUploadBusinessDocument';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useBusiness } from '@/lib/queries/useBusiness';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { FileInfoPanel } from '@/components/ui/file-info-panel';
import { truncateString } from '@/lib/utils/string';
import { FileUploader } from '@/components/ui/file-uploader';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const documentFormSchema = z.object({
  file: z.array(z.instanceof(File, { message: 'Please upload a file' })),
});

function DocumentUploadForm({ onSuccess }: { onSuccess: () => void }) {
  const { mutateAsync: uploadBusinessDocument, status } =
    useUploadBusinessDocument();
  const { data: business } = useBusiness();

  const form = useForm<z.infer<typeof documentFormSchema>>({
    defaultValues: {
      file: undefined,
    },
    resolver: zodResolver(documentFormSchema),
  });

  const onSubmit = form.handleSubmit(async data => {
    const businessId = business?.id;

    if (businessId == null) {
      toast.error('Business not loaded. Please try again.');
      return;
    }

    try {
      await uploadBusinessDocument({
        business_id: businessId,
        business_documents: [{ file: data.file }],
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
        <form onSubmit={onSubmit} id="business-document-upload-form">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  {field.value && field.value.length > 0 ? (
                    <div className="mx-5 text-center">
                      <div className="mb-4">Files to be uploaded</div>
                      {field.value?.map((singleFile: File, index) => (
                        <FileInfoPanel.Root file={singleFile} key={index}>
                          <FileInfoPanel.Content className="items-center">
                            <FileInfoPanel.Icon />
                            <FileInfoPanel.FileDetails>
                              <FileInfoPanel.FileName>
                                {truncateString(singleFile.name, 10)}
                              </FileInfoPanel.FileName>
                              <FileInfoPanel.FileSize />
                            </FileInfoPanel.FileDetails>
                          </FileInfoPanel.Content>
                          <FileInfoPanel.Actions>
                            <FileInfoPanel.Preview
                              onClick={() =>
                                window.open(URL.createObjectURL(singleFile))
                              }
                            />
                            <FileInfoPanel.Delete
                              onClick={() => {
                                field.onChange((files: File[]) => {
                                  if (files === undefined) return;

                                  const newFilesArr = files.filter(
                                    item => item !== singleFile
                                  );

                                  if (newFilesArr.length === 0)
                                    return form.reset();

                                  form.setValue('file', newFilesArr);
                                });
                              }}
                            />
                          </FileInfoPanel.Actions>
                        </FileInfoPanel.Root>
                      ))}
                    </div>
                  ) : null}

                  <FormMessage />

                  <FormControl>
                    <FileUploader
                      className="w-full"
                      onDropAccepted={selectedFile => {
                        field.onChange(selectedFile);
                      }}
                      acceptedFileTypes={[
                        'pdf',
                        // 'image',
                        // 'excel-xlsx',
                        // 'excel-xls',
                        // 'csv',
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            form="business-document-upload-form"
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

export function BusinessDocumentUpload({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return (
    <div className="grid w-full">
      <DocumentUploadForm onSuccess={onSuccess} />
    </div>
  );
}
