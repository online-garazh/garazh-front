import { type ReactElement, useState } from 'react';

type Props = {
  defaultValue?: boolean;
  render: (props: { toggleBool: () => void; boolValue: boolean }) => ReactElement;
};

export function BoolRenderProp(props: Props): ReactElement {
  const { defaultValue, render } = props;
  const [boolValue, setBoolValue] = useState(defaultValue || false);
  const toggleBool = () => {
    setBoolValue(!boolValue);
  };

  return render({ toggleBool, boolValue });
}
