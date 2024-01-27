declare interface SysMenuQuery {
   keyword: string;
}

declare interface SysMenuType {
   id: string;
   parentId: string;
   type: '1' | '2';
   path: string;
   name: string;
   code: string;
   redirect: string;
   component: string;
   isLink: boolean;
   meta: {
      title: string;  // 菜单名称
      icon: string;   // 菜单图标
      linkTo: string;  // 外链地址
      cache: boolean;  // 是否缓存
      hidden: boolean;  // 是否在菜单中显示
      isBreadcrumd: boolean;  // 是否显示在面包屑中
   },
   sort: number;
   remark: string;
   createTime: string;
   updateTime: string;
   children: SysMenuType[];
}

declare interface SysRoleQuery {
   name: string;
}
declare interface SysRoleType {
   id: string;
   roleName: string;
   roleCode: string;
   status: boolean;
   remark: string;
   updateTime: string;
   createTime: string;
}