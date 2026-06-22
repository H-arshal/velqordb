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
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-muted p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Database className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight">VelqorDB</span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Professional SQL platform for developers</h2>
          <p className="mt-2 text-muted-foreground">Write, execute, and learn SQL in a secure browser sandbox.</p>
          <ul className="mt-8 space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 VelqorDB. Open source SQL playground.</p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">VelqorDB</span>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="login" className="flex-1">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                Register
              </TabsTrigger>
              <TabsTrigger value="forgot" className="flex-1">
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
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-username">Username</Label>
                  <Input
                    id="reg-username"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
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
                    id="reg-password"
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
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
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
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
  )
}
