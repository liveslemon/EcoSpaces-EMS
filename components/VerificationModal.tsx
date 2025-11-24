
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, X } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  actionTitle?: string;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onVerify, actionTitle = "Critical Action" }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setCode(['', '', '', '']);
      setError(false);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit on last digit
    if (index === 3 && value) {
        setTimeout(() => handleVerify(newCode.join('')), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (fullCode?: string) => {
    const finalCode = fullCode || code.join('');
    // Mock verification - Accept '1234'
    if (finalCode === '1234') {
        onVerify();
    } else {
        setError(true);
        // Clear code after error
        setTimeout(() => {
            setCode(['', '', '', '']);
            setError(false);
            inputRefs.current[0]?.focus();
        }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#181a19] border border-zinc-200 dark:border-white/10 w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-scale-in text-center">
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-400 transition-colors"
        >
            <X size={20} />
        </button>

        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <ShieldCheck size={32} />
        </div>

        <h2 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">Security Verification</h2>
        <p className="text-sm text-zinc-500 dark:text-gray-400 mb-8">
            Please enter your PIN to authorize <strong>{actionTitle}</strong>.
        </p>

        <div className="flex justify-center gap-3 mb-8">
            {code.map((digit, i) => (
                <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-2xl font-mono rounded-xl bg-zinc-50 dark:bg-black/30 border outline-none transition-all
                        ${error 
                            ? 'border-red-500 text-red-500 bg-red-500/10 animate-shake' 
                            : 'border-zinc-200 dark:border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-zinc-900 dark:text-white'
                        }
                    `}
                />
            ))}
        </div>

        <div className="flex flex-col gap-3">
            <button 
                onClick={() => handleVerify()}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
                Verify Action
            </button>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2">Default PIN: 1234</p>
        </div>
      </div>
    </div>
  );
};
