import { NavIem, SideItem } from '@/store/modules/app'

export default {
  nav: [] as Partial<NavIem>[],
  sidebar: [
    {
      text: '产品中心',
      link: '/'
    }
  ] as Partial<SideItem>[]
}
