'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart, 
  Layers, 
  Type, 
  Tags, 
  AlertTriangle, 
  Wrench, 
  DollarSign, 
  BookOpen, 
  MapPin, 
  FileText, 
  MousePointer2, 
  Link as LinkIcon, 
  Code, 
  CheckCircle, 
  Route, 
  Lightbulb, 
  ClipboardList, 
  BookMarked 
} from 'lucide-react';

const navItems = [
  { name: 'Übersicht', path: '/admin/seo-engine', icon: BarChart },
  { name: 'Kategorien', path: '/admin/seo-engine/categories', icon: Layers },
  { name: 'Seitentypen', path: '/admin/seo-engine/content-types', icon: Type },
  { name: 'Tags', path: '/admin/seo-engine/tags', icon: Tags },
  { name: 'Seitenideen', path: '/admin/seo-engine/page-ideas', icon: Lightbulb },
  { name: 'Quality Score', path: '/admin/seo-engine/quality-score', icon: CheckCircle },
  { name: 'Dokumentation', path: '/admin/seo-engine/docs', icon: BookMarked },
];

const secondaryNavItems = [
  { name: 'Problemfälle', path: '/admin/seo-engine/problemfaelle', icon: AlertTriangle },
  { name: 'Leistungen', path: '/admin/seo-engine/leistungen', icon: Wrench },
  { name: 'Kosten', path: '/admin/seo-engine/kosten', icon: DollarSign },
  { name: 'Ratgeber', path: '/admin/seo-engine/ratgeber', icon: BookOpen },
  { name: 'Zürich', path: '/admin/seo-engine/zuerich', icon: MapPin },
  { name: 'Blog', path: '/admin/seo-engine/blog', icon: FileText },
];

const technicalNavItems = [
  { name: 'Interaktive Module', path: '/admin/seo-engine/interactive', icon: MousePointer2 },
  { name: 'Interne Links', path: '/admin/seo-engine/internal-links', icon: LinkIcon },
  { name: 'JSON-LD', path: '/admin/seo-engine/json-ld', icon: Code },
  { name: 'Roadmap', path: '/admin/seo-engine/roadmap', icon: Route },
  { name: 'Briefs', path: '/admin/seo-engine/briefs', icon: ClipboardList },
];

export default function SeoEngineNav() {
  const pathname = usePathname();

  const NavGroup = ({ title, items }: { title: string, items: typeof navItems }) => (
    <div className="mb-6">
      <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant/70 mb-2">{title}</h3>
      <nav className="flex flex-col space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.path || (pathname === '/admin/seo-engine/overview' && item.path === '/admin/seo-engine');
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-label-md transition-colors ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 shadow-sm sticky top-6">
      <NavGroup title="Core Engine" items={navItems} />
      <NavGroup title="Inhalts-Kategorien" items={secondaryNavItems} />
      <NavGroup title="Technik & Planung" items={technicalNavItems} />
    </div>
  );
}
