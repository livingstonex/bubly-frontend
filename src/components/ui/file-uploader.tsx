import { cn } from '@/lib/utils';
import { UploadSimpleIcon } from '@phosphor-icons/react';
import Dropzone from 'react-dropzone';
import type { Accept, DropzoneProps } from 'react-dropzone';

type AcceptedFileTypes = 'pdf' | 'image' | 'excel-xlsx' | 'excel-xls' | 'csv';

function getDisplayAcceptedFileTypeText(
  acceptedFileTypes: AcceptedFileTypes[]
) {
  function getDisplayAcceptedFileTypeTextForSingleType(
    type: AcceptedFileTypes
  ) {
    switch (type) {
      case 'pdf':
        return ['PDF'] as const;
      case 'image':
        return ['PNG', 'JPEG'] as const;
      case 'excel-xlsx':
        return ['XLSX'];
      case 'excel-xls':
        return ['XLS'];
      case 'csv':
        return ['CSV'] as const;
      default:
        return ['PDF', 'PNG', 'JPEG', 'XLSX', 'XLS', 'CSV'] as const;
    }
  }
  switch (acceptedFileTypes.length) {
    case 1:
      return `Only ${acceptedFileTypes[0]} files accepted.`;
    default:
      return acceptedFileTypes
        .map(type =>
          getDisplayAcceptedFileTypeTextForSingleType(type).join(', ')
        )
        .join(', ')
        .concat(' files are accepted.');
  }
}

function transformAcceptFileTypesToDropzoneAccept(
  acceptedFileTypes: AcceptedFileTypes[]
): Accept {
  return acceptedFileTypes.reduce((acc, type) => {
    switch (type) {
      case 'pdf':
        acc['application/pdf'] = ['.pdf'];
        break;
      case 'image':
        acc['image/png'] = ['.png'];
        acc['image/jpeg'] = ['.jpg', '.jpeg'];
        break;
      case 'excel-xlsx':
        acc[
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ] = ['.xlsx'];
        break;
      case 'excel-xls':
        acc['application/vnd.ms-excel'] = ['.xls'];
        break;
      case 'csv':
        acc['text/csv'] = ['.csv'];
        break;
    }
    return acc;
  }, {} as Accept);
}

export function FileUploader({
  className,
  acceptedFileTypes = ['pdf', 'image'],
  ...props
}: Omit<DropzoneProps, 'accept'> & {
  className?: string;
  acceptedFileTypes?: AcceptedFileTypes[];
}) {
  return (
    <Dropzone
      useFsAccessApi={false}
      accept={transformAcceptFileTypesToDropzoneAccept(acceptedFileTypes)}
      {...props}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={cn(
            'min-h-32 px-4 py-6 bg-ash-50 hover:bg-white',
            'rounded-2xl ring-ash-300 ring-1',
            'gap-2 inline-flex justify-center items-center',
            'outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'cursor-pointer',
            className
          )}
          {...getRootProps()}
        >
          <div className="flex flex-col justify-start items-center gap-1">
            <UploadSimpleIcon className="size-6 fill-primary" aria-hidden />
            <div className="text-center text-ash-900 text-lg font-medium font-sans">
              Click to upload or drag and drop file here
            </div>
            <div className="text-center text-ash-500 text-sm font-normal font-sans">
              {getDisplayAcceptedFileTypeText(acceptedFileTypes)}
            </div>
          </div>
          <input className="invisible" {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  );
}
