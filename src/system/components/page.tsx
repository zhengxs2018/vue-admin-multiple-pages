import { Vue, Component, Prop } from 'vue-property-decorator'

import '@/assets/styles/page.scss'

@Component
export default class UxPage extends Vue {
  @Prop() readonly padding!: string

  render() {
    const $slots = this.$slots
    return (
      <div class="ux-page">
        {$slots.header}
        <div class="ux-page-content" style={{ padding: this.padding }}>
          {$slots.default}
        </div>
        {$slots.footer}
      </div>
    )
  }
}
