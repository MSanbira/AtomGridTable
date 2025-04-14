import React, { ReactElement } from "react";

interface ComponentOverrideProps<DefaultProps extends object> {
  defaultComponent: React.ComponentType<DefaultProps>;
  overrideComponent?: React.ComponentType<DefaultProps>;
  children?: React.ReactNode;
}

export const ComponentOverride = <DefaultProps extends object>({
  defaultComponent: DefaultComponent,
  overrideComponent: OverrideComponent,
  children,
  ...rest
}: ComponentOverrideProps<DefaultProps> &
  Omit<DefaultProps, keyof ComponentOverrideProps<DefaultProps>>): ReactElement => {
  const props = { ...rest, children } as DefaultProps;

  if (OverrideComponent) {
    return <OverrideComponent {...props} />;
  }

  return <DefaultComponent {...props} />;
};
