'use client'

interface InputModalProps {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const InputModal: React.FC<InputModalProps> = ({
  children,
  value,
  onChange,
  maxLength = 300,
}) => {
  return (
    <div className="relative">
      <span>
        {children}
      </span>
      <span
        className="
          absolute
          top-0
          right-0
          text-[14px]
          font-light
          tracking-[-2%]
          text-[#838B8E]
        "
      >
        {value.length}/{maxLength}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, maxLength))}
        maxLength={maxLength}
        className='
          h-[120px]
          w-full
          resize-none
          focus:outline-none
          p-2
        '
      />
    </div>
  );
}

export default InputModal;