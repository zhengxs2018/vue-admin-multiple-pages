import { Layout, Header, Content } from 'view-design'

import '@/assets/styles/layout.scss'

import Navbar from '@/includes/navbar.vue'

export default {
  components: {
    'i-layout': Layout,
    'i-header': Header,
    'i-content': Content,
    navbar: Navbar
  }
}
