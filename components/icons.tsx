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
  Triangle,
  Link2,
  RefreshCcwIcon,
  Send,
  XCircleIcon,
  CheckCircle2,
  HelpCircleIcon,
  Pause,
  Share,
  MessageSquare,
  Bookmark,
  Music,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  music: Music,
  bookmark: Bookmark,
  comment: MessageSquare,
  share: Share,
  helpCircle: HelpCircleIcon,
  checkCircle: CheckCircle2,
  xCircle: XCircleIcon,
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
  update: RefreshCcwIcon,
  followers: User,
  error: AlertTriangleIcon,
  trash: Trash,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  post: FileText,
  page: File,
  pause: Pause,
  profile: User,
  posts: Play,
  send: Send,
  lineChart: LineChart,
  rank: FileBarChart,
  media: Image,
  menu: Menu,
  likes: Heart,
  link: Link2,
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
  triangle: Triangle,
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
  tiktok: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 1000 291.379"
      xmlSpace="preserve"
    >
      <path
        fill="#FF004F"
        d="M191.102 105.182c18.814 13.442 41.862 21.351 66.755 21.351V78.656c-4.711.001-9.41-.49-14.019-1.466v37.686c-24.891 0-47.936-7.909-66.755-21.35v97.703c0 48.876-39.642 88.495-88.54 88.495-18.245 0-35.203-5.513-49.29-14.968 16.078 16.431 38.5 26.624 63.306 26.624 48.901 0 88.545-39.619 88.545-88.497v-97.701h-.002zm17.294-48.302c-9.615-10.499-15.928-24.067-17.294-39.067v-6.158h-13.285c3.344 19.065 14.75 35.353 30.579 45.225zM70.181 227.25a40.3 40.3 0 01-8.262-24.507c0-22.354 18.132-40.479 40.502-40.479a40.607 40.607 0 0112.286 1.897v-48.947a89.349 89.349 0 00-14.013-.807v38.098a40.56 40.56 0 00-12.292-1.896c-22.37 0-40.501 18.123-40.501 40.48 0 15.808 9.063 29.494 22.28 36.161z"
      ></path>
      <path
        className={props.color}
        d="M177.083 93.525c18.819 13.441 41.864 21.35 66.755 21.35V77.189c-13.894-2.958-26.194-10.215-35.442-20.309-15.83-9.873-27.235-26.161-30.579-45.225h-34.896v191.226c-.079 22.293-18.18 40.344-40.502 40.344-13.154 0-24.84-6.267-32.241-15.975-13.216-6.667-22.279-20.354-22.279-36.16 0-22.355 18.131-40.48 40.501-40.48 4.286 0 8.417.667 12.292 1.896v-38.098c-48.039.992-86.674 40.224-86.674 88.474 0 24.086 9.621 45.921 25.236 61.875 14.087 9.454 31.045 14.968 49.29 14.968 48.899 0 88.54-39.621 88.54-88.496V93.525h-.001z"
      ></path>
      <path
        fill="#00F2EA"
        d="M243.838 77.189v-10.19a66.768 66.768 0 01-35.442-10.12 66.953 66.953 0 0035.442 20.31zm-66.021-65.534a68.282 68.282 0 01-.734-5.497V0h-48.182v191.228c-.077 22.29-18.177 40.341-40.501 40.341a40.352 40.352 0 01-18.222-4.318c7.401 9.707 19.087 15.973 32.241 15.973 22.32 0 40.424-18.049 40.502-40.342V11.655h34.896zm-77.123 102.753V103.56a89.432 89.432 0 00-12.149-.824C39.642 102.735 0 142.356 0 191.228c0 30.64 15.58 57.643 39.255 73.527-15.615-15.953-25.236-37.789-25.236-61.874 0-48.249 38.634-87.481 86.675-88.473z"
      ></path>
      <path
        fill="#FF004F"
        d="M802.126 239.659c34.989 0 63.354-28.136 63.354-62.84 0-34.703-28.365-62.844-63.354-62.844h-9.545c34.99 0 63.355 28.14 63.355 62.844s-28.365 62.84-63.355 62.84h9.545z"
      ></path>
      <path
        fill="#00F2EA"
        d="M791.716 113.975h-9.544c-34.988 0-63.358 28.14-63.358 62.844s28.37 62.84 63.358 62.84h9.544c-34.993 0-63.358-28.136-63.358-62.84-.001-34.703 28.365-62.844 63.358-62.844z"
      ></path>
      <path
        className={props.color}
        d="M310.062 85.572v31.853h37.311v121.374h37.326V118.285h30.372l10.414-32.712H310.062zm305.482 0v31.853h37.311v121.374h37.326V118.285h30.371l10.413-32.712H615.544zm-183.11 18.076c0-9.981 8.146-18.076 18.21-18.076 10.073 0 18.228 8.095 18.228 18.076 0 9.982-8.15 18.077-18.228 18.077-10.064-.005-18.21-8.095-18.21-18.077zm0 30.993h36.438v104.158h-36.438V134.641zm52.062-49.069v153.226h36.452v-39.594l11.283-10.339 35.577 50.793h39.05l-51.207-74.03 45.997-44.768H557.39l-36.442 36.153V85.572h-36.452zm393.127 0v153.226h36.457v-39.594l11.278-10.339 35.587 50.793H1000l-51.207-74.03 45.995-44.768h-44.256l-36.452 36.153V85.572h-36.457zM792.578 239.659c34.988 0 63.358-28.136 63.358-62.84 0-34.703-28.37-62.844-63.358-62.844h-.865c-34.99 0-63.355 28.14-63.355 62.844s28.365 62.84 63.355 62.84h.865zm-31.242-62.84c0-16.881 13.8-30.555 30.817-30.555 17.005 0 30.804 13.674 30.804 30.555s-13.799 30.563-30.804 30.563c-17.017-.003-30.817-13.682-30.817-30.563z"
      ></path>
    </svg>
  ),
};
