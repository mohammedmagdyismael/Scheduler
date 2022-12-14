// @flow

declare type iconsType = Object;

class IconsStore {
  constructor(icons: iconsType) {
    this.icons = icons;
  }

  icons: iconsType = {};

  getIcons = (): iconsType => this.icons;

  getIcon = (name: string): Object => {
    const iconName = `ic_${name}`;
    let requestedIcon = this.icons.icons.filter(icon => icon.properties.name === iconName);
    if (requestedIcon.length === 0) {
      requestedIcon = {};
    } else {
      requestedIcon = requestedIcon.pop();
    }

    return requestedIcon;
  };
}

export default IconsStore;
