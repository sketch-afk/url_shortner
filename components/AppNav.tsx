"use client"

import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Home, LayoutDashboard, LogOut } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

export function AppNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6">
      <div className="flex items-center gap-2">
        <NavBar
          items={[
            { name: "Home", url: "/", icon: Home },
            { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
          ]}
        />
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1.5 bg-background/5 border border-border backdrop-blur-lg py-2 px-3 rounded-full shadow-lg text-foreground/80 hover:text-primary text-sm font-semibold transition-colors cursor-pointer"
        >
          <LogOut size={18} strokeWidth={2.5} className="md:hidden" />
          <span className="hidden md:inline">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
