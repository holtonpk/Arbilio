import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Users2,
  Moon,
  MoreVertical,
  Play,
  Heart,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  RefreshCcw,
  DownloadCloud,
  X,
  Eye,
  EyeOff,
  FolderPlus,
  BarChart3,
  ListFilter,
  Group,
  ShoppingCart,
  LayoutDashboard,
  AlertTriangleIcon,
  TrendingUp,
  LogOut,
  TrendingDown,
  FileBarChart,
  Database,
  Calendar,
  LayoutGrid,
  DollarSign,
  List,
  Search,
  Store,
  XCircle,
  Tag,
  Wallet,
  ArrowLeftRight,
  Menu,
  type Icon as LucideIcon,
  LucideProps,
  ArrowUpRight,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  accounts: Users2,
  ArrowUpRight: ArrowUpRight,
  showPassword: Eye,
  hidePassword: EyeOff,
  addCollection: FolderPlus,
  analytics: BarChart3,
  logo: ShoppingCart,
  close: X,
  spinner: Loader2,
  chart: List,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronUpDown: ChevronsUpDown,
  filter: ListFilter,
  collection: Group,
  calendar: Calendar,
  dashboard: LayoutDashboard,
  database: Database,
  download: DownloadCloud,
  followers: User,
  error: AlertTriangleIcon,
  trash: Trash,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  post: FileText,
  page: File,
  profile: User,
  posts: Play,
  rank: FileBarChart,
  media: Image,
  menu: Menu,
  likes: Heart,
  logout: LogOut,
  settings: Settings,
  grid: LayoutGrid,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  money: DollarSign,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  search: Search,
  store: Store,
  help: HelpCircle,
  remove: XCircle,
  pizza: Pizza,
  products: Tag,
  sun: SunMedium,
  swap: ArrowLeftRight,
  moon: Moon,
  refresh: RefreshCcw,
  laptop: Laptop,
  wallet: Wallet,
  twitter: Twitter,
  check: Check,

  google: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="705.6"
      height="720"
      viewBox="0 0 186.69 190.5"
      {...props}
    >
      <path
        fill="#4285f4"
        d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
        transform="translate(1184.583 765.171)"
      ></path>
      <path
        fill="#34a853"
        d="M-1142.714-651.791l-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
        transform="translate(1184.583 765.171)"
      ></path>
      <path
        fill="#fbbc05"
        d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
        transform="translate(1184.583 765.171)"
      ></path>
      <path
        fill="#ea4335"
        d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
        transform="translate(1184.583 765.171)"
      ></path>
    </svg>
  ),
};
