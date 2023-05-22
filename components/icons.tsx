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
  LineChart,
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
  Lock,
  Menu,
  type Icon as LucideIcon,
  RotateCw,
  LucideProps,
  ArrowUpRight,
  MousePointer,
  MousePointerClick,
  Crosshair,
  Copy,
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
  crosshair: Crosshair,
  spinner: Loader2,
  chart: List,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  copy: Copy,
  mousePointer: MousePointer,
  mousePointerClick: MousePointerClick,
  chevronUp: ChevronUp,
  chevronUpDown: ChevronsUpDown,
  lock: Lock,
  rotate: RotateCw,
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
  lineChart: LineChart,
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
  aliExpress: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="10 10 100 40"
      width="120"
      height="30"
      {...props}
    >
      <g fill="#e43225">
        <path d="M35.742 35.825V20.083h9.296v1.972h-7.374v4.84h6.628v1.972h-6.628v4.938h7.888v1.972h-9.8zm19.586 0L52.13 31.65l-3.182 4.176h-2.254l4.375-5.584-4.607-5.783h2.535l3.148 4.325 3.198-4.325h2.486l-4.375 5.783 4.126 5.584zm5.352-1.7V41.9h-1.922V30.3c0-2.966 2.254-6.115 5.783-6.115 3.563 0 6.247 2.254 6.247 5.965 0 3.612-2.718 6.115-5.816 6.115-1.508 0-3.53-.663-4.292-2.12zm8.086-3.994c0-2.535-1.64-4.043-4.557-3.894-1.4.05-3.563 1.077-3.38 4.7.05 1.177 1.276 3.38 3.944 3.38 2.303.017 3.994-1.3 3.994-4.176zm3.664 5.684V24.457h1.922v1.226c.945-1.077 2.403-1.458 3.944-1.458v2.07c-.232-.05-2.535-.33-3.944 2.684v6.9H72.43zm6.395-5.675c0-3.28 2.353-5.965 5.584-5.965 4.043 0 5.535 2.684 5.535 6.115v.945H80.93c.15 2.154 2.07 3.28 3.844 3.248 1.3-.05 2.204-.43 3.148-1.36l1.276 1.3c-1.177 1.127-2.684 1.872-4.507 1.872-3.43-.05-5.866-2.585-5.866-6.164zm5.435-4.043c-1.84 0-3.248 1.6-3.33 3.33h6.993c0-1.674-1.2-3.33-3.662-3.33z"></path>
        <use xlinkHref="#A"></use>
        <use x="9.91" xlinkHref="#A"></use>
      </g>
      <path
        fill="#f7971d"
        d="M22.684 35.825l-1.4-3.762H13.67l-1.4 3.762h-2.02l6.115-15.742h2.204l6.065 15.742zM17.38 22.353l-2.867 7.805h5.965zm8.502 13.472V20.083h1.972v15.742zm4.938 0V24.7h1.972v11.135zm3.844-14.748v-.2a2.874 2.874 0 01-2.767-2.767H31.6a2.874 2.874 0 01-2.767 2.767v.2a2.874 2.874 0 012.767 2.767h.298a2.87 2.87 0 012.767-2.767z"
      ></path>
      <defs>
        <path
          id="A"
          d="M90.938 34.234l1.4-1.276c-.05 0 .713.746.795.795a2.5 2.5 0 001.077.563c1.226.33 3.43.232 3.612-1.458.1-.945-.613-1.458-1.4-1.8-1.027-.38-2.154-.514-3.198-.994-1.177-.514-1.922-1.4-1.922-2.718 0-3.43 4.888-3.994 7.092-2.403l1.127 1.077-1.4 1.127c-.713-.845-1.36-1.276-2.867-1.276-.746 0-1.8.33-1.972 1.127-.282 1.127.994 1.558 1.84 1.8 1.127.282 2.353.464 3.33 1.077 1.36.845 1.7 2.684 1.177 4.093-.563 1.558-2.254 2.154-3.762 2.204-1.8.1-3.33-.464-4.607-1.74-.083.033-.315-.2-.315-.2z"
        ></path>
      </defs>
    </svg>
  ),
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
