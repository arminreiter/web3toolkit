'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BaseFieldProps {
  label: string;
  className?: string;
  placeholder?: string;
}

interface InputFieldProps extends BaseFieldProps {
  multiline?: false;
  type?: 'text' | 'number' | 'password';
  value: string | number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  inputClassName?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
  multiline: true;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps;

function isTextarea(props: FormFieldProps): props is TextareaFieldProps {
  return props.multiline === true;
}

export function FormField(props: FormFieldProps) {
  const { label, className, placeholder } = props;

  return (
    <div className={`space-y-2.5 ${className ?? ''}`}>
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      {isTextarea(props) ? (
        <Textarea
          className="font-code text-base"
          rows={props.rows ?? 2}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <Input
          type={props.type ?? 'text'}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={placeholder}
          min={props.min}
          max={props.max}
          className={props.inputClassName}
        />
      )}
    </div>
  );
}
