import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, Play, Shield, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAppDispatch } from '@/hooks/useAppStore'
import { setUser } from '@/store/authSlice'
import { authService } from '@/services/authService'
import loginIllustration from '@/assets/login_register_page_.png'

const features = [
  { icon: Play, text: 'Monaco SQL editor with sandbox execution' },
  { icon: Database, text: 'Schema explorer and visual designer' },
  { icon: Shield, text: 'Enterprise-grade sandbox isolation' },
]

export function AuthPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' })
  const [forgotEmail, setForgotEmail] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authService.login(loginForm)
      dispatch(setUser({ username: res.username, token: res.token, role: (res.role as import('@/types').UserRole) ?? 'USER' }))
      navigate('/playground')
    } catch {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authService.register(registerForm)
      toast.success('Account created. Please sign in.')
    } catch {
      setError('Registration failed. Username or email may already exist.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`Password reset link sent to ${forgotEmail}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between px-16 py-12 border-r bg-white/70 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Database className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">VelqorDB</span>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Professional SQL platform for developers</h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">Write, execute, and learn SQL in a secure browser sandbox.</p>
            <ul className="mt-8 space-y-4">
              {features.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-slate-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-5 opacity-80">
              <img
                src={loginIllustration}
                alt="SQL Illustration"
                className="max-w-sm rounded-xl shadow-md"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 VelqorDB. Open source SQL playground.</p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">VelqorDB</span>
            </div>

            <Tabs defaultValue="login">
              <TabsList className="mb-8 grid w-full grid-cols-3 bg-transparent h-auto p-0 border-b rounded-none">
                <TabsTrigger
                  value="login"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent py-4"
                >
                  Sign in
                </TabsTrigger>
                <TabsTrigger value="register" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent py-4">
                  Register
                </TabsTrigger>
                <TabsTrigger value="forgot" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent py-4">
                  Reset
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="mb-8 text-center">
                    <h2 className="text-4xl font-bold text-slate-900">
                      Welcome back
                    </h2>
                    <p className="mt-2 text-slate-500">
                      Sign in to continue to VelqorDB
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      className="h-12 rounded-xl"
                      id="username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      className="h-12 rounded-xl"
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign in'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">Username</Label>
                    <Input
                      className="h-12 rounded-xl"
                      id="reg-username"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      className="h-12 rounded-xl"
                      id="reg-email"
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      className="h-12 rounded-xl"
                      id="reg-password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600" disabled={loading}>
                    {loading ? 'Creating account…' : 'Create account'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="forgot">
                <form onSubmit={handleForgot} className="space-y-4">
                  <p className="text-sm text-muted-foreground">Enter your email and we will send a reset link.</p>
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                      className="h-12 rounded-xl"
                      id="forgot-email"
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:from-blue-700 hover:to-blue-600">
                    Send reset link
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to the VelqorDB terms of service.
            </p>
            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => {
                  dispatch(setUser({ username: 'demo', token: 'demo-token', role: 'USER' }))
                  navigate('/playground')
                }}
              >
                Continue in demo mode
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
