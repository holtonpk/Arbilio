import { Input } from "@/components/ui/input";

export const InputField = ({
  label,
  type,
  placeholder,
  value,
  id,
  onChange,
  error,
}: {
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}) => (
  <div className="flex flex-col gap-1 w-full">
    {label && (
      <h2 className={`font-bold ${error ? "text-red-600" : ""}`}>{label}</h2>
    )}
    <Input
      id={id}
      placeholder={placeholder}
      type={type}
      autoCapitalize="none"
      autoComplete={type}
      autoCorrect="off"
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);
