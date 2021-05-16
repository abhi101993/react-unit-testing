import {
  render,
  screen,
  userEvent,
} from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);

  const scoopSubTotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopSubTotal).toHaveTextContent('0.00');

  const vanilaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  userEvent.clear(vanilaInput);

  userEvent.type(vanilaInput, '1');

  expect(scoopSubTotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  userEvent.clear(chocolateInput);

  userEvent.type(chocolateInput, '2');

  expect(scoopSubTotal).toHaveTextContent('6.00');
});
