import { Link } from 'react-router'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import Button from '../shared/Button'
import logo from '../assets/logo.png'

const Auth = ({ mode = 'login' }) => {
  const isRegister = mode === 'register'

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
        <form className="space-y-4 p-8">
          {isRegister && (
            <>
              <input className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" placeholder="Full name" />
              <input className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" type="file" />
            </>
          )}
          <input className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" placeholder="Email" />
          <input className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none" type="password" placeholder="Password" />
          <Button className="w-full justify-center text-base">{isRegister ? 'Register' : 'Login'}</Button>
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
