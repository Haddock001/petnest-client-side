import { Link } from 'react-router'
import { FaCheckCircle, FaFacebook, FaGithub, FaGoogle, FaTimesCircle } from 'react-icons/fa'
import { useForm, useWatch } from 'react-hook-form'
import Button from '../shared/Button'
import logo from '../assets/logo.png'

const Auth = ({ mode = 'login' }) => {
  const isRegister = mode === 'register'
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

  const onSubmit = data => {
    console.log(data)
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
              <input className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" placeholder="Full name" />
              <input className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" type="file" />
            </>
          )}
          <input type='email' {...register('email')} className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" placeholder="Email" />
          <input {...register('password', {
            required: 'Password is required',
            validate: value => !isRegister || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) || 'Password must be at least 8 characters and include uppercase, lowercase, and a number'
          })} className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" type="password" placeholder="Password" />
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
          <Button type='submit' className="w-full justify-center text-base">{isRegister ? 'Register' : 'Login'}</Button>
          <div className="grid grid-cols-3 gap-3">
            {[FaGoogle, FaGithub, FaFacebook].map((Icon, index) => (
              <button key={index} type="button" className="flex h-12 items-center justify-center rounded-2xl bg-(--pet-light) text-(--pet-secondary)">
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
