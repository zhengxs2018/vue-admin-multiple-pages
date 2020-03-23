import { size, flatten } from 'lodash'

import { CreateElement, VNode, FunctionalComponentOptions } from 'vue'

import { Menu, Submenu, MenuItem, Icon } from 'view-design'

import { unwrap } from '@/system/utils/functional'

interface UxMenuTitleProps {
  text: string
  icon?: string
}

interface UxMenuItemProps extends UxMenuTitleProps {
  indexKey?: string
  [key: string]: any
}

interface UxSubmenuProps extends UxMenuItemProps {
  children: (UxSubmenuProps | UxMenuItemProps)[]
}

// @ts-ignore
function UxMenuTitle(h: CreateElement, props: UxMenuTitleProps): VNode[] {
  return [
    // @ts-ignore
    <Icon custom={props.icon}></Icon>,
    <span>{props.text}</span>
  ]
}

// @ts-ignore
function UxSubmenu(h: CreateElement, props: UxSubmenuProps): VNode {
  const { text, icon, indexKey, children = [], ...attrs } = props
  const name = unwrap<string>(indexKey || props.id, 'submenu', props)

  return (
    <Submenu name={name} {...attrs}>
      <template slot="title">{UxMenuTitle(h, { text, icon })}</template>
      {children.map(data => UxMenuItem(h, { indexKey, ...data }))}
    </Submenu>
  )
}

function UxMenuItem(
  h: CreateElement,
  props: UxMenuItemProps | UxSubmenuProps
): VNode | VNode[] {
  if (size(props.children) > 0) {
    return UxSubmenu(h, props as UxSubmenuProps)
  }

  const { text, icon, indexKey, ...attrs } = props
  const name = unwrap<string>(indexKey || attrs.path, 'menu-item', props)

  return (
    <MenuItem name={name} {...attrs}>
      {UxMenuTitle(h, { text, icon })}
    </MenuItem>
  )
}

export type UxMenuProps = {
  items: (UxMenuItemProps | UxSubmenuProps)[]
  indexKey?: string
}

export default {
  functional: true,
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    indexKey: {
      type: [String, Function],
      default: 'path'
    }
  },
  render(h, { props, data }) {
    const { indexKey, items } = props
    return (
      // @ts-ignore
      <Menu {...data}>
        {flatten(items.map(item => UxMenuItem(h, { indexKey, ...item })))}
      </Menu>
    )
  }
} as FunctionalComponentOptions<UxMenuProps>
