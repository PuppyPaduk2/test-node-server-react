export type NavigationItem = {
  key: string;
  path: string;
  parentKey: string | null;
  childrenKeys: string[];
};

export type NavigationEntryItem = {
  path: NavigationItem["path"];
  parentKey: NavigationItem["parentKey"];
  childrenKeys: NavigationItem["childrenKeys"];
};

export type NavigationEntry = [NavigationItem["key"], NavigationEntryItem];
