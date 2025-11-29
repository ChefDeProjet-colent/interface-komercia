import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerifyOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(90); // 1min 30s in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = location.state?.email || 'votre email';
  const accountType = location.state?.accountType || 'compte';

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerify(newOtp);
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerify(newOtp);
    }
  };

  // Verify OTP
  const handleVerify = (otpToVerify: string[]) => {
    const code = otpToVerify.join('');
    if (code.length !== 6) return;

    if (isExpired) {
      alert('Le code a expiré. Veuillez demander un nouveau code.');
      return;
    }

    // Simulate verification
    console.log('Verifying OTP:', code);
    
    // Redirect to dashboard after successful verification
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  // Resend OTP
  const handleResend = () => {
    if (isResending) return;

    setIsResending(true);
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(90);
    setIsExpired(false);
    inputRefs.current[0]?.focus();

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      alert('Un nouveau code a été envoyé à votre email.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mb-4">
            <i className="ri-mail-check-line text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vérification de votre email
          </h1>
          <p className="text-gray-600 text-sm">
            Nous avons envoyé un code de vérification à
          </p>
          <p className="text-teal-600 font-medium mt-1">{email}</p>
        </div>

        {/* OTP Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Timer */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              timeLeft <= 30 
                ? 'bg-red-50 text-red-600' 
                : 'bg-teal-50 text-teal-600'
            }`}>
              <i className="ri-time-line text-lg"></i>
              <span className="font-mono font-semibold text-lg">
                {formatTime(timeLeft)}
              </span>
            </div>
            {isExpired && (
              <p className="text-red-500 text-sm mt-2">
                Le code a expiré
              </p>
            )}
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Entrez le code à 6 chiffres
            </label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isExpired}
                  className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg transition-all duration-200 ${
                    digit
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-300 bg-white text-gray-900'
                  } ${
                    isExpired
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:border-teal-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200'
                  } focus:outline-none`}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={() => handleVerify(otp)}
            disabled={otp.some(digit => !digit) || isExpired}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
              otp.some(digit => !digit) || isExpired
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <i className="ri-check-line mr-2"></i>
            Vérifier le code
          </button>

          {/* Resend Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-3">
              Vous n'avez pas reçu le code ?
            </p>
            <button
              onClick={handleResend}
              disabled={isResending || (!isExpired && timeLeft > 60)}
              className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isResending || (!isExpired && timeLeft > 60)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-teal-500 text-teal-600 hover:bg-teal-50'
              }`}
            >
              {isResending ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <i className="ri-mail-send-line mr-2"></i>
                  Renvoyer le code
                </>
              )}
            </button>
            {!isExpired && timeLeft > 60 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Disponible dans {formatTime(timeLeft - 60)}
              </p>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Besoin d'aide ?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-teal-600 hover:text-teal-700 font-medium cursor-pointer"
            >
              Contactez le support
            </button>
          </p>
        </div>

        {/* Back to Login */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-1"></i>
            Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  );
}
