'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = !isTextarea(props) && props.type === 'password';

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
        <div className={isPassword ? 'relative' : undefined}>
          <Input
            type={isPassword && showPassword ? 'text' : (props.type ?? 'text')}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={placeholder}
            min={props.min}
            max={props.max}
            className={isPassword ? `pr-10 ${props.inputClassName ?? ''}` : props.inputClassName}
          />
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
