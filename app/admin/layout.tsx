import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BrainCircuit, 
  Camera, 
  Search, 
  MessageCircleQuestion, 
  Package, 
  TerminalSquare,
  LogOut 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-surface-container-lowest font-body-md text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container border-r border-outline-variant/30 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-outline-variant/30">
          <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">Admin CRM</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <div className="pt-4 pb-2 px-4">
             <p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">CRM</p>
          </div>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <Users className="w-5 h-5" /> Leads
          </Link>
          <Link href="/admin/diagnostics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <BrainCircuit className="w-5 h-5" /> AI-Diagnosen
          </Link>
          <Link href="/admin/offers" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <FileText className="w-5 h-5" /> Offerten
          </Link>

          <div className="pt-4 pb-2 px-4">
             <p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">Content & SEO</p>
          </div>
          <Link href="/admin/case-studies" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <Camera className="w-5 h-5" /> Fallstudien
          </Link>
          <Link href="/admin/seo" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <Search className="w-5 h-5" /> SEO-Seiten
          </Link>
          <Link href="/admin/faqs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <MessageCircleQuestion className="w-5 h-5" /> FAQs
          </Link>

          <div className="pt-4 pb-2 px-4">
             <p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">System</p>
          </div>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <Package className="w-5 h-5" /> Produkte
          </Link>
          <Link href="/admin/agent-logs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <TerminalSquare className="w-5 h-5" /> Agenten-Logs
          </Link>
        </nav>
        
        <div className="p-4 border-t border-outline-variant/30">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-md">
            <LogOut className="w-5 h-5" /> Zur Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden h-16 flex items-center justify-between px-4 bg-surface-container border-b border-outline-variant/30">
          <span className="font-headline-sm text-headline-sm text-primary font-bold">Admin CRM</span>
          <Link href="/" className="p-2 text-on-surface-variant">
             <LogOut className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
