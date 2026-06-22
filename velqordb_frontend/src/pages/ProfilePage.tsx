import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/shared/PageHeader'
import { useAppSelector } from '@/hooks/useAppStore'

export function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user)
  const [name, setName] = useState(user?.username ?? '')
  const [email, setEmail] = useState(user?.email ?? `${user?.username}@example.com`)

  const handleSave = () => {
    toast.success('Profile updated')
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader title="Profile" description="Manage your account settings." />

      <div className="mx-auto w-full max-w-2xl p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-xl">
                <AvatarFallback className="rounded-xl text-lg">{user?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user?.username}</CardTitle>
                <CardDescription>
                  Role: <Badge variant="outline" className="ml-1">{user?.role ?? 'USER'}</Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Display name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold">Change password</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </div>
            </div>

            <Button onClick={handleSave}>Save changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
