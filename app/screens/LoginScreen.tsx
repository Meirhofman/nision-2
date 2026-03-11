import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Button, Input } from '../components/ui';
import { Character } from '../components/Character';
import { useApp } from '../context/AppContext';
import { ReturningUserDialog } from '../components/ReturningUserDialog';
import { signInWithGoogle, signInWithFacebook, isAuthAvailable, handleRedirectResult, isMobileDevice } from '../../lib/auth';
import { getStoredAppState, getStoredUser, saveUser, saveAppState } from '../../lib/storage';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { t, characterState, setCurrentUser, loadStoredState, persistState, resetToDefaults, language, userData, points, nutritionData, socialData } = useApp();
  const [showReturningDialog, setShowReturningDialog] = useState(false);
  const [loading, setLoading] = useState<'google' | 'facebook' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);

  // Security: Rate limiting
  const MAX_ATTEMPTS = 3;
  const BLOCK_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    const storedAttempts = parseInt(sessionStorage.getItem('loginAttempts') || '0');
    const blockStartTime = parseInt(sessionStorage.getItem('blockStartTime') || '0');
    const now = Date.now();
    
    if (blockStartTime > 0) {
      const timePassed = now - blockStartTime;
      if (timePassed < BLOCK_DURATION) {
        setIsBlocked(true);
        setBlockTimeLeft(Math.ceil((BLOCK_DURATION - timePassed) / 1000));
        setLoginAttempts(storedAttempts);
      } else {
        // Block expired, reset attempts
        sessionStorage.removeItem('loginAttempts');
        sessionStorage.removeItem('blockStartTime');
        setLoginAttempts(0);
      }
    } else {
      setLoginAttempts(storedAttempts);
    }
  }, []);

  useEffect(() => {
    if (isBlocked && blockTimeLeft > 0) {
      const timer = setTimeout(() => {
        setBlockTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isBlocked && blockTimeLeft === 0) {
      // Unblock after time expires
      setIsBlocked(false);
      setLoginAttempts(0);
      sessionStorage.removeItem('loginAttempts');
      sessionStorage.removeItem('blockStartTime');
    }
  }, [isBlocked, blockTimeLeft]);

  useEffect(() => {
    const stored = getStoredAppState();
    const user = getStoredUser();
    const asked = sessionStorage.getItem('lahoz_returning_asked');
    if (stored && user && !asked) {
      setShowReturningDialog(true);
    }
  }, []);

  // Handle return from Google/Facebook OAuth redirect (mobile)
  useEffect(() => {
    if (!isAuthAvailable()) return;
    let cancelled = false;
    handleRedirectResult().then((user) => {
      if (cancelled || !user) return;
      const stored = getStoredAppState() || {} as any;
      const userRecord = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: Date.now(),
      };
      saveUser(userRecord);
      setCurrentUser(userRecord);
      saveAppState({
        language: stored.language || 'he',
        userData: { ...(stored.userData || {}), displayName: user.displayName || stored.userData?.displayName },
        points: stored.points ?? 1250,
        nutritionData: stored.nutritionData || {},
        socialData: stored.socialData || {},
        characterState: stored.characterState || {},
      });
      navigate('/main');
    });
    return () => { cancelled = true; };
  }, [navigate]);

  const handleUseSaved = () => {
    sessionStorage.setItem('lahoz_returning_asked', 'true');
    setShowReturningDialog(false);
    const stored = getStoredAppState();
    if (stored) loadStoredState(stored);
    navigate('/main');
  };

  const handleStartFresh = () => {
    sessionStorage.setItem('lahoz_returning_asked', 'true');
    setShowReturningDialog(false);
    resetToDefaults();
  };

  const isLoginFormValid = loginUsername.trim().length > 0 && loginPassword.length > 0 && !isBlocked;

  const handleLogin = () => {
    setError(null);
    
    // Security: Check if blocked
    if (isBlocked) {
      setError(t('accountBlocked') || `חשבון נחסם. נסה שוב בעוד ${blockTimeLeft} שניות.`);
      return;
    }
    
    // Get stored user data
    const storedState = getStoredAppState();
    
    console.log('Login attempt:', { 
      enteredUsername: loginUsername.trim().toLowerCase(), 
      enteredPassword: loginPassword,
      storedUsername: storedState?.userData?.username,
      storedPassword: storedState?.userData?.password,
      attempts: loginAttempts + 1
    });
    
    if (!storedState?.userData?.username || !storedState?.userData?.password) {
      console.log('No registered user found');
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      sessionStorage.setItem('loginAttempts', newAttempts.toString());
      
      if (newAttempts >= MAX_ATTEMPTS) {
        // Block the account
        setIsBlocked(true);
        setBlockTimeLeft(BLOCK_DURATION / 1000);
        sessionStorage.setItem('blockStartTime', Date.now().toString());
        setError(t('accountBlocked') || `חשבון נחסם למשך 5 דקות בגלל ניסיונות כניסה רבים.`);
      } else {
        setError(t('userNotFound') || 'משתמש לא קיים. אנא הירשם תחילה.');
      }
      return;
    }
    
    // Validate credentials
    if (loginUsername.trim().toLowerCase() !== storedState.userData.username.toLowerCase()) {
      console.log('Username mismatch');
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      sessionStorage.setItem('loginAttempts', newAttempts.toString());
      
      if (newAttempts >= MAX_ATTEMPTS) {
        // Block the account
        setIsBlocked(true);
        setBlockTimeLeft(BLOCK_DURATION / 1000);
        sessionStorage.setItem('blockStartTime', Date.now().toString());
        setError(t('accountBlocked') || `חשבון נחסם למשך 5 דקות בגלל ניסיונות כניסה רבים.`);
      } else {
        const remaining = MAX_ATTEMPTS - newAttempts;
        setError(t('userNotFound') || `משתמש לא קיים או פרטי התחברות שגויים. נותרו ${remaining} ניסיונות.`);
      }
      return;
    }
    
    if (loginPassword !== storedState.userData.password) {
      console.log('Password mismatch');
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      sessionStorage.setItem('loginAttempts', newAttempts.toString());
      
      if (newAttempts >= MAX_ATTEMPTS) {
        // Block the account
        setIsBlocked(true);
        setBlockTimeLeft(BLOCK_DURATION / 1000);
        sessionStorage.setItem('blockStartTime', Date.now().toString());
        setError(t('accountBlocked') || `חשבון נחסם למשך 5 דקות בגלל ניסיונות כניסה רבים.`);
      } else {
        const remaining = MAX_ATTEMPTS - newAttempts;
        setError(t('userNotFound') || `משתמש לא קיים או פרטי התחברות שגויים. נותרו ${remaining} ניסיונות.`);
      }
      return;
    }
    
    console.log('Authentication successful');
    
    // Reset login attempts on successful login
    setLoginAttempts(0);
    sessionStorage.removeItem('loginAttempts');
    sessionStorage.removeItem('blockStartTime');
    
    // Authentication successful
    persistState();
    
    // Set current user if exists
    const storedUser = getStoredUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    
    navigate('/main');
  };

  const handleRegister = () => {
    navigate('/questionnaire/language');
  };

  const handleGoogleSignIn = async () => {
    setLoading('google');
    setError(null);
    try {
      if (!isAuthAvailable()) {
        setError('התחברות דרך Google אינה זמינה כרגע. אנא השתמש בשם משתמש וסיסמה או הירשם חדש.');
        setLoading(null);
        return;
      }
      const user = await signInWithGoogle();
      if (user) {
        const userRecord = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastLogin: Date.now(),
        };
        saveUser(userRecord);
        setCurrentUser(userRecord);
        saveAppState({ language: 'he', userData: { ...userData, displayName: user.displayName || userData?.displayName }, points: 1250, nutritionData: {}, socialData: {}, characterState: {} });
        navigate('/main');
      } else if (!isMobileDevice()) {
        setError('התחברות דרך Google נכשלה. אנא נסה שוב או השתמש בשם משתמש וסיסמה.');
      }
      // On mobile with redirect: keep loading, page will redirect to Google
    } catch (err) {
      console.error('Google sign in error:', err);
      setError(t('error') || 'שגיאה בהתחברות עם Google');
      setLoading(null);
    } finally {
      if (!isMobileDevice()) setLoading(null);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading('facebook');
    setError(null);
    try {
      if (!isAuthAvailable()) {
        setError('התחברות דרך Facebook אינה זמינה כרגע. אנא השתמש בשם משתמש וסיסמה או הירשם חדש.');
        setLoading(null);
        return;
      }
      const user = await signInWithFacebook();
      if (user) {
        const userRecord = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastLogin: Date.now(),
        };
        saveUser(userRecord);
        setCurrentUser(userRecord);
        saveAppState({ language: 'he', userData: { ...userData, displayName: user.displayName || userData?.displayName }, points: 1250, nutritionData: {}, socialData: {}, characterState: {} });
        navigate('/main');
      } else if (!isMobileDevice()) {
        setError('התחברות דרך Facebook נכשלה. אנא נסה שוב או השתמש בשם משתמש וסיסמה.');
      }
      // On mobile with redirect: keep loading, page will redirect to Facebook
    } catch (err) {
      console.error('Facebook sign in error:', err);
      setError(t('error') || 'שגיאה בהתחברות עם Facebook');
      setLoading(null);
    } finally {
      if (!isMobileDevice()) setLoading(null);
    }
  };

  const storedUser = getStoredUser();

  return (
    <MobileContainer className="p-4 sm:p-5 justify-start pt-6 sm:pt-10 space-y-4 pb-safe">
      <ReturningUserDialog
        open={showReturningDialog}
        userName={storedUser?.displayName || null}
        onUseSaved={handleUseSaved}
        onStartFresh={handleStartFresh}
      />

      <div className="flex flex-col items-center justify-center space-y-1 min-h-[120px] sm:min-h-[140px]">
        <Character state={characterState} size="md" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">LAZOZ</h1>
      </div>

      <div className="space-y-3 w-full max-w-sm mx-auto">
        <Input 
          placeholder={t('userName')} 
          type="text" 
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          className="min-h-[48px] touch-manipulation" 
        />
        <div className="relative">
          <Input 
            placeholder={t('password')} 
            type={showPassword ? 'text' : 'password'} 
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="min-h-[48px] touch-manipulation pr-12" 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-sm text-red-600 text-center font-medium">{error}</p>
          </div>
        )}
        
        {loginAttempts > 0 && !isBlocked && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle size={16} className="text-yellow-600" />
              <p className="text-sm text-yellow-700 text-center font-medium">
                {t('attemptsRemaining')?.replace('{count}', String(MAX_ATTEMPTS - loginAttempts)) || `${MAX_ATTEMPTS - loginAttempts} ניסיונות נותרו`}
              </p>
            </div>
          </div>
        )}
        
        {isBlocked && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex flex-col items-center gap-2">
              <AlertTriangle size={20} className="text-red-600" />
              <p className="text-sm text-red-700 text-center font-bold">
                {t('securityAlert') || 'התראת אבטחה'}
              </p>
              <p className="text-xs text-red-600 text-center">
                {language === 'he' 
                  ? `חשבון נחסם. נסה שוב בעוד ${blockTimeLeft} שניות`
                  : `Account blocked. Try again in ${blockTimeLeft} seconds`
                }
              </p>
            </div>
          </div>
        )}
        <Button 
          onClick={handleLogin} 
          disabled={!isLoginFormValid}
          fullWidth 
          className={`min-h-[48px] touch-manipulation transition-all ${
            !isLoginFormValid 
              ? 'opacity-50 cursor-not-allowed bg-gray-300' 
              : 'hover:opacity-90'
          }`}
        >
          {t('login')}
        </Button>
        <Button variant="secondary" onClick={handleRegister} fullWidth className="min-h-[48px] touch-manipulation">
          {t('createAccount')}
        </Button>
        
        <button
          onClick={() => navigate('/forgot-password')}
          className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium touch-manipulation py-2 transition-colors"
        >
          {t('forgotPassword') || 'שכחתי סיסמה'}
        </button>
      </div>

      <div className="relative flex items-center w-full max-w-sm mx-auto">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-2 sm:mx-4 text-gray-400 text-xs sm:text-sm">{t('orLoginWith')}</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
        <Button
          variant="social"
          onClick={handleGoogleSignIn}
          disabled={!!loading}
          className="min-h-[52px] touch-manipulation p-3 flex items-center gap-3 w-full justify-center relative"
        >
          {loading === 'google' ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          )}
          <span className="font-semibold text-gray-700">{t('signInWithGoogle')}</span>
        </Button>

        <Button
          variant="social"
          onClick={handleFacebookSignIn}
          disabled={!!loading}
          className="min-h-[52px] touch-manipulation p-3 flex items-center gap-3 w-full justify-center relative"
        >
          {loading === 'facebook' ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-blue-600 rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.606.492-2.606 1.691v1.889h4.196l-.66 3.667h-3.536v7.979A11.96 11.96 0 0 0 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.628 3.887 10.33 9.101 11.691Z" />
            </svg>
          )}
          <span className="font-semibold text-gray-700">{t('signInWithFacebook')}</span>
        </Button>

        <Button variant="social" onClick={handleLogin} className="min-h-[52px] touch-manipulation p-3 flex items-center gap-3 w-full justify-center">
          <svg className="w-5 h-5 shrink-0" fill="black" viewBox="0 0 24 24">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
          </svg>
          <span className="font-semibold text-gray-700">{language === 'he' ? 'המשך עם Apple' : 'Continue with Apple'}</span>
        </Button>
      </div>
    </MobileContainer>
  );
};

