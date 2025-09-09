/* eslint-disable react-refresh/only-export-components */
import {
  Eye,
  FileIcon,
  FileJpgIcon,
  FilePdfIcon,
  FilePngIcon,
  SwapIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import React from 'react';

const PreviewExtension = ({ fileExtension }: { fileExtension?: string }) => {
  switch (fileExtension) {
    case 'pdf':
      return (
        <FilePdfIcon
          size={32}
          className=" fill-[#009CDE] shrink-0"
          aria-hidden
        />
      );
    case 'png':
      return (
        <FilePngIcon
          size={32}
          className=" fill-[#3700B3] shrink-0"
          aria-hidden
        />
      );
    case 'jpg':
    case 'jpeg':
      return (
        <FileJpgIcon
          size={32}
          className=" fill-teal-600 shrink-0"
          aria-hidden
        />
      );
    default:
      return (
        <FileIcon size={32} className=" fill-ash-600 shrink-0" aria-hidden />
      );
  }
};

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const ActionButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(function ActionButton({ children, className, ...props }, ref) {
  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      className={cn('!px-2 !py-2 size-9', className)}
      {...props}
    >
      {children}
    </Button>
  );
});

const DeleteActionButton = (props: React.ComponentProps<typeof Button>) => {
  return (
    <ActionButton className="text-error-600" {...props} data-slot="delete">
      <TrashIcon size={20} aria-hidden alt="Delete" />
      <span className="sr-only">Delete</span>
    </ActionButton>
  );
};

const PreviewActionButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(function PreviewActionButton(props, ref) {
  return (
    <ActionButton ref={ref} {...props} data-slot="preview">
      <Eye size={20} aria-hidden alt="Preview" />
      <span className="sr-only">Preview</span>
    </ActionButton>
  );
});

const ReplaceActionButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(function PreviewActionButton(props, ref) {
  return (
    <ActionButton ref={ref} {...props} data-slot="replace">
      <SwapIcon size={20} aria-hidden alt="Replace" />
      <span className="sr-only">Replace</span>
    </ActionButton>
  );
});

const FileContext = React.createContext<File | null>(null);

function Root({
  className,
  file,
  ...props
}: React.ComponentProps<'div'> & { file?: File }) {
  return (
    <FileContext.Provider value={file ?? null}>
      <div
        className={cn(
          'flex justify-between',
          'px-4 py-2 bg-white font-sans',
          'rounded-2xl border border-solid border-ash-300',
          className
        )}
        {...props}
      />
    </FileContext.Provider>
  );
}

function Icon() {
  const file = React.useContext(FileContext);
  const fileExtension = file?.name.split('.').pop();
  return <PreviewExtension fileExtension={fileExtension} />;
}

function Content({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex gap-2', className)} {...props} />;
}

function FileDetails({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-1 flex-grow', className)}
      {...props}
    />
  );
}

function FileName({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const file = React.useContext(FileContext);
  const fileName = children ?? file?.name;
  return (
    <div className={cn('text-lg text-ash-950', className)} {...props}>
      {fileName}
    </div>
  );
}

function FileSize({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const file = React.useContext(FileContext);
  const fileSize = children ?? formatBytes(file?.size ?? 0);

  return (
    <div className={cn('text-sm text-ash-500', className)} {...props}>
      File size {fileSize}
    </div>
  );
}

function Actions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center shrink-0 gap-1 justify-end',
        '[&>button]:flex-grow-0',
        '[&>[data-slot=delete]]:order-last',

        className
      )}
      {...props}
    />
  );
}

export const FileInfoPanel = {
  Root,
  Icon,
  Content,
  FileDetails,
  FileName,
  FileSize,
  Actions,
  Delete: DeleteActionButton,
  Preview: PreviewActionButton,
  Replace: ReplaceActionButton,
};
