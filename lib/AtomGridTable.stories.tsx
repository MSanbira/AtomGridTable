import type { Meta, StoryObj } from '@storybook/react';
import AtomGridTable from './AtomGridTable';

const meta = {
  title: 'Components/AtomGridTable',
  component: AtomGridTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AtomGridTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 