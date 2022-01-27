export type NavigationItem = {
  key: string;
  parentKey: string | null;
  childrenKeys: string[];
  path: string;
};

export type NavigationEntryItem = {
  path: NavigationItem["path"];
  parentKey: NavigationItem["parentKey"];
  childrenKeys: NavigationItem["childrenKeys"];
};

export type NavigationEntry = [NavigationItem["key"], NavigationEntryItem];

export type Navigation = Map<NavigationItem["key"], NavigationEntryItem>;

export type MenuItem = {
  key: string;
  navigationKey: NavigationItem["key"];
  title: string;
};

export type MenuEntryItem = {
  path: NavigationItem["path"];
  title: MenuItem["title"];
};

export type MenuEntry = [MenuItem["key"], MenuEntryItem];

export type Menu = Map<MenuItem["key"], MenuEntryItem>;
