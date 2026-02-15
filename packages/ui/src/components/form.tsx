<<<<<<< HEAD
/**
 * @tekton/ui - Form Component
 * [SPEC-COMPONENT-001-C] [COMPOSED]
 */

import * as React from 'react';
import { cn } from '../lib/utils';

type FormContextValue = {
  errors: Record<string, string>;
  setError: (name: string, message: string) => void;
  clearError: (name: string) => void;
};

const FormContext = React.createContext<FormContextValue | undefined>(undefined);

const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within Form');
  }
  return context;
};

const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ className, children, ...props }, ref) => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const setError = React.useCallback((name: string, message: string) => {
      setErrors(prev => ({ ...prev, [name]: message }));
    }, []);

    const clearError = React.useCallback((name: string) => {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }, []);

    return (
      <FormContext.Provider value={{ errors, setError, clearError }}>
        <form ref={ref} className={cn('space-y-6', className)} {...props}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);
Form.displayName = 'Form';

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { name: string }
>(({ className, name, ...props }, ref) => {
  return <div ref={ref} className={cn('space-y-2', className)} {...props} />;
});
FormField.displayName = 'FormField';

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        'text-[var(--form-label-foreground)]',
        className
      )}
      {...props}
    />
  )
);
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
  }
);
FormControl.displayName = 'FormControl';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { name: string }
>(({ className, name, children, ...props }, ref) => {
  const { errors } = useFormContext();
  const error = errors[name];

  if (!error && !children) {
=======
'use client';

/**
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 *
 * WHY: 코드 품질 및 추적성을 보장
 * IMPACT: TAG 누락 시 요구사항 추적 불가
 * @tekton-ui/ui - Form Component
 * SPEC-UI-001: shadcn-ui Fork & Token Integration
 */

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  FormProviderProps,
  useFormContext,
} from 'react-hook-form';
import { cn } from '../lib/utils';
import { Label } from './label';

const Form: <TFieldValues extends FieldValues = FieldValues, TContext = unknown>(
  props: FormProviderProps<TFieldValues, TContext>
) => React.ReactElement = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('space-y-[var(--tekton-spacing-2)]', className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-[var(--tekton-bg-destructive)]', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-[var(--tekton-bg-muted-foreground)]', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
>>>>>>> master
    return null;
  }

  return (
    <p
      ref={ref}
<<<<<<< HEAD
      className={cn(
        'text-sm font-medium',
        'text-[var(--form-message-error-foreground)]',
        className
      )}
      {...props}
    >
      {error || children}
=======
      id={formMessageId}
      className={cn('text-sm font-medium text-[var(--tekton-bg-destructive)]', className)}
      {...props}
    >
      {body}
>>>>>>> master
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

<<<<<<< HEAD
export { Form, FormField, FormLabel, FormControl, FormMessage, useFormContext };
=======
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
>>>>>>> master
