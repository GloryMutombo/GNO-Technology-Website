import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Building2,
  ChartColumn,
  Check,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  ClipboardCheck,
  Clock,
  Clock3,
  Cloud,
  CloudCog,
  CodeXml,
  Coffee,
  Compass,
  Database,
  DatabaseZap,
  Earth,
  Folder,
  Headphones,
  Inbox,
  Info,
  Languages,
  LayoutDashboard,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquare,
  Minus,
  MonitorSmartphone,
  PencilRuler,
  Phone,
  PlugZap,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings,
  Settings2,
  ShieldCheck,
  Smartphone,
  Target,
  UserRound,
  Users,
  UsersRound,
  Workflow,
  X,
  Zap,
} from 'lucide-angular';
import type { LucideIconData } from 'lucide-angular';

type Attrs = Readonly<Record<string, string | number | undefined>>;

/**
 * Every Lucide icon the site uses, by its kebab-case name (as written in templates and
 * content files). Only these icons end up in the bundle; add new ones here.
 */
export const ICONS: Readonly<Record<string, LucideIconData>> = {
  'arrow-down-right': ArrowDownRight,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  braces: Braces,
  'building-2': Building2,
  'chart-column': ChartColumn,
  check: Check,
  'chevron-right': ChevronRight,
  'circle-check': CircleCheck,
  'circle-help': CircleHelp,
  'clipboard-check': ClipboardCheck,
  clock: Clock,
  'clock-3': Clock3,
  cloud: Cloud,
  'cloud-cog': CloudCog,
  'code-xml': CodeXml,
  coffee: Coffee,
  compass: Compass,
  database: Database,
  'database-zap': DatabaseZap,
  earth: Earth,
  folder: Folder,
  headphones: Headphones,
  inbox: Inbox,
  info: Info,
  languages: Languages,
  'layout-dashboard': LayoutDashboard,
  lightbulb: Lightbulb,
  mail: Mail,
  'map-pin': MapPin,
  menu: Menu,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  minus: Minus,
  'monitor-smartphone': MonitorSmartphone,
  'pencil-ruler': PencilRuler,
  phone: Phone,
  'plug-zap': PlugZap,
  plus: Plus,
  'refresh-cw': RefreshCw,
  rocket: Rocket,
  search: Search,
  send: Send,
  settings: Settings,
  'settings-2': Settings2,
  'shield-check': ShieldCheck,
  smartphone: Smartphone,
  target: Target,
  'user-round': UserRound,
  users: Users,
  'users-round': UsersRound,
  workflow: Workflow,
  x: X,
  zap: Zap,
};

const n = (value: string | number | undefined): number => Number(value ?? 0);

const NUMBER = String.raw`[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?`;
const LEADING_RELATIVE_MOVE = new RegExp(
  String.raw`^\s*m\s*(${NUMBER})[\s,]*(${NUMBER})[\s,]*(.*)$`,
  's',
);

/**
 * A path that starts with a relative "m" is only absolute at the very start of a path.
 * Merged after another shape it would become relative to that shape, so rewrite it as
 * "M x y" and keep any implicit follow-on pairs relative with an explicit "l".
 */
function absoluteStart(d: string): string {
  const match = LEADING_RELATIVE_MOVE.exec(d);
  if (!match) {
    return d;
  }
  const [, x, y, rest] = match;
  const continuesWithNumbers = /^[-+.\d]/.test(rest ?? '');
  return `M${x} ${y}${continuesWithNumbers ? 'l' : ''}${rest ?? ''}`;
}

/** One Lucide shape as path commands. Lucide icons are stroke-only, so this draws identically. */
function shapeToPath(tag: string, a: Attrs): string {
  switch (tag) {
    case 'path':
      return absoluteStart(String(a['d']));
    case 'circle':
    case 'ellipse': {
      const [cx, cy] = [n(a['cx']), n(a['cy'])];
      const rx = tag === 'circle' ? n(a['r']) : n(a['rx']);
      const ry = tag === 'circle' ? n(a['r']) : n(a['ry']);
      return `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0z`;
    }
    case 'rect': {
      const [x, y, w, h] = [n(a['x']), n(a['y']), n(a['width']), n(a['height'])];
      const rx = Math.min(n(a['rx'] ?? a['ry']), w / 2);
      const ry = Math.min(n(a['ry'] ?? a['rx']), h / 2);
      if (!rx || !ry) {
        return `M${x} ${y}h${w}v${h}h${-w}z`;
      }
      const [iw, ih] = [w - 2 * rx, h - 2 * ry];
      return (
        `M${x + rx} ${y}h${iw}a${rx} ${ry} 0 0 1 ${rx} ${ry}v${ih}a${rx} ${ry} 0 0 1 ${-rx} ${ry}` +
        `h${-iw}a${rx} ${ry} 0 0 1 ${-rx} ${-ry}v${-ih}a${rx} ${ry} 0 0 1 ${rx} ${-ry}z`
      );
    }
    case 'line':
      return `M${n(a['x1'])} ${n(a['y1'])}L${n(a['x2'])} ${n(a['y2'])}`;
    case 'polyline':
    case 'polygon':
      return `M${String(a['points']).trim()}${tag === 'polygon' ? 'z' : ''}`;
    default:
      throw new Error(`Unsupported icon shape <${tag}>.`);
  }
}

const pathCache = new Map<string, string>();

/** The whole icon as a single path `d`, so each icon renders as one static <path>. */
export function iconPath(name: string): string {
  let d = pathCache.get(name);
  if (d === undefined) {
    const icon = ICONS[name];
    if (!icon) {
      throw new Error(`Icon "${name}" is not registered in shared/ui/icon/icons.ts.`);
    }
    d = icon.map(([tag, attrs]) => shapeToPath(tag, attrs as Attrs)).join('');
    pathCache.set(name, d);
  }
  return d;
}
