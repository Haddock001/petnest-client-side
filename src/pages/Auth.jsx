import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { FaCheckCircle, FaFacebook, FaGithub, FaGoogle, FaTimesCircle } from 'react-icons/fa'
import { useForm, useWatch } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import Button from '../shared/Button'
import logo from '../assets/logo.png'



const Auth = ({ mode = 'login' }) => {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const location = useLocation()
  const { createUser, loginUser, loginWithGoogle, updateUserProfile } = useContext(AuthContext)
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const redirectTo = typeof location.state?.from === 'string'
    ? location.state.from
    : location.state?.from?.pathname || '/'
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ mode: 'onChange' })

  const password = useWatch({ control, name: 'password', defaultValue: '' })
  const passwordRequirements = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'One number', valid: /\d/.test(password) }
  ]
  const passedRequirements = passwordRequirements.filter(requirement => requirement.valid).length
  const isPasswordStrong = passedRequirements === passwordRequirements.length
  const passwordStrengthText = isPasswordStrong ? 'Strong password' : `${passwordRequirements.length - passedRequirements} missing`
  const passwordStrengthClass = isPasswordStrong ? 'bg-emerald-500' : passedRequirements >= 2 ? 'bg-amber-500' : 'bg-rose-500'

  const getFriendlyAuthError = (error) => {
    const messages = {
      'auth/email-already-in-use': 'This email already has an account. Try logging in instead.',
      'auth/invalid-credential': 'Email or password is incorrect.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/network-request-failed': 'Network error. Please check your connection and try again.',
      'auth/popup-closed-by-user': 'Google sign-in was closed before it finished.',
      'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
      'auth/weak-password': 'Password is too weak. Please follow the password checklist.'
    }

    return messages[error.code] || error.message || 'Something went wrong. Please try again.'
  }

  const onSubmit = async data => {
    setAuthError('')
    setAuthSuccess('')
    setIsSubmitting(true)

    try {
      if (isRegister) {
        await createUser(data.email, data.password)
        await updateUserProfile({
          displayName: data.name,
          photoURL: data.photoUrl || null
        })
        setAuthSuccess('Account created successfully.')
      } else {
        await loginUser(data.email, data.password)
        setAuthSuccess('Logged in successfully.')
      }

      navigate(redirectTo, { replace: true })
    } catch (error) {
      setAuthError(getFriendlyAuthError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    setAuthError('')
    setAuthSuccess('')
    setIsSubmitting(true)

    try {
      await loginWithGoogle()

      navigate(redirectTo, { replace: true })
    } catch (error) {
      setAuthError(getFriendlyAuthError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-(--pet-gradient-start) to-(--pet-gradient-end) px-5 py-32">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-[0.85fr_1.15fr]">
        <section className="bg-(--pet-secondary) p-8 text-white">
          <img src={logo} alt="PetNest" className="w-24 rounded-full bg-white/90 p-2" />
          <h1 className="mt-10 font-poppins text-4xl font-extrabold">{isRegister ? 'Create your PetNest account' : 'Welcome back to PetNest'}</h1>
          <p className="mt-4 font-poppins leading-7 text-white/80">
            Manage adoption requests, publish pets, and support rescue campaigns from one calm dashboard.
          </p>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
          {isRegister && (
            <>
              <input {...register('name', { required: 'Full name is required' })} className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" placeholder="Full name" />
              {errors.name && <p className="font-poppins text-sm font-semibold text-rose-600">{errors.name.message}</p>}
              <input {...register('photoUrl')} className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" placeholder="Photo URL (optional)" />
            </>
          )}
          <input type='email' {...register('email', { required: 'Email is required' })} className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" placeholder="Email" />
          {errors.email && <p className="font-poppins text-sm font-semibold text-rose-600">{errors.email.message}</p>}
          <input {...register('password', {
            required: 'Password is required',
            validate: value => !isRegister || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) || 'Password must be at least 8 characters and include uppercase, lowercase, and a number'
          })} className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" type="password" placeholder="Password" />
          {!isRegister && errors.password && <p className="font-poppins text-sm font-semibold text-rose-600">{errors.password.message}</p>}
          {isRegister && (
            <div className="rounded-2xl border border-(--pet-accent)/30 bg-(--pet-primary) p-4 font-poppins shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-(--pet-secondary)">Password strength</p>
                <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${passwordStrengthClass}`}>
                  {passwordStrengthText}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${passwordStrengthClass}`}
                  style={{ width: `${(passedRequirements / passwordRequirements.length) * 100}%` }}
                />
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-(--pet-dark) sm:grid-cols-2">
                {passwordRequirements.map(requirement => (
                  <li key={requirement.label} className="flex items-center gap-2">
                    {requirement.valid ? (
                      <FaCheckCircle className="shrink-0 text-emerald-500" />
                    ) : (
                      <FaTimesCircle className="shrink-0 text-rose-500" />
                    )}
                    <span className={requirement.valid ? 'font-semibold text-emerald-700' : ''}>
                      {requirement.label}
                    </span>
                  </li>
                ))}
              </ul>
              {errors.password && (
                <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
          {authError && (
            <p className="rounded-2xl bg-rose-50 px-4 py-3 font-poppins text-sm font-semibold text-rose-600">
              {authError}
            </p>
          )}
          {authSuccess && (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 font-poppins text-sm font-semibold text-emerald-700">
              {authSuccess}
            </p>
          )}
          <Button type='submit' disabled={isSubmitting} className="w-full justify-center text-base disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </Button>
          <div className="grid grid-cols-3 gap-3">
            <button type="button" aria-label="Continue with Google" onClick={handleGoogleLogin} disabled={isSubmitting} className="flex h-12 items-center justify-center rounded-2xl bg-(--pet-light) text-(--pet-secondary) transition hover:bg-(--pet-accent)/30 disabled:cursor-not-allowed disabled:opacity-60">
              <FaGoogle />
            </button>
            {[FaGithub, FaFacebook].map((Icon, index) => (
              <button key={index} type="button" aria-label="Social login unavailable" disabled className="flex h-12 cursor-not-allowed items-center justify-center rounded-2xl bg-(--pet-light) text-(--pet-secondary) opacity-50">
                <Icon />
              </button>
            ))}
          </div>
          <p className="text-center font-poppins text-sm text-(--pet-dark)">
            {isRegister ? 'Already have an account?' : 'New to PetNest?'}{' '}
            <Link className="font-bold text-(--pet-orange)" to={isRegister ? '/login' : '/register'}>
              {isRegister ? 'Login' : 'Register'}
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Auth
