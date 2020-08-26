import { createNamespace } from '../utils';
import { useRoute, routeProps } from '../utils/router';
import { useParent } from '../api/use-relation';
import { SIDEBAR_KEY } from '../sidebar';
import Badge from '../badge';

const [createComponent, bem] = createNamespace('sidebar-item');

export default createComponent({
  props: {
    ...routeProps,
    dot: Boolean,
    title: String,
    badge: [Number, String],
    disabled: Boolean,
  },

  emits: ['click'],

  setup(props, { emit }) {
    const route = useRoute();
    const { parent, index } = useParent(SIDEBAR_KEY);

    const onClick = () => {
      if (props.disabled) {
        return;
      }

      emit('click', index.value);
      parent.emit('update:modelValue', index.value);
      parent.setActive(index.value);
      route();
    };

    return () => {
      const { dot, badge, title, disabled } = props;
      const selected = index.value === parent.active();

      return (
        <a class={bem({ select: selected, disabled })} onClick={onClick}>
          <div class={bem('text')}>
            {title}
            <Badge dot={dot} badge={badge} class={bem('badge')} />
          </div>
        </a>
      );
    };
  },
});
