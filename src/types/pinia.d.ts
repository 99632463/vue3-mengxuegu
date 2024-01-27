declare interface LayoutConfigState {
  isCollpase: boolean;  //是否展开菜单
  globalTitle: string;  //网站主标题
  isFullScreen: boolean;
  isDark: boolean;
} 

declare interface LoginData {
  username: string;
  password: string;
}

declare interface AuthState<T = any> {
  rememberData?: LoginData;
  accessToken?: string;
  userInfo?: UserInfo;
  buttonList: string[];
  menuList: T[];
}

declare interface UserInfo {
  nickName: string;
  username: string;
  imageUrl: string;
}

declare interface ViewRouteState {
  cacheRouteNames: string[];
}